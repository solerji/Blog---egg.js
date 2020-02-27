'use strict';

const Service = require('egg').Service

class tagService extends Service {
  async getTagsByTitle() {
    // 根据id查询用户信息
    let result = await this.app.mysql.get('article_tag', {
      columns: ['tag_name', 'article_title'],
      where: { article_title: 'article_title' }, // WHERE 条件,?怎么处理
    })
    return result
  }
}

module.exports = tagService;