const { Categorie } = require('../models/categoryTable');
const categoryService = require('../services/categoryService');
const { _id2id, getClassSettedKey } = require('../utils/transform');

/**
 * CategoryController
 * Controller 是业务入口，由 HTTP 路由解析后调用
 * 包含新闻类别的删改查功能
 */
class CategoryController {
  /**
   * 列出所有新闻类别
   * 响应格式
   * {
   *   data: [categorie1, categorie2]
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
  async listAll(req, res) {
    // 调用 Service 层对应的业务处理方法
    const list = await categoryService.listAll();

    for (const categorie of list) {
      _id2id(categorie);
    }
    res.send(list);
  }

  /**
   * 删除一个新闻类别
   * 响应格式
   * {
   *   ok: true
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
  async delete(req, res) {
    // 调用 Service 层对应的业务处理方法
    await categoryService.delete(req.params.id);
    res.send({ok: true});
  }

  /**
   * 更新新闻类别
   * 响应格式
   * {
   *   ok: true
   * }
   * @param req Express 的请求参数
   * @param res Express 的响应参数
   */
  async update(req, res) {
    // 调用 Service 层对应的业务处理方法
    const updater = getClassSettedKey(new Categorie(req.body));
    delete updater._id;

    await categoryService.update(req.params.id, updater);
    res.send({ok: true});
  }
}

// 导出 Controller 的实例
module.exports = new CategoryController();
