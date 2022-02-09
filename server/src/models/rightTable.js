// 使用 larkcloud 调用轻服务功能
const inspirecloud = require('@byteinspire/inspirecloud-api');
const { childTable } = require('./childTable');

// 使用轻服务 rights 表
// 若用户未创建，在发送第一条调用时会自动创建该表
const rightTable = inspirecloud.db.table('rights');

class Right {
  _id;
  title; // string
  key; // number
  pagepermisson; // number
  grade; // number

  constructor(params) {
    const { _id, title, key, pagepermisson, grade } = params;

    _id===undefined?this._id=null:this._id=_id;
    title===undefined?this.title=null:this.title=title;
    key===undefined?this.key=null:this.key=key;
    pagepermisson===undefined?this.pagepermisson=null:this.pagepermisson=pagepermisson;
    grade===undefined?this.grade=null:this.grade=grade;
  }
};

const initRightTable = async () => {
  if ((await rightTable.where().findOne())===null) {
    const children = await childTable.where().sort({ _id: 1 }).find();
  
    const rights = rightTable.create([
      {
        "title": "首页",
        "key": "/home",
        "pagepermisson": 1,
        "grade": 1,
        "children": []
      },
      {
        "title": "用户管理",
        "key": "/user-manage",
        "pagepermisson": 1,
        "grade": 1,
        "children": children.slice(0, 4)
      },
      {
        "title": "权限管理",
        "key": "/right-manage",
        "pagepermisson": 1,
        "grade": 1,
        "children": children.slice(4, 10)
      },
      {
        "title": "新闻管理",
        "key": "/news-manage",
        "pagepermisson": 1,
        "grade": 1,
        "children": children.slice(10, 16)
      },
      {
        "title": "审核管理",
        "key": "/audit-manage",
        "pagepermisson": 1,
        "grade": 1,
        "children": children.slice(16, 18)
      },
      {
        "title": "发布管理",
        "key": "/publish-manage",
        "pagepermisson": 1,
        "grade": 1,
        "children": children.slice(18)
      }
    ]);

    console.info('initiate rights table...', await rightTable.save(rights));
  }
}

// 导出 table 实例
module.exports = {
  rightTable,
  Right,
  initRightTable
};
