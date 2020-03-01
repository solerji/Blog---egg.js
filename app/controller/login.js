'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  async index() {
    const { ctx, app } = this
    try {
      let users = await ctx.service.login.login()
      //生成 token 的方式
      const token = app.jwt.sign({
        name: users.name, //需要存储的 token 数据
      }, app.config.jwt.secret)
        ctx.body = {
          code: 0,
          status: 200,
          data: token
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