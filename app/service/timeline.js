'use strict';

const Service = require('egg').Service

class TimelineService extends Service {
  async getTimelineById() {
    try  {
      const timeline = await this.app.mysql.query('SELECT aid, update_time, title FROM article ORDER BY update_time DESC')
      return timeline 
    } catch (error) {
      throw error
    }
  }
}
module.exports = TimelineService