import NewsPublish from '../../../components/publish-manage/NewsPublish';
import usePub from '../../../components/publish-manage/usePub';
import { Button } from 'antd';

export default function Published() {
  const { dataSource, handlePublish } = usePub(2)
  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={(id) => <Button type="primary" danger onClick={() => handlePublish(id)}>下线</Button>}
      ></NewsPublish>
    </div>
  );
}
