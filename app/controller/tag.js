'use strict';

const Controller = require('egg').Controller
const moment = require('moment')

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

  // 删除标签
  async removeTag() {
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

  // 增加标签
  async addTag() {
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

  // 获取标签列表
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

  // 获取标签及时间轴
  async getTagTimeLine() {
    const { ctx } = this
    let title =  ctx.request.body.tagName
    let tags = await ctx.service.tag.getTagTimeLine(title)
    tags.forEach(element => {
      if (element.update_time) {
        element.update_time =  moment(element.update_time).format('YYYY-MM-DD HH:mm:ss')
      }
    })
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