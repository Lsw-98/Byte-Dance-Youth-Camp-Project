const { Child } = require('../models/roleTable');
const childService = require('../services/childService');
const { _id2id, getClassSettedKey } = require('../utils/transform');

/**
 * ChildController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 包含权限子项的删改查功能
 */
class ChildController {
  /**
   * 列出所有权限子项
   * 响应格式
   * {
   *   data: [child1, child2]
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
  async listAll(req, res) {
    // 调用 Service 层对应的业务处理方法
    const list = await childService.listAll();

    for (const child of list) {
      _id2id(child);
    }
    res.send(list);
  }

  /**
   * 删除一个权限子项
   * 响应格式
   * {
   *   ok: true
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
  async delete(req, res) {
    // 调用 Service 层对应的业务处理方法
    await childService.delete(req.params.id);
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
    const updater = getClassSettedKey(new Child(req.body));
    delete updater._id;

    await childService.update(req.params.id, updater);
    res.send({ok: true});
  }
}

// 导出 Controller 的实例
module.exports = new ChildController();
