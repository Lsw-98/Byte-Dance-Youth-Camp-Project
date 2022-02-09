const { Role } = require('../models/roleTable');
const roleService = require('../services/roleService');
const { _id2id, getClassSettedKey } = require('../utils/transform');

/**
 * RoleController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 包含角色的删改查功能
 */
class RoleController {
  /**
   * 列出所有角色
   * 响应格式
   * {
   *   data: [role1, role2]
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
  async listAll(req, res) {
    // 调用 Service 层对应的业务处理方法
    const list = await roleService.listAll();

    for (const role of list) {
      _id2id(role);
    }
    res.send(list);
  }

  /**
   * 删除一个角色
   * 响应格式
   * {
   *   ok: true
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
  async delete(req, res) {
    // 调用 Service 层对应的业务处理方法
    await roleService.delete(req.params.id);
    res.send({ok: true});
  }

  /**
   * 更新角色
   * 响应格式
   * {
   *   ok: true
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
  async update(req, res) {
    // 调用 Service 层对应的业务处理方法
    const updater = getClassSettedKey(new Role(req.body));
    delete updater._id;

    await roleService.update(req.params.id, updater);
    res.send({ok: true});
  }
}

// 导出 Controller 的实例
module.exports = new RoleController();
