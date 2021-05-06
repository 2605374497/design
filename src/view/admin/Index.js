import { useState, useEffect } from 'react';
import '../../styles/student/studentIndex.scss';
import { Menu, Dropdown, Button, Divider, Form, Input, Modal, Message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import CountDown from '../public/countdown'

const message = () => {
  // console.log(1111);
}


const Index = () => {
  const history = useHistory();
  let isLogin = localStorage.getItem('id') || false;
  const [announce, setAnnounce] = useState();
  const [isAnnounce, setIsAnnounce] = useState(false);
  const [active, setActive] = useState();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    axios.post('/api/get/announce', { page: 0 }).then((res) => {
      setAnnounce(res.data.announce);
    });
    axios.post('/api/get/active', { page: 0 }).then((res) => {
      setActive(res.data.active);
    });
  }, []);
  const logout = () => {
    localStorage.removeItem("id");
    history.push('/');
  }
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const addActive = (values) => {
    axios.post('/api/add/active',{values:values}).then((res)=>{
      setIsActive(false);
      axios.post('/api/get/active', { page: 0 }).then((res) => {
        setActive(res.data.active);
      });
    })
  }
  const showActive = () => {
    setIsActive(true);
  }
  const hidden = () => {
    setIsActive(false);
  }
  const showAnnounce=()=>{
    setIsAnnounce(true);
  }
  const announceHidden=()=>{
    setIsAnnounce(false);
  }
  const addAnnounce = (values) => {
    axios.post('/api/add/announce',{values:values}).then((res)=>{
      setIsAnnounce(false);
    })
  }
  if (isLogin) {
    return (
      <div className="studentIndex">
        <div className="top">
          <div className="drop" onClick={showActive}>添加教务动态</div>
          <div className="drop"  onClick={showAnnounce}>添加通知公告</div>
          <Button type="text" className="logOut" onClick={logout}>退出</Button>
        </div>
        <div className="announce">
          <div className="head">
            <div className="title">通知公告</div>
            <Link to="/admin/announce">
              <Button type="text" className="more">更多</Button>
            </Link>
          </div>
          <div>
            {
              (announce || []).map((item, index) => {
                return (
                  <Link key={index} className="link" to={{ pathname: "/admin/announce/detail", state: { id: item.id } }}>
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
            <Link to={{ pathname: '/admin/active', state: { id: 1 } }}>
              <Button type="text" className="more">更多</Button>
            </Link>
          </div>
          <div>
            {
              (active || []).map((item, index) => {
                return (
                  <Link key={index} className="link" to={{ pathname: "/admin/active/detail", state: { id: item.id } }}>
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
        <Modal
          maskClosable={false}
          title="添加教务动态"
          visible={isActive}
          onCancel={hidden}
          footer={[]}
          width={window.screen.width * 0.4}
        >
          <Form
            className="form"
            {...layout}
            initialValues={{ remember: false }}
            onFinish={addActive}
            style={{ margin: 0 }}
          >
            <Form.Item
              label="标题"
              name="title"
              className="appraise"
              rules={[{ required: true, message: '标题不能为空' }]}
            >
              <Input placeholder="请输入标题" />
            </Form.Item>
            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '内容不能为空' }]}
              className="appraise"
            >
              <Input.TextArea autoSize allowClear placeholder="请输入内容" />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit" block>添加</Button>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          maskClosable={false}
          title="添加通知公告"
          visible={isAnnounce}
          onCancel={announceHidden}
          footer={[]}
          width={window.screen.width * 0.4}
        >
          <Form
            className="form"
            {...layout}
            initialValues={{ remember: false }}
            onFinish={addAnnounce}
            style={{ margin: 0 }}
          >
            <Form.Item
              label="标题"
              name="title"
              className="appraise"
              rules={[{ required: true, message: '标题不能为空' }]}
            >
              <Input placeholder="请输入标题" />
            </Form.Item>
            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '内容不能为空' }]}
              className="appraise"
            >
              <Input.TextArea autoSize allowClear placeholder="请输入内容" />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit" block>添加</Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  } else {
    CountDown();
    return null
  }
}
export default Index;
