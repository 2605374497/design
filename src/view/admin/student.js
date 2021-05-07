import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/admin/student.scss';
import { Divider, Button, Input, Tag, Modal, Breadcrumb, Form, Message, Radio } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import Method from '../public/unit';
import Student from '../public/message';

const AdminStudent = () => {
  const [list, setList] = useState();
  const [detail, setDetail] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [isSet, SetIsSet] = useState(false);
  const Handle = () => {
    setIsVisible(false);
  }
  const hidden = () => {
    SetIsSet(false);
  }
  useEffect(() => {
    axios.get('/api/get/student').then((res) => {
      setList(res?.data?.student);
    })
  }, [])
  const show = (id) => {
    console.log(id, '--id');
    axios.post('/api/admin/student', { id: id }).then((res) => {
      setDetail(res?.data?.list);
      setIsVisible(true);
    })
  }
  const set = () => {
    SetIsSet(true);
  }
  const search = (values) => {
    axios.post('/api/admin/searchstudent', { id: values }).then((res) => {
      setList(res?.data?.list);
      // console.log(res);
    })
    // console.log(values);
  }
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const layout1 = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  const finish = (values) => {
    // console.log(values);
    axios.post('/api/set/student', { values: values }).then((res) => {
      if (res?.data?.msg == "该id已存在") {
        Message.error(res?.data?.msg, 3);
      } else {
        Message.success(res?.data?.msg, 3);
        setList(res?.data?.student);
        SetIsSet(false);
      }
    })
  }
  return (
    <div className="adminStudent">
      <div className="container">
        <div className='top'>
          <div className="head">当前栏目:</div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/admin/index' className="link">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/admin/student" className="link">学生列表</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider className="divider" />
        <div className="btn">
          <Button size="small" type="primary" onClick={set}>学生信息录入</Button>
        </div>
        <Divider className="divider" />
        <Input.Search
          // loading
          enterButton="查询"
          onSearch={search}
          placeholder="输入学生ID"
        />
        <Divider className="divider" />
        <Student list={list} type="student" show={show} />
        {
          isVisible && <Modal
            maskClosable={false}
            title="信息"
            visible={isVisible}
            onCancel={Handle}
            footer={[]}
            // okText='确定'
            width={window.screen.width * 0.3}
          >
            <Form
              className="form"
              {...layout}
              // name="name"
              initialValues={{ remember: true }}
              // onFinish={message}
              style={{ margin: 0 }}
            >
              <Form.Item
                label="ID"
                name="netID"
                className="appraise"
              // initialValue={detail ? detail?.netID : ''}
              >
                {/* <Input placeholder="请输入ID" disabled /> */}
                <Tag color='cyan'>{detail ? detail?.netID : ''}</Tag>
              </Form.Item>
              <Form.Item
                label="姓名"
                name="name"
                className="appraise"
                initialValue={detail ? detail?.name : ''}
              >
                <Input placeholder="请输入姓名" disabled />
              </Form.Item>
              <Form.Item
                name="belong"
                label="院系"
                className="appraise"
                initialValue={detail ? detail?.belong : ''}
              >
                <Input placeholder="请输入院系" disabled />
              </Form.Item>
              <Form.Item
                name="major"
                label="专业"
                className="appraise"
                initialValue={detail ? detail?.major : ''}
              >
                <Input placeholder="请输入专业" disabled />
              </Form.Item>
              <Form.Item
                label="年龄"
                name="age"
                className="appraise"
                initialValue={detail ? detail?.age : ''}
              >
                <Input placeholder="请输入年龄" disabled />
              </Form.Item>
              <Form.Item
                label="性别"
                name="sex"
                className="appraise"
                initialValue={detail ? detail?.sex == 1 ? '男' : '女' : ''}
              >
                <Input placeholder="" disabled />
              </Form.Item>
              <Form.Item
                label="地址"
                name="address"
                className="appraise"
                initialValue={detail ? detail?.address : ''}
              >
                <Input placeholder="" disabled />
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                className="appraise"
                initialValue={detail ? detail?.password : ''}
              >
                <Input placeholder="" disabled />
              </Form.Item>
              <Form.Item
                label="手机号"
                name="phone"
                className="appraise"
                initialValue={detail ? detail?.phone : ''}
              >
                <Input placeholder="" disabled />
              </Form.Item>
              <Form.Item
                name="email"
                label="邮箱"
                className="appraise"
                initialValue={detail ? detail?.email : ''}
              >
                <Input placeholder="请输入院系" disabled />
              </Form.Item>
            </Form>
          </Modal>
        }

        {
          isSet && <Modal
            maskClosable={false}
            title="信息"
            visible={isSet}
            onCancel={hidden}
            footer={[]}
            // okText='确定'
            width={window.screen.width * 0.4}
          >
            <Form
              className="form"
              {...layout1}
              // name="name"
              initialValues={{ remember: true }}
              onFinish={finish}
              style={{ margin: 0 }}
            >
              <Form.Item
                label="ID"
                name="netID"
                className="appraise"
                rules={[{ required: true, message: '请输入ID!' }]}
              // initialValue={detail ? detail?.netID : ''}
              >
                <Input placeholder="请输入ID" />
                {/* <Tag color='cyan'>{detail ? detail?.netID : ''}</Tag> */}
              </Form.Item>
              <Form.Item
                label="姓名"
                name="name"
                rules={[{ required: true, message: '请输入姓名!' }]}
                className="appraise"
              // initialValue={detail ? detail?.name : ''}
              >
                <Input placeholder="请输入姓名" />
              </Form.Item>
              <Form.Item
                name="belong"
                label="院系"
                rules={[{ required: true, message: '请输入院系!' }]}
                className="appraise"
              // initialValue={detail ? detail?.belong : ''}
              >
                <Input placeholder="请输入院系" />
              </Form.Item>
              <Form.Item
                name="major"
                label="专业"
                rules={[{ required: true, message: '请输入专业!' }]}
                className="appraise"
              // initialValue={detail ? detail?.major : ''}
              >
                <Input placeholder="请输入专业" />
              </Form.Item>
              <Form.Item
                label="年龄"
                name="age"
                className="appraise"
                rules={[{ required: true, message: '请输入年龄!' }]}
              // initialValue={detail ? detail?.age : ''}
              >
                <Input placeholder="请输入年龄" />
              </Form.Item>
              <Form.Item
                name="sex"
                rules={[{ required: true, message: '请选择性别!' }]}
                initialValue="student"
                label="性别"
              >
                <Radio.Group value="student" className="radio" name="radiogroup">
                  <Radio value="0" className="radio">女</Radio>
                  <Radio value="1" className="radio">男</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label="地址"
                name="address"
                rules={[{ required: true, message: '请输入地址!' }]}
                className="appraise"
              // initialValue={detail ? detail?.address : ''}
              >
                <Input placeholder="请输入地址" />
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                className="appraise"
                rules={[{ required: true, message: '请输入密码!' }]}
              // initialValue={detail ? detail?.password : ''}
              >
                <Input placeholder="请输入密码" />
              </Form.Item>
              <Form.Item
                label="手机号"
                name="phone"
                className="appraise"
                rules={[{
                  required: true,
                  message: '电话号码格式错误!',
                  pattern: /^1[0-9]{10}$/
                }]}
              // initialValue={detail ? detail?.phone : ''}
              >
                <Input placeholder="请输入手机号" />
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
              // initialValue={detail ? detail?.email : ''}
              >
                <Input placeholder="请输入邮箱" />
              </Form.Item>

              <Form.Item wrapperCol={{ span: 24 }}>
                <Button type="primary" htmlType="submit" block>录入</Button>
              </Form.Item>
            </Form>
          </Modal>
        }
      </div>
    </div>
  )
}

export default AdminStudent;