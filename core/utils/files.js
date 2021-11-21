const fs = require('fs')
const createFolder = (path) => new Promise((resolve, reject) => {
  fs.mkdir(path, (error) => {
    error ? reject(error) : resolve()
  })
})

const readFile = path => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf-8', (error, data) => {
    error ? reject(error) : resolve(data)
  })
})

const writeFile = (path, data) => new Promise((resolve, reject) => {
  fs.writeFile(path, data, 'utf-8', (error, data) => {
    error ? reject(error) : resolve(data)
  })
})

const fileOrFolderExists = path => new Promise((resolve, reject) => {
  fs.exists(path, exists => {
    resolve(exists)
  })
})

module.exports = {
  createFolder,
  readFile,
  writeFile,
  fileOrFolderExists
}