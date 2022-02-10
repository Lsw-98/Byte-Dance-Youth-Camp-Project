// 使用 larkcloud 调用轻服务功能
const inspirecloud = require('@byteinspire/inspirecloud-api');
const ObjectId = inspirecloud.db.ObjectId;

// 使用轻服务 roles 表
// 若用户未创建，在发送第一条调用时会自动创建该表
const roleTable = inspirecloud.db.table('roles');

class Role {
  _id;
  roleName; // string
  roleType; // number
  rights; // array

  constructor(params) {
    const { _id, roleName, roleType, rights } = params;

    _id===undefined?this._id=null:this._id=ObjectId(_id);
    roleName===undefined?this.roleName=null:this.roleName=roleName;
    roleType===undefined?this.roleType=null:this.roleType=roleType;
    rights===undefined?this.rights=null:this.rights=rights;
  }
};

const initRoleTable = async () => {
  if ((await roleTable.where().findOne())===null) {
    const roles = roleTable.create([
      {
        "roleName": "超级管理员",
        "roleType": 1,
        "rights": [
          "/user-manage/add",
          "/user-manage/delete",
          "/user-manage/update",
          "/user-manage/list",
          "/right-manage",
          "/right-manage/role/list",
          "/right-manage/right/list",
          "/right-manage/role/update",
          "/right-manage/role/delete",
          "/right-manage/right/update",
          "/right-manage/right/delete",
          "/news-manage",
          "/news-manage/list",
          "/news-manage/add",
          "/news-manage/update/:id",
          "/news-manage/preview/:id",
          "/news-manage/draft",
          "/news-manage/category",
          "/audit-manage",
          "/audit-manage/audit",
          "/audit-manage/list",
          "/publish-manage",
          "/publish-manage/unpublished",
          "/publish-manage/published",
          "/publish-manage/sunset",
          "/user-manage",
          "/home"
        ]
      },
      {
        "roleName": "区域管理员",
        "roleType": 2,
        "rights": [
          "/home",
          "/user-manage",
          "/user-manage/add",
          "/user-manage/delete",
          "/user-manage/update",
          "/user-manage/list",
          "/news-manage",
          "/news-manage/list",
          "/news-manage/add",
          "/news-manage/update/:id",
          "/news-manage/preview/:id",
          "/news-manage/draft",
          "/news-manage/category",
          "/audit-manage",
          "/audit-manage/audit",
          "/audit-manage/list",
          "/publish-manage",
          "/publish-manage/unpublished",
          "/publish-manage/published",
          "/publish-manage/sunset"
        ]
      },
      {
        "roleName": "区域编辑",
        "roleType": 3,
        "rights": [
          "/home",
          "/news-manage",
          "/news-manage/list",
          "/news-manage/add",
          "/news-manage/update/:id",
          "/news-manage/preview/:id",
          "/news-manage/draft",
          "/audit-manage",
          "/audit-manage/list",
          "/publish-manage",
          "/publish-manage/unpublished",
          "/publish-manage/published",
          "/publish-manage/sunset"
        ]
      }
    ]);

    console.info('initiate roles table...', await roleTable.save(roles));
  }
}

// 导出 table 实例
module.exports = {
  roleTable,
  Role,
  initRoleTable
};
