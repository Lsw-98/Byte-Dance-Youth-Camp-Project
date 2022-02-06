# 项目初始化

## 前端

进入 /client 文件夹

使用 yarn 安装相关依赖包（ps：可以用 npm 安装，但我安装时报错所以改用 yarn）
```bash
yarn install
```

安装完后运行
```bash
yarn start
```

待编译完成打开 http://localhost:3000/ 即可访问网页

关于访问服务端：服务端地址设置不是如教程所说在 ./setupProxy.js，而是在 /util/http.js 中（已修改至 http://localhost:8080）

## 后端

安装 json-server（yarn 安装的二进制文件无法执行<.<）
```bash
npm i -g json-server
```

进入 /server 文件夹执行下列代码即可启动服务器，访问地址 http://localhost:8080/
```bash
json-server --watch db.json --port 8080
```

# 关于改进

暂无