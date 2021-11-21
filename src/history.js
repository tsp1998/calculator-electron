const { ipcRenderer } = require('electron')
window.onload = () => {
  const recordsContainerElement = document.getElementById('recordsContainer')
  ipcRenderer.send('GET_RECORDS')
  ipcRenderer.on('GET_RECORDS_RESPONSE', (event, records) => {
    records && records.length && records.forEach(record => {
      const recordElement = document.createElement('div')
      recordElement.setAttribute('class', 'record')
      recordElement.innerText = `${record.numbers.join(` ${record.operation} `)} = ${record.result}`
      recordsContainerElement.append(recordElement)
    })
  })
}