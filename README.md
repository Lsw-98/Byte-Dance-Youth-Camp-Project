# 项目复盘
## 路由权限控制

Router表示的就是URL与组件之间的映射关系，这种映射是单向的，只能通过URL的变化来渲染对应的组件，Router的主要作用就是监听URL的变化，将pathname与对应的Route的path属性进行匹配，然后渲染对应的组件，保证了URL与视图的同步。

React-Router是基于history实现路由的，常用的有两种模式，BrowserRouter和HashRouter。
- BrowserRouter主要采用编程式的方式来实现路由，它的`push`和`replace`方法分别封装了history的`pushState`和`replaceState`方法，还有`go`、`back`、`forward`方法封装了`popState`方法。
- HashRouter通过history的location属性中的hash字段对页面进行渲染

React-Router的实现原理是使用`hashChange`方法，当hash值改变时，会触发window对象上的hashChange事件，通过`hashChange`监听`url`的变化，从而进行DOM操作来模拟页面跳转。

- \<Router>：选择\<Route>进行组件渲染
- \<Route>：根据path属性与url中的pathname进行匹配，匹配成功就渲染对应路由
- \<Link>：实现路由的点击跳转，最终被渲染为\<a>标签
- \<NavLink>：特殊的\<Link>，会在当前激活的路由上加上一个`active`类
- \<Switch>：指定只能匹配到一个路由
- exact：实现精准匹配
- \<Redirect>：路由重定向，多用在跳转到登录页

\<Link>和\<a>标签的区别：      
两者最终都被渲染为\<a>标签，都可以用于点击跳转，但在单页面应用中，由于所有的资源都是在页面第一次渲染时加载，所以当点击\<Link>标签后不会再去请求资源，而是在不刷新的情况下渲染对应的路由，而\<a>标签的在每次点击时都会去请求`href`属性对应的网络资源，所以会出现短暂的空白页现象，影响用户体验；而\<Link>标签会阻止\<a>标签的默认事件，直接进行页面跳转。

路由传参的方式：
- params
- query
- search
- state

Router v6新特性：
- 将\<Switch>改为\<Routes>
- 管理二级路由更加方便
- 新增了useNavigate，编程式路由
- 将\<Route>中的Component和render属性统一为element属性
- 传参使用useParams和useSearchParams

1. 用户登录     
首先在登录界面输入用户名密码后提交表单，先通过输入的内容向后台发起请求，获取，然后对表单长度进行验证，如果表单长度为0，则说明输入用户名密码错误，如果不为0，则表示输入正确，之后将用户名、密码和用户可以访问的路由字段等存储到`localstorage`中，以便之后进行路由权限控制，最后进行路由跳转，重定向到Home界面。

2. 渲染主页侧边栏     
首先请求所有的侧边栏与子侧边栏的数据保存到数组中；然后将localstorage中的用户角色字段和用户权限字段取出；对包含所有权限的数组进行遍历，如果localstorage既包含了对应用户的角色还包含了对应的权限字段，那么就认为该用户有当前权限，返回\<Route>标签。然后通过redux改变isLoading的状态，完成页面渲染。

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

1. redux

- 首先通过点击按钮触发侧边栏收缩事件，然后调用mapDispatchToProps()将action对象传给store
- store自动调用reduce，将action对象传给state
- store通过subscribe()监听state的值是否发生变化，当state发生变化，store就可以调用getState()方法获取到最新的state
- 最后store通过mapStateToProps()方法将state映射到view中

2. withRouter
在侧边栏收缩后，可会进行功能切换，也涉及到了路由跳转，但侧边栏组件是一个非路由组件，所以使用了withRouter对侧边栏组件进行包裹。

## 多次运用数组的map、reduce、filter、slice等方法

## 使用函数式组件，使用了大量钩子函数
在类组件中，可以使用state定义定义组件的属性和方法，还封装了生命周期函数，用于在组件的不同阶段执行不同的逻辑。但类组件难以拆分内部逻辑，耦合性高，可复用性差，所有就有了hooks。hooks赋予了函数式组件的state和生命周期等能力。

