function error (msg= "something is wrong", status=500){
      const e = new Error(msg)
      e.status = status
      return e
}

module.exports = error