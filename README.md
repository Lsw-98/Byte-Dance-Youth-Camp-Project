# 项目复盘
## 路由权限控制
1. 用户登录     
首先在登录界面输入用户名密码后提交表单，先通过输入的内容向后台发起请求，获取，然后对表单长度进行验证，如果表单长度为0，则说明输入用户名密码错误，如果不为0，则表示输入正确，之后将用户名、密码和用户可以访问的路由字段等存储到`localstorage`中，以便之后进行路由权限控制，最后进行路由跳转，重定向到Home界面。

2. 渲染主页侧边栏     
首先请求所有的侧边栏与子侧边栏的数据保存到数组中；然后将localstorage中的用户角色字段和用户权限字段取出；对包含所有权限的数组进行遍历，如果localstorage既包含了对应用户的角色还包含了对应的权限字段，那么就认为该用户有当前权限，返回\<Route>标签。然后通过redux改变isLoading的状态，完成页面渲染

3. 对URL进行限制
本系统还对浏览器URL进行路由限制，若想访问没有权限访问的页面时，通过浏览器输入路径会返回403页面。


## 主页
1. 响应式布局
antd组件本身的响应式

2. 显示点赞最多与浏览最多     
这里主要是通过axios发送请求，加上请求条件。例如文章必须是已经审核通过的，降序排序，只请求6条数据等。最后配合antd组件进行渲染。

3. echarts图表

## 侧边栏收缩（折叠）
这里的侧边栏收缩是在两个组件（头部组件和侧边栏组件）之间进行数据传递，因为要通过父子组件传递props涉及太多组件，嵌套关系复杂，所以使用了Redux对侧边栏的收缩状态进行管理。

1. redux原理
- 首先通过点击按钮触发侧边栏收缩事件，然后调用mapDispatchToProps()将action对象传给store
- store自动调用reduce，将action对象传给state
- store通过subscribe()监听state的值是否发生变化，当state发生变化，store就可以调用getState()方法获取到最新的state
- 最后store通过mapStateToProps()方法将state映射到view中

2. withRouter
在侧边栏收缩后，可会进行功能切换，也涉及到了路由跳转，但侧边栏组件是一个非路由组件，所以使用了withRouter对侧边栏组件进行包裹。

## 多次运用数组的reduce、filter、slice等方法