const { roleTable } = require('../models/roleTable');
const inspirecloud = require('@byteinspire/inspirecloud-api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * RoleService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含角色的删改查功能
 */
class RoleService {
  /**
   * 列出所有角色
   * @return {Promise<Array<any>>} 返回角色数组
   */
  async listAll() {
    const all = await roleTable.where().sort({ _id: 1 }).find();
    return all;
  }

  /**
   * 删除一个00角色
   * @param id 角色的 _id
   * 若不存在，则抛出 404 错误
   */
  async delete(id) {
    const result = await roleTable.where({_id: ObjectId(id)}).delete();
    if (result.deletedCount===0) {
      const error = new Error(`role:${id} not found`);
      error.status = 404;
      throw error;
    }
  }

  /**
   * 更新一个角色
   * @param id 角色的 _id
   * @param updater 将会用原对象 merge 此对象进行更新
   * 若不存在，则抛出 404 错误
   */
  async update(id, updater) {
    const role = await roleTable.where({_id: ObjectId(id)}).findOne();
    if (!role) {
      const error = new Error(`role:${id} not found`);
      error.status = 404;
      throw error;
    }
    Object.assign(role, updater);
    await roleTable.save(role);
  }
}

// 导出 Service 的实例
module.exports = new RoleService();
