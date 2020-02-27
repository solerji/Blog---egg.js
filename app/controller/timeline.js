'use strict';

const Controller = require('egg').Controller;

class TimelineController extends Controller {
  async timelineId() {
    const { ctx } = this
    try {
      let timelines = await ctx.service.timeline.getTimelineById()
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