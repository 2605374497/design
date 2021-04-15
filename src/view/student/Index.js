import react from 'react';
import '../../styles/studentIndex.scss';
import { Menu, Dropdown, Button, Modal } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const message = () => {
  console.log(1111);
}



const query = (
  <Menu>
    <Menu.Item onClick={message}>个人信息查询</Menu.Item>
    <Menu.Item>成绩查询</Menu.Item>
    <Menu.Item>学生课表查询</Menu.Item>
    <Menu.Item>重修课程重修</Menu.Item>
  </Menu>
);
const project = (
  <Menu>
    <Menu.Item>公选课</Menu.Item>
    <Menu.Item>自主选课</Menu.Item>
  </Menu>
)
const Index = () => {
  axios.get('/api/get/announce').then((res)=>{
    console.log(res);
  })
  const history = useHistory();
  let isLogin = localStorage.getItem('id') || false;
  const logout = () => {
    localStorage.removeItem("id");
    history.push('/');
  }
  const countDown = () => {
    let secondsToGo = 5;
    const modal = Modal.success({
      title: '您还未登录，请登录后访问！',
      content: ` ${secondsToGo} 秒后返回登录界面`,
    });
    const timer = setInterval(() => {
      secondsToGo -= 1;
      if (secondsToGo) {
        modal.update({
          content: ` ${secondsToGo}  秒后返回登录界面`,
        });
      } else {
        history.push('/');
      }
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  };
  let Message
  axios.get('/api/get/student').then((res)=>{
    res?.data?.student.every((item)=>{
      if(isLogin==item.netID){
        Message=item;
        console.log(Message);
      }
    })
  })
  if (isLogin) {
    return (
      <div className="studentIndex">
        <div className="top">
          <Dropdown arrow overlay={query}>
            <div className="drop">信息查询<DownOutlined /></div>
          </Dropdown>
          <Dropdown arrow overlay={project}>
            <div className="drop">选课<DownOutlined /></div>
          </Dropdown>
          <Button type="text" className="logOut" onClick={logout}>退出</Button>
        </div>
        <div className="content">

        </div>
      </div>
    );
  } else {
    countDown();
    return null
  }

}
export default Index;
