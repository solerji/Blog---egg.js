/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {

  /**
   * egg-mysql mysql 数据库连接配置
   * @property {Object} client - 单数据库连接配置
   * @property {Boolean} app - 是否加载到 app 上，默认开启
   * @property {Boolean} agent - 是否加载到 agent 上，默认关闭
   */
    mysql : {
      // database configuration
      client: {
        // host
        host: '127.0.0.1',
        // port
        port: '3306',
        // username
        user: 'root',
        // password
        password: 'solerji',
        // database
        database: 'my-blog',    
      },
      // load into app, default is open
      app: true,
      // load into agent, default is close
      agent: false,
    }
  };

  config.security = {
    csrf: false
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1582766810111_2158';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
