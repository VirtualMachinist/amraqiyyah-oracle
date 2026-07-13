// Amraqiyyah Oracle — Electron desktop shell.
// Loads the Expo web export (copied into ./web at build time).
const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const fs = require('node:fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 840,
    title: 'Amraqiyyah Oracle',
    backgroundColor: '#0b0b12',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  const bundled = path.join(__dirname, 'web', 'index.html');
  const devExport = path.join(__dirname, '..', 'app', 'dist', 'index.html');
  const entry = fs.existsSync(bundled) ? bundled : devExport;
  win.loadFile(entry);
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
