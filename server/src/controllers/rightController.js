const { Right } = require('../models/rightTable');
const rightService = require('../services/rightService');
const { _id2id, getClassSettedKey } = require('../utils/transform');

/**
 * RightController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 包含权限的删改查功能
 */
class RightController {
  /**
   * 列出所有权限
   * 响应格式
   * {
   *   data: [right1, right2]
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
  async listAll(req, res) {
    console.log('asd')
    // 调用 Service 层对应的业务处理方法
    let list = [];
    if ('_embed' in req.query && req.query._embed === 'children') {
      list = await rightService.listAllWithChildren();

      for (const right of list) {
        for (const child of right.children) _id2id(child);
      }
    } else {
      list = await rightService.listAll();
    }

    for (const right of list) {
      _id2id(right);
    }
    res.send(list);
  }

  /**
   * 删除一个权限
   * 响应格式
   * {
   *   ok: true
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
  async delete(req, res) {
    // 调用 Service 层对应的业务处理方法
    await rightService.delete(req.params.id);
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
    const updater = getClassSettedKey(new Right(req.body));
    delete updater._id;

    await rightService.update(req.params.id, updater);
    res.send({ok: true});
  }
}

// 导出 Controller 的实例
module.exports = new RightController();
