const store = new Map()

const setData = (key, data) => {
  if (key) {
    store.set(key, data)
  }
}

const getData = key => {
  return store.has(key) ? store.get(key) : null
}

module.exports = {
  setData, getData
}