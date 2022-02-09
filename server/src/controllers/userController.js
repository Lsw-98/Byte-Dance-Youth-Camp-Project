const { User } = require('../models/userTable');
const userService = require('../services/userService');
const { _id2id, getClassSettedKey } = require('../utils/transform');

/**
 * UserController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 包含用户的增删改查功能
 */
class UserController {
  /**
   * 根据条件搜索用户
   * 响应格式
   * {
   *   data: [user1, user2]
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
  async search(req, res) {
    // 调用 Service 层对应的业务处理方法
    const params = getClassSettedKey(new User(req.query));
    let list = [];
    if ('_expand' in req.query && req.query._expand === 'role') {
      list = await userService.searchWithRole(params);

      for (const user of list) {
        _id2id(user.role);
      }
    } else {
      list = await userService.search(params);
    }

    for (const user of list) {
      _id2id(user);
    }
    res.send(list);
  }

  /**
   * 创建一个用户
   * 响应格式
   * {
   *   data: newUser
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
  async create(req, res) {
    const userParams = getClassSettedKey(new User(req.body));
    // 调用 Service 层对应的业务处理方法
    const result = await userService.create(userParams);
    _id2id(result);

    res.send(result);
  }

  /**
   * 删除一个用户
   * 响应格式
   * {
   *   ok: true
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
  async delete(req, res) {
    // 调用 Service 层对应的业务处理方法
    await userService.delete(req.params.id);
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
    const updater = getClassSettedKey(new User(req.body));
    delete updater._id;

    await userService.update(req.params.id, updater);
    res.send({ok: true});
  }
}

// 导出 Controller 的实例
module.exports = new UserController();
