const { News } = require('../models/newsTable');
const newsService = require('../services/newsService');
const { _id2id, getClassSettedKey, str2number } = require('../utils/transform');

/**
 * NewController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 包含新闻的增删改查功能
 */
class NewsController {
  /**
   * 根据条件搜索新闻
   * 响应格式
   * {
   *   data: [news1, news2]
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
  async search(req, res) {
    // 调用 Service 层对应的业务处理方法
    const params = getClassSettedKey(new News(req.query));
    let list = [];
    // 设置排序
    const sortKey = {};
    if ('_sort' in req.query) {
      sortKey[req.query._sort] = 1;
      if ('_order' in req.query && req.query._order==='desc') sortKey[req.query._sort] = -1;
    }
    // 设置限制数量
    let limitNum = 0;
    if ('_limit' in req.query) limitNum = str2number(req.query._limit);
    // 是否拓展
    if ('_expand' in req.query) {
      // 设置拓展字段
      const expand = [];
      if (typeof(req.query._expand)==='string') {
        expand.push(req.query._expand);
      } else {
        for (const key of req.query._expand) expand.push(key);
      }

      list = await newsService.searchWithOthers(params, sortKey, limitNum, expand);
      for (const news of list) {
        for (const key of expand) _id2id(news[key]);
      }
    } else {
      list = await newsService.search(params, sortKey, limitNum);
    }

    for (const news of list) {
      _id2id(news);
    }
    res.send(list);
  }

  /**
   * 根据id和其他条件搜索新闻
   * 响应格式
   * {
   *   data: [news1, news2]
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
   async searchWithId(req, res) {
    req.query._id = req.params.id;
    // 调用 Service 层对应的业务处理方法
    const params = getClassSettedKey(new News(req.query));
    let list = [];
    // 设置排序
    const sortKey = {};
    if ('_sort' in req.query) {
      sortKey[req.query._sort] = 1;
      if ('_order' in req.query && req.query._order==='desc') sortKey[req.query._sort] = -1;
    }
    // 设置限制数量
    let limitNum = 0;
    if ('_limit' in req.query) limitNum = str2number(req.query._limit);
    // 是否拓展
    if ('_expand' in req.query) {
      // 设置拓展字段
      const expand = [];
      if (typeof(req.query._expand)==='string') {
        expand.push(req.query._expand);
      } else {
        for (const key of req.query._expand) expand.push(key);
      }

      list = await newsService.searchWithOthers(params, sortKey, limitNum, expand);
      for (const news of list) {
        for (const key of expand) _id2id(news[key]);
      }
    } else {
      list = await newsService.search(params, sortKey, limitNum);
    }

    for (const news of list) {
      _id2id(news);
    }
    res.send(list[0]);
  }

  /**
   * 创建一个新闻
   * 响应格式
   * {
   *   data: newNews
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
  async create(req, res) {
    const newsParams = getClassSettedKey(new News(req.body));
    // 调用 Service 层对应的业务处理方法
    const result = await newsService.create(newsParams);
    _id2id(result);

    res.send(result);
  }

  /**
   * 删除一个新闻
   * 响应格式
   * {
   *   ok: true
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
  async delete(req, res) {
    // 调用 Service 层对应的业务处理方法
    await newsService.delete(req.params.id);
    res.send({ok: true});
  }

  /**
   * 更新权限子项
   * 响应格式
   * {
   *   ok: true
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
  async update(req, res) {
    // 调用 Service 层对应的业务处理方法
    const updater = getClassSettedKey(new News(req.body));
    delete updater._id;

    await newsService.update(req.params.id, updater);
    res.send({ok: true});
  }
}

// 导出 Controller 的实例
module.exports = new NewsController();
