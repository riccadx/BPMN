<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lab305</title>
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Noto+Sans+JP:wght@400;500;600&display=swap" rel="stylesheet">
    
    <!-- bpmn-js Core Styles -->
    <link rel="stylesheet" href="https://unpkg.com/bpmn-js@17.0.2/dist/assets/diagram-js.css" />
    <link rel="stylesheet" href="https://unpkg.com/bpmn-js@17.0.2/dist/assets/bpmn-font/css/bpmn.css" />
    
    <style>
        /* ALL CSS STYLES */
        :root {
            --primary-color: #6c5ce7;
            --primary-hover: #5b4bc4;
            --bg-color: #f8f9fc;
            --panel-bg: #ffffff;
            --text-primary: #2d3436;
            --text-secondary: #636e72;
            --border-color: #e2e8f0;
            
            --color-pink: #ff7675;
            --color-blue: #74b9ff;
            --color-green: #55efc4;
            --color-purple: #a29bfe;
            --color-yellow: #ffeaa7;
        }

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', 'Noto Sans JP', sans-serif; background-color: var(--bg-color); color: var(--text-primary); height: 100vh; overflow: hidden; }
        #app { display: flex; flex-direction: column; height: 100vh; }
        
        /* Header */
        .header { height: 60px; background-color: var(--panel-bg); border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; padding: 0 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); z-index: 10; }
        .logo { display: flex; align-items: center; gap: 12px; font-weight: 600; font-size: 1.1rem; color: var(--primary-color); }
        .actions { display: flex; gap: 12px; align-items: center; }
        .btn { display: flex; align-items: center; justify-content: center; gap: 8px; padding: 8px 16px; border-radius: 6px; font-weight: 500; font-size: 0.9rem; cursor: pointer; transition: all 0.2s; border: none; font-family: inherit; text-decoration: none; }
        .btn-primary { background-color: var(--primary-color); color: white; }
        .btn-primary:hover { background-color: var(--primary-hover); box-shadow: 0 4px 6px rgba(108, 92, 231, 0.2); }
        .btn-secondary { background-color: var(--panel-bg); border: 1px solid var(--border-color); color: var(--text-primary); }
        .btn-secondary:hover { background-color: var(--bg-color); }
        
        /* Modal Radio Group */
        .radio-item {
            padding: 12px;
            border: 1px solid var(--border-color);
            border-radius: 6px;
            transition: all 0.2s;
        }
        .radio-item:hover { background: #f8fafc; }
        .radio-item input[type="radio"] { width: 16px; height: 16px; accent-color: var(--primary-color); }

        /* Canvas Area */
        .main-content { flex: 1; display: flex; position: relative; overflow: hidden; }
        .canvas-container { flex: 1; width: 100%; height: 100%; background-color: #fafafa; background-image: radial-gradient(circle at 1px 1px, #e0e0e0 1px, transparent 0); background-size: 20px 20px; }
        
        /* Overriding bpmn-js defaults */
        .bjs-container { background: transparent !important; }
        
        /* Enhanced Left Palette (Beautiful Sidebar Style) */
        .djs-palette { 
            display: none !important;
        }

        /* Floating Context Toolbar */
        .floating-toolbar {
            background: #ffffff;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            box-shadow: 0 4px 16px rgba(0,0,0,0.12);
            padding: 6px 8px;
            display: flex;
            align-items: center;
            gap: 6px;
            animation: popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform: translateY(-8px);
        }

        @keyframes popIn {
            from { opacity: 0; transform: translateY(0) scale(0.9); }
            to { opacity: 1; transform: translateY(-8px) scale(1); }
        }

        .ft-color { width: 20px; height: 20px; border-radius: 50%; cursor: pointer; border: 2px solid transparent; transition: transform 0.2s; }
        .ft-color:hover { transform: scale(1.2); }
        .ft-divider { width: 1px; height: 20px; background: var(--border-color); margin: 0 4px; }
        .ft-action { background: transparent; border: none; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 4px; transition: background 0.2s; }
        .ft-action:hover { background: var(--bg-color); }

        /* Properties Panel */
        .properties-panel {
            position: absolute;
            right: -320px; /* Hidden by default */
            top: 20px;
            width: 300px;
            background: var(--panel-bg);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.08);
            padding: 20px;
            transition: right 0.3s cubic-bezier(0.175, 0.885, 0.32, 1);
            max-height: calc(100vh - 100px);
            overflow-y: auto;
            z-index: 50;
        }
        .properties-panel.open {
            right: 20px;
        }
        .properties-panel h3 {
            font-size: 1.1rem;
            margin-bottom: 16px;
            color: var(--primary-color);
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 8px;
        }
        .prop-group { margin-bottom: 16px; }
        .prop-group label { display: block; font-size: 0.85rem; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px; }
        .prop-group input, .prop-group textarea {
            width: 100%; padding: 8px 12px; border: 1px solid var(--border-color); border-radius: 6px; font-family: inherit; font-size: 0.9rem; color: var(--text-primary); transition: border-color 0.2s; resize: vertical;
        }
        .prop-group input:focus, .prop-group textarea:focus { outline: none; border-color: var(--primary-color); box-shadow: 0 0 0 2px rgba(108, 92, 231, 0.1); }
        #emptySelectionMsg { font-size: 0.9rem; color: var(--text-secondary); text-align: center; margin-top: 40px; }

        /* Modal Overlay for File Browser */
        .modal-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.4); backdrop-filter: blur(2px); display: flex; align-items: center; justify-content: center; z-index: 1000; opacity: 0; pointer-events: none; transition: opacity 0.2s;
        }
        .modal-overlay.open { opacity: 1; pointer-events: auto; }
        .modal-content {
            background: #ffffff; width: 450px; max-width: 90%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); display: flex; flex-direction: column; overflow: hidden; transform: translateY(20px); transition: transform 0.3s;
        }
        .modal-overlay.open .modal-content { transform: translateY(0); }
        .modal-header { padding: 16px 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; background: #f8fafc; }
        .modal-header h3 { font-size: 1.1rem; color: var(--text-primary); }
        .btn-close { background: transparent; border: none; font-size: 1.5rem; color: var(--text-secondary); cursor: pointer; line-height: 1; }
        .btn-close:hover { color: var(--text-primary); }
        .modal-body { padding: 0; max-height: 400px; overflow-y: auto; }
        
        .file-list { list-style: none; margin: 0; padding: 0; }
        .file-item { padding: 12px 20px; border-bottom: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: background 0.2s; }
        .file-item:last-child { border-bottom: none; }
        .file-item:hover { background: #f1f5f9; }
        .file-name { font-weight: 500; color: var(--primary-color); display: flex; align-items: center; gap: 8px; }
        .file-date { font-size: 0.8rem; color: var(--text-secondary); }
        .loading-state { padding: 40px; text-align: center; color: var(--text-secondary); font-size: 0.95rem; }

        /* Connection Points */
        .connect-point {
            width: 14px;
            height: 14px;
            background: #ffffff;
            border: 2.5px solid var(--primary-color);
            border-radius: 50%;
            cursor: crosshair;
            pointer-events: all;
            box-shadow: 0 1px 3px rgba(0,0,0,0.15);
            transition: background-color 0.2s, transform 0.2s;
            z-index: 100;
        }
        .connect-point:hover {
            background: var(--primary-color);
            transform: scale(1.2);
        }

        /* Auto-save Status */
        .autosave-status {
            font-size: 0.85rem;
            color: var(--text-secondary);
            margin-right: 12px;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        /* Manual Term Highlights & Tooltips */
        .term-highlight {
            position: relative;
            background-color: transparent;
            color: var(--text-primary);
            font-weight: 600;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 6px;
        }
        
        .term-highlight::before {
            content: "●";
            color: var(--th-color, #55efc4);
            font-size: 1.1em;
        }
        
        .term-tooltip {
            position: absolute;
            bottom: 100%;
            left: 0;
            transform: translateY(10px);
            background: #1e293b;
            color: white;
            padding: 10px 14px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            opacity: 0;
            visibility: hidden;
            transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            z-index: 1000;
            width: max-content;
            pointer-events: none;
            text-align: left;
            font-weight: normal;
        }
        
        .term-highlight:hover .term-tooltip {
            opacity: 1;
            visibility: visible;
            transform: translateY(-8px);
        }

        .term-tooltip::after {
            content: "";
            position: absolute;
            top: 100%;
            left: 20px;
            border-width: 6px;
            border-style: solid;
            border-color: #1e293b transparent transparent transparent;
        }

        .tt-icon {
            width: 36px;
            height: 36px;
            background: #334155;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            color: var(--th-color, #55efc4);
        }

        .tt-content {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }
}
        
        .tt-title {
            font-size: 0.95rem;
            font-weight: 600;
            line-height: 1;
            color: #ffffff;
        }
        
        .tt-sub {
            font-size: 0.75rem;
            color: var(--th-color, #55efc4);
            line-height: 1;
            font-weight: 500;
        }

        /* Rapid Input Box (Magic Box) */
        .rapid-input-container {
            position: absolute;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            padding: 8px 16px;
            width: 500px;
            max-width: 90%;
            z-index: 100;
            border: 1px solid var(--border-color);
            transition: all 0.2s;
        }
        .rapid-input-container:focus-within {
            box-shadow: 0 8px 30px rgba(108, 92, 231, 0.2);
            border-color: var(--primary-color);
        }
        .rapid-input-select {
            border: none;
            outline: none;
            background: transparent;
            font-size: 0.95rem;
            color: var(--text-primary);
            cursor: pointer;
            padding-right: 8px;
            font-family: inherit;
        }
        .rapid-input-divider {
            width: 1px;
            height: 20px;
            background: var(--border-color);
            margin: 0 12px;
        }
        .rapid-input-container input {
            flex: 1;
            border: none;
            outline: none;
            padding: 8px;
            font-size: 1rem;
            color: var(--text-primary);
            font-family: inherit;
        }
        .rapid-input-container .hint {
            font-size: 0.75rem;
            color: var(--text-secondary);
            background: #f1f5f9;
            padding: 4px 8px;
            border-radius: 4px;
            font-weight: 600;
            user-select: none;
        }

        /* Hide native delete since we have our custom toolbar */
        .djs-context-pad .entry[data-action="delete"] {
            display: none !important;
        }

    </style>
</head>
<body>
    <div id="app">
        <header class="header">
            <div class="logo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                <span>Lab305</span>
            </div>
            
            <div class="actions">
                <div id="autosaveStatus" class="autosave-status"></div>
                <button id="btnOpenManualModal" class="btn btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    ヘルプ
                </button>
                <button id="btnNew" class="btn btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                    新規作成 (New)
                </button>
                <button id="btnOpen" class="btn btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                    開く (Open)
                </button>
                <button id="btnQuickSave" class="btn btn-secondary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                    保存 (Save)
                </button>
            </div>
        </header>
        
        <div class="main-content">
            <div class="canvas-container" id="canvas"></div>
            
            <div class="rapid-input-container">
                <select id="rapidInputType" class="rapid-input-select">
                    <option value="bpmn:Task">🟩 タスク</option>
                    <option value="bpmn:ExclusiveGateway">🔶 ゲートウェイ</option>
                    <option value="bpmn:StartEvent">🟢 開始</option>
                    <option value="bpmn:EndEvent">🔴 終了</option>
                    <option value="bpmn:Participant">🏊 レーン</option>
                </select>
                <div class="rapid-input-divider"></div>
                <input type="text" id="rapidInputText" placeholder="新しいステップを入力してEnter...">
                <div class="hint">⏎ 押して追加</div>
            </div>
            
            <!-- Properties Panel -->
            <div id="propertiesPanel" class="properties-panel">
                <h3>要素のプロパティ</h3>
                <div id="propForm" style="display: none;">
                    <div class="prop-group">
                        <label>要素タイプ</label>
                        <input type="text" id="propType" readonly style="background: #f1f5f9; cursor: not-allowed;">
                    </div>
                    <div class="prop-group">
                        <label>名前 / ラベル</label>
                        <textarea id="propName" rows="2" placeholder="例: プロセス申請"></textarea>
                    </div>
                    <div class="prop-group">
                        <label>フォントサイズ</label>
                        <div style="display: flex; gap: 8px; align-items: center;">
                            <input type="range" id="propFontSizeSlider" min="10" max="36" value="14" style="flex: 1;">
                            <span id="propFontSizeVal" style="font-weight: 600; width: 36px; text-align: right;">14px</span>
                        </div>
                    </div>
                    <div class="prop-group" id="propTextPositionGroup" style="display: none;">
                        <label>テキストの配置</label>
                        <select id="propTextPosition" class="rapid-input-select" style="width: 100%; border: 1px solid var(--border-color); margin-top: 4px;">
                            <option value="bottom">下 (外部)</option>
                            <option value="inside">中央 (内部)</option>
                            <option value="top" id="optTop">上 (上部)</option>
                        </select>
                    </div>
                    <div class="prop-group">
                        <label>説明 / メモ</label>
                        <textarea id="propDesc" rows="4" placeholder="ここに詳細な指示やメモを追加します..."></textarea>
                    </div>
                </div>
                <div id="emptySelectionMsg">
                    キャンバス上の単一の要素を選択して、そのプロパティを編集します。
                </div>
            </div>
        </div>
    </div>

    <!-- Dashboard / File Browser Modal -->
    <div id="fileModal" class="modal-overlay">
        <div class="modal-content" style="width: 550px;">
            <div class="modal-header">
                <h3>BPMN System へようこそ</h3>
                <button id="closeModal" class="btn-close">&times;</button>
            </div>
            <div class="modal-body" style="padding: 24px;">
                <div style="display: flex; gap: 12px; margin-bottom: 24px;">
                    <button class="btn btn-secondary" id="btnOpenExportModal" style="flex: 1; padding: 12px;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px; vertical-align:text-bottom;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        エクスポート
                    </button>
                    <button class="btn btn-secondary" onclick="document.getElementById('localFileInput').click()" style="flex: 1; padding: 12px; border-color: var(--primary-color); color: var(--primary-color);">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px; vertical-align:text-bottom;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                        デバイスから開く
                    </button>
                    <input type="file" id="localFileInput" style="display: none;">
                </div>
                
                <h4 style="font-size: 0.95rem; color: var(--text-secondary); margin-bottom: 12px; font-weight: 600;">保存されたダイアグラム (Googleドライブ)</h4>
                <div class="file-list" id="fileList" style="border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; background: #fafafa;">
                    <div class="loading-state">Googleドライブからファイルを読み込み中...</div>
                </div>
            </div>
        </div>
    </div>

    <!-- Draft Recovery Modal -->
    <div id="draftModal" class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <h3>未保存のドラフトが見つかりました</h3>
            </div>
            <div class="modal-body" style="padding: 24px; text-align: center;">
                <p style="margin-bottom: 20px; color: var(--text-secondary); line-height: 1.5;">前回のセッションから未保存のデータがあります。<br>復元して作業を続けますか？</p>
                <div style="display: flex; gap: 12px; justify-content: center;">
                    <button id="btnDiscardDraft" class="btn btn-secondary">破棄して新規作成</button>
                    <button id="btnRestoreDraft" class="btn btn-primary">ドラフトを復元</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Export & Save Modal -->
    <div id="exportModal" class="modal-overlay" style="z-index: 1100;">
        <div class="modal-content" style="width: 550px;">
            <div class="modal-header">
                <h3>ファイルのエクスポートと保存</h3>
                <button id="closeExportModal" class="btn-close">&times;</button>
            </div>
            <div class="modal-body" style="padding: 24px;">
                <div class="prop-group">
                    <label>ファイル名</label>
                    <input type="text" id="exportFileName" placeholder="Diagram_2026-06-22">
                </div>
                <div class="prop-group">
                    <label>フォーマット</label>
                    <div class="radio-group" style="display: flex; gap: 12px; flex-direction: column;">
                        <label class="radio-item" style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
                            <input type="radio" name="exportFormat" value="bpmn" checked>
                            <div style="flex: 1;">
                                <div style="font-weight: 600;">BPMNドキュメント (.bpmn)</div>
                                <div style="font-size: 0.8rem; color: var(--text-secondary);">標準の編集可能なデータ形式。後で再度編集する場合に使用します。</div>
                            </div>
                        </label>
                        <label class="radio-item" style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
                            <input type="radio" name="exportFormat" value="png">
                            <div style="flex: 1;">
                                <div style="font-weight: 600;">PNG画像 (.png)</div>
                                <div style="font-size: 0.8rem; color: var(--text-secondary);">Word、Excel、PowerPointなどに貼り付け可能な高画質画像。</div>
                            </div>
                        </label>
                        <label class="radio-item" style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
                            <input type="radio" name="exportFormat" value="svg">
                            <div style="flex: 1;">
                                <div style="font-weight: 600;">SVGベクター画像 (.svg)</div>
                                <div style="font-size: 0.8rem; color: var(--text-secondary);">拡大しても劣化しないベクター画像。</div>
                            </div>
                        </label>
                        <label class="radio-item" style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
                            <input type="radio" name="exportFormat" value="pdf">
                            <div style="flex: 1;">
                                <div style="font-weight: 600;">PDFドキュメント (.pdf)</div>
                                <div style="font-size: 0.8rem; color: var(--text-secondary);">印刷や共有に最適な標準ドキュメント。</div>
                            </div>
                        </label>
                    </div>
                </div>
                <div style="display: flex; gap: 12px; justify-content: space-between; margin-top: 32px; border-top: 1px solid var(--border-color); padding-top: 20px;">
                    <button id="btnExportToCloud" class="btn btn-secondary" style="flex: 1; border-color: var(--primary-color); color: var(--primary-color);">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px; vertical-align:text-bottom;"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
                        Googleドライブに保存
                    </button>
                    <button id="btnExportToDevice" class="btn btn-primary" style="flex: 1;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:4px; vertical-align:text-bottom;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        デバイスにダウンロード
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- Manual Modal -->
    <div id="manualModal" class="modal-overlay">
        <div class="modal-content" style="width: 850px; max-width: 95%; height: 85vh; max-height: none;">
            <div class="modal-header">
                <h3>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px; vertical-align:text-bottom;"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    BPMN 初心者ガイド
                </h3>
                <button id="closeManualModal" class="btn-close">&times;</button>
            </div>
            <div class="modal-body" style="padding: 40px; overflow-y: auto; background: var(--bg-color); max-height: none; flex: 1;">
                <h1 style="font-size: 1.8rem; margin-bottom: 10px; color: var(--text-primary);">BPMNとは？</h1>
                <p style="font-size: 1rem; color: var(--text-secondary); margin-bottom: 30px; border-bottom: 1px solid var(--border-color); padding-bottom: 20px;">Business Process Model and Notation（ビジネスプロセスモデリング表記法）</p>

                <div style="margin-bottom: 30px; line-height: 1.6;">
                    <p>BPMNは、業務のプロセス（手順や流れ）を誰でも共通の記号で理解できるようにした世界標準の図解方法です。<br>
                    「誰が」「何を」「いつ」「どのような条件で」行うのかを視覚的に整理するために使われます。プログラミングの知識がなくても、業務の流れを明確に設計できます。</p>
                </div>

                <h2 style="font-size: 1.4rem; color: var(--primary-color); margin-top: 40px; margin-bottom: 20px;">基本要素の使い方</h2>
                
                <div style="border: 1px solid var(--border-color); border-radius: 8px; padding: 20px; margin-bottom: 16px; background: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                    <span style="display: inline-block; background: var(--primary-color); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; margin-bottom: 12px;">枠組み</span>
                    <h3 style="font-size: 1.1rem; margin-bottom: 8px;">プールとレーン (Pool / Lane)</h3>
                    <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">「誰がその作業を行うのか」を表す枠組みです。会社全体やシステム全体を「プール」とし、その中の各部署（営業部、経理部など）や担当者を「レーン」として区切るのが一般的です。</p>
                </div>

                <div style="border: 1px solid var(--border-color); border-radius: 8px; padding: 20px; margin-bottom: 16px; background: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                    <span style="display: inline-block; background: var(--primary-color); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; margin-bottom: 12px;">きっかけ・終了</span>
                    <h3 style="font-size: 1.1rem; margin-bottom: 8px;">イベント (丸い記号)</h3>
                    <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">何かが「起きる」ことを示します。<br>
                    ・<span class="term-highlight" style="--th-color: #55efc4;">開始イベント
                        <span class="term-tooltip">
                            <span class="tt-icon bpmn-icon-start-event-none"></span>
                            <span class="tt-content">
                                <span class="tt-title">開始イベント</span>
                                <span class="tt-sub">イベント</span>
                            </span>
                        </span>
                    </span>: プロセスがスタートするきっかけ（例: 申請書が提出された、メールを受信した）<br>
                    ・<span class="term-highlight" style="--th-color: #55efc4;">中間イベント
                        <span class="term-tooltip">
                            <span class="tt-icon bpmn-icon-intermediate-event-none"></span>
                            <span class="tt-content">
                                <span class="tt-title">中間イベント</span>
                                <span class="tt-sub">イベント</span>
                            </span>
                        </span>
                    </span>: プロセスの途中で発生する事象（例: 承認を待つ、指定の時間になる）<br>
                    ・<span class="term-highlight" style="--th-color: #55efc4;">終了イベント
                        <span class="term-tooltip">
                            <span class="tt-icon bpmn-icon-end-event-none"></span>
                            <span class="tt-content">
                                <span class="tt-title">終了イベント</span>
                                <span class="tt-sub">イベント</span>
                            </span>
                        </span>
                    </span>: プロセスがここで完了することを示します。</p>
                </div>

                <div style="border: 1px solid var(--border-color); border-radius: 8px; padding: 20px; margin-bottom: 16px; background: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                    <span style="display: inline-block; background: var(--primary-color); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; margin-bottom: 12px;">作業・アクション</span>
                    <h3 style="font-size: 1.1rem; margin-bottom: 8px;">タスク (四角い記号)</h3>
                    <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">実行される具体的な「作業」を示します。（例: 書類を審査する、システムにデータを登録するなど）<br>
                    ・<span class="term-highlight" style="--th-color: #74b9ff;">ユーザータスク
                        <span class="term-tooltip">
                            <span class="tt-icon bpmn-icon-user-task"></span>
                            <span class="tt-content">
                                <span class="tt-title">ユーザータスク</span>
                                <span class="tt-sub">タスク</span>
                            </span>
                        </span>
                    </span>: 人間がシステムを操作して行う作業<br>
                    ・<span class="term-highlight" style="--th-color: #74b9ff;">サービスタスク
                        <span class="term-tooltip">
                            <span class="tt-icon bpmn-icon-service-task"></span>
                            <span class="tt-content">
                                <span class="tt-title">サービスタスク</span>
                                <span class="tt-sub">タスク</span>
                            </span>
                        </span>
                    </span>: システムやアプリケーションが自動的にバックグラウンドで実行する作業<br>
                    ・<span class="term-highlight" style="--th-color: #74b9ff;">送受信タスク
                        <span class="term-tooltip">
                            <span class="tt-icon bpmn-icon-send-task"></span>
                            <span class="tt-content">
                                <span class="tt-title">送受信タスク</span>
                                <span class="tt-sub">タスク</span>
                            </span>
                        </span>
                    </span>: 外部システムや別部門とメッセージをやり取りする作業</p>
                </div>

                <div style="border: 1px solid var(--border-color); border-radius: 8px; padding: 20px; margin-bottom: 16px; background: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                    <span style="display: inline-block; background: var(--primary-color); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; margin-bottom: 12px;">条件分岐</span>
                    <h3 style="font-size: 1.1rem; margin-bottom: 8px;">ゲートウェイ (ひし形の記号)</h3>
                    <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">道の「分岐」や「合流」を示します。<br>
                    ・<span class="term-highlight" style="--th-color: #fdcb6e;">排他ゲートウェイ
                        <span class="term-tooltip">
                            <span class="tt-icon bpmn-icon-gateway-none"></span>
                            <span class="tt-content">
                                <span class="tt-title">排他ゲートウェイ</span>
                                <span class="tt-sub">ゲートウェイ</span>
                            </span>
                        </span>
                    </span>: 条件によって進む道が1つだけ変わる場合（例: 承認された場合と、却下された場合）<br>
                    ・<span class="term-highlight" style="--th-color: #fdcb6e;">並列ゲートウェイ
                        <span class="term-tooltip">
                            <span class="tt-icon bpmn-icon-gateway-parallel"></span>
                            <span class="tt-content">
                                <span class="tt-title">並列ゲートウェイ</span>
                                <span class="tt-sub">ゲートウェイ</span>
                            </span>
                        </span>
                    </span>: 複数の作業を同時に並行して進める場合<br>
                    ・<span class="term-highlight" style="--th-color: #fdcb6e;">包括的ゲートウェイ
                        <span class="term-tooltip">
                            <span class="tt-icon bpmn-icon-gateway-or"></span>
                            <span class="tt-content">
                                <span class="tt-title">包括的ゲートウェイ</span>
                                <span class="tt-sub">ゲートウェイ</span>
                            </span>
                        </span>
                    </span>: 条件に合う複数のルートを同時に進む場合</p>
                </div>

                <div style="border: 1px solid var(--border-color); border-radius: 8px; padding: 20px; margin-bottom: 16px; background: #ffffff; box-shadow: 0 2px 8px rgba(0,0,0,0.02);">
                    <span style="display: inline-block; background: var(--primary-color); color: white; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; margin-bottom: 12px;">データ</span>
                    <h3 style="font-size: 1.1rem; margin-bottom: 8px;">データオブジェクト / データストア</h3>
                    <p style="font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6;">プロセスの途中で使われる書類や情報（データオブジェクト）、およびシステム上のデータベースなどに永続的に保存される場所（データストア）を示します。</p>
                </div>
            </div>
        </div>
    </div>

    <!-- External Libraries -->
    <script src="https://unpkg.com/bpmn-js@17.0.2/dist/bpmn-modeler.development.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    
    <!-- Google Drive OAuth Integration -->
    <script src="gdrive.js"></script>
    
    <script>
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
            
            // Allow cross-pool MessageFlow to EndEvent and from StartEvent (prevents auto-reversal bug)
            if (action === 'connection.create') {
                const source = context.source;
                const target = context.target;
                if (source && target) {
                    const isCrossPool = (el1, el2) => {
                        const getP = (el) => {
                            let c = el;
                            while(c) {
                                if(c.type === 'bpmn:Participant' || c.type === 'bpmn:Process') return c;
                                c = c.parent;
                            }
                            return null;
                        };
                        const p1 = getP(el1), p2 = getP(el2);
                        return p1 && p2 && p1 !== p2;
                    };
                    if (isCrossPool(source, target)) {
                        if (target.type === 'bpmn:EndEvent' || source.type === 'bpmn:StartEvent') {
                            return { type: 'bpmn:MessageFlow' };
                        }
                    }
                }
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
                                const newElement = bpmnReplace.replaceElement(element, { type: newType });
                                
                                // Fix arrows for Start/End events to maintain correct BPMN semantics
                                if (newType === 'bpmn:EndEvent') {
                                    const outgoing = [...newElement.outgoing];
                                    outgoing.forEach(conn => {
                                        const target = conn.target;
                                        modeling.removeConnection(conn);
                                        modeling.createConnection(target, newElement, { type: 'bpmn:SequenceFlow' }, newElement.parent);
                                    });
                                } else if (newType === 'bpmn:StartEvent') {
                                    const incoming = [...newElement.incoming];
                                    incoming.forEach(conn => {
                                        const source = conn.source;
                                        modeling.removeConnection(conn);
                                        modeling.createConnection(newElement, source, { type: 'bpmn:SequenceFlow' }, newElement.parent);
                                    });
                                }

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
                    document.getElementById('fileModal').classList.remove('open');
                    
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

                const isContainer = selectedElements.length === 1 && (selectedElements[0].type === 'bpmn:Lane' || selectedElements[0].type === 'bpmn:Participant');

                if (isContainer) {
                    // ユーザーのフィードバックに対応: 選択されたレーンに直接追加する
                    const container = selectedElements[0];
                    let newX = container.x + 50;
                    let newY = container.y + container.height / 2;
                    
                    if (container.children && container.children.length > 0) {
                        let rightmostX = 0;
                        container.children.forEach(child => {
                            if (child.x + child.width > rightmostX && child.type !== 'bpmn:Lane') {
                                rightmostX = child.x + child.width;
                            }
                        });
                        if (rightmostX > 0) newX = rightmostX + 120;
                    }
                    
                    modeling.createShape(newTask, { x: newX, y: newY }, container);
                    selection.select(newTask);
                } else if (selectedElements.length === 1 && selectedElements[0].type !== 'bpmn:Process' && selectedElements[0].type !== 'bpmn:Collaboration') {
                    // Auto-place and auto-connect to the currently selected shape!
                    try {
                        const newElement = autoPlace.append(selectedElements[0], newTask);
                        
                        // 矢印の向きの修正 (Start/Endイベントに関するフィードバック対応)
                        if (selectedElements[0].type === 'bpmn:EndEvent' || selectedType === 'bpmn:StartEvent') {
                            const incoming = newElement.incoming.find(c => c.source === selectedElements[0]);
                            if (incoming) {
                                modeling.removeConnection(incoming);
                                modeling.createConnection(newElement, selectedElements[0], { type: 'bpmn:SequenceFlow' }, newElement.parent);
                            }
                        }
                        selection.select(newElement); // Select the new one to chain them!
                    } catch (err) {
                        // Fallback if autoPlace fails for some reason
                        modeling.createShape(newTask, { x: selectedElements[0].x + 150, y: selectedElements[0].y }, selectedElements[0].parent);
                        selection.select(newTask);
                    }
                } else {
                    const viewbox = canvas.viewbox();
                    const center = { 
                        x: viewbox.x + viewbox.width / 2, 
                        y: viewbox.y + viewbox.height / 2 
                    };
                    
                    // 中央座標にあるレーンまたはプールを特定して追加する (意図しない自動拡張による重なりを防ぐ)
                    let targetParent = canvas.getRootElement();
                    const elementsAtCenter = elementRegistry.filter(e => {
                        return e.x <= center.x && e.x + e.width >= center.x &&
                               e.y <= center.y && e.y + e.height >= center.y;
                    });
                    
                    const lane = elementsAtCenter.find(e => e.type === 'bpmn:Lane');
                    const participant = elementsAtCenter.find(e => e.type === 'bpmn:Participant');
                    
                    if (lane) targetParent = lane;
                    else if (participant) targetParent = participant;
                    else if (targetParent.type === 'bpmn:Collaboration') {
                        const participants = elementRegistry.filter(e => e.type === 'bpmn:Participant');
                        if (participants.length > 0) targetParent = participants[0];
                    }

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
                    
                    // Fix arrows for Start/End events to maintain correct BPMN semantics
                    const modeling = modeler.get('modeling');
                    if (newType === 'bpmn:EndEvent') {
                        const outgoing = [...newElement.outgoing];
                        outgoing.forEach(conn => {
                            const target = conn.target;
                            modeling.removeConnection(conn);
                            modeling.createConnection(target, newElement, { type: 'bpmn:SequenceFlow' }, newElement.parent);
                        });
                    } else if (newType === 'bpmn:StartEvent') {
                        const incoming = [...newElement.incoming];
                        incoming.forEach(conn => {
                            const source = conn.source;
                            modeling.removeConnection(conn);
                            modeling.createConnection(newElement, source, { type: 'bpmn:SequenceFlow' }, newElement.parent);
                        });
                    }

                    hoveredElement = newElement; // Update hover to the new element
                    selection.select(newElement); // Keep it selected
                } catch(err) {
                    console.error("Morph error", err);
                }
            }
        }, { capture: true, passive: false });

        // Boot up
        initDiagram();
    </script>
</body>
</html>
