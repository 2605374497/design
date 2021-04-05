import react from 'react';
import '../../styles/studentIndex.scss';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';


const menu = (
  <Menu>
    <Menu.Item>个人信息查询</Menu.Item>
    <Menu.Item>成绩查询</Menu.Item>
    <Menu.Item>学生课表查询</Menu.Item>
    <Menu.Item>重修课程重修</Menu.Item>
  </Menu>
);

const Index = () => {
  return (
    <div className="studentIndex">
      <header className="top">
        <Dropdown arrow overlay={menu}>
          <div className="drop">信息查询<DownOutlined /></div>
        </Dropdown>
        <Dropdown arrow overlay={menu}>
          <div className="drop">选课<DownOutlined /></div>
        </Dropdown>
      </header>
    </div>
  )
}
export default Index;
