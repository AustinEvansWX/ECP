import { app, BrowserWindow } from "electron";
import electronReloader from "electron-reloader";

electronReloader(module);

const width = 1920;
const height = 1280;

app.on('ready', createWindow);
app.on('window-all-closed', app.quit);

function createWindow() {
  const win = new BrowserWindow({
    width, height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  win.loadFile('./html/index.html');
}