import { Form, Input, Button, Radio, Modal, Message } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import '../styles/Login.scss';
import axios from 'axios';
import '../mock/mock';
import { useHistory } from 'react-router-dom';

const FormItem = Form.Item;

const Login = () => {
  const history = useHistory();
  // 登录
  const onFinish = (values) => {
    if (values.select === 'student') {
      axios.get("/api/get/student").then((res) => {
        const data = res?.data?.student;
        for (let index = 0; index < data.length; index++) {
          if (values.netID == data[index].netID && values.password == data[index].password) {
            localStorage.setItem('id', values.netID);
            history.push({
              pathname: '/student/index',
            });
            return;
          } else {
            if (index === data.length - 1) {
              let secondsToGo = 3;
              const modal = Modal.error({
                content: `用户名或密码错误`,
                centered: true,
                footer: false,
                okText: '确定'
              });
              modal.footer = null;
              setTimeout(() => {
                modal.destroy();
              }, secondsToGo * 1000);
            }
          }
        };
      });
    } else if (values.select === 'teacher') {
      axios.get("/api/get/teacher").then((res) => {
        const data = res?.data?.teacher;
        for (let index = 0; index < data.length; index++) {
          if (values.netID == data[index].netID && values.password == data[index].password) {
            localStorage.setItem('id', values.netID);
            history.push({
              pathname: '/teacher/index',
            });
            return;
          } else {
            if (index === data.length - 1) {
              let secondsToGo = 3;
              const modal = Modal.error({
                content: `用户名或密码错误`,
                centered: true,
                footer: false,
                okText: '确定'
              });
              modal.footer = null;
              setTimeout(() => {
                modal.destroy();
              }, secondsToGo * 1000);
            }
          }
        };
      });
    } else {
      axios.get("/api/get/admin").then((res) => {
        const data = res?.data?.admin;
        if (values.netID == data.netID && values.password == data.password) {
          localStorage.setItem('id', values.netID);
          history.push({
            pathname: '/admin/index',
          });
          return;
        } else {
          let secondsToGo = 3;
          const modal = Modal.error({
            content: `用户名或密码错误`,
            centered: true,
            footer: false,
            okText: '确定'
          });
          modal.footer = null;
          setTimeout(() => {
            modal.destroy();
          }, secondsToGo * 1000);
        };
        // console.log(res);
      });
    }
  };
  // 有必填项未填
  const onFinishFailed = () => {
    Message.error('请确认是否填写完成', 3)
  };
  return (
    <div className="login">
      <Form
        className="form"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <FormItem className="title">登录</FormItem>
        <FormItem
          name="netID"
          rules={[{ required: true, message: '请输入学号或职工号!' }]}
        >
          <Input
            placeholder="请输入学号或职工号"
            prefix={<UserOutlined />}
          />
        </FormItem>

        <FormItem
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password
            placeholder="请输入密码"
            prefix={<UnlockOutlined />}
          />
        </FormItem>
        <FormItem
          name="select"
          rules={[{ required: true, message: '请选择账号类型!' }]}
          initialValue="student"
        >
          <Radio.Group value="student" className="radio" name="radiogroup">
            <Radio value="student" className="radio">学生</Radio>
            <Radio value="teacher" className="radio">教师</Radio>
            {/* <Radio value="admin" className="radio">管理员</Radio> */}
          </Radio.Group>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" block>
            登录
        </Button>
        </FormItem>
      </Form>
    </div>
  );
}
export default Login;
