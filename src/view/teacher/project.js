import { useState, useEffect } from 'react';
import ProjectContent from '../public/projectContent';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Divider, Steps, Modal, Form, Input, DatePicker, TimePicker, BackTop } from 'antd';
import { CheckCircleTwoTone, CloseCircleOutlined } from '@ant-design/icons';
import '../../styles/teacher/Project.scss';
import axios from 'axios';
import Method from '../public/unit';

const { RangePicker } = DatePicker;
const First = (props) => {
  const onFinish = (values) => {
    props.first(values);
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      // {...layout}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{ remember: true }}
      className="form"
    >
      <Form.Item
        name="name"
        label="课程名称"
        rules={[{ required: true, message: '请输入课程名称!' }]}
        initialValue={props?.firstContent?.name}
      >
        <Input placeholder="请输入课程名" />
      </Form.Item>
      <Form.Item
        name="description"
        label="课程简介"
        rules={[{ required: true, message: '请输入课程简介!' }]}
        initialValue={props?.firstContent?.description}
      >
        <Input placeholder="请输入课程简介" />
      </Form.Item>
      <Form.Item
        name="detail"
        label="课程详情"
        rules={[{ required: true, message: '请输入课程详情!' }]}
        initialValue={props?.firstContent?.detail}
      >
        <Input.TextArea maxLength={100} autoSize showCount placeholder="请输入课程详情" />
      </Form.Item>
      <Form.Item
        name="phone"
        label="联系电话"
        rules={[{
          required: true,
          message: '电话号码格式错误!',
          pattern: /^1[3|4|5|7|8][0-9]\d{8}$/
        }]}
        initialValue={props?.firstContent?.phone}
      >
        <Input placeholder="请输入联系电话" />
      </Form.Item>
      <Form.Item className="form-btn">
        <Button type="primary" htmlType="submit" className="next">下一步</Button>
      </Form.Item>
    </Form>
  )
};
const Second = (props) => {
  const onFinish = (values) => {
    props.second(values);
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const dateFormat = 'YYYY/MM/DD';
  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{ remember: true }}
      className="form"
    >
      <Form.Item
        name="signDate"
        label="报名时间"
        rules={[{ required: true, message: '请选择报名时间!' }]}
        initialValue={props?.secondContent?.signDate}
      >
        <RangePicker
          placeholder={['开始日期', '结束日期']}
          format={dateFormat}
        />
      </Form.Item>
      <Form.Item
        name="classDate"
        label="上课日期"
        rules={[{ required: true, message: '请选择上课日期!' }]}
        initialValue={props?.secondContent?.classDate}
      >
        <RangePicker
          placeholder={['开始日期', '结束日期']}
          format={dateFormat}
        />
      </Form.Item>
      <Form.Item
        name="classTime"
        label="课程时间"
        initialValue={props?.secondContent?.classTime}
        rules={[{ required: true, message: '请选择上课时间!' }]}
      >
        <TimePicker.RangePicker
          placeholder={['开始时间', '结束时间']}
        // format={dateFormat}
        />
      </Form.Item>
      <Form.Item
        name="address"
        initialValue={props?.secondContent?.address}
        label="上课地址"
        rules={[{
          required: true,
          message: '请输入上课地址!',
        }]}
      >
        <Input placeholder="请输入上课地址" />
      </Form.Item>
      <Form.Item className="form-btn">
        <Button type="primary" onClick={props?.prev} className="prev-btn">上一步</Button>
        <Button type="primary" htmlType="submit" className="next-btn">下一步</Button>
      </Form.Item>
    </Form>
  )
};
const Third = (props) => {
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const test = () => {
    if (props?.back?.length == 0) {
      props?.finally();
    }
  }
  return (
    <Form
      onFinishFailed={onFinishFailed}
      initialValues={{ remember: true }}
      className="form"
    >
      <Form.Item className="Icon">
        {
          props?.back?.length > 0 ? <CloseCircleOutlined
            twoToneColor="#52c41a"
            className="success"
            style={{ fontSize: '100px', width: '100px', height: '100px' }}
          /> : <CheckCircleTwoTone
            twoToneColor="#52c41a"
            className="success"
            style={{ fontSize: '100px', width: '100px', height: '100px' }}
          />
        }

      </Form.Item>
      <Form.Item className="Icon">
        {
          props?.back?.length > 0 ? <div className="create">创建失败</div> :
            <div className="create">创建成功</div>
        }
      </Form.Item>
      <Form.Item className="form-btn">
        <Button type="primary" onClick={props?.prev} className="prev-btn">上一步</Button>
        <Button type="primary" onClick={test} className="next-btn">完成</Button>
      </Form.Item>
    </Form>
  )
}

