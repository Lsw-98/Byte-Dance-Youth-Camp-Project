// 使用 larkcloud 调用轻服务功能
const inspirecloud = require('@byteinspire/inspirecloud-api');
const { roleTable } = require('./roleTable');
const { str2bool } = require('../utils/transform');

// 使用轻服务 todo 表
// 若用户未创建，在发送第一条调用时会自动创建该表
const userTable = inspirecloud.db.table('users');

class User {
  _id;
  username; // string
  password; // string
  roleState; // bool
  default; // bool
  region; // string
  roleId; // ObjectId

  constructor(params) {
    const { _id, username, password, roleState, region, roleId } = params;
    const dft = params.default;
    _id===undefined?this._id=null:this._id=_id;
    username===undefined?this.username=null:this.username=username;
    password===undefined?this.password=null:this.password=password;
    if (roleState===undefined) this.roleState=null;
    else {
      if (typeof(roleState)==='string') this.roleState=str2bool(roleState);
      else this.roleState=roleState;
    }
    if (dft===undefined) this.default=null;
    else {
      if (typeof(dft)==='string') this.default=str2bool(dft);
      else this.default=dft;
    }
    region===undefined?this.region=null:this.region=region;
    roleId===undefined?this.roleId=null:this.roleId=roleId;
  }
}

const initUserTable = async () => {
  if ((await userTable.where().findOne())===null) {
    const role = await roleTable.where({ "roleName": "超级管理员" }).findOne();
    const admin = userTable.create({
      "username": "admin",
      "password": "123456",
      "roleState": true,
      "default": true,
      "region": "",
      "roleId": role._id
    });

    console.info('initiate users table...', await userTable.save(admin));
  }
}

// 导出 table 实例
module.exports = {
  userTable,
  User,
  initUserTable
};
