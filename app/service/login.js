'use strict';

const Service = require('egg').Service

class LoginService extends Service {
  async login() {
    const { app } = this
    try  {
      let result = await app.mysql.query('SELECT name,password,id FROM user')
      return result
    } catch (error) {
      return error
    }
  }
}
module.exports = LoginService