const { newsTable } = require('../models/newsTable');
const { roleTable } = require('../models/roleTable');
const { categoryTable } = require('../models/categoryTable');
const inspirecloud = require('@byteinspire/inspirecloud-api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * NewsService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含新闻的增删改查功能
 */
class NewsService {
  /**
   * 根据搜索参数搜索新闻
   * @param params 用于搜索新闻的相关条件
   * @param sortKey 用于排序的key
   * @param limitNum 限制返回数据个数
   * @return {Promise<Array<any>>} 返回新闻数组
   */
  async search(params, sortKey, limitNum) {
    const all = await newsTable.where(params).sort(sortKey).limit(limitNum).find();
    return all;
  }

  /**
   * 根据搜索参数搜索新闻，并嵌入其他信息
   * @param params 用于搜索新闻的相关条件
   * @param sortKey 用于排序的key
   * @param limitNum 限制返回数据个数
   * @param expand 嵌入信息数组
   * @return {Promise<Array<any>>} 返回用户数组
   */
  async searchWithOthers(params, sortKey, limitNum, expand) {
    const all = await this.search(params, sortKey, limitNum);

    for (const news of all) {
      for (const expandParam of expand) {
        if (expandParam==='role') {
          const role = await roleTable.where({ _id: ObjectId(news.roleId) }).findOne();
          news.role = role;
        } else if (expandParam==='category') {
          const category = await categoryTable.where({ _id: ObjectId(news.categoryId) }).findOne();
          news.category = category;
        }
      }
    }

    return all;
  }

  /**
   * 创建一个新闻
   * @param news 用于创建新闻的数据，原样存进数据库
   * @return {Promise<any>} 返回实际插入数据库的数据，会增加_id，createdAt和updatedAt字段
   */
  async create(news) {
    return await newsTable.save(news);
  }

  /**
   * 删除一个新闻
   * @param id 新闻的 _id
   * 若不存在，则抛出 404 错误
   */
  async delete(id) {
    const result = await newsTable.where({_id: ObjectId(id)}).delete();
    if (result.deletedCount===0) {
      const error = new Error(`user:${id} not found`);
      error.status = 404;
      throw error;
    }
  }

  /**
   * 更新一个新闻
   * @param id 新闻的 _id
   * @param updater 将会用原对象 merge 此对象进行更新
   * 若不存在，则抛出 404 错误
   */
  async update(id, updater) {
    const news = await newsTable.where({_id: ObjectId(id)}).findOne();
    if (!news) {
      const error = new Error(`news:${id} not found`);
      error.status = 404;
      throw error;
    }
    Object.assign(news, updater);
    await newsTable.save(news);
  }
}

// 导出 Service 的实例
module.exports = new NewsService();
