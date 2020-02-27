'use strict';

const Service = require('egg').Service

class loginService extends Service {
  async login(params) {
    const { app } = this
    console.log(2323, params)
    try  {
      let result = await app.mysql.get('user', {
        columns: ['name', 'password', 'id']
      })
      const user = await app.mysql.query('select * from user','')
      console.log(2323, user)
      return result
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
module.exports = loginService;