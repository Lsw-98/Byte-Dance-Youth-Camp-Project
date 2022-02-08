import React, { useEffect } from 'react';
import SideMenu from '../../components/newsSendBox/SideMenu';
import TopHeader from '../../components/newsSendBox/TopHeader';
import NewsRouter from '../../components/newsSendBox/NewsRouter';
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// css
import './NewsSandBox.css'

// antd
import { Layout } from 'antd';

const { Content } = Layout;

export default function NewsSandBox() {
  NProgress.start()
  useEffect(() => {
    NProgress.done()
  })
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow: "auto",
          }}
        >
          <NewsRouter></NewsRouter>
        </Content>
      </Layout>
    </Layout >
  );
}
