const { childTable } = require('../models/childTable');
const inspirecloud = require('@byteinspire/inspirecloud-api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * ChildService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含权限子项的删改查功能
 */
class ChildService {
  /**
   * 列出全部权限子项
   * @return {Promise<Array<any>>} 返回权限子项数组
   */
  async listAll() {
    const all = await childTable.where().sort({ _id: 1 }).find();
    return all;
  }

  /**
   * 删除一个权限子项
   * @param id 权限子项的 _id
   * 若不存在，则抛出 404 错误
   */
  async delete(id) {
    const result = await childTable.where({_id: ObjectId(id)}).delete();
    if (result.deletedCount===0) {
      const error = new Error(`child:${id} not found`);
      error.status = 404;
      throw error;
    }
  }

  /**
   * 更新一个权限子项
   * @param id 权限子项的 _id
   * @param updater 将会用原对象 merge 此对象进行更新
   * 若不存在，则抛出 404 错误
   */
  async update(id, updater) {
    const child = await childTable.where({_id: ObjectId(id)}).findOne();
    if (!child) {
      const error = new Error(`child:${id} not found`);
      error.status = 404;
      throw error;
    }
    Object.assign(child, updater);
    await childTable.save(child);
  }
}

// 导出 Service 的实例
module.exports = new ChildService();
