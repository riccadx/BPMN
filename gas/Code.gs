/**
 * Google Apps Script Backend for BPMN Modeler
 * 
 * Instructions:
 * 1. Create a new Google Apps Script project.
 * 2. Paste this code into Code.gs.
 * 3. Create a new HTML file named 'index.html' and paste your combined frontend code there.
 * 4. Deploy > New Deployment > Web App.
 */

const FOLDER_NAME = 'BPMN Diagrams';

// Serve the HTML file when the Web App URL is visited
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('BPMN System Studio')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Gets or creates the dedicated BPMN Diagrams folder
 */
function getOrMakeFolder() {
  const folders = DriveApp.getFoldersByName(FOLDER_NAME);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(FOLDER_NAME);
}

/**
 * Saves the BPMN XML string to Google Drive.
 */
function saveDiagramToDrive(xmlString, filename) {
  try {
    const folder = getOrMakeFolder();
    
    // Check if file exists to overwrite, or create new
    const existing = folder.getFilesByName(filename);
    if (existing.hasNext()) {
      const file = existing.next();
      file.setContent(xmlString);
      return 'Success! File updated with ID: ' + file.getId();
    } else {
      const file = folder.createFile(filename, xmlString, MimeType.PLAIN_TEXT);
      return 'Success! File saved with ID: ' + file.getId();
    }
  } catch (error) {
    throw new Error('Failed to save file: ' + error.message);
  }
}

/**
 * Returns a list of all BPMN files in the dedicated folder
 */
function getDiagramFiles() {
  try {
    const folder = getOrMakeFolder();
    const files = folder.getFiles();
    const fileList = [];
    while (files.hasNext()) {
      const file = files.next();
      fileList.push({
        id: file.getId(),
        name: file.getName(),
        date: file.getLastUpdated().toISOString()
      });
    }
    // Sort by newest
    fileList.sort((a,b) => new Date(b.date) - new Date(a.date));
    return fileList;
  } catch (error) {
    throw new Error('Failed to list files: ' + error.message);
  }
}

/**
 * Loads the XML content of a specific file by ID
 */
function loadDiagramFromDrive(fileId) {
  try {
    const file = DriveApp.getFileById(fileId);
    return file.getBlob().getDataAsString();
  } catch (error) {
    throw new Error('Failed to load file: ' + error.message);
  }
}

/**
 * Renames a specific file by ID
 */
function renameDiagram(fileId, newName) {
  try {
    const file = DriveApp.getFileById(fileId);
    if (!newName.endsWith('.bpmn')) newName += '.bpmn';
    file.setName(newName);
    return true;
  } catch (error) {
    throw new Error('Failed to rename file: ' + error.message);
  }
}

/**
 * Duplicates a specific file by ID
 */
function duplicateDiagram(fileId) {
  try {
    const file = DriveApp.getFileById(fileId);
    const newName = file.getName().replace(/\.bpmn$/, '') + ' (コピー).bpmn';
    file.makeCopy(newName);
    return true;
  } catch (error) {
    throw new Error('Failed to duplicate file: ' + error.message);
  }
}

/**
 * Saves exported files (PDF, PNG, SVG) to Google Drive.
 * For PDF/PNG, base64Data is a base64 encoded string.
 * For SVG, base64Data is just the raw SVG string.
 */
function saveExportToDrive(base64Data, filename, mimeType) {
  try {
    const folder = getOrMakeFolder();
    let blob;
    
    if (mimeType === 'image/svg+xml') {
      blob = Utilities.newBlob(base64Data, mimeType, filename);
    } else {
      const decoded = Utilities.base64Decode(base64Data);
      blob = Utilities.newBlob(decoded, mimeType, filename);
    }
    
    const file = folder.createFile(blob);
    return 'Success! Exported file saved with ID: ' + file.getId();
  } catch (error) {
    throw new Error('Failed to save export: ' + error.message);
  }
}
