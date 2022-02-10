const regionService = require('../services/regionService');
const { _id2id } = require('../utils/transform');

/**
 * RegionController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 包含地区的查功能
 */
class RegionController {
  /**
   * 列出所有地区
   * 响应格式
   * {
   *   data: [region1, region2]
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
   async listAll(req, res) {
    // 调用 Service 层对应的业务处理方法
    const list = await regionService.listAll();

    for (const region of list) {
      _id2id(region);
    }
    res.send(list);
  }
}

// 导出 Controller 的实例
module.exports = new RegionController();
