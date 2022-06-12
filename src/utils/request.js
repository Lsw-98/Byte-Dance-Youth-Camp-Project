export const request = ({
  url,
  method = 'post',
  data,
  headers = {},
  onProgress,
  requestList,
}) => {
  return new Promise((resolve, reject) => {
    // 新建一个XHR对象
    const xhr = new XMLHttpRequest();
    /**
     * 初始化一个请求
     * open(请求方法，请求路径，是否使用异步请求=true)
     * 
     * URL针对当前代码的相对路径，也可以使用绝对路径
     * 调用open并不会发送一个真正的请求，而是启动一个请求以备发送
     * 受到同源策略限制
     * 第三个参数如果设置为false，直到收到答复之前不会返回
     */
    xhr.open(method, url);
    // 设置请求头
    Object.keys(headers).forEach((key) =>
      xhr.setRequestHeader(key, headers[key])
    );
    // 上传进度
    xhr.upload.onprogress = onProgress;
    // 发送http请求
    xhr.send(data);

    // 请求成功时调用的函数
    xhr.onload = (e) => {
      // 状态码为200
      if (e.currentTarget.status === 200) {
        if (requestList && requestList.length > 0) {
          let itemIndex = requestList.findIndex(
            (item) => item === xhr
          );
          requestList.splice(itemIndex, 1);

        }
        resolve({          
          data: e.target.response,
        });
      } else {
        reject(new Error('上传失败'));
      }
    };
    xhr.onerror = () => {
      reject(new Error('网络好像出问题啦~'));
    };

    requestList?.push(xhr);
  });
};
