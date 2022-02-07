# 项目来源

https://github.com/LianglzNice/forum

# 项目初始化

## 前端

进入 /client 文件夹

使用 yarn 安装相关依赖包
```bash
yarn install
```

安装完后运行，待编译完成打开 http://localhost:3000/ 即可访问网页
```bash
yarn start
```

关于访问服务端：部分代码有问题，登录用不了，可直接跳转，路由在 clinet\src\components\app.js 查看

## 后端

进入 /server 文件夹

使用 yarn 安装相关依赖包
```bash
yarn install
```

安装完后运行，后端访问地址 localhost:8080
```bash
node app.js
```

# 关于改进

1. 修复代码（修改一些弃置的语法，修改路由形式等），同时将样式修改为青训营
2. 各板块新增“官方”tag筛选
3. 右边栏新增基于获赞数的用户排名
4. 实现视频页面