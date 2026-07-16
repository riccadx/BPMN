// gdrive.js
// Replaces Google Apps Script backend with direct Google Drive REST API via OAuth 2.0
const CLIENT_ID = '1007165570185-96pueupa3c2blk975jq23vqm9d8k9164.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/drive.file';
let tokenClient;
let accessToken = null;

function initGSI() {
    tokenClient = google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (response) => {
            if (response.error !== undefined) {
                console.error("Auth error", response);
                if (window.pendingDriveAction) {
                    window.pendingDriveAction.reject(new Error(response.error));
                    window.pendingDriveAction = null;
                }
                return;
            }
            accessToken = response.access_token;
            if (window.pendingDriveAction) {
                window.pendingDriveAction.resolve();
                window.pendingDriveAction = null;
            }
        },
    });
}

function requireAuth(actionFunction) {
    if (accessToken) {
        actionFunction();
    } else {
        // Wait for token
        new Promise((resolve, reject) => {
            window.pendingDriveAction = { resolve, reject };
            tokenClient.requestAccessToken({ prompt: '' });
        }).then(() => {
            actionFunction();
        }).catch((err) => {
            console.error("Failed to authenticate", err);
        });
    }
}

async function fetchDriveApi(url, options = {}) {
    if (!options.headers) options.headers = {};
    options.headers['Authorization'] = `Bearer ${accessToken}`;
    
    const res = await fetch(url, options);
    if (res.status === 401) {
        accessToken = null;
        throw new Error('AUTH_REQUIRED');
    }
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error?.message || 'Drive API Error');
    }
    return res;
}

async function getFolderId() {
    return '1aPbY4KRwfKn-R0_R64yN1VcCe0I12JPR';
}

class GDriveRunner {
    constructor() {
        this.onSuccess = null;
        this.onFailure = null;
    }
    
    withSuccessHandler(cb) {
        this.onSuccess = cb;
        return this;
    }
    
    withFailureHandler(cb) {
        this.onFailure = cb;
        return this;
    }
    
    _handleError(err, retryAction) {
        if (err.message === 'AUTH_REQUIRED') {
            requireAuth(retryAction);
        } else if (this.onFailure) {
            this.onFailure(err);
        } else {
            console.error(err);
        }
    }

    getDiagramFiles() {
        const action = async () => {
            try {
                const folderId = await getFolderId();
                const res = await fetchDriveApi(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents+and+trashed=false&fields=files(id,name,createdTime,modifiedTime)&orderBy=modifiedTime desc`);
                const data = await res.json();
                const files = data.files.map(f => ({
                    id: f.id,
                    name: f.name,
                    date: f.modifiedTime || f.createdTime
                }));
                if (this.onSuccess) this.onSuccess(files);
            } catch (err) {
                this._handleError(err, action);
            }
        };
        requireAuth(action);
    }
    
    loadDiagramFromDrive(fileId) {
        const action = async () => {
            try {
                const res = await fetchDriveApi(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`);
                const text = await res.text();
                if (this.onSuccess) this.onSuccess(text);
            } catch (err) {
                this._handleError(err, action);
            }
        };
        requireAuth(action);
    }
    
    saveDiagramToDrive(xmlContent, fileName) {
        this.saveExportToDrive(xmlContent, fileName, 'text/xml');
    }
    
    saveExportToDrive(content, fileName, mimeType) {
        const action = async () => {
            try {
                const folderId = await getFolderId();
                
                // 1. Create file metadata
                const metaRes = await fetchDriveApi('https://www.googleapis.com/drive/v3/files', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: fileName,
                        parents: [folderId],
                        mimeType: mimeType !== 'text/xml' ? mimeType : undefined
                    })
                });
                const meta = await metaRes.json();
                
                // 2. Upload content
                let fileBlob;
                const isBase64 = mimeType.startsWith('image/png') || mimeType.startsWith('application/pdf');
                if (isBase64) {
                    const byteCharacters = atob(content);
                    const byteArrays = [];
                    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
                        const slice = byteCharacters.slice(offset, offset + 512);
                        const byteNumbers = new Array(slice.length);
                        for (let i = 0; i < slice.length; i++) {
                            byteNumbers[i] = slice.charCodeAt(i);
                        }
                        const byteArray = new Uint8Array(byteNumbers);
                        byteArrays.push(byteArray);
                    }
                    fileBlob = new Blob(byteArrays, {type: mimeType});
                } else {
                    fileBlob = new Blob([content], {type: mimeType});
                }
                
                await fetchDriveApi(`https://www.googleapis.com/upload/drive/v3/files/${meta.id}?uploadType=media`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': mimeType },
                    body: fileBlob
                });
                
                if (this.onSuccess) this.onSuccess("File saved: " + fileName);
            } catch (err) {
                this._handleError(err, action);
            }
        };
        requireAuth(action);
    }
    
    renameDiagram(fileId, newName) {
        const action = async () => {
            try {
                await fetchDriveApi(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: newName })
                });
                if (this.onSuccess) this.onSuccess();
            } catch (err) {
                this._handleError(err, action);
            }
        };
        requireAuth(action);
    }
    
    duplicateDiagram(fileId) {
        const action = async () => {
            try {
                const getRes = await fetchDriveApi(`https://www.googleapis.com/drive/v3/files/${fileId}?fields=name`);
                const fileData = await getRes.json();
                
                await fetchDriveApi(`https://www.googleapis.com/drive/v3/files/${fileId}/copy`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: fileData.name + " (Copy)" })
                });
                if (this.onSuccess) this.onSuccess();
            } catch (err) {
                this._handleError(err, action);
            }
        };
        requireAuth(action);
    }
}

// Proxy to create a new GDriveRunner instance on every call
window.google = window.google || {};
Object.defineProperty(window.google, 'script', {
    get: function() {
        return {
            get run() {
                return new GDriveRunner();
            }
        };
    }
});

// Load GSI script
const script = document.createElement('script');
script.src = 'https://accounts.google.com/gsi/client';
script.async = true;
script.defer = true;
script.onload = initGSI;
document.head.appendChild(script);
