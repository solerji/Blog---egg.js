'use strict';

const Controller = require('egg').Controller;

class timelineController extends Controller {
  async timelineId() {
    const { ctx } = this
    this.logger.info('current user: %j', ctx);
    let users = await ctx.service.timeline.getTimelineById(id)
    if (users) {
      ctx.body = {
          status: 200,
          data: timelines
      }
     } else {
      ctx.body = {
          status:500,
          errMsg:'获取时间轴信息失败！'
      }
    }
  }
}

module.exports = timelineController