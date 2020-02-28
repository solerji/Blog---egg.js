'use strict'

const Controller = require('egg').Controller;
const moment = require('moment')

class TimelineController extends Controller {
  // 获取时间轴时间和标题
  async timelineId() {
    const { ctx } = this
    try {
      let timelines = await ctx.service.timeline.getTimelineById()
      timelines.forEach(element => {
        if (element.update_time) {
          element.update_time =  moment(element.update_time).format('YYYY-MM-DD HH:mm:ss')
        }
      })
      
      ctx.body = {
        code: 0,
        status: 200,
        list: timelines
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

module.exports = TimelineController