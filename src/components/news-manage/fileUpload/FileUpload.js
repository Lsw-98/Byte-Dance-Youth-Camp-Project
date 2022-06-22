import './index.css';
import { Upload, Button, Row, Col, Progress, Divider } from 'antd';
import {
  UploadOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import { useMemo, useRef, useState } from 'react';
import { request } from '../../../utils/request';
import toast, { Toaster } from 'react-hot-toast';

const UPLOAD_STATES = {
  INITIAL: 0,
  HASHING: 1,
  UPLOADING: 2,
  PAUSED: 3,
  SUCCESS: 4,
  FAILED: 5,
};

function FileUpload() {
  // 上传的文件
  const [file, setFile] = useState(null);
  // hash计算百分比
  const [hashPercent, setHashPercent] = useState(0);
  // 分片
  const [chunks, setChunks] = useState([]);
  // 当前上传状态
  const [uploadState, setUploadState] = useState(UPLOAD_STATES.INITIAL);
  // 文件哈希
  const fileHashRef = useRef(null);
  // 暂停请求
  const pendingRequest = useRef([]);
  // 上传文件的个数
  const toastId = useRef(null);
  // 每个分片的默认大小，100K
  const DEFAULT_CHUNK_SIZE = 100 * 1024;
  // 最多分片数
  const MAX_CHUNK_COUNT = 15;

  // 在上传中不能选择文件
  const disableSelectFile =
    uploadState === UPLOAD_STATES.HASHING ||
    uploadState === UPLOAD_STATES.PAUSED ||
    uploadState === UPLOAD_STATES.UPLOADING;

  // 计算当前上传百分比
  const totalPercent = useMemo(() => {
    if (!file || chunks.length < 1) return 0;
    const loaded = chunks
      .map((item) => item.chunk.size * item.percent)
      .reduce((acc, cur) => acc + cur);

    return (loaded / file.size).toFixed(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chunks]);

  // 计算文件分片的大小
  const fileChunkSize = useMemo(() => {
    if (!file) return;
    const chunkCount = Math.ceil(file.size / DEFAULT_CHUNK_SIZE);
    if (chunkCount > MAX_CHUNK_COUNT) {
      return Math.ceil(file.size / MAX_CHUNK_COUNT);
    } else {
      return DEFAULT_CHUNK_SIZE;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  // 上传文件之前的钩子，参数为上传的文件
  const beforeUpload = (file) => {
    reset()

    setFile(file)
    // 若返回 false 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，
    return false
  }

  const reset = () => {
    setUploadState(UPLOAD_STATES.INITIAL);
    setHashPercent(0);
    setChunks([]);
    fileHashRef.current = null;
  }

  // 判断当前文件是否已上传和当前文件已上传的切片
  const shouldUpload = async (fileHash, fileName) => {
    const { data } = await request({
      url: 'http://localhost:8080/verify',
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        fileHash,
        fileName,
      }),
    })

    // data包含当前文件是否已上传和当前文件已上传的切片
    return JSON.parse(data)
  }

  const upload = async () => {
    try {
      if (!file) return;

      if (uploadState === UPLOAD_STATES.INITIAL) {

        toastId.current = toast.loading('分片...');
        // 得到文件的切片列表
        const fileChunkList = createChunks(file, fileChunkSize);

        setUploadState(UPLOAD_STATES.HASHING);
        toast.loading('计算文件hash...', { id: toastId.current });
        // 得到上传文件的hash值
        fileHashRef.current = await computeHash(fileChunkList);

        /**
         * 遍历每个切片，给每个切片都附上哈希值
         * fileHash：为切片的文件的哈希值
         * chunk：切片的大小及类型
         * hash：每个切片的哈希值
         * percent：当前上传进度
         */
        const primaryFileChunks = fileChunkList.map(
          ({ fileChunk }, index) => ({
            fileHash: fileHashRef.current,
            chunk: fileChunk,
            hash: `${fileHashRef.current}_${index}`,
            percent: 0,
          })
        );
        setChunks(primaryFileChunks);
      }

      setUploadState(UPLOAD_STATES.UPLOADING);

      toast.loading('分片上传中...', { id: toastId.current });

      const { shouldUploadFile, uploadedChunks } = await shouldUpload(
        fileHashRef.current,
        file.name
      );

      // 如果文件上传成功
      if (!shouldUploadFile) {
        setUploadState(UPLOAD_STATES.SUCCESS);
        toast.success('文件秒传成功！', { id: toastId.current });
        setChunks((preChunks) => {
          return preChunks.map((item) => ({
            ...item,
            percent: 100,
          }));
        });
        return;
      }

      // 设置切片数组
      let chunkArr = [];
      setChunks((preChunks) => {
        chunkArr = preChunks.map(
          ({ fileHash, chunk, hash, percent }) => ({
            fileHash,
            chunk,
            hash,
            // 判断当前当前进度
            percent: uploadedChunks.includes(hash) ? 100 : percent,
          })
        );
        return chunkArr;
      });

      // 等待上传完毕，有可能出现网络错误或暂停上传
      await uploadChunks(chunkArr, uploadedChunks);
    } catch (err) {
      // 显示错误信息
      toast.error(`${err}`, { id: toastId.current })
      // 将上传状态改为失败
      setUploadState(UPLOAD_STATES.FAILED)
    }
  };

  // 上传切片
  const uploadChunks = async (chunks, uploadedChunks = []) => {
    if (chunks.length < 1) return;

    let reqList = chunks
      // 这里遍历chunks数组，chunks数组中包括所有的分片信息，将uploadedChunks（已上传完成的分片）过滤掉，剩下的就是未上传完成的分片
      .filter(({ hash }) => !uploadedChunks.includes(hash))
      .map(({ chunk, hash, fileHash }) => {
        // 利用formDate完成文件上传
        let formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('hash', hash);
        formData.append('fileHash', fileHash);
        formData.append('filename', file.name);
        return { formData, hash };
      })
      .map(({ formData, hash }) => {
        return request({
          url: 'http://localhost:8080',
          data: formData,
          onProgress: createProgressHandler(hash),
          requestList: pendingRequest.current,
        })
      })

    // 并发上传切片
    await Promise.all(reqList);

    if (reqList.length + uploadedChunks.length === chunks.length) {
      // 发送合并请求
      toast.loading('合并文件分片...', { id: toastId.current });
      await mergeRequest();
      setUploadState(UPLOAD_STATES.SUCCESS);
      toast.success('文件已上传', { id: toastId.current });
    } else {
      toast.error('上传失败', { id: toastId.current });
      setUploadState(UPLOAD_STATES.FAILED);
    }
  };

  // 计算切片上传的进度
  const createProgressHandler = (hash) => {
    const chunk = chunks.find((item) => item.hash === hash);
    const initialPercent = chunk?.percent || 0;

    return (e) => {
      setChunks((preChunks) => {
        let preChunk = preChunks.find((item) => item.hash === hash);
        preChunk.percent =
          initialPercent +
          (e.loaded / e.total) * (100 - initialPercent);
        return [...preChunks];
      });
    };
  };

  // 合并文件
  const mergeRequest = async () => {
    await request({
      url: 'http://localhost:8080/merge',
      headers: {
        'content-type': 'application/json',
      },
      data: JSON.stringify({
        fileHash: fileHashRef.current,
        fileName: file.name,
        chunkSize: fileChunkSize,
      }),
    });
  };

  // 创建分片
  const createChunks = (file, chunkSize = DEFAULT_CHUNK_SIZE) => {
    const fileChunkList = []
    let cur = 0;
    while (cur < file.size) {
      // 对文件按照分片大小进行切片
      fileChunkList.push({ fileChunk: file.slice(cur, cur + chunkSize) })
      cur += chunkSize
    }
    // 返回切片过后的列表
    return fileChunkList
  }

  // 暂停上传
  const handlePauseUpload = () => {
    setUploadState(UPLOAD_STATES.PAUSED);
    toast('暂停上传', { id: toastId.current });

    // 如果还有请求，就中止请求
    pendingRequest.current.forEach((xhr) => xhr?.abort());
    pendingRequest.current = [];
  };

  // 恢复上传
  const handleResumeUpload = async () => {
    try {
      setUploadState(UPLOAD_STATES.UPLOADING);
      toast.loading('分片上传中...', { id: toastId.current });

      const { uploadedChunks } = await shouldUpload(
        // 文件的哈希引用
        fileHashRef.current,
        // 文件名称
        file.name
      );

      // chunks：包括文件的哈希，切片的哈希，切片上传进度
      // uploadedChunks：已上传完成的切片
      uploadChunks(chunks, uploadedChunks);
    } catch (err) {
      toast.error(`${err}`, { id: toastId.current });
      setUploadState(UPLOAD_STATES.FAILED);
    }
  };

  // 取消文件上传
  const clearFile = () => {
    setFile(null);
    reset();
  };

  // 利用 web worker 计算文件哈希值
  const computeHash = (fileChunks) => {
    return new Promise((resolve, reject) => {
      // 创建一个Worker
      const hashWorker = new Worker('/workers/hash.js');
      hashWorker.postMessage({ fileChunks });
      hashWorker.onmessage = (e) => {
        const { percentage, hash } = e.data;

        setHashPercent(percentage.toFixed(2));
        if (hash) {
          // 返回hash值
          resolve(hash);
        }
      };
    });
  };

  // 格式化单位
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (bytes / Math.pow(k, i)).toFixed(dm) + ' ' + sizes[i];
  };

  // 文件上传状态
  const showStatus = (percent) => {
    if (percent === 0) {
      if (uploadState === UPLOAD_STATES.FAILED)
        return (
          <>
            <CloseCircleFilled />
            {` 连接异常`}
          </>
        );
      else return `等待上传...`;
    }
    if (percent === 100) {
      return <CheckCircleFilled />;
    }
    switch (uploadState) {
      case UPLOAD_STATES.PAUSED:
        return `已暂停 [${percent.toFixed(2)}%]`;
      case UPLOAD_STATES.UPLOADING:
        return `上传中 [${percent.toFixed(2)}%]`;
      case UPLOAD_STATES.FAILED:
        return (
          <>
            <CloseCircleFilled />
            {` 上传失败`}
          </>
        );

      default:
        return;
    }
  };


  const renderChunks = () => {
    return chunks.map((chunk) => (
      <Row key={chunk.hash}>
        <Col span={10} className='center'>
          {chunk.hash}
        </Col>
        <Col span={4} className='center'>
          {formatBytes(chunk.chunk.size)}
        </Col>
        <Col span={10} className='center'>
          <Progress
            percent={chunk.percent}
            format={showStatus}
            status={
              uploadState === UPLOAD_STATES.FAILED &&
                chunk.percent < 100
                ? 'exception'
                : ''
            }
            strokeColor={
              uploadState === UPLOAD_STATES.FAILED &&
                chunk.percent < 100 &&
                chunk.percent > 0
                ? ''
                : {
                  '0%': '#ffc107',
                  '100%': '#87d068',
                }
            }
            style={{ width: '75%' }}
          />
        </Col>
      </Row>
    ));
  };

  return (
    <>
      <Toaster
        toastOptions={{
          loading: {
            style: {
              background: '#3c3c3c',
              color: '#fff',
            },
          },
        }}
      />
      <div className='container'>
        <Row gutter={[16, 16]} justify='space-between'>
          <Col>
            <Upload
              showUploadList={false}
              beforeUpload={beforeUpload}
              maxCount={1}
              disabled={disableSelectFile}
            >
              <Button
                disabled={disableSelectFile}
                icon={<UploadOutlined />}
              >
                选择文件
              </Button>
            </Upload>
            {file && (
              <>
                <span className='file-selected'>{`${file.name}`}</span>
                <span className='file-selected-size'>{`[${formatBytes(
                  file.size
                )}]`}</span>
              </>
            )}
          </Col>
          <Col>
            <Button
              type='primary'
              onClick={upload}
              style={{ marginRight: '8px' }}
              disabled={
                !file ||
                (uploadState !== UPLOAD_STATES.INITIAL &&
                  uploadState !== UPLOAD_STATES.FAILED)
              }
            >
              上传
            </Button>
            {(uploadState === UPLOAD_STATES.SUCCESS ||
              uploadState === UPLOAD_STATES.FAILED) && (
                <Button type='primary' onClick={clearFile}>
                  清空
                </Button>
              )}
            {uploadState === UPLOAD_STATES.UPLOADING && (
              <Button type='primary' onClick={handlePauseUpload}>
                暂停
              </Button>
            )}
            {uploadState === UPLOAD_STATES.PAUSED && (
              <Button type='primary' onClick={handleResumeUpload}>
                恢复
              </Button>
            )}
          </Col>
        </Row>
        <Divider />
        {!!file && (
          <>
            <Row>
              <Col span={24}>计算文件hash进度：</Col>
              <Col span={24}>
                <Progress percent={hashPercent} />
              </Col>
            </Row>
            <Divider />
          </>
        )}

        {chunks.length > 0 && (
          <>
            <Row>
              <Col span={4}>上传总进度：</Col>
              <Col span={20}>
                <Progress
                  percent={totalPercent}
                  steps={chunks.length}
                  strokeColor='#52c41a'
                />
              </Col>
            </Row>
            <Divider />
            <Row>
              <Col span={10} className='center'>
                切片Hash
              </Col>
              <Col span={4} className='center'>
                大小
              </Col>
              <Col span={10} className='center'>
                上传进度
              </Col>
            </Row>
          </>
        )}

        {renderChunks()}
      </div>
    </>
  );
}

export default FileUpload;
