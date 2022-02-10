const { categoryTable } = require('../models/categoryTable');
const inspirecloud = require('@byteinspire/inspirecloud-api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * CategoryService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含新闻类别的删改查功能
 */
class CategoryService {
  /**
   * 列出所有新闻类别
   * @return {Promise<Array<any>>} 返回新闻类别数组
   */
  async listAll() {
    const all = await categoryTable.where().sort({ _id: 1 }).find();
    return all;
  }

  /**
   * 删除一个新闻类别
   * @param id 新闻类别的 _id
   * 若不存在，则抛出 404 错误
   */
  async delete(id) {
    const result = await categoryTable.where({_id: ObjectId(id)}).delete();
    if (result.deletedCount===0) {
      const error = new Error(`role:${id} not found`);
      error.status = 404;
      throw error;
    }
  }

  /**
   * 更新一个新闻类别
   * @param id 新闻类别的 _id
   * @param updater 将会用原对象 merge 此对象进行更新
   * 若不存在，则抛出 404 错误
   */
  async update(id, updater) {
    const categorie = await categoryTable.where({_id: ObjectId(id)}).findOne();
    if (!categorie) {
      const error = new Error(`categorie:${id} not found`);
      error.status = 404;
      throw error;
    }
    Object.assign(categorie, updater);
    await categoryTable.save(categorie);
  }
}

// 导出 Service 的实例
module.exports = new CategoryService();
