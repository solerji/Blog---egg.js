'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async getArticleList() {
    const { ctx } = this
    let users = await ctx.service.article.getArticleList()
    try {
      ctx.body = {
        code: 0,
        status: 200,
        list: users
      }
     } catch(err) {
      ctx.body = {
        status:500,
        err: err,
        errMsg:'服务器端错误!'
      }
    }
  }

  async searchArticleByTitle() {
    const { ctx } = this
    try {
    let users = await ctx.service.article.searchArticleByTitle()
    ctx.body = {
      code: 0,
      status: 200,
      data: users
      }
    } catch (err) {
      ctx.body = {
        status:500,
        err: err,
        errMsg:'服务器端错误!'
      }
    }
  }

  async getArticlePage() {
    const { ctx } = this
    try {
    let users = await ctx.service.article.getArticlePage(ctx.request.body)
    try {
      let count = await ctx.service.article.getCount()
      ctx.body = {
        code: 0,
        status: 200,
        list: users,
        count: count
        }
    } catch (err) {
      ctx.body = {
        status:500,
        err: err,
        errMsg:'服务器端错误!'
      }
    }
    } catch (err) {
      ctx.body = {
        status:500,
        err: err,
        errMsg:'服务器端错误!'
      }
    }
  }

  async getArticleById() {
    const { ctx } = this
    try {
      let users = await ctx.service.article.getArticleById(ctx.query.aid)
    try {
      let tags = await ctx.service.tag.getTagsByTitle(users[0].title)
      ctx.body = {
        code: 0,
        status: 200,
        article: users[0],
        tags: tags
        }
    } catch (err) {
      ctx.body = {
        status:500,
        err: err,
        errMsg:'服务器端错误!'
      }
    }
    } catch (err) {
      ctx.body = {
        status:500,
        err: err,
        errMsg:'服务器端错误!'
      }
    }
  }

  async getTagsByTitle() {
    const { ctx } = this
    try {
      let a = await ctx.service.tag.getTagsByTitle(ctx.request.body.title)
      console.log(2323, a)
    } catch (err) {
      ctx.body = {
        status:500,
        err: err,
        errMsg:'服务器端错误!'
      }
    }
    console.log(22222)
    try {
      let b = await ctx.service.tag.removeTag(ctx.request.body.title)
      console.log(2323, b)
      var tagItem = ctx.request.body.tagName
      var item = ''
      for (var i = 0; i <= tagItem.length; i++) {
        item = tagItem[i]
        var params = [item, ctx.request.body.title]
        if (params[0] !== undefined) {
          try {
            let c = await ctx.service.tag.addTag(params)
            console.log(11, c)
          } catch (err) {
            res.status(500).send('服务器端错误!', err.message)
            return
          }
        }
      }
      try {
        await ctx.service.article.updateArticleById(ctx.request.body.title)
      } catch (err) {
          ctx.body = {
            status:500,
            err: err,
            errMsg:'服务器端错误!'
          }
          return
        }
        ctx.body = {
          code: 0,
          status: 200
          }
      } catch (err) {
        ctx.body = {
          status:500,
          err: err,
          errMsg:'服务器端错误!'
        }
      return
      }
    }

}

module.exports = ArticleController