import { useState, useEffect } from 'react';
import '../../styles/teacher/Index.scss';
import { Button, Divider, Modal, Form, Input, Message } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import CountDown from '../public/countdown';


const Index = () => {
  const history = useHistory();
  let isLogin = localStorage.getItem('id') || false;
  const logout = () => {
    localStorage.removeItem("id");
    history.push('/');
  }
  const [teacherMessage, setTeacherMessage] = useState();
  const [announce, setAnnounce] = useState();
  const [active, setActive] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [bool, setBool] = useState(true);
  const [pwd, setPwd] = useState(false);
  const [type, setType] = useState('show');
  useEffect(() => {
    axios.get('/api/get/teacher').then((res) => {
      let data = res?.data?.teacher;
      for (let i = 0; i < data.length; i++) {
        if (isLogin == data[i].netID) {
          setTeacherMessage(data[i]);
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
  const Handle = () => {
    setIsVisible(false);
  }
  const search = () => {
    setIsVisible(true);
  }
  const change = () => {
    setPwd(true);
  }
  const hidden = () => {
    setPwd(false);
  }
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const set = (values) => {
    if (values?.newPwd == values?.pwdAgain && values?.newPwd != '') {
      axios.post('/api/set/password', { tid: isLogin, password: values?.password, newPwd: values?.newPwd }).then((res) => {
        if (res?.data.msg == 0) {
          Message.error('旧密码错误,请重试', 3);
        } else {
          Message.success('修改成功，请返回登录页面', 3);
          localStorage.removeItem('id');
          history.push('/');
        }
      })
    } else {
      Message.error('两次密码输入不一致', 3);
    }
  }
  const message = (values) => {
    if (type == 'show') {
      setBool(false);
      setType('edit')
    } else {
      axios.post('/api/teacher/setMessage', { values: values, tid: isLogin }).then((res) => {
        // console.log(res);
        setBool(true);
        setType('show')
      })
    }
  }
  if (isLogin) {
    // console.log(Message);
    return (
      <div className="studentIndex">
        <div className="top">
          {/* <Link to="/teacher/message" className="link"> */}
          <div className="drop" onClick={search}>信息查询</div>
          <div className="drop" onClick={change}>修改密码</div>
          {/* </Link> */}
          <Link to="/teacher/class" className="link">
            <div className="drop">课程查询</div>
          </Link>
          <Button type="text" className="logOut" onClick={logout}>退出</Button>
        </div>
        <div className="content">
          <div className="message">
            <div>姓名：{teacherMessage?.name}</div>
            <div>年龄：{teacherMessage?.age}</div>
            <div>院系：{teacherMessage?.belong}</div>
          </div>
        </div>
        <div className="announce">
          <div className="head">
            <div className="title">通知公告</div>
            <Link to="/teacher/announce">
              <Button type="text" className="more">更多</Button>
            </Link>
          </div>
          <div>
            {
              (announce || []).map((item, index) => {
                return (
                  <Link key={index} className="link" to={{ pathname: "/teacher/announce/detail", state: { id: item.id } }}>
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
            <Link to={{ pathname: '/teacher/active', state: { id: 1 } }}>
              <Button type="text" className="more">更多</Button>
            </Link>
          </div>
          <div>
            {
              (active || []).map((item, index) => {
                return (
                  <Link key={index} className="link" to={{ pathname: "/teacher/active/detail", state: { id: item.id } }}>
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
          title="信息"
          visible={isVisible}
          onCancel={Handle}
          footer={[]}
          // okText='确定'
          width={window.screen.width * 0.4}
        >
          <Form
            className="form"
            {...layout}
            // name="name"
            initialValues={{ remember: true }}
            onFinish={message}
            style={{ margin: 0 }}
          >
            <Form.Item
              label="ID"
              name="netID"
              className="appraise"
              initialValue={teacherMessage ? teacherMessage?.netID : ''}
            >
              <Input placeholder="请输入ID" disabled />
            </Form.Item>
            <Form.Item
              label="姓名"
              name="name"
              className="appraise"
              initialValue={teacherMessage ? teacherMessage?.name : ''}
            >
              <Input placeholder="请输入姓名" disabled />
            </Form.Item>
            <Form.Item
              name="belong"
              label="院系"
              className="appraise"
              initialValue={teacherMessage ? teacherMessage?.belong : ''}
            >
              <Input placeholder="请输入院系" disabled />
            </Form.Item>

            <Form.Item
              label="年龄"
              name="age"
              className="appraise"
              initialValue={teacherMessage ? teacherMessage?.age : ''}
            >
              <Input placeholder="请输入年龄" disabled />
            </Form.Item>
            <Form.Item
              label="性别"
              name="sex"
              className="appraise"
              initialValue={teacherMessage ? teacherMessage?.sex == 1 ? '男' : '女' : ''}
            >
              <Input placeholder="" disabled />
            </Form.Item>
            <Form.Item
              name="email"
              label="邮箱"
              className="appraise"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
              initialValue={teacherMessage ? teacherMessage?.email : ''}
            >
              <Input placeholder="请输入院系" disabled={bool} />
            </Form.Item>

            <Form.Item
              label="联系方式"
              name="phone"
              className="appraise"
              rules={[{
                required: true,
                message: '电话号码格式错误!',
                pattern: /^1[0-9]{10}$/
              }]}
              initialValue={teacherMessage ? teacherMessage?.phone : ''}
            >
              <Input placeholder="请输入年龄" disabled={bool} />
            </Form.Item>
            <Form.Item
              label="地址"
              name="address"
              className="appraise"
              initialValue={teacherMessage ? teacherMessage?.address : ''}
            >
              <Input placeholder="" disabled={bool} />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 24 }}>
              {
                type == 'show' ? <Button type="primary" htmlType="submit" block>编辑</Button> :
                  <Button type="primary" htmlType="submit" block>确定</Button>
              }

            </Form.Item>
          </Form>
        </Modal>

        <Modal
          maskClosable={false}
          title="修改密码"
          visible={pwd}
          onCancel={hidden}
          footer={[]}
          // okText='确定'
          width={window.screen.width * 0.4}
        >
          <Form
            className="form"
            {...layout}
            // name="teacher"
            initialValues={{ remember: true }}
            onFinish={set}
            style={{ margin: 0 }}
          >
            <Form.Item
              label="旧密码"
              name="password"
              className="appraise"
            // initialValue={''}
            >
              <Input.Password placeholder="请输入旧密码" />
            </Form.Item>
            <Form.Item
              label="新密码"
              name="newPwd"
              className="appraise"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder="请输入新密码" />
            </Form.Item>
            <Form.Item
              name="pwdAgain"
              label="确认密码"
              className="appraise"
            // initialValue={''}
            >
              <Input.Password placeholder="请确认密码" />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button type="primary" htmlType="submit" block>确定</Button>
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
