'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx } = this
    let users = await ctx.service.login.login()
    if (users) {
      ctx.body = {
          status: 200,
          data: users
      }
     } else {
      ctx.body = {
          status:500,
          errMsg:'登录失败'
      }
    }
  }
}

module.exports = LoginController;