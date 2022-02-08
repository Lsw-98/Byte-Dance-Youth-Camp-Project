import NewsPublish from '../../../components/publish-manage/NewsPublish';
import usePub from '../../../components/publish-manage/usePub';
import { Button } from 'antd';

export default function Unpublished() {

  const { dataSource, handleUnPublish } = usePub(1)

  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={(id) => <Button type='primary' onClick={() => handleUnPublish(id)}>发布</Button>}
      ></NewsPublish>
    </div>
  );
}
