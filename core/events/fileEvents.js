const { ipcMain } = require('electron')
const { getData } = require('../store')
const { readFile, writeFile } = require('../utils/files')
const { RECORDS_FILE } = require('../constants/FILE_CONSTANTS')

ipcMain.on('SAVE_DATA', async (event, data) => {
  let records = [];
  try {
    const data = await readFile(RECORDS_FILE)
    records = JSON.parse(data)
  } catch (error) {
  }
  if (typeof records !== 'object') {
    records = []
  }
  records.push(data)
  try {
    await writeFile(RECORDS_FILE, JSON.stringify(records))
  } catch (error) {
    console.log(`error`, error)
  }
})

ipcMain.on('GET_RECORDS', async (event, data) => {
  let records = [];
  try {
    const data = await readFile(RECORDS_FILE)
    records = JSON.parse(data)
  } catch (error) {
    console.log(`error`, error)
  }
  const mainWindow = getData('mainWindow')
  if (mainWindow) {
    mainWindow.webContents.send('GET_RECORDS_RESPONSE', records)
  }
})