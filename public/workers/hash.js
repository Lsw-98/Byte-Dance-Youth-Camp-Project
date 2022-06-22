/* eslint-disable no-restricted-globals */
self.importScripts('/spark-md5.min.js');

// self代表子线程自身
self.onmessage = (e) => {
	const { fileChunks } = e.data;
	const spark = new self.SparkMD5.ArrayBuffer();

	let percentage = 0,
		count = 0;

	const loadNext = (index) => {
		// 新建reader对象
		const reader = new FileReader();
		// 读取每个文件切片
		reader.readAsArrayBuffer(fileChunks[index].fileChunk);
		reader.onload = (e) => {
			count++;
			// 将得到的buffer数据写入到spark中
			spark.append(e.target.result);
			if (count === fileChunks.length) {
				self.postMessage({
					percentage: 100,
					// end代表已经处理完成，并读取这个hash值
					hash: spark.end(),
				});
				// 上传文件，关闭worker
				self.close();
			} else {
				// 计算文件百分比
				percentage += 100 / fileChunks.length;
				self.postMessage({
					percentage,
				});
				loadNext(count);
			}
		};
	};

	loadNext(0);
};
