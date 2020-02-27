'use strict';

const Controller = require('egg').Controller;

class TagController extends Controller {
  async getTagsByTitle() {
    const { ctx } = this
    try {
      let tags = await ctx.service.tag.getTagsByTitle()
      ctx.body = {
        code: 0,
        status: 200,
        data: tags
      }
    } catch (err) {
      ctx.body = {
        status:500,
        err: err,
        errMsg:'服务器端错误!'
      }
    }
  }

  async removeTag(title) {
    const { ctx } = this
    let tags = await ctx.service.tag.removeTag()
    try {
      ctx.body = {
        code: 0,
        status: 200,
        data: tags
      } 
    } catch (err) {
      ctx.body = {
        status:500,
        err: err,
        errMsg:'服务器端错误!'
      }
    }
  }

  async addTag(title) {
    const { ctx } = this
    let tags = await ctx.service.tag.addTag()
    try {
      ctx.body = {
        code: 0,
        status: 200,
        data: tags
      }
    } catch (err) {
      ctx.body = {
        status:500,
        err: err,
        errMsg:'服务器端错误!'
      }
    }
  }

  async getTagList() {
    const { ctx } = this
    let tags = await ctx.service.tag.getTagList()
    try {
      ctx.body = {
        code: 0,
        status: 200,
        list: tags
      }
    } catch (err) {
      ctx.body = {
        status:500,
        err: err,
        errMsg:'服务器端错误!'
      }
    }
  }

  async getTagTimeLine() {
    const { ctx } = this
    let title =  ctx.request.body.tagName
    let tags = await ctx.service.tag.getTagTimeLine(title)
    try {
      ctx.body = {
        code: 0,
        status: 200,
        list: tags
      }
    } catch (err) {
      ctx.body = {
        status:500,
        err: err,
        errMsg:'服务器端错误!'
      }
    }
  }

  async getTimeLineList() {
    const { ctx } = this
    try {
      let tags = await ctx.service.tag.getTimeLineList(ctx.request.body)
      let count = await ctx.service.tag.getTagCount(ctx.request.body)
      try {
        ctx.body = {
          status: 200,
          list: tags,
          count: count
        }
      } catch (err) {
        ctx.body = {
          code: 0,
          status:500,
          errMsg:'服务器端错误!'
        }
      }
    } catch (err) {
      ctx.body = {
        status:500,
        errMsg:'服务器端错误!'
      }
    }
  }
}

module.exports = TagController;