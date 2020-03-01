'use strict';

module.exports = () => {
  const config = {};

  /**
   * egg-mysql mysql 数据库连接配置
   * @property {Object} client - 单数据库连接配置
   * @property {Boolean} app - 是否加载到 app 上，默认开启
   * @property {Boolean} agent - 是否加载到 agent 上，默认关闭
   */
  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'my-blog',
    },
    app: true,
    agent: false,
  }

  return config;
};