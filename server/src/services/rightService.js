const { rightTable } = require('../models/rightTable');
const { childTable } = require('../models/childTable');
const inspirecloud = require('@byteinspire/inspirecloud-api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * RightService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含权限的删改查功能
 */
class RightService {
  /**
   * 列出全部权限
   * @return {Promise<Array<any>>} 返回权限数组
   */
  async listAll() {
    const all = await rightTable.where().sort({ _id: 1 }).projection({ children: 0 }).find();
    return all;
  }

  /**
   * 列出全部权限并嵌入权限子项
   * @return {Promise<Array<any>>} 返回权限数组
   */
   async listAllWithChildren() {
    const all = await rightTable.where().sort({ _id: 1 }).populate('children').find();
    return all;
  }

  /**
   * 删除一个权限
   * @param id 权限的 _id
   * 若不存在，则抛出 404 错误
   */
  async delete(id) {
    const right = await rightTable.where({_id: ObjectId(id)}).populate('children').findOne();
    const children = right.children;

    const result = await rightTable.delete(right);
    if (result.deletedCount===0) {
      const error = new Error(`right:${id} not found`);
      error.status = 404;
      throw error;
    }
    // 级联删除
    await childTable.delete(children);
  }

  /**
   * 更新一个权限
   * @param id 权限的 _id
   * @param updater 将会用原对象 merge 此对象进行更新
   * 若不存在，则抛出 404 错误
   */
  async update(id, updater) {
    const right = await rightTable.where({_id: ObjectId(id)}).findOne();
    if (!right) {
      const error = new Error(`right:${id} not found`);
      error.status = 404;
      throw error;
    }
    Object.assign(right, updater);
    await rightTable.save(right);
  }
}

// 导出 Service 的实例
module.exports = new RightService();
