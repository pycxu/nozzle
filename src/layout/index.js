import { Link } from 'umi';
import { Layout, Menu, Divider } from 'antd';
import 'bootstrap/dist/css/bootstrap.css';

import { Component } from 'react';
import {
  DashboardOutlined,
  FileOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class SiderDemo extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider theme="light" width={256} style={{ minHeight: '100vh' }} collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="logo" style={{ height: '32px', background: '#fff', margin: '16px'}}>
              <Link to="/">
                <img src="https://style.csiro.au/WP_Partners/assets/img/data61-logo.png" style={{ height:'30px', marginRight: '89px'}} alt="cisco"/>
                <img src="https://www.unsw.edu.au/sites/default/files/UNSW_0.png" height={30} style={{visibility: this.state.collapsed ? 'hidden' : 'visible'}} alt="unsw"/>
              </Link>
          </div>
          <Divider/>
          <Menu  defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
            <SubMenu key="sub1" icon={<DashboardOutlined />} title="Dashboard">
              <Menu.Item key="1"><Link to="/dashboard/monitor">Monitor</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/dashboard/analysis">Analysis</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/dashboard/workplace">Workplace</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<FileOutlined />} title="About">
              <Menu.Item key="4"><Link to="/about/overview">Overview</Link></Menu.Item>
              <Menu.Item key="5"><Link to="/about/data">Data</Link></Menu.Item>
            </SubMenu>
          </Menu>
          <Divider/>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ background: '#fff', textAlign: 'center', padding: 0, height: '73px' }} />
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 560 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Project Nozzle ©2019 by UNSW</Footer>
        </Layout>
      </Layout>
    );
  }
}
