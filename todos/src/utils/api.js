const fs = require('fs')
const request = require('request')
// The file server 'lives' on localhost:1667 (for local testing)
// const FILE_SERVER_URL = 'http://localhost:1667/bundle'
// The file serve with Docker Compose running:
const FILE_SERVER_URL = 'http://file-server:1667/bundle'


class API {
  /**
    * Upload a single file to a remote server
    * 
    * @static
    * @param {string} location of file on the system
    * @param {string} name in form to which the file is attached [formName='bundle'] 
    * @returns {Request}
    * @memberof API
  */
  static uploadFile(localPath, formName = 'bundle', fileName) {
    const req = request.post(FILE_SERVER_URL, (err, resp, body) => {
      if (err) console.log(err)
    })

    const form = req.form()
    form.append(formName, fs.createReadStream(localPath))
  }
}

module.exports = API
