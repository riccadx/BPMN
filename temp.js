        // Initial empty diagram
        const emptyDiagram = `<?xml version="1.0" encoding="UTF-8"?>
        <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="Definitions_1" targetNamespace="http://bpmn.io/schema/bpmn">
          <bpmn:collaboration id="Collaboration_1">
            <bpmn:participant id="Participant_1" name="プロセス概要" processRef="Process_1" />
          </bpmn:collaboration>
          <bpmn:process id="Process_1" isExecutable="true">
            <bpmn:laneSet id="LaneSet_1">
              <bpmn:lane id="Lane_1" name="レーン 1" />
            </bpmn:laneSet>
          </bpmn:process>
          <bpmndi:BPMNDiagram id="BPMNDiagram_1">
            <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_1">
              <bpmndi:BPMNShape id="Participant_1_di" bpmnElement="Participant_1" isHorizontal="true">
                <dc:Bounds x="160" y="80" width="600" height="250" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="Lane_1_di" bpmnElement="Lane_1" isHorizontal="true">
                <dc:Bounds x="190" y="80" width="570" height="250" />
              </bpmndi:BPMNShape>
            </bpmndi:BPMNPlane>
          </bpmndi:BPMNDiagram>
        </bpmn:definitions>`;

        const modeler = new BpmnJS({
            container: '#canvas',
            keyboard: { bindTo: window }
        });

        // --- CUSTOM RENDERING & RESIZING OVERRIDES ---
        // 1. Force external labels and shapes to be resizable
        const rules = modeler.get('rules');
        const originalAllowed = rules.allowed.bind(rules);
        rules.allowed = function(action, context) {
            if (action === 'elements.resize') {
                return true; // Allow resizing everything (including labels and circles)
            }
            return originalAllowed(action, context);
        };

        // 2. Override renderer to apply custom font sizes and optional internal text
        const bpmnRenderer = modeler.get('bpmnRenderer');
        const textRenderer = modeler.get('textRenderer');
        const originalDrawShape = bpmnRenderer.drawShape.bind(bpmnRenderer);

        bpmnRenderer.drawShape = function(parentNode, element) {
            const bo = element.type === 'label' ? element.labelTarget.businessObject : element.businessObject;
            const textPosition = bo && bo.customTextPosition ? bo.customTextPosition : 'bottom';
            const fontSize = bo && bo.customFontSize ? bo.customFontSize : '14px';

            if (element.type === 'label' && textPosition === 'inside') {
                // Hide external label if position is inside!
                const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
                parentNode.appendChild(group);
                return group;
            }

            const shape = originalDrawShape(parentNode, element);
            
            if (textPosition === 'inside' && (element.type.includes('Event') || element.type.includes('Gateway')) && bo.name) {
                // Draw internal text
                const text = textRenderer.createText(bo.name, {
                    box: element,
                    align: 'center-middle',
                    padding: 5,
                    style: { fill: '#000000', fontSize: fontSize, fontFamily: 'Inter, sans-serif' }
                });
                parentNode.appendChild(text);
            } else {
                // Apply font size to default text
                const textNodes = parentNode.getElementsByTagName('text');
                for (let i = 0; i < textNodes.length; i++) {
                    textNodes[i].style.fontSize = fontSize;
                }
            }
            return shape;
        };

        // --- AUTO SAVE LOGIC ---
        let autoSaveTimer = null;
        let isInitialLoad = true;
        const autosaveStatus = document.getElementById('autosaveStatus');
        const draftModal = document.getElementById('draftModal');

        function updateSaveStatus(text, icon = '') {
            autosaveStatus.innerHTML = `${icon} ${text}`;
        }

        async function saveDraftLocally() {
            try {
                const { xml } = await modeler.saveXML({ format: true });
                localStorage.setItem('bpmn_draft', xml);
                const time = new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
                updateSaveStatus(`自動保存: ${time}`, '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--color-green);"><polyline points="20 6 9 17 4 12"></polyline></svg>');
            } catch (err) {
                console.error('Error saving draft', err);
            }
        }

        modeler.on('commandStack.changed', function() {
            if (isInitialLoad) return; // Prevent saving empty diagram during boot
            updateSaveStatus('編集を保存中...', '✎');
            clearTimeout(autoSaveTimer);
            autoSaveTimer = setTimeout(saveDraftLocally, 2000);
        });

        function clearDraft() {
            localStorage.removeItem('bpmn_draft');
            updateSaveStatus('');
        }

        // --- CORE INITIALIZATION ---
        async function loadDiagramXML(xml) {
            try {
                isInitialLoad = true;
                await modeler.importXML(xml);
                const canvas = modeler.get('canvas');
                canvas.zoom('fit-viewport');
                injectCustomShapes();
                
                // Allow tracking changes after a short delay
                setTimeout(() => { isInitialLoad = false; }, 500);
                return true;
            } catch (err) { 
                console.error('Error rendering diagram', err); 
                return false;
            }
        }

        async function initDiagram() {
            const draftXML = localStorage.getItem('bpmn_draft');
            let success = false;
            if (draftXML && confirm('未保存のドラフトが見つかりました。復元しますか？')) {
                success = await loadDiagramXML(draftXML);
                if (success) {
                    updateSaveStatus('ドラフトを復元しました', '✓');
                } else {
                    alert('ドラフトデータの読み込みに失敗しました。');
                    clearDraft();
                }
            } 
            
            if (!success) {
                await loadDiagramXML(emptyDiagram);
                clearDraft();
            }
        }

        // --- CUSTOM SHAPES INJECTION ---
        function injectCustomShapes() {
            const palette = document.querySelector('.djs-palette');
            if (!palette) return;

            // We handle smooth scrolling globally now

            const customGroup = document.createElement('div');
            customGroup.className = 'group custom-shapes-group';
            
            function addPaletteEntry(type, title, className, actionName) {
                const entry = document.createElement('div');
                entry.className = `entry custom-added ${className}`;
                entry.setAttribute('data-action', actionName);
                
                const create = modeler.get('create');
                const elementFactory = modeler.get('elementFactory');
                
                function clickHandler(event) {
                    const shape = elementFactory.createShape({ type: type });
                    create.start(event, shape);
                }

                entry.addEventListener('mousedown', clickHandler);
                entry.addEventListener('click', clickHandler);
                customGroup.appendChild(entry);
            }

            addPaletteEntry('bpmn:EndEvent', '終了イベント', 'bpmn-icon-end-event-none', 'create.end-event');
            addPaletteEntry('bpmn:UserTask', 'ユーザータスク', 'bpmn-icon-user-task', 'create.user-task');
            addPaletteEntry('bpmn:ServiceTask', 'サービスタスク', 'bpmn-icon-service-task', 'create.service-task');
            addPaletteEntry('bpmn:SendTask', '送信タスク', 'bpmn-icon-send-task', 'create.send-task');
            addPaletteEntry('bpmn:ReceiveTask', '受信タスク', 'bpmn-icon-receive-task', 'create.receive-task');
            addPaletteEntry('bpmn:ParallelGateway', '並列ゲートウェイ', 'bpmn-icon-gateway-parallel', 'create.parallel-gateway');
            addPaletteEntry('bpmn:InclusiveGateway', '包括的ゲートウェイ', 'bpmn-icon-gateway-or', 'create.inclusive-gateway');

            palette.appendChild(customGroup);
        }

        // --- PROPERTIES PANEL LOGIC ---
        const propertiesPanel = document.getElementById('propertiesPanel');
        const propForm = document.getElementById('propForm');
        const emptySelectionMsg = document.getElementById('emptySelectionMsg');
        const propName = document.getElementById('propName');
        const propDesc = document.getElementById('propDesc');
        const propType = document.getElementById('propType');
        
        let selectedElement = null;

        modeler.on('selection.changed', function(e) {
            const selection = e.newSelection;
            const overlays = modeler.get('overlays');
            const modeling = modeler.get('modeling');
            const connect = modeler.get('connect');
            
            // Manage Floating Toolbar
            if (window.currentOverlayId) {
                overlays.remove(window.currentOverlayId);
                window.currentOverlayId = null;
            }
            if (window.connectionOverlayIds) {
                window.connectionOverlayIds.forEach(id => overlays.remove(id));
                window.connectionOverlayIds = [];
            }

            if (selection.length === 1) {
                const element = selection[0];
                selectedElement = element;
                
                // Show Properties Panel
                propertiesPanel.classList.add('open');
                propForm.style.display = 'block';
                emptySelectionMsg.style.display = 'none';
                
                // Populate inputs
                const bo = element.businessObject;
                propType.value = bo.$type.replace('bpmn:', '');
                propName.value = element.type === 'bpmn:TextAnnotation' ? (bo.text || '') : (bo.name || '');
                
                const currentFontSize = bo.customFontSize || '14px';
                propFontSizeSlider.value = parseInt(currentFontSize);
                propFontSizeVal.innerText = currentFontSize;
                
                const posGroup = document.getElementById('propTextPositionGroup');
                const optTop = document.getElementById('optTop');
                if (element.type.includes('Event') || element.type.includes('Gateway')) {
                    posGroup.style.display = 'block';
                    optTop.style.display = 'none';
                    document.getElementById('propTextPosition').value = bo.customTextPosition || 'bottom';
                } else if (element.type === 'bpmn:SequenceFlow') {
                    posGroup.style.display = 'block';
                    optTop.style.display = 'block';
                    document.getElementById('propTextPosition').value = bo.customTextPosition || 'inside';
                } else {
                    posGroup.style.display = 'none';
                }

                // Read description from standard bpmn:documentation
                let desc = '';
                if (bo.documentation && bo.documentation.length > 0) {
                    desc = bo.documentation[0].text || '';
                }
                propDesc.value = desc;

                // Create Floating Toolbar (skip for lines and root)
                if (element.type !== 'bpmn:Process' && element.type !== 'bpmn:SequenceFlow' && element.type !== 'bpmn:Collaboration') {
                    const isPoolOrLane = element.type === 'bpmn:Participant' || element.type === 'bpmn:Lane';
                    
                    const toolbar = document.createElement('div');
                    toolbar.className = 'floating-toolbar';
                    toolbar.style.display = 'flex';
                    toolbar.style.alignItems = 'center';
                    
                    const shapeChangersHtml = isPoolOrLane ? '' : `
                        <div style="display: flex; gap: 4px; margin-right: 12px; padding-right: 12px; border-right: 1px solid var(--border-color);">
                            <button class="ft-action shape-changer" data-type="bpmn:Task" title="タスクに変更">🟩</button>
                            <button class="ft-action shape-changer" data-type="bpmn:ExclusiveGateway" title="ゲートウェイに変更">🔶</button>
                            <button class="ft-action shape-changer" data-type="bpmn:StartEvent" title="開始に変更">🟢</button>
                            <button class="ft-action shape-changer" data-type="bpmn:EndEvent" title="終了に変更">🔴</button>
                        </div>
                    `;

                    toolbar.innerHTML = `
                        ${shapeChangersHtml}
                        <div class="ft-color" style="background: #ffffff; border-color: #cbd5e1" data-color="#ffffff" data-stroke="#2d3436" title="デフォルト"></div>
                        <div class="ft-color" style="background: #ff7675" data-color="#ff7675" data-stroke="#d63031" title="ピンク"></div>
                        <div class="ft-color" style="background: #74b9ff" data-color="#74b9ff" data-stroke="#0984e3" title="ブルー"></div>
                        <div class="ft-color" style="background: #55efc4" data-color="#55efc4" data-stroke="#00b894" title="グリーン"></div>
                        <div class="ft-color" style="background: #a29bfe" data-color="#a29bfe" data-stroke="#6c5ce7" title="パープル"></div>
                        <div class="ft-color" style="background: #ffeaa7" data-color="#ffeaa7" data-stroke="#fdcb6e" title="イエロー"></div>
                        <div class="ft-divider"></div>
                        <button class="ft-action" id="ft-comment" title="コメントを追加">📝</button>
                        <button class="ft-action" id="ft-delete" title="要素を削除">🗑️</button>
                    `;

                    toolbar.querySelectorAll('.ft-color').forEach(btn => {
                        btn.addEventListener('click', (ev) => {
                            const fill = ev.target.getAttribute('data-color');
                            const stroke = ev.target.getAttribute('data-stroke');
                            modeling.setColor([element], { fill, stroke });
                        });
                    });

                    const bpmnReplace = modeler.get('bpmnReplace');
                    const selectionState = modeler.get('selection');
                    
                    toolbar.querySelectorAll('.shape-changer').forEach(btn => {
                        btn.addEventListener('click', (ev) => {
                            const newType = ev.target.getAttribute('data-type');
                            if (element.type !== newType) {
                                // Preserve bounds and name manually just in case, though replaceElement handles most of it.
                                const newElement = bpmnReplace.replaceElement(element, { type: newType });
                                selectionState.select(newElement);
                            }
                        });
                    });

                    toolbar.querySelector('#ft-comment').addEventListener('click', () => {
                        const elementFactory = modeler.get('elementFactory');
                        const modeling = modeler.get('modeling');
                        
                        // Create the text annotation
                        const annotation = elementFactory.createShape({ type: 'bpmn:TextAnnotation' });
                        annotation.businessObject.text = '新しいコメント...';
                        
                        // Place it slightly above and to the right
                        const position = { 
                            x: element.x + element.width + 50, 
                            y: element.y - 40 
                        };
                        
                        const newShape = modeling.createShape(annotation, position, element.parent);
                        
                        // Connect it with an association
                        modeling.createConnection(element, newShape, { type: 'bpmn:Association' }, element.parent);
                        
                        // Select the new comment so user can edit properties
                        selectionState.select(newShape);
                    });

                    toolbar.querySelector('#ft-delete').addEventListener('click', () => {
                        modeling.removeElements([element]);
                    });

                    const positionOptions = isPoolOrLane 
                        ? { top: -50, left: 0 } 
                        : { bottom: -60, left: 0 };

                    window.currentOverlayId = overlays.add(element, 'custom-toolbar', {
                        position: positionOptions,
                        html: toolbar
                    });

                    // --- ADD CONNECTION POINTS ---
                    window.connectionOverlayIds = [];
                    const w = element.width;
                    const h = element.height;
                    const ptSize = 14;
                    const halfPt = ptSize / 2;

                    const positions = [
                        { top: -halfPt, left: w/2 - halfPt }, // Top
                        { top: h/2 - halfPt, left: w - halfPt }, // Right
                        { top: h - halfPt, left: w/2 - halfPt }, // Bottom
                        { top: h/2 - halfPt, left: -halfPt } // Left
                    ];

                    positions.forEach(pos => {
                        const dot = document.createElement('div');
                        dot.className = 'connect-point';
                        
                        // Start connection on drag/click
                        dot.addEventListener('mousedown', function(event) {
                            event.stopPropagation();
                            connect.start(event, element, true);
                        });

                        const id = overlays.add(element, 'connection-point', {
                            position: pos,
                            html: dot
                        });
                        window.connectionOverlayIds.push(id);
                    });
                }
            } else {
                // Hide Properties Panel
                selectedElement = null;
                propertiesPanel.classList.remove('open');
                propForm.style.display = 'none';
                emptySelectionMsg.style.display = 'block';
            }
        });

        // Auto-Resize logic for text
        function autoResizeElement(element, text) {
            if (!element || !text) return;
            const bo = element.type === 'label' ? element.labelTarget.businessObject : element.businessObject;
            const fontSize = parseInt(bo.customFontSize || '14');
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.font = `${fontSize}px 'Inter', sans-serif`;
            
            const lines = text.split('\n');
            let maxWidth = 0;
            lines.forEach(l => {
                const w = ctx.measureText(l).width;
                if (w > maxWidth) maxWidth = w;
            });
            
            const paddingX = element.type === 'bpmn:TextAnnotation' ? 25 : 30;
            const paddingY = element.type === 'bpmn:TextAnnotation' ? 25 : 20;
            
            const reqWidth = Math.max(50, maxWidth + paddingX);
            const reqHeight = Math.max(30, lines.length * (fontSize * 1.5) + paddingY);
            
            const modeling = modeler.get('modeling');
            
            // If the element is a connection or event, but we are typing, its label should be resized!
            let targetToResize = element;
            if (element.label) targetToResize = element.label;

            if (targetToResize.type === 'bpmn:TextAnnotation' || targetToResize.type.includes('Task') || targetToResize.type === 'label') {
                if (reqWidth > targetToResize.width || reqHeight > targetToResize.height) {
                    modeling.resizeShape(targetToResize, {
                        x: targetToResize.x,
                        y: targetToResize.y,
                        width: Math.max(targetToResize.width, reqWidth),
                        height: Math.max(targetToResize.height, reqHeight)
                    });
                }
            }
        }

        // Properties Panel Data Binding (Update shape when typing)
        propName.addEventListener('input', (e) => {
            if (!selectedElement) return;
            const modeling = modeler.get('modeling');
            if (selectedElement.type === 'bpmn:TextAnnotation') {
                modeling.updateProperties(selectedElement, { text: e.target.value });
            } else {
                modeling.updateProperties(selectedElement, { name: e.target.value });
            }
            autoResizeElement(selectedElement, e.target.value);
        });

        propDesc.addEventListener('input', (e) => {
            if (!selectedElement) return;
            const modeling = modeler.get('modeling');
            const bpmnFactory = modeler.get('bpmnFactory');
            const newDoc = bpmnFactory.create('bpmn:Documentation', { text: e.target.value });
            modeling.updateProperties(selectedElement, { documentation: [newDoc] });
        });

        const propFontSizeSlider = document.getElementById('propFontSizeSlider');
        const propFontSizeVal = document.getElementById('propFontSizeVal');

        propFontSizeSlider.addEventListener('input', (e) => {
            if (!selectedElement) return;
            const size = e.target.value + 'px';
            propFontSizeVal.innerText = size;
            
            // For labels, update the target shape's BO. For shapes, update their own BO.
            const targetElement = selectedElement.type === 'label' ? selectedElement.labelTarget : selectedElement;
            const bo = targetElement.businessObject;
            
            // Save custom font size
            bo.customFontSize = size;

            // Trigger a re-render of the shape and label!
            const eventBus = modeler.get('eventBus');
            eventBus.fire('element.changed', { element: targetElement });
            if (targetElement.label) {
                eventBus.fire('element.changed', { element: targetElement.label });
            }
            
            // Auto resize if font size gets too big
            const textValue = targetElement.type === 'bpmn:TextAnnotation' ? bo.text : bo.name;
            if (textValue) {
                autoResizeElement(selectedElement, textValue);
            }
        });

        const propTextPosition = document.getElementById('propTextPosition');
        propTextPosition.addEventListener('change', (e) => {
            if (!selectedElement) return;
            const targetElement = selectedElement.type === 'label' ? selectedElement.labelTarget : selectedElement;
            targetElement.businessObject.customTextPosition = e.target.value;
            
            const eventBus = modeler.get('eventBus');
            
            if (targetElement.type === 'bpmn:SequenceFlow' && targetElement.label) {
                const modeling = modeler.get('modeling');
                const waypoints = targetElement.waypoints;
                let midY = 0;
                if (waypoints && waypoints.length >= 2) {
                    const idx = Math.floor((waypoints.length - 1) / 2);
                    midY = (waypoints[idx].y + waypoints[idx+1].y) / 2;
                }
                
                const label = targetElement.label;
                let targetY = midY - label.height / 2; // 'inside'
                
                if (e.target.value === 'top') {
                    targetY = midY - label.height - 10;
                } else if (e.target.value === 'bottom') {
                    targetY = midY + 10;
                }
                
                const dy = targetY - label.y;
                if (dy !== 0) {
                    modeling.moveShape(label, { x: 0, y: dy });
                }
            } else {
                eventBus.fire('element.changed', { element: targetElement });
                if (targetElement.label) eventBus.fire('element.changed', { element: targetElement.label });
            }
        });


        // --- EXPORT & SAVE MODAL LOGIC ---
        const exportModal = document.getElementById('exportModal');
        const btnOpenExportModal = document.getElementById('btnOpenExportModal');
        const closeExportModal = document.getElementById('closeExportModal');
        const btnExportToCloud = document.getElementById('btnExportToCloud');
        const btnExportToDevice = document.getElementById('btnExportToDevice');
        const exportFileName = document.getElementById('exportFileName');

        btnOpenExportModal.addEventListener('click', () => {
            const dateStr = new Date().toISOString().split('T')[0];
            exportFileName.value = `Diagram_${dateStr}`;
            exportModal.classList.add('open');
        });

        closeExportModal.addEventListener('click', () => {
            exportModal.classList.remove('open');
        });

        function downloadDataUrl(dataUrl, filename) {
            const a = document.createElement('a');
            a.href = dataUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }

        async function getSvgToPngDataUrl(svgString, width, height) {
            return new Promise((resolve) => {
                const canvas = document.createElement('canvas');
                const scale = 2; // High resolution
                canvas.width = width * scale;
                canvas.height = height * scale;
                const ctx = canvas.getContext('2d');
                ctx.scale(scale, scale);
                
                // Add white background
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const img = new Image();
                const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
                const url = URL.createObjectURL(svgBlob);

                img.onload = function() {
                    ctx.drawImage(img, 0, 0, width, height);
                    URL.revokeObjectURL(url);
                    resolve(canvas.toDataURL('image/png'));
                };
                img.src = url;
            });
        }

        btnExportToDevice.addEventListener('click', async () => {
            const format = document.querySelector('input[name="exportFormat"]:checked').value;
            let filename = exportFileName.value || 'Diagram';
            
            try {
                if (format === 'bpmn') {
                    const { xml } = await modeler.saveXML({ format: true });
                    const blob = new Blob([xml], { type: 'application/bpmn20-xml;charset=UTF-8' });
                    downloadDataUrl(URL.createObjectURL(blob), filename + '.bpmn');
                } else if (format === 'svg') {
                    const { svg } = await modeler.saveSVG();
                    const blob = new Blob([svg], { type: 'image/svg+xml;charset=UTF-8' });
                    downloadDataUrl(URL.createObjectURL(blob), filename + '.svg');
                } else if (format === 'png') {
                    const { svg } = await modeler.saveSVG();
                    // Estimate bounds
                    const match = svg.match(/viewBox="([^"]+)"/);
                    let width = 1200, height = 800;
                    if (match) {
                        const parts = match[1].split(' ');
                        width = parseFloat(parts[2]);
                        height = parseFloat(parts[3]);
                    }
                    const pngDataUrl = await getSvgToPngDataUrl(svg, width, height);
                    downloadDataUrl(pngDataUrl, filename + '.png');
                } else if (format === 'pdf') {
                    const { svg } = await modeler.saveSVG();
                    const match = svg.match(/viewBox="([^"]+)"/);
                    let width = 1200, height = 800;
                    if (match) {
                        const parts = match[1].split(' ');
                        width = parseFloat(parts[2]);
                        height = parseFloat(parts[3]);
                    }
                    const pngDataUrl = await getSvgToPngDataUrl(svg, width, height);
                    
                    if (typeof window.jspdf !== 'undefined') {
                        const { jsPDF } = window.jspdf;
                        const orientation = width > height ? 'landscape' : 'portrait';
                        // Convert px to points (approximate) or just use custom px unit
                        const doc = new jsPDF({
                            orientation: orientation,
                            unit: 'px',
                            format: [width, height]
                        });
                        doc.addImage(pngDataUrl, 'PNG', 0, 0, width, height);
                        doc.save(filename + '.pdf');
                    } else {
                        alert('PDFライブラリが読み込めませんでした。ページをリロードしてください。');
                    }
                }
                exportModal.classList.remove('open');
            } catch (err) {
                console.error('Export error', err);
                alert('エクスポート中にエラーが発生しました。');
            }
        });

        btnExportToCloud.addEventListener('click', async () => {
            const format = document.querySelector('input[name="exportFormat"]:checked').value;
            const originalHTML = btnExportToCloud.innerHTML;
            let filename = exportFileName.value || 'Diagram';
            
            try {
                if (typeof google === 'undefined' || !google.script) {
                    alert('GAS環境が検出されませんでした。');
                    return;
                }
                
                btnExportToCloud.innerHTML = '保存中...';
                btnExportToCloud.disabled = true;
                
                const handleSuccess = (msg) => {
                    clearDraft();
                    alert('Googleドライブに正常に保存されました！\n' + msg);
                    btnExportToCloud.innerHTML = originalHTML;
                    btnExportToCloud.disabled = false;
                    exportModal.classList.remove('open');
                };
                
                const handleFailure = (err) => {
                    alert('エラー: ' + err.message);
                    btnExportToCloud.innerHTML = originalHTML;
                    btnExportToCloud.disabled = false;
                };

                if (format === 'bpmn') {
                    if (!filename.endsWith('.bpmn')) filename += '.bpmn';
                    const { xml } = await modeler.saveXML({ format: true });
                    google.script.run.withSuccessHandler(handleSuccess).withFailureHandler(handleFailure)
                        .saveDiagramToDrive(xml, filename);
                } else if (format === 'svg') {
                    if (!filename.endsWith('.svg')) filename += '.svg';
                    const { svg } = await modeler.saveSVG();
                    google.script.run.withSuccessHandler(handleSuccess).withFailureHandler(handleFailure)
                        .saveExportToDrive(svg, filename, 'image/svg+xml');
                } else if (format === 'png') {
                    if (!filename.endsWith('.png')) filename += '.png';
                    const { svg } = await modeler.saveSVG();
                    const match = svg.match(/viewBox="([^"]+)"/);
                    let width = 1200, height = 800;
                    if (match) {
                        const parts = match[1].split(' ');
                        width = parseFloat(parts[2]);
                        height = parseFloat(parts[3]);
                    }
                    const pngDataUrl = await getSvgToPngDataUrl(svg, width, height);
                    const base64Data = pngDataUrl.split(',')[1];
                    google.script.run.withSuccessHandler(handleSuccess).withFailureHandler(handleFailure)
                        .saveExportToDrive(base64Data, filename, 'image/png');
                } else if (format === 'pdf') {
                    if (!filename.endsWith('.pdf')) filename += '.pdf';
                    const { svg } = await modeler.saveSVG();
                    const match = svg.match(/viewBox="([^"]+)"/);
                    let width = 1200, height = 800;
                    if (match) {
                        const parts = match[1].split(' ');
                        width = parseFloat(parts[2]);
                        height = parseFloat(parts[3]);
                    }
                    const pngDataUrl = await getSvgToPngDataUrl(svg, width, height);
                    
                    if (typeof window.jspdf !== 'undefined') {
                        const { jsPDF } = window.jspdf;
                        const orientation = width > height ? 'landscape' : 'portrait';
                        const doc = new jsPDF({ orientation: orientation, unit: 'px', format: [width, height] });
                        doc.addImage(pngDataUrl, 'PNG', 0, 0, width, height);
                        const pdfDataUrl = doc.output('datauristring');
                        const base64Data = pdfDataUrl.split(',')[1];
                        google.script.run.withSuccessHandler(handleSuccess).withFailureHandler(handleFailure)
                            .saveExportToDrive(base64Data, filename, 'application/pdf');
                    } else {
                        alert('PDFライブラリが読み込めませんでした。');
                        btnExportToCloud.innerHTML = originalHTML;
                        btnExportToCloud.disabled = false;
                    }
                }
            } catch (err) { 
                console.error('Error saving export', err); 
                alert('エラーが発生しました。');
                btnExportToCloud.innerHTML = originalHTML;
                btnExportToCloud.disabled = false;
            }
        });

        // --- GOOGLE DRIVE FILE BROWSER MODAL LOGIC ---
        const modal = document.getElementById('fileModal');
        const fileListContainer = document.getElementById('fileList');

        document.getElementById('btnOpen').addEventListener('click', () => {
            modal.classList.add('open');
            fetchAndRenderFiles();
        });

        document.getElementById('closeModal').addEventListener('click', () => {
            modal.classList.remove('open');
        });

        function fetchAndRenderFiles() {
            fileListContainer.innerHTML = '<div class="loading-state">Googleドライブからファイルを読み込み中...</div>';
            if (typeof google !== 'undefined' && google.script) {
                google.script.run
                    .withSuccessHandler(renderFileList)
                    .withFailureHandler(err => {
                        fileListContainer.innerHTML = `<div class="loading-state" style="color: red;">エラー: ${err.message}</div>`;
                    })
                    .getDiagramFiles();
            } else {
                // Mock for local testing
                setTimeout(() => {
                    renderFileList([
                        { id: '1', name: 'HR_Onboarding_Process.bpmn', date: new Date().toISOString() },
                        { id: '2', name: 'Purchase_Approval.bpmn', date: new Date().toISOString() }
                    ]);
                }, 1000);
            }
        }

        document.getElementById('closeModal').addEventListener('click', () => {
            modal.classList.remove('open');
        });

        function fetchAndRenderFiles() {
            fileListContainer.innerHTML = '<div class="loading-state">Googleドライブからファイルを読み込み中...</div>';
            if (typeof google !== 'undefined' && google.script) {
                google.script.run
                    .withSuccessHandler(renderFileList)
                    .withFailureHandler(err => {
                        fileListContainer.innerHTML = `<div class="loading-state" style="color: red;">エラー: ${err.message}</div>`;
                    })
                    .getDiagramFiles();
            }
        }

        function renderFileList(files) {
            if (!files || files.length === 0) {
                fileListContainer.innerHTML = '<div class="loading-state">「BPMN Diagrams」フォルダにダイアグラムが見つかりませんでした。</div>';
                return;
            }

            fileListContainer.innerHTML = '';
            files.forEach(file => {
                const li = document.createElement('li');
                li.className = 'file-item';
                
                const dateStr = new Date(file.date).toLocaleDateString('ja-JP');
                
                li.innerHTML = `
                    <div class="file-name" style="flex: 1;" onclick="loadFile('${file.id}', '${file.name.replace(/'/g, "\\'")}')">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                        ${file.name}
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div class="file-date">${dateStr}</div>
                        <button class="btn-action" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; padding:4px;" title="名前を変更" onclick="renameFile(event, '${file.id}', '${file.name.replace(/'/g, "\\'")}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button class="btn-action" style="background:none; border:none; color:var(--text-secondary); cursor:pointer; padding:4px;" title="複製" onclick="duplicateFile(event, '${file.id}')">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        </button>
                    </div>
                `;
                fileListContainer.appendChild(li);
            });
        }

        window.loadFile = function(fileId, fileName) {
            fileListContainer.innerHTML = '<div class="loading-state">ダイアグラムデータを読み込み中...</div>';
            
            if (typeof google !== 'undefined' && google.script) {
                google.script.run
                    .withSuccessHandler(async (xml) => {
                        try {
                            await modeler.importXML(xml);
                            modeler.get('canvas').zoom('fit-viewport');
                            modal.classList.remove('open');
                            if (fileName) currentLoadedFileName = fileName.replace(/\.bpmn$/, '');
                        } catch (err) {
                            alert("ダイアグラムの解析エラー: " + err.message);
                        }
                    })
                    .withFailureHandler(err => alert("ファイルの読み込みに失敗しました: " + err.message))
                    .loadDiagramFromDrive(fileId);
            } else {
                // Mock local testing
                alert("ローカルテスト用モックをロードしました。 ID: " + fileId);
                modal.classList.remove('open');
            }
        };

        window.renameFile = function(e, fileId, oldName) {
            e.stopPropagation();
            const newName = prompt('新しいファイル名を入力してください:', oldName);
            if (!newName || newName === oldName) return;
            
            if (typeof google !== 'undefined' && google.script) {
                fileListContainer.innerHTML = '<div class="loading-state">名前を変更中...</div>';
                google.script.run
                    .withSuccessHandler(() => fetchAndRenderFiles())
                    .withFailureHandler(err => { alert("変更に失敗しました: " + err.message); fetchAndRenderFiles(); })
                    .renameDiagram(fileId, newName);
            }
        };

        window.duplicateFile = function(e, fileId) {
            e.stopPropagation();
            if (typeof google !== 'undefined' && google.script) {
                fileListContainer.innerHTML = '<div class="loading-state">ファイルを複製中...</div>';
                google.script.run
                    .withSuccessHandler(() => fetchAndRenderFiles())
                    .withFailureHandler(err => { alert("複製に失敗しました: " + err.message); fetchAndRenderFiles(); })
                    .duplicateDiagram(fileId);
            }
        };

        // --- LOCAL FILE OPEN LOGIC ---
        document.getElementById('localFileInput').addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async function(event) {
                try {
                    await modeler.importXML(event.target.result);
                    modeler.get('canvas').zoom('fit-viewport');
                    document.getElementById('openModal').classList.remove('open');
                    
                    // Reset input so the same file can be loaded again if needed
                    document.getElementById('localFileInput').value = '';
                } catch (err) {
                    alert("ローカルファイルの読み込みエラー: " + err.message);
                }
            };
            reader.readAsText(file);
        });
        // Open Dashboard automatically on load
        setTimeout(() => {
            document.getElementById('btnOpen').click();
        }, 500);
        // --- QUICK SAVE LOGIC ---
        let currentLoadedFileName = 'diagram';
        
        document.getElementById('btnNew').addEventListener('click', () => {
            if (confirm('現在のダイアグラムは失われます。新しく作成してもよろしいですか？')) {
                modeler.createDiagram();
                currentLoadedFileName = 'diagram';
            }
        });

        document.getElementById('btnQuickSave').addEventListener('click', async () => {
            let filename = prompt('保存するファイル名を入力してください:', currentLoadedFileName);
            if (!filename) return;
            
            currentLoadedFileName = filename.replace(/\.bpmn$/, '');
            const btnQuickSave = document.getElementById('btnQuickSave');
            const originalHTML = btnQuickSave.innerHTML;
            
            try {
                const { xml } = await modeler.saveXML({ format: true });
                if (typeof google !== 'undefined' && google.script) {
                    btnQuickSave.innerHTML = '保存中...';
                    btnQuickSave.disabled = true;
                    google.script.run
                        .withSuccessHandler((res) => {
                            btnQuickSave.innerHTML = '✓ 保存完了';
                            setTimeout(() => {
                                btnQuickSave.innerHTML = originalHTML;
                                btnQuickSave.disabled = false;
                            }, 2000);
                            clearDraft();
                        })
                        .withFailureHandler((err) => {
                            alert('保存に失敗しました: ' + err.message);
                            btnQuickSave.innerHTML = originalHTML;
                            btnQuickSave.disabled = false;
                        })
                        .saveDiagramToDrive(xml, currentLoadedFileName);
                } else {
                    alert('ローカル環境では保存できません。エクスポートを使用してください。');
                }
            } catch (err) {
                alert('保存エラー: ' + err.message);
            }
        });

        // --- EXPORT MODAL ACTIONS ---
        const manualModalOverlay = document.getElementById('manualModal');
        document.getElementById('btnOpenManualModal').addEventListener('click', () => {
            manualModalOverlay.classList.add('open');
        });
        document.getElementById('closeManualModal').addEventListener('click', () => {
            manualModalOverlay.classList.remove('open');
        });

        // --- GLOBAL EVENT FIXES ---
        // Bulletproof scroll fix: capture mouse wheel events at the window level.
        // If the mouse is over the left palette, immediately stop the event from 
        // reaching diagram-js (which would otherwise steal it to zoom the canvas).
        const stopScrollStealing = function(e) {
            if (e.target.closest('.djs-palette')) {
                e.stopPropagation();
            }
        };
        window.addEventListener('wheel', stopScrollStealing, { capture: true, passive: true });
        window.addEventListener('mousewheel', stopScrollStealing, { capture: true, passive: true });
        window.addEventListener('DOMMouseScroll', stopScrollStealing, { capture: true, passive: true });

        // --- ULTRA-RAPID INPUT UX (MAGIC BOX) ---
        const rapidInput = document.getElementById('rapidInputText');
        
        rapidInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const text = rapidInput.value.trim();
                if (!text) return;

                const elementFactory = modeler.get('elementFactory');
                const modeling = modeler.get('modeling');
                const selection = modeler.get('selection');
                const autoPlace = modeler.get('autoPlace');
                const canvas = modeler.get('canvas');
                const elementRegistry = modeler.get('elementRegistry');

                // Create a new Shape with the selected type and entered text
                const selectedType = document.getElementById('rapidInputType').value;
                let newTask;
                if (selectedType === 'bpmn:Participant') {
                    // Participants must use the special factory method to set up inner processes
                    newTask = elementFactory.createParticipantShape();
                    if (text) newTask.businessObject.name = text;
                } else {
                    newTask = elementFactory.createShape({ type: selectedType });
                    newTask.businessObject.name = text;
                }

                const selectedElements = selection.get();
                
                // Participants cannot be auto-placed or connected to tasks. They must be dropped at the root.
                if (selectedType === 'bpmn:Participant') {
                    const viewbox = canvas.viewbox();
                    
                    // Find lowest Y to prevent overlapping pools
                    const elementRegistry = modeler.get('elementRegistry');
                    const participants = elementRegistry.filter(e => e.type === 'bpmn:Participant');
                    let targetY = viewbox.y + viewbox.height / 2;
                    if (participants.length > 0) {
                        let maxY = 0;
                        participants.forEach(p => {
                            const bottom = p.y + p.height;
                            if (bottom > maxY) maxY = bottom;
                        });
                        targetY = maxY + 50; // Place safely below the lowest participant
                    }
                    
                    const center = { 
                        x: viewbox.x + viewbox.width / 2, 
                        y: targetY 
                    };
                    try {
                        modeling.createShape(newTask, center, canvas.getRootElement());
                        selection.select(newTask);
                    } catch(err) {
                        console.error('Error placing participant', err);
                    }
                    rapidInput.value = '';
                    return;
                }

                if (selectedElements.length === 1 && selectedElements[0].type !== 'bpmn:Process' && selectedElements[0].type !== 'bpmn:Collaboration') {
                    // Auto-place and auto-connect to the currently selected shape!
                    try {
                        const newElement = autoPlace.append(selectedElements[0], newTask);
                        selection.select(newElement); // Select the new one to chain them!
                    } catch (err) {
                        // Fallback if autoPlace fails for some reason
                        modeling.createShape(newTask, { x: selectedElements[0].x + 150, y: selectedElements[0].y }, selectedElements[0].parent);
                        selection.select(newTask);
                    }
                } else {
                    // Find correct target parent (Process or Pool/Participant)
                    let targetParent = canvas.getRootElement();
                    if (targetParent.type === 'bpmn:Collaboration') {
                        const participants = elementRegistry.filter(e => e.type === 'bpmn:Participant');
                        if (participants.length > 0) {
                            targetParent = participants[0]; // Drop into the first Pool
                        }
                    }

                    // No valid shape selection, place it at the center of the viewport
                    const viewbox = canvas.viewbox();
                    const center = { 
                        x: viewbox.x + viewbox.width / 2, 
                        y: viewbox.y + viewbox.height / 2 
                    };
                    modeling.createShape(newTask, center, targetParent);
                    selection.select(newTask);
                }

                // Clear the input box so they can type the next step immediately
                rapidInput.value = '';
            }
        });

        // --- MOUSE WHEEL SHAPE MORPHING ---
        let hoveredElement = null;
        
        modeler.on('element.hover', (e) => {
            // Only morph standard shapes, not lines or the background
            if (e.element.type !== 'bpmn:Process' && e.element.type !== 'bpmn:SequenceFlow' && e.element.type !== 'bpmn:Collaboration' && e.element.type !== 'bpmn:Participant' && e.element.type !== 'bpmn:Lane') {
                hoveredElement = e.element;
            }
        });
        
        modeler.on('element.out', (e) => {
            if (hoveredElement === e.element) hoveredElement = null;
        });

        // Intercept wheel events on the canvas
        document.getElementById('canvas').addEventListener('wheel', (e) => {
            if (hoveredElement) {
                // Prevent zooming/panning
                e.preventDefault();
                e.stopPropagation();
                
                const bpmnReplace = modeler.get('bpmnReplace');
                const selection = modeler.get('selection');
                
                // The morph cycle
                const types = ['bpmn:Task', 'bpmn:ExclusiveGateway', 'bpmn:StartEvent', 'bpmn:EndEvent'];
                
                // Find current type (fallback to Task if it's something weird)
                let idx = types.indexOf(hoveredElement.type);
                if (idx === -1) idx = 0;
                
                // Determine scroll direction
                idx += (e.deltaY > 0 ? 1 : -1);
                
                // Wrap around
                if (idx < 0) idx = types.length - 1;
                if (idx >= types.length) idx = 0;
                
                const newType = types[idx];
                
                try {
                    // Replace element! bpmnReplace automatically preserves text/name and connections!
                    const newElement = bpmnReplace.replaceElement(hoveredElement, { type: newType });
                    hoveredElement = newElement; // Update hover to the new element
                    selection.select(newElement); // Keep it selected
                } catch(err) {
                    console.error("Morph error", err);
                }
            }
        }, { capture: true, passive: false });

        // Boot up
        initDiagram();
