'use strict';

const Service = require('egg').Service

class articleService extends Service {
  async getArticleById(aid) {
    const { app } = this
    try  {
      let result = await app.mysql.query('SELECT aid, title, author, update_time, content, show_content FROM article WHERE aid = ?', [aid])
      return result
    } catch (error) {
      return error 
    }
  }

  async getArticleList() {
    const { app } = this
    try  {
      let result = await app.mysql.query('SELECT aid, title, show_content FROM article')
      return result
    } catch (error) {
      return error
    }
  }

  async updateArticleById(article) {
    const { app } = this
    try  {
      let params = [
        article.title,
        article.author,
        article.content,
        article.showContent,
        article.aid
      ]
      let result = await app.mysql.query('UPDATE article SET title = ?, author = ?, content = ? , show_content= ? WHERE aid = ?', params)
      return result
    } catch (error) {
      return error
    }
  }

  async addArticle(article) {
    const { app } = this
    let params = [
      article.title,
      article.author,
      article.content,
      article.showContent
    ]
    try  {
      let result = await app.mysql.query('INSERT INTO article(title, author, content, show_content) VALUES (?,?,?,?)', params)
      return result
    } catch (error) {
      return error
    }
  }

  async delArticleById(aid) {
    const { app } = this
    try  {
      let result = await app.mysql.query('DELETE FROM article where aid = ?', [aid])
      return result
    } catch (error) {
      return error
    }
  }

  async searchArticleByTitle(title) {
    const { app } = this
    try  {
      let newTitle = '%' + title + '%'
      let result = await app.mysql.query('SELECT * FROM article WHERE title LIKE ?',[newTitle])
      return result
    } catch (error) {
      return error
    }
  }

  async getArticlePage(page) {
    const { app } = this
    try  {
      let show = [(page.currentPage - 1) * page.pageIndex, page.pageIndex]
      let result = await app.mysql.query('SELECT aid, title, show_content, content FROM article LIMIT ? , ?', show)
      return result
    } catch (error) {
      return error
    }
  }

  async getCount() {
    const { app } = this
    try  {
      let result = await app.mysql.query('SELECT count(aid) as count FROM article')
      return result
    } catch (error) {
      return error
    }
  }

}
module.exports = articleService;