const { userTable } = require('../models/userTable');
const { roleTable } = require('../models/roleTable');
const inspirecloud = require('@byteinspire/inspirecloud-api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * UserService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含角色的增删改查功能
 */
class UserService {
  /**
   * 根据搜索参数搜索用户
   * @param params 用于搜索用户的相关条件
   * @return {Promise<Array<any>>} 返回用户数组
   */
  async search(params) {
    const all = await userTable.where(params).find();
    return all;
  }

  /**
   * 根据搜索参数搜索用户，并嵌入角色
   * @param params 用于搜索用户的相关条件
   * @return {Promise<Array<any>>} 返回用户数组
   */
  async searchWithRole(params) {
    const all = await this.search(params);

    for (const user of all) {
      const role = await roleTable.where({ _id: ObjectId(user.roleId) }).findOne();
      user.role = role;
    }

    return all;
  }

  /**
   * 创建一个用户
   * @param user 用于创建用户的数据，原样存进数据库
   * @return {Promise<any>} 返回实际插入数据库的数据，会增加_id，createdAt和updatedAt字段
   */
  async create(user) {
    return await userTable.save(user);
  }

  /**
   * 删除一个用户
   * @param id 用户的 _id
   * 若不存在，则抛出 404 错误
   */
  async delete(id) {
    const result = await userTable.where({_id: ObjectId(id)}).delete();
    if (result.deletedCount===0) {
      const error = new Error(`user:${id} not found`);
      error.status = 404;
      throw error;
    }
  }

  /**
   * 更新一个用户
   * @param id 用户的 _id
   * @param updater 将会用原对象 merge 此对象进行更新
   * 若不存在，则抛出 404 错误
   */
  async update(id, updater) {
    const user = await userTable.where({_id: ObjectId(id)}).findOne();
    if (!user) {
      const error = new Error(`user:${id} not found`);
      error.status = 404;
      throw error;
    }
    Object.assign(user, updater);
    await userTable.save(user);
  }
}

// 导出 Service 的实例
module.exports = new UserService();
