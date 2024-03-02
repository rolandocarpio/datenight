const path = require('path');
const { app, BrowserWindow } = require('electron');

const isDev = process.env.NODE_ENV !== 'development';
const isMac = process.platform === 'darwin';

function createWindow() {
    // create a window
    const myWindow = new BrowserWindow({
        width: isDev ? 1000 : 800,
        height: 600,
        icon: path.join(__dirname, '/renderer/images/champagne.png'),
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Open devtools if in dev env
    if (isDev) {
        myWindow.webContents.openDevTools();
    }

    // load a webpage
    myWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow()
        }
    });
});

app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
});