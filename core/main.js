const { app, BrowserWindow } = require('electron')
const { setData } = require('./store')
const { createFolder, fileOrFolderExists } = require('./utils/files')
const { ROOT_FOLDER } = require('./constants/FILE_CONSTANTS')

const isDev = app.isPackaged
// events
require('./events/fileEvents')

function init() {
  fileOrFolderExists(ROOT_FOLDER)
    .then(exists => !exists && createFolder(ROOT_FOLDER))
}

app.on('ready', () => {
  const mainWindow = new BrowserWindow({
    height: 500,
    width: isDev ? 1200 : 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: isDev
    },
  })
  setData('mainWindow', mainWindow)
  mainWindow.loadFile('./src/index.htm')
})

init()