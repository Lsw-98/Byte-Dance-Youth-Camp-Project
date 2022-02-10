// 使用 larkcloud 调用轻服务功能
const inspirecloud = require('@byteinspire/inspirecloud-api');
const ObjectId = inspirecloud.db.ObjectId;

// 使用轻服务 regions 表
// 若用户未创建，在发送第一条调用时会自动创建该表
const regionTable = inspirecloud.db.table('regions');

class Region {
  _id;
  title; // string
  value; // string

  constructor(params) {
    const { _id, title, value } = params;
    _id===undefined?this._id=null:this._id=ObjectId(_id);
    title===undefined?this.title=null:this.title=title;
    value===undefined?this.value=null:this.value=value;
  }
}

const initRegionTable = async () => {
  if ((await regionTable.where().findOne())===null) {
    const regions = regionTable.create([
      {
        "title": "亚洲",
        "value": "亚洲"
      },
      {
        "title": "欧洲",
        "value": "欧洲"
      },
      {
        "title": "北美洲",
        "value": "北美洲"
      },
      {
        "title": "南美洲",
        "value": "南美洲"
      },
      {
        "title": "非洲",
        "value": "非洲"
      },
      {
        "title": "大洋洲",
        "value": "大洋洲"
      },
      {
        "title": "南极洲",
        "value": "南极洲"
      }
    ]);

    console.info('initiate regions table...', await regionTable.save(regions));
  }
}

// 导出 table 实例
module.exports = {
  regionTable,
  Region,
  initRegionTable
};