- useState：状态钩子，给组件提供内部状态
- useEffect：副作用钩子。useEffect接收两个参数，第二个参数是一个数组，里面传入props或state，第一个参数是副作用函数，当第二个参数中的数组中的值发生变化时，就会执行副作用函数。useEffect可以模拟生命周期函数，当数组中不传任何值时，useEffect相当于组件挂载的阶段，可以在里面执行一些消息订阅、发送请求和DOM操作，他在执行一次后就不会执行了。当数组中传入数据时，相当于组件更新的阶段，每次数组中的数据发生变化时，useEffect都会执行副作用函数，会执行多次。当useEffect的回调函数中使用return时，就是组件卸载阶段，return用于清除effect，可以在里面做取消消息订阅，取消请求等操作。
- useContext：共享钩子：用于组件间共享状态，可以解决逐层传递props的问题。
- useRef：用于获取组件的DOM实例，多用于获取\<input>、\<form>等带有输入类的标签，可以简单的获得到输入框输入的内容。
- useCallback：与shouldComponentUpdate()类似，在DOM更新之前触发，用于组件性能优化，传参类似于useEffect，useMemo的函数会在页面渲染的时候执行，而useEffect是在页面渲染后才执行。只有在数组中存储的变量发生变化时，useCallback()才会执行回调函数，可以减少局部页面渲染，提升性能。
- useMemo：与useCallback类似，用于性能优化，只有在依赖值改变时才会执行回调函数，有助于避免在每次渲染时都进行高开销的计算。

**useMemo和useCallback的区别**：     
useCallback和useMemo都是优化性能的手段，类似于类组件中的shouldComponentUpdate，useCallback和useMemo都会判断props和state是否变化，从而避免每次父组件render时都去渲染子组件。区别在于useCallback返回一个函数，当这个函数被当作组件使用时，可以避免每次更新都重新渲染该组件；useMemo返回一个值，避免每次渲染都要对值进行不必要的计算。

**useEffect和useLayoutEffect的区别**
useEffect是异步执行的，useLayoutEffect时同步执行的。useEffect的执行时机是浏览器渲染完成后，useLayoutEffect是浏览器真正把内容渲染到页面之前，与ComponentDidMount等价。若在useEffect的副作用函数中要操作DOM，可以使用useLayoutEffect，避免页面闪烁。

**React.PureComponent、useMemo和React.memo的区别**
React.PureComponent会浅比较prop和state，若比较前后prop和state没有变化，则可以减少渲染次数，提升效率。但React.PureComponent只会作浅层比较，对于有复杂结构的prop和state可能会比较出错。所以React.PureComponent只适用于prop和state比较简单的情况。

React.memo和React.PureComponent类似，React.PureComponent在类组件中使用，React.memo在函数式组件中使用。

useMemo根据数组中的prop和state的变化情况执行回调函数。

**useEffect和useMemo的区别**
useEffect会在DOM更新完后执行副作用函数；而useMemo会在页面渲染期间执行回调函数，useMemo可以在DOM改变时控制某些函数不被触发。

## 添加了复制文章添加版权的功能
添加了新功能，在文章详情中复制文章内容，得到的复制内容后添加文章版权信息。根据触发onCopy事件，判断当前是否有复制或剪切的内容，如果有则将文本转化为字符串，然后进行字符串拼接。
```js
const handleCopy = (event) => {
  // clipboardData 对象是为通过编辑菜单、快捷菜单和快捷键执行的编辑操作所保留的，也就是你复制或者剪切内容
  let clipboardData = event.clipboardData || window.clipboardData;
  // 如果未复制或者未剪切，则return出去
  if (!clipboardData) {
    return;
  }
  // Selection 对象，表示用户选择的文本范围或光标的当前位置。
  // 声明一个变量接收 -- 用户输入的剪切或者复制的文本转化为字符串
  let text = window.getSelection().toString();
  if (text) {
    // 如果文本存在，首先取消文本的默认事件
    event.preventDefault();
    clipboardData.setData('text/plain', text + '\n\n此文章版权归' + + '所有，转载请标明');
  }
}
```

