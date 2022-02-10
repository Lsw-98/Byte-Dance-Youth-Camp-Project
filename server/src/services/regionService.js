const { regionTable } = require('../models/regionTable');
const inspirecloud = require('@byteinspire/inspirecloud-api');
const ObjectId = inspirecloud.db.ObjectId;

/**
 * RegionService
 * Service 是业务具体实现，由 Controller 或其它 Service 调用
 * 包含地区的查功能
 */
class RegionService {
  /**
   * 列出全部地区
   * @return {Promise<Array<any>>} 返回地区数组
   */
  async listAll() {
    const all = await regionTable.where().find();
    return all;
  }
}

// 导出 Service 的实例
module.exports = new RegionService();
