import { useState, useEffect } from 'react';
import '../../styles/studentIndex.scss';
import { Menu, Dropdown, Button, Modal, Divider } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useHistory, Link } from 'react-router-dom';
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
    <Menu.Item>
      <Link className="link" to="/student/chance/independent">自主选课</Link>
    </Menu.Item>
  </Menu>
)
const Index = (props) => {
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
  const [Message, setMessage] = useState();
  const [announce, setAnnounce] = useState();
  const [active, setActive] = useState();
  // const [page, setPage] = useState(0);
  useEffect(() => {
    axios.get('/api/get/student').then((res) => {
      let data = res?.data?.student;
      for (let i = 0; i < data.length; i++) {
        if (isLogin == data[i].netID) {
          setMessage(data[i]);
        }
      }
    });
    axios.post('/api/get/announce', { page: 0 }).then((res) => {
      setAnnounce(res.data.announce);
    });
    axios.post('/api/get/active', { page: 0 }).then((res) => {
      setActive(res.data.active);
    });
  }, []);

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
          <div className="message">
            <div>学号：{Message?.netID}</div>
            <div>专业：{Message?.major}</div>
            <div>姓名：{Message?.name}</div>
          </div>
        </div>
        <div className="announce">
          <div className="head">
            <div className="title">通知公告</div>
            <Link to="/student/announce">
              <Button type="text" className="more">更多</Button>
            </Link>
          </div>
          <div>
            {
              (announce || []).map((item, index) => {
                return (
                  <Link className="link" to={{ pathname: "/student/announce/detail", state: { id: item.id } }}>
                    <div className="title" key={index}>
                      {item.title}
                      <Divider className="divider" />
                    </div>
                  </Link>
                )
              })
            }
          </div>
        </div>
        <div className="announce">
          <div className="head">
            <div className="title">教务动态</div>
            <Link to={{ pathname: '/student/active', state: { id: 1 } }}>
              <Button type="text" className="more">更多</Button>
            </Link>
          </div>
          <div>
            {
              (active || []).map((item, index) => {
                return (
                  <Link className="link" to={{ pathname: "/student/active/detail", state: { id: item.id } }}>
                    <div className="title" key={index}>
                      {item.title}
                      <Divider className="divider" />
                    </div>
                  </Link>
                )
              })
            }
          </div>
        </div>
      </div>
    );
  } else {
    countDown();
    return null
  }
}
export default Index;