## 添加了大文件上传功能
- 利用`File`从`Blob`继承的`slice`方法对文件进行切片
- 通过`web worker`利用`FileReader`和`spark-md5`生成文件的hash值
- `xhr`通过`formData`上传文件
- node.js + http模块
- fse处理文件
- `multiparty`处理`formData`

实现了如下功能：
1. 大文件切片
2. 暂停/恢复上传
3. 断点续传，记忆已上传的部分
4. 文件秒传

![128820298-db9a37e3-9be5-41f6-b558-92d0dc115566](https://user-images.githubusercontent.com/70066311/172969456-2c46df1c-88af-4880-91f1-258ecc2abf39.gif)

![128820450-4dbea09b-65e2-44af-ae5c-816d394675f7](https://user-images.githubusercontent.com/70066311/172973270-8cf4bdc9-b9ad-4e4b-abd3-51f6d15aa398.gif)

### 如何对文件进行切片
通过`Blob.prototype.slice`方法即可对文件进行切分，分片尽量不要太大，一般最大50M即可。

`Blob`对象表示一个不可变的、原始数据的类文件对象，它的数据可以按文本或二进制的格式进行读取。

`File`接口基于`Blob`，继承了`Blob`的功能。

### 为什么要计算文件的hash值
通过对文件的内容进行`md5`加密运算得出文件的`hash值`，文件的内容与`hash值`时一一对应的。当我们修改文件内容时，hash就会变化。通过判别文件hash，可以知道哪些文件或文件切片已上传完成。

![image](https://user-images.githubusercontent.com/70066311/173220022-297e6edc-317a-43a5-a4d1-eaed2f3b39ea.png)

### 如何合并文件
首先根据分片的路径和文件哈希值找到对应的分片数组，读取每个分片的路径名。然后在文件分片时会计算文件的哈希值，然后在每个分片名为文件的哈希值拼接上index。因为在网络传输中分片不一定会按顺序上传，所以在进行文件合并时要先对分片数组按照分片名的index进行排序，保证合并分片的正确性。最后创建一个遍历分片名数组，读取每个分片的内容，写入到一个文件中，将文件的哈希值作为该文件的名字。

### 如何计算分片的大小
初始化一个默认的分片大小（DEFAULT_CHUNK_SIZE，100k）和分片的最大数量（MAX_CHUNK_COUNT）。首先计算应该分片的数量，使用文件的大小除以默认分片大小，得到默认情况下的分片数量，如果分片的最大数量小于计算出的默认情况下的分片数量，那么就是用文件的大小除以最大分片数量，计算出实际的分片大小；如果分片的最大数量大于计算出的默认情况下的分片数量，则使用默认的分片大小。

### 如何上传文件
针对一些大文件上传，如果只使用一个线程，那么上传的速度会非常慢，在上传时随时会遇到网络问题，所以在上传文件时可以使用web worker开启辅助线程，帮助我们实现分片上传。首先根据spark-md5计算文件的哈希值（spark.end()就是文件的md5值）。然后使用`file.slice()`（基于blob的slice()）对文件进行切片，得到切片后的数组。遍历切片后的文件数组，存入`formData`中，使用`ajax`将`formData`传给服务器。实例化一个`web worker`对象，主线程调用`postmessage`，向`worker`发送分片。`postmessage`可以进行跨域。接着主线程通过worker.onmessage执行监听函数，接收处理结果，包括上传的进度、hash值等。等待上传成功服务器进行文件完整性检查，如果上传完整，则进行切片合并。

### 如何断点续传（网络波动或手动暂停）
首先会使用`xhr.abort()`中断上传请求，然后定义一个方法`shouldUpload`，该方法向后端发送一个`verify`验证请求，返回两个参数，一个应该要上传的文件`shouldUploadFile`，一个该文件已经上传完成的分片数组`uploadedChunks`。

针对已上传完成的分片，有两种情况：    
1. 上传进度100%
2. 上传进度没有100%，读取文件的偏移量从此位置继续读取文件数据块，上传到服务器从此偏移量继续写入文件即可。

### 如何实现秒传


### 如何实现刷新续传
