import { useState, useEffect } from 'react';
import '../../styles/teacher/Index.scss';
import { Menu, Dropdown, Button, Divider } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import CountDown from '../public/countdown'


const Index = () => {
  const history = useHistory();
  let isLogin = localStorage.getItem('id') || false;
  const logout = () => {
    localStorage.removeItem("id");
    history.push('/');
  }
  const [Message, setMessage] = useState();
  const [announce, setAnnounce] = useState();
  const [active, setActive] = useState();
  useEffect(() => {
    axios.get('/api/get/teacher').then((res) => {
      let data = res?.data?.teacher;
      console.log(data);
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
          <Link to="/teacher/message" className="link">
            <div className="drop">信息查询</div>
          </Link>
          <Link to="/teacher/class" className="link">
            <div className="drop">课程查询</div>
          </Link>
          <Link to="/teacher/active" className="link">
            <div className="drop">教研信息查询</div>
          </Link>
          <Button type="text" className="logOut" onClick={logout}>退出</Button>
        </div>
        <div className="content">
          <div className="message">
            <div>姓名：{Message?.name}</div>
            <div>年龄：{Message?.age}</div>
            <div>院系：{Message?.belong}</div>
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
                  <Link key={index} className="link" to={{ pathname: "/student/announce/detail", state: { id: item.id } }}>
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
                  <Link key={index} className="link" to={{ pathname: "/student/active/detail", state: { id: item.id } }}>
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
    CountDown();
    return null
  }
}
export default Index;
