import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormGroup,
  ProFormList,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Table, TableProps, Tag, Typography, message } from 'antd';
import { useState } from 'react';
import { connect } from 'umi';
import { Host } from '../data';

const Hosts: React.FC = (props: any) => {
  const [sshAuthModel, setsshAuthModel] = useState('password');
  const [tableVisible, setTableVisible] = useState(false);

  // const actionRef = useRef<ActionType>();

  const handleSshAuthModelChange = (e: any) => {
    setsshAuthModel(e.target.value);
  };

  const handleEdit = () => {
    setTableVisible(true);
  };

  const handleDelete = (key: React.Key) => {
    console.log(key);
  };

  const handleUpdateHosts = (value: any) => {
    const host: any = {
      name: value.name,
      address: value.address,
      internalAddress: value.internalAddress,
      port: value.port,
      roles: value.roles,
      arch: value.arch,
      labels: value.labels,
      user: value.user,
      password: value.sshPassword,
      key: value.sshKey,
    };

    props.dispatch({ type: 'cluster/addHost', payload: host });
    setTimeout(() => {}, 1000);
    console.log('hosts', props);
  };

  // const checkHostName = (_, value) => {
  //   let duplicateHostName = false;

  //   cluster.spec.hosts.map((oldHost) => {
  //     if (oldHost.name === value) {
  //       duplicateHostName = true;
  //     }
  //     return duplicateHostName;
  //   });
  //   if (duplicateHostName) {
  //     return Promise.reject('主机名已存在');
  //   }
  //   return Promise.resolve();
  // };

  // const hosts = (cluster) => {
  //   let hostsList: Host[] = [];
  //   cluster.spec.hosts.map((host: Host[]) => {
  //     hostsList.push({
  //       key: host.name,
  //       name: host.name,
  //       address: host.address,
  //       internalAddress: host.internalAddress,
  //       port: host.port,
  //       user: host.user,
  //       password: host.password,
  //       privateKey: host.privateKey,
  //       arch: host.arch,
  //       labels: toLabelsList(host),
  //       roles: getRoles(configuration.spec.roleGroups, host.name),
  //     });
  //     return hostsList;
  //   });
  //   return hostsList;
  // };

  const columns: TableProps<Host>['columns'] = [
    {
      title: '节点名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'SSH 地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '主机 IP',
      dataIndex: 'internalAddress',
      key: 'internalAddress',
    },
    {
      title: '角色',
      key: 'roles',
      dataIndex: 'roles',
      render: (_, { roles }) => (
        <>
          {roles.map((role) => {
            let color = 'green';
            let name = '';
            switch (role) {
              case 'controlPlane':
                color = '#00a871';
                name = '控制平面节点';
                break;
              case 'worker':
                name = '工作节点';
                break;
              default:
                name = '工作节点';
            }

            return (
              <Tag color={color} key={role}>
                {name}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: '标签',
      key: 'labels',
      dataIndex: 'labels',
      render: (_, { labels }) =>
        labels === undefined ? (
          <></>
        ) : (
          <>
            {labels.map((label) => {
              let color = 'geekblue';
              return (
                <Tag color={color} key={label.key}>
                  {label.key}={label.value}
                </Tag>
              );
            })}
          </>
        ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link onClick={() => handleEdit()}>编辑</Typography.Link>
          <Popconfirm
            title="确定删除该主机?"
            onConfirm={() => handleDelete(record.name)}
            okText="是"
            cancelText="否"
          >
            <a href=" ">删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const inputSSHAuth = (sshAuthMode: string) => {
    switch (sshAuthMode) {
      case 'password':
        return (
          <ProFormText.Password
            width="md"
            name="sshPassword"
            label="SSH 密码"
            placeholder="请输入密码"
            rules={[{ required: true, message: '请输入密码!' }]}
          />
        );
      case 'key':
        return (
          <ProFormTextArea
            width="md"
            name="sshKey"
            label="SSH 密钥"
            placeholder="请输入密钥"
            rules={[{ required: true, message: '请输入密钥!' }]}
          />
        );
    }
  };

  return (
    <>
      <div>
        <Button
          type="primary"
          onClick={() => {
            setTableVisible(true);
          }}
        >
          <PlusOutlined />
          新建节点
        </Button>
      </div>
      <ModalForm<{
        name: string;
        company: string;
      }>
        title="节点信息"
        autoFocusFirstInput
        modalProps={{
          destroyOnClose: true,
          onCancel: () => {
            setTableVisible(false);
          },
        }}
        open={tableVisible}
        submitTimeout={2000}
        onFinish={async (value) => {
          handleUpdateHosts(value);
          setTableVisible(false);
          message.success('添加成功');
          return true;
        }}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            label="节点名称"
            tooltip="节点名称不允许使用大写字母"
            placeholder="请输入名称"
            rules={[
              { required: true, message: '请输入主机名!' },
              {
                pattern: /^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$/,
                message:
                  '主机名只允许包含小写字母、数字、 "-" 、".", 并且开头与结尾必须是小写字母或数字',
              },
            ]}
          />
          <ProFormRadio.Group
            name="arch"
            layout="horizontal"
            label="节点 CPU 架构"
            options={[
              {
                label: 'AMD64',
                value: 'amd64',
              },
              {
                label: 'AMD64',
                value: 'arm64',
              },
            ]}
            rules={[{ required: true, message: '请选择 CPU 架构!' }]}
          ></ProFormRadio.Group>
        </ProForm.Group>
        <ProFormGroup>
          <ProFormText
            width="md"
            name="internalAddress"
            label="主机 IP 地址"
            placeholder="请输入地址"
            rules={[
              { required: true, message: '请输入主机 IP 地址!' },
              {
                pattern:
                  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
                message: '请输入正确的 ip 地址',
              },
            ]}
          />
          <ProFormCheckbox.Group
            name="roles"
            layout="horizontal"
            label="节点角色"
            options={[
              {
                label: '控制平面',
                value: 'controlPlane',
              },
              {
                label: '工作节点',
                value: 'worker',
              },
            ]}
            rules={[{ required: true, message: '请选择节点角色!' }]}
          ></ProFormCheckbox.Group>
        </ProFormGroup>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="address"
            label="SSH 地址"
            rules={[{ required: true, message: '请输入 SSH 地址!' }]}
          />
          <ProFormDigit
            width="md"
            name="port"
            label="SSH 端口"
            min={0}
            max={65535}
            initialValue={22}
            placeholder="请输入"
            rules={[{ required: true, message: '请输入 SSH 端口!' }]}
          />
        </ProForm.Group>
        <ProFormGroup>
          <ProFormText
            width="md"
            name="user"
            label="SSH 用户"
            tooltip="该用户应具有 sudo 权限"
            initialValue="root"
            rules={[{ required: true, message: '请输入 SSH 用户!' }]}
          />
          <ProFormRadio.Group
            name="sshAuthMode"
            label="SSH 认证模式"
            radioType="button"
            options={[
              {
                label: '密码',
                value: 'password',
              },
              {
                label: '密钥',
                value: 'key',
              },
            ]}
            initialValue={sshAuthModel}
            fieldProps={{
              onChange: handleSshAuthModelChange,
            }}
          />
        </ProFormGroup>

        {inputSSHAuth(sshAuthModel)}
        <ProFormList
          name="labels"
          label="节点标签"
          creatorButtonProps={{
            creatorButtonText: '添加标签',
          }}
        >
          <ProFormGroup>
            <ProFormText key="key" name="key" placeholder="key" />
            <ProFormText key="value" name="value" placeholder="value" />
          </ProFormGroup>
        </ProFormList>
      </ModalForm>
      <div style={{ width: '70vw' }}>
        <Table columns={columns} dataSource={props.cluster.cluster.hosts} />
      </div>
    </>
  );
};

// export default Hosts;

// const mapStateToProps = (state: any) => {
//   return {
//     count: state.count,
//   };
// };

// export default connect(mapStateToProps)(Hosts);

export default connect((cluster) => (console.log(cluster), { cluster }))(Hosts);
