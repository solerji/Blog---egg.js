'use strict';

const Service = require('egg').Service

class TagService extends Service {
  async getTagsByTitle(title) {
    const { app } = this
    try  {
      let result = await app.mysql.query('SELECT tag_name, article_title FROM article_tag WHERE article_title = ?', [title])
      return result
    } catch (error) {
      return error
    }
  }

  async removeTag(title) {
    const { app } = this
    try  {
      let result = await app.mysql.query('DELETE FROM article_tag WHERE article_title = ?', [title])
      return result
    } catch (error) {
      return error
    }
  }

  async addTag(tags) {
    const { app } = this
    try  {
      let result = await app.mysql.query('INSERT INTO article_tag(tag_name, article_title) VALUES (?,?)', tags)
      return result
    } catch (error) {
      return error
    }
  }

  // 获取标签列表
  async getTagList() {
    const { app } = this
    try  {
      let result = await app.mysql.query('SELECT DISTINCT tag_name FROM article_tag')
      return result
    } catch (error) {
      return error
    }
  }

  // 获取标签及时间轴
  async getTagTimeLine(title) {
    const { app } = this
    try  {
      let result = await app.mysql.query('SELECT tag_name, article_title, update_time FROM article_tag WHERE tag_name = ?', [title])
      return result
    } catch (error) {
      return error
    }
  }

  async getTimeLineList(page) {
    const { app } = this
    try  {
      let show = [
        page.tagName,
        (page.currentPage - 1) * page.pageIndex,
        page.pageIndex
      ]
      let result = await app.mysql.query('SELECT tag_name, article_title, update_time FROM article_tag WHERE tag_name = ? LIMIT ? , ? ',show)
      return result
    } catch (error) {
      return error
    }
  }

  async getTagCount(name) {
    const { app } = this
    let tagName = name.tagName
    try  {
      return await app.mysql.query('SELECT count(article_title) as count FROM article_tag WHERE tag_name = ?', [tagName])
    } catch (error) {
      return error
    }
  }

}

module.exports = TagService