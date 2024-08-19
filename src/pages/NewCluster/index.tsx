import { PageContainer, ProCard, StepsForm } from '@ant-design/pro-components';
import { Card } from 'antd';
import React from 'react';
import Hosts from './components/Hosts';

const NewCluster: React.FC<Record<string, any>> = () => {
  return (
    <PageContainer>
      <Card bordered={false}>
        <StepsForm
          stepsProps={{
            size: 'small',
            type: 'navigation',
          }}

          // submitter={{
          //   render: ({ props, dom }) => {
          //     if (props.step === 2) {
          //       return null;
          //     }
          //     return dom;
          //   },
          // }}
        >
          <StepsForm.StepForm title="主机设置">
            <Hosts></Hosts>
          </StepsForm.StepForm>
          <StepsForm.StepForm title="基本信息">
            <ProCard
              title="源和目标"
              bordered
              headerBordered
              collapsible
              style={{
                marginBlockEnd: 16,
                width: '70vw',
              }}
            ></ProCard>
          </StepsForm.StepForm>
          <StepsForm.StepForm title="ETCD 设置"></StepsForm.StepForm>
          <StepsForm.StepForm title="网络设置"></StepsForm.StepForm>
          <StepsForm.StepForm title="镜像仓库设置"></StepsForm.StepForm>
          <StepsForm.StepForm title="确认"></StepsForm.StepForm>
        </StepsForm>
      </Card>
    </PageContainer>
  );
};

export default NewCluster;
