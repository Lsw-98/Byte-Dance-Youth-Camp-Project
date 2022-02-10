本项目实现了一个“News Hub” 新闻管理中心。其中，前端基于 React + Redux + react-router-dom + Ant Design 搭建；后端基于轻服务 express 框架搭建。项目演示地址： 
https://qcigwi.app.cloudendpoint.cn

# 项目初始化

## 前端

进入 /client 文件夹

使用 yarn 安装相关依赖包
```bash
yarn install
```

安装完后运行
```bash
yarn start
```

待编译完成打开 http://localhost:3000/ 即可访问网页

关于访问服务端：服务端地址设置为 http://localhost:8080

## 后端

<!-- 安装 json-server
```bash
npm i -g json-server
```

进入 /server 文件夹执行下列代码即可启动服务器，访问地址 http://localhost:8080/
```bash
json-server --watch db.json --port 8080
``` -->

安装轻服务脚手架
```bash
yarn global add @byteinspire/cli
```

按照指示登录轻服务账号
```bash
inspire login
```

进入 /server 文件夹，按照指示初始化项目（选择以现有项目初始化，受邀进入轻服务团队后可关联团队项目）
```bash
inspire init
```

以开发环境运行
```bash
inspire dev
```

部署
```bash
inspire deploy -m "A Message"
```