class Storage {
  getItem (key) {
    return localStorage.getItem(key)
  }

  setItem (key, value) {
    localStorage.setItem(key, value)
  }

  deleteKey (key) {
    delete localStorage[key]
  }

  clear () {
    localStorage.clear()
  }
}

export default new Storage()
