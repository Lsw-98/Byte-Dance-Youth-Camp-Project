// 使用 larkcloud 调用轻服务功能
const inspirecloud = require('@byteinspire/inspirecloud-api');
const ObjectId = inspirecloud.db.ObjectId;

// 使用轻服务 categories 表
// 若用户未创建，在发送第一条调用时会自动创建该表
const categoryTable = inspirecloud.db.table('categories');

class Categorie {
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

const initCategoryTable = async () => {
  if ((await categoryTable.where().findOne())===null) {
    const categories = categoryTable.create([
      {
        "title": "时事新闻",
        "value": "时事新闻"
      },
      {
        "title": "环球经济",
        "value": "环球经济"
      },
      {
        "title": "科学技术",
        "value": "科学技术"
      },
      {
        "title": "军事世界",
        "value": "军事世界"
      },
      {
        "title": "世界体育",
        "value": "世界体育"
      },
      {
        "title": "生活理财",
        "value": "生活理财"
      }
    ]);

    console.info('initiate categories table...', await categoryTable.save(categories));
  }
}

// 导出 table 实例
module.exports = {
  categoryTable,
  Categorie,
  initCategoryTable
};
