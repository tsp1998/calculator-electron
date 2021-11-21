const path = require('path')
const os = require('os')

const ROOT_FOLDER = path.resolve(os.homedir(), 'calculator-electron')
const RECORDS_FILE = path.resolve(ROOT_FOLDER, 'records.json')

module.exports = {
  ROOT_FOLDER, RECORDS_FILE
}