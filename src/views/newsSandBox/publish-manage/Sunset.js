import NewsPublish from '../../../components/publish-manage/NewsPublish';
import usePub from '../../../components/publish-manage/usePub';
import { Button } from 'antd';

export default function Subset() {
  const { dataSource, handleSunset } = usePub(3)
  return (
    <div>
      <NewsPublish
        dataSource={dataSource}
        button={(id) => <Button type="primary" danger onClick={() => handleSunset(id)}>删除</Button>}
      ></NewsPublish>
    </div>
  );
}
