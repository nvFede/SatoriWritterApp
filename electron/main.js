const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs').promises;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('dialog:openFile', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({ properties: ['openFile'] });
  if (!canceled) {
    const content = await fs.readFile(filePaths[0], 'utf8');
    return { filePath: filePaths[0], content };
  }
});

ipcMain.handle('dialog:saveFile', async (event, { content, filePath }) => {
  if (filePath) {
    await fs.writeFile(filePath, content, 'utf8');
    return filePath;
  } else {
    const { canceled, filePath: savedFilePath } = await dialog.showSaveDialog();
    if (!canceled && savedFilePath) {
      await fs.writeFile(savedFilePath, content, 'utf8');
      return savedFilePath;
    }
  }
});
