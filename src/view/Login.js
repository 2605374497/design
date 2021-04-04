import { Row, Col, Form, Input, Button, Radio } from 'antd';
import { UserOutlined, UnlockOutlined } from '@ant-design/icons';
import '../styles/Login.scss';
import axios from 'axios';
import '../mock/mock';

const FormItem = Form.Item;
function Login() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  axios.get("/api/get/student").then((res) => {
    console.log(res);
  });
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      className="form"
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}>
      <FormItem className="title">登录</FormItem>
      <FormItem
        name="username"
        rules={[{ required: true, message: '请输入学号!' }]}
      >
        <Input placeholder="请输入学号" prefix={<UserOutlined />} />
      </FormItem>

      <FormItem
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password placeholder="请输入密码" prefix={<UnlockOutlined />} />
      </FormItem>
      <FormItem
        name="code"
        rules={[{ required: true, message: '请输入验证码!' }]}
      >
        <Row gutter={13}>
          <Col span={15}>
            <Input placeholder="请输入验证码" prefix={<UnlockOutlined />} />
          </Col>
          <Col span={6}>
            <Button danger type="primary">获取验证码</Button>
          </Col>
        </Row>
      </FormItem>
      <FormItem
        name="select"
        rules={[{ required: true, message: '请选择账号类型!' }]}
        initialValue="student"
      >
        <Radio.Group value="student" className="radio" name="radiogroup">
          <Radio value="student" className="radio">学生</Radio>
          <Radio value="teacher" className="radio">教师</Radio>
        </Radio.Group>
      </FormItem>
      <FormItem>
        <Button type="primary" htmlType="submit" block>
          登录
        </Button>
      </FormItem>
    </Form>
  );
}
export default Login;
