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

  // 更改文章
  async getTagsByTitle() {
    const { ctx } = this
    try {
      await ctx.service.tag.getTagsByTitle(ctx.request.body.title)
      try {
        await ctx.service.tag.removeTag(ctx.request.body.title)
        var tagItem = ctx.request.body.tagName
        var item = ''
        for (var i = 0; i <= tagItem.length; i++) {
          item = tagItem[i]
          var params = [item, ctx.request.body.title]
          if (item !== undefined) {
            try {
              await ctx.service.tag.addTag(params)
              try {
                await ctx.service.article.updateArticleById(ctx.request.body)
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
            } catch (err) {
              ctx.body = {
                status:500,
                err: err,
                errMsg:'服务器端错误!'
              }
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
    } catch (err) {
      ctx.body = {
        status:500,
        err: err,
        errMsg:'服务器端错误!'
      }
    }
  }

  // 删除文章
  async getTagsByTitle() {
    const { ctx } = this
    try {
      let article = await ctx.service.article.getArticleById(ctx.request.body.aid)
      let tag = article[0].title
      try {
        await ctx.service.tag.removeTag(tag)
          try {
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
          try {
            await ctx.service.tag.addTag(params)
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