const Project = () => {
  const [project, setProject] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [firstContent, setFirstContent] = useState();
  const [secondContent, setSecondContent] = useState();
  const [back, setBack] = useState([]);
  useEffect(() => {
    axios.get('/api/get/project').then((res) => {
      setProject(res.data.project);
    })
  }, []);
  const addClass = () => {
    setIsModalVisible(true);
  }
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrent(0);
  }
  const first = (values) => {
    setCurrent(1);
    setFirstContent(values);
  }
  const second = (values) => {
    let list = {};
    list.address = values.address;
    list.StartsignDate = Method.getDate(values?.signDate[0]['_d']).classdate;
    list.EndsignDate = Method.getDate(values?.signDate[1]['_d']).classdate;
    list.StartclassDate = Method.getDate(values?.classDate[0]['_d']).classdate;
    list.EndclassDate = Method.getDate(values?.classDate[1]['_d']).classdate;
    list.StartclassTime = Method.getDate(values?.classTime[0]['_d']).classtime;
    list.EndclassTime = Method.getDate(values?.classTime[1]['_d']).classtime;
    let data = [];
    console.log(project,values);
    (project || []).map((item) => {
      if (item.address == list.address) {
        if (
          (item.StartclassTime < list.StartclassTime && item.EndclassTime > list.StartclassTime) &&
          (item.StartclassTime < list.EndclassTime && item.EndclassTime > list.EndclassTime)
        ) {
          if (
            (item.StartclassDate < list.StartclassDate && item.EndclassDate > list.StartclassDate) &&
            (item.StartclassDate < list.EndclassDate && item.EndclassDate > list.EndclassDate)
          ) {
            data.push(item);
          }
        }
      }
    })
    if (data.length > 0) {
      setBack(data);
    }
    setCurrent(2);
    setSecondContent(values);
  }
  const create = () => {
    let list = { ...firstContent, ...secondContent, state: '审核中', count: 0 };
    console.log([list]);
    setProject([list]);
    setCurrent(0);
    setIsModalVisible(false);
    setFirstContent({});
    setSecondContent({});
  }
  return (
    <div className="project">
      <div className="container">
        <div className='top'>
          <div className="head">当前栏目:</div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/teacher/index' className="link">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/teacher/class" className="link">课程列表</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider className="divider" />
        <div className="btn">
          <Button onClick={addClass} type="primary">添加课程</Button>
        </div>
        <Divider className="divider" />
        <ProjectContent project={project} type="teacher" />
      </div>
      <Modal
        maskClosable={false}
        title="创建课程"
        visible={isModalVisible}
        // onOk={handleOk}
        // onCancel={handleCancel}
        footer={[]}
        onCancel={handleCancel}
        // className="dialog"
        width={window.screen.width * 0.5}
      >
        <Steps className="step" current={current}>
          <Steps.Step title='课程内容' />
          <Steps.Step title='课程规则' />
          <Steps.Step title='完成' />
        </Steps>
        {
          current == 0 ?
            <First
              first={first}
              firstContent={firstContent}
            /> :
            current == 1 ?
              <Second
                prev={() => { setCurrent(0) }}
                second={second}
                secondContent={secondContent}
              /> :
              <Third
                prev={() => { setCurrent(1) }}
                finally={create}
                back={back}
              />
        }
      </Modal>
    </div>
  )
}
export default Project;