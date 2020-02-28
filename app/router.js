'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  // 登录接口
  router.post('/api/login', controller.login.index)
  // 时间轴获取
  router.get('/api/timeline', controller.timeline.timelineId)
  // 文章相关接口
  router.post('/api/getPage', controller.article.getArticlePage)
  router.post('/api/addArticle', controller.article.addArticle)
  router.get('/api/articles', controller.article.getArticleList)
  router.get('/api/article', controller.article.getArticleById)
  router.delete('/api/delArticle', controller.article.getTagsByTitle)
  router.post('/api/updateArticle', controller.article.getTagsByTitle)
  router.get('/api/someArticles', controller.article.searchArticleByTitle)
  // 标签相关接口
  router.get('/api/tags', controller.tag.getTagList)
  router.post('/api/tagsAndTime', controller.tag.getTagTimeLine)
  router.post('/api/getTimeLine', controller.tag.getTimeLineList)
};
