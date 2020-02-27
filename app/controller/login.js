'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this
    try {
      let users = await ctx.service.login.login()
      ctx.body = {
        code: 0,
        status: 200,
        data: users
      }
     } catch(err){
      ctx.body = {
        status:500,
        err: err,
        errMsg:'服务器端错误!'
      }
    }
  }
}

module.exports = LoginController;