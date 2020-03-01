'use strict';

const Controller = require('egg').Controller
const moment = require('moment')

class ArticleController extends Controller {
  async getArticleList() {
    const { ctx } = this
    try {
      let users = await ctx.service.article.getArticleList()
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
    let users = await ctx.service.article.searchArticleByTitle(ctx.query.key)
    ctx.body = {
      code: 0,
      status: 200,
      list: users
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
  }

  async getArticleById() {
    const { ctx } = this
    try {
      let users = await ctx.service.article.getArticleById(ctx.query.aid)
      let tags = await ctx.service.tag.getTagsByTitle(users[0].title)
      users[0].update_time = moment(users[0].update_time).format('YYYY-MM-DD HH:mm:ss')
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
  }

  // 更改文章
  async updateArticle() {
    const { ctx } = this
    try {
      await ctx.service.tag.getTagsByTitle(ctx.request.body.title)
      await ctx.service.tag.removeTag(ctx.request.body.title)
      var tagItem = ctx.request.body.tagName
      var item = ''
      for (var i = 0; i <= tagItem.length; i++) {
        item = tagItem[i]
        var params = [item, ctx.request.body.title]
        if (params[0] !== undefined) {
          await ctx.service.tag.addTag(params)
        }
        await ctx.service.article.updateArticleById(ctx.request.body)
          ctx.body = {
            code: 0,
            status: 200
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

  // 删除文章
  async delArticle() {
    const { ctx } = this
    try {
      let article = await ctx.service.article.getArticleById(ctx.request.body.aid)
      let tag = article[0].title
      await ctx.service.tag.removeTag(tag)
      await ctx.service.article.delArticleById(ctx.request.body.aid)
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
    }
  }

  // 新增文章
  async addArticle() {
    const { ctx } = this
    try {
      await ctx.service.article.addArticle(ctx.request.body)
      var tagItem = ctx.request.body.tagName
      var item = ''
      for (var i = 0; i <= tagItem.length; i++) {
        item = tagItem[i]
        var params = [item, ctx.request.body.title]
        if (item !== undefined) {
         ctx.service.tag.addTag(params)
         ctx.body = {
            code: 0,
            status: 200
          }
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

}

module.exports = ArticleController