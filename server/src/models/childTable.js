// 使用 larkcloud 调用轻服务功能
const inspirecloud = require('@byteinspire/inspirecloud-api');
const ObjectId = inspirecloud.db.ObjectId;

// 使用轻服务 children 表
// 若用户未创建，在发送第一条调用时会自动创建该表
const childTable = inspirecloud.db.table('children');

class Child {
  _id;
  title; // string
  key; // number
  pagepermisson; // number
  grade; // number

  constructor(params) {
    const { _id, title, key, pagepermisson, grade } = params;

    _id===undefined?this._id=null:this._id=ObjectId(_id);
    title===undefined?this.title=null:this.title=title;
    key===undefined?this.key=null:this.key=key;
    pagepermisson===undefined?this.pagepermisson=null:this.pagepermisson=pagepermisson;
    grade===undefined?this.grade=null:this.grade=grade;
  }
};

const initChildTable = async () => {
  if ((await childTable.where().findOne())===null) {
    const children = childTable.create([
      {
        "title": "添加用户",
        "key": "/user-manage/add",
        "grade": 2
      },
      {
        "title": "删除用户",
        "key": "/user-manage/delete",
        "grade": 2
      },
      {
        "title": "修改用户",
        "key": "/user-manage/update",
        "grade": 2
      },
      {
        "title": "用户列表",
        "key": "/user-manage/list",
        "pagepermisson": 1,
        "grade": 2
      },
      {
        "title": "角色列表",
        "key": "/right-manage/role/list",
        "pagepermisson": 1,
        "grade": 2
      },
      {
        "title": "权限列表",
        "key": "/right-manage/right/list",
        "pagepermisson": 1,
        "grade": 2
      },
      {
        "title": "修改角色",
        "key": "/right-manage/role/update",
        "grade": 2
      },
      {
        "title": "删除角色",
        "key": "/right-manage/role/delete",
        "grade": 2
      },
      {
        "title": "修改权限",
        "key": "/right-manage/right/update",
        "grade": 2
      },
      {
        "title": "删除权限",
        "key": "/right-manage/right/delete",
        "grade": 2
      },
      {
        "title": "新闻列表",
        "key": "/news-manage/list",
        "grade": 2
      },
      {
        "title": "撰写新闻",
        "key": "/news-manage/add",
        "grade": 2,
        "pagepermisson": 1
      },
      {
        "title": "新闻更新",
        "key": "/news-manage/update/:id",
        "grade": 2,
        "routepermisson": 1
      },
      {
        "title": "新闻预览",
        "key": "/news-manage/preview/:id",
        "grade": 2,
        "routepermisson": 1
      },
      {
        "title": "草稿箱",
        "key": "/news-manage/draft",
        "pagepermisson": 1,
        "grade": 2
      },
      {
        "title": "新闻分类",
        "key": "/news-manage/category",
        "pagepermisson": 1,
        "grade": 2
      },
      {
        "title": "审核新闻",
        "key": "/audit-manage/audit",
        "pagepermisson": 1,
        "grade": 2
      },
      {
        "title": "审核列表",
        "key": "/audit-manage/list",
        "pagepermisson": 1,
        "grade": 2
      },
      {
        "title": "待发布",
        "key": "/publish-manage/unpublished",
        "pagepermisson": 1,
        "grade": 2
      },
      {
        "title": "已发布",
        "key": "/publish-manage/published",
        "pagepermisson": 1,
        "grade": 2
      },
      {
        "title": "已下线",
        "key": "/publish-manage/sunset",
        "pagepermisson": 1,
        "grade": 2
      }
    ]);

    console.info('initiate children table...', await childTable.save(children));
  }
}

// 导出 table 实例
module.exports = {
  childTable,
  Child,
  initChildTable
};
