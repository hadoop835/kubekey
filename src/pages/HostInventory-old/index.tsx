import { hostInventory } from '@/services/hosts/hostInventory';
import { ProFormRadio, ProFormSwitch, ProList } from '@ant-design/pro-components';
import { Progress, Tag } from 'antd';
import { useEffect, useState } from 'react';

const data1 = [
  '语雀的天空',
  'Ant Design',
  '蚂蚁金服体验科技',
  'TechUI',
  'TechUI 2.0',
  'Bigfish',
  'Umi',
  'Ant Design Pro',
].map((item) => ({
  title: item,
  subTitle: <Tag color="#5BD8A6">语雀专栏</Tag>,
  actions: [<a key="run">添加主机</a>, <a key="delete">移除主机</a>],
  avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
  content: (
    <div
      style={{
        flex: 1,
      }}
    >
      <div
        style={{
          width: 200,
        }}
      >
        <div>发布中</div>
        <Progress percent={80} />
      </div>
    </div>
  ),
}));

const HostInventory: React.FC = () => {
  const [cardActionProps, setCardActionProps] = useState<'actions' | 'extra'>('extra');

  const [ghost, setGhost] = useState<boolean>(false);

  const [currentRow, setCurrentRow] = useState([]);

  useEffect(() => {
    hostInventory({}).then((msg) => {
      if (msg.data) {
        const data = msg.data.map((item: API.hostInventoryListItem, index: number) => ({
          key: index,
          title: item.name,
          subTitle: item.owner,
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
          content: (
            <div
              style={{
                flex: 1,
              }}
            >
              <div
                style={{
                  width: 200,
                }}
              >
                <div>
                  {item.tags?.map((item, index) => (
                    <Tag key={index} color="#5BD8A6">
                      {item}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          ),
          actions: [<a key="run">添加主机</a>, <a key="delete">移除主机</a>],
        }));
        setCurrentRow(data);
      }
    });
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#eee',
        margin: -24,
        padding: 24,
      }}
    >
      <ProFormRadio.Group
        label="actions 放置的地方"
        options={[
          {
            label: '设置为 action',
            value: 'actions',
          },
          {
            label: '设置为 extra',
            value: 'extra',
          },
        ]}
        fieldProps={{
          value: cardActionProps,
          onChange: (e) => setCardActionProps(e.target.value),
        }}
      />
      <ProFormSwitch
        label="幽灵模式"
        fieldProps={{
          checked: ghost,
          onChange: (e) => setGhost(e),
        }}
      />
      <ProList<any>
        ghost={ghost}
        itemCardProps={{
          ghost,
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
        }}
        showActions="hover"
        rowSelection={{}}
        grid={{ gutter: 16, column: 2 }}
        onItem={(record: any) => {
          return {
            onMouseEnter: () => {
              console.log(record);
            },
            onClick: () => {
              console.log(record);
            },
          };
        }}
        metas={{
          title: {},
          subTitle: {},
          type: {},
          avatar: {},
          content: {},
          actions: {
            cardActionProps,
          },
        }}
        headerTitle="主机组"
        dataSource={currentRow}
      />
    </div>
  );
};

export default HostInventory;
