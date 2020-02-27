'use strict';

const Service = require('egg').Service

class timelineService extends Service {
  async getTimelineById(aid) {
    this.ctx.logger.info('debug info from service', aid);
    let timeline = await this.app.mysql.get('article', {
      columns: ['aid', 'update_time', 'title'],
      orders: [['update_time','desc']]
    })
    return timeline
  }
}
module.exports = timelineService