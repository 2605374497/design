import { useState, useEffect } from 'react';
import ProjectContent from '../public/projectContent';
import { Link } from 'react-router-dom';
import { Breadcrumb, Button, Divider, Steps, Modal, Form, Input, DatePicker, TimePicker, BackTop } from 'antd';
import { CheckCircleTwoTone, CloseCircleOutlined } from '@ant-design/icons';
import '../../styles/teacher/Project.scss';
import axios from 'axios';
import Method from '../public/unit';
import Detail from '../public/detail.js';

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
    } else {
      props?.error();
    }
  }
  // console.log(props?.back, '----back');
  // console.log(props?.message, '----message');
  return (
    <Form
      onFinishFailed={onFinishFailed}
      initialValues={{ remember: true }}
      className="form"
    >
      <Form.Item className="Icon">
        {props?.message == "" ?
          props?.back?.length > 0 ? <CloseCircleOutlined
            twoToneColor="#52c41a"
            className="success"
            style={{ fontSize: '100px', width: '100px', height: '100px' }}
          /> : <CheckCircleTwoTone
            twoToneColor="#52c41a"
            className="success"
            style={{ fontSize: '100px', width: '100px', height: '100px' }}
          /> : <CloseCircleOutlined
            twoToneColor="#52c41a"
            className="success"
            style={{ fontSize: '100px', width: '100px', height: '100px' }}
          />
        }

      </Form.Item>
      <Form.Item className="Icon">
        {
          props?.message == "" ? props?.back?.length > 0 ? <div className="create">与已创建课程有冲突</div> :
            <div className="create">创建成功</div> : <div className="create">上课时间应晚于报名时间</div>
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
  const [remeber, setremeber] = useState();
  const [back, setBack] = useState([]);
  const [message, setMessage] = useState('');
  const [allProject, setAllProject] = useState([]);
  const [detail, setDetail] = useState();
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isScoreVisible, setIsScoreVisible] = useState(false);
  const [isAppraiseVisible, setIsAppraiseVisible] = useState(false);
  const [list, setList] = useState();
  const [appraise, setAppraise] = useState();


  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  useEffect(() => {
    axios.post('/api/teacher/project', { sid: sid }).then((res) => {
      setProject(res.data.project);
    })
    axios.get('/api/get/project').then((res) => {
      // console.log(res, 'res');
      setAllProject(res.data.project);
    })
    let load = [0, 0, 0, 0, 0];
    setAppraise(load);
    // console.log(appraise);
  }, []);
  const sid = localStorage.getItem('id');
  const addClass = () => {
    setIsModalVisible(true);
  }
  const handleCancel = () => {
    setIsModalVisible(false);
    setCurrent(0);
    setSecondContent({});
    setFirstContent({});
    setremeber({});
    setBack([]);
    setMessage('');
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
    // console.log(project, values);
    // let c = Method.compareDate1(list.EndsignDate, list.StartclassDate);
    // console.log(c, '---c');
    (allProject || []).map((item) => {
      // let a = Method.compareDate(item.StartclassDate, item.EndclassDate, list.StartclassDate, list.EndclassDate);
      // let b = Method.compareTime(item.StartclassTime, item.EndclassTime, list.StartclassTime, list.EndclassTime);
      if (item.address == list.address) {
        if (Method.compareDate(item.StartclassDate, item.EndclassDate, list.StartclassDate, list.EndclassDate)) {
          if (Method.compareTime(item.StartclassTime, item.EndclassTime, list.StartclassTime, list.EndclassTime)) {
            data.push(item)
          }
        }
      }
    });
    (project || []).map((item) => {
      // let a = Method.compareDate(item.StartclassDate, item.EndclassDate, list.StartclassDate, list.EndclassDate);
      // let b = Method.compareTime(item.StartclassTime, item.EndclassTime, list.StartclassTime, list.EndclassTime);
      if (Method.compareDate(item.StartclassDate, item.EndclassDate, list.StartclassDate, list.EndclassDate)) {
        if (Method.compareTime(item.StartclassTime, item.EndclassTime, list.StartclassTime, list.EndclassTime)) {
          data.push(item)
        }
      }
    });

    if (data.length > 0) {
      setBack(data);
    }
    if (!Method.compareDate1(list.EndsignDate, list.StartclassDate)) {
      setMessage('上课时间应晚于报名时间');
    }
    setremeber(list);
    setCurrent(2);
    setSecondContent(values);
  }
  const create = () => {
    // let date = Method.getDate(new Date())?.classdate;
    if (back?.length > 0 || message != "") {
      handleCancel();
    } else {
      let list = { ...firstContent, ...secondContent, ...remeber, count: 0, tid: sid, id: project?.length + 1 };
      // console.log(list, '--list');
      // if (Method.compareDate1(date, list.StartsignDate)) {
      //   list.state = "待报名";
      // } else if (Method.compareDate2(list.StartsignDate, date, list.EndsignDate)) {
      //   list.state = "报名中";
      // } else if (Method.compareDate2(list.EndsignDate, date, list.StartclassDate)) {
      //   list.state = "未开始";
      // } else if (Method.compareDate2(list.StartclassDate, date, list.EndclassDate)) {
      //   list.state = "进行中";
      // } else {
      //   list.state = "已结束";
      // }
      axios.post('/api/teacher/create', { list: list, sid: sid }).then((res) => {
        // console.log(res, '--res');
        axios.post('/api/teacher/project', { sid: sid }).then((res) => {
          setProject(res.data.project);
          // console.log(res);
        })
        // setProject(res.data.project);
      })
      // console.log(message, '--message');
      // console.log([list]);
      // setProject([list]);

      setCurrent(0);
      setIsModalVisible(false);
      setFirstContent({});
      setSecondContent({});
    }
  }
  const error = () => {
    setBack([]);
    setIsModalVisible(false);
  }
  const onShowDetail = (tid, id) => {
    axios.post('/api/show/detail', { tid: tid, id: id }).then((res) => {
      setDetail(res.data.list);
      setIsDetailVisible(true);
    })
  }
  const score = (tid, id) => {
    // console.log(1111);
    axios.post('/api/get/list', { tid: tid, id: id }).then((res) => {
      // console.log(res, '--res');
      setList(res.data.list);
      setIsScoreVisible(true);
    })
  }
  const handle = () => {
    setIsDetailVisible(false)
  }
  const hidden = () => {
    setIsScoreVisible(false)
  }
  const setScore = (values, tid, id, sid) => {
    // console.log(values, tid, id, sid);
    // console.log(tid, id, sid);
    axios.post('/api/set/score', { values: values, tid: tid, id: id, sid: sid }).then((res) => {
      console.log(res);
    })
  }
  const onAppraise = (tid, id) => {
    // axios.post('/api/show/detail', { tid: tid, id: id }).then((res) => {
    //   setDetail(res.data.list);
    //   setIsDetailVisible(true);
    // })
    // console.log(tid, id);
    axios.post('/api/get/appraise', { tid: tid, id: id }).then((res) => {
      // console.log(res);
      console.log(res);
      setAppraise(res?.data?.result);
      setIsAppraiseVisible(true);
    })
  }
  const appraiseHidden = () => {
    setIsAppraiseVisible(false);
  }
  console.log(appraise);
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
        <ProjectContent
          onShowDetail={onShowDetail}
          project={project}
          type="teacher"
          score={score}
          appraise={onAppraise}
        />
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
                prev={() => { setCurrent(1); setBack([]); setMessage(''); }}
                finally={create}
                back={back}
                message={message}
                error={error}
              />
        }
      </Modal>
      <Modal
        maskClosable={false}
        title="课程详情"
        visible={isDetailVisible}
        // onOk={handleOk}
        onCancel={handle}
        footer={[]}
        // className="dialog"
        width={window.screen.width * 0.5}
      >
        <Detail detail={detail} />
      </Modal>
      <Modal
        maskClosable={false}
        title="打分"
        visible={isScoreVisible}
        // onOk={handleOk}
        onCancel={hidden}
        footer={[]}
        // className="dialog"
        width={window.screen.width * 0.3}
      >
        {
          (list || []).map((item) => {
            return (
              <div className="score">
                <span>{item?.sname}:</span>
                <Input.Search
                  enterButton="确定"
                  onSearch={(values) => {
                    setScore(values, item?.tid, item?.id, item?.sid)
                  }}
                />
              </div>
            )
          })
        }
      </Modal>

      <Modal
        maskClosable={false}
        title="学生评价"
        visible={isAppraiseVisible}
        // onOk={handleOk}
        onCancel={appraiseHidden}
        footer={[]}
        // className="dialog"
        width={window.screen.width * 0.3}
      >
        <Form
          initialValues={{ remember: true }}
          className="form"
          {...layout}
          style={{ margin: 0 }}
        >
          <Form.Item
            label="等级"
          >
            <span>人数</span>
          </Form.Item>
          <Form.Item
            name="A"
            label="满意"
            initialValue={appraise ? appraise[0] : 0}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="B"
            label="较满意"
            initialValue={appraise ? appraise[1] : 0}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="C"
            label="一般"
            initialValue={appraise ? appraise[2] : 0}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="D"
            label="较差"
            initialValue={appraise ? appraise[3] : 0}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="E"
            label="特别差"
            initialValue={appraise ? appraise[4] : 0}
          >
            <Input disabled />
          </Form.Item>
        </Form>
      </Modal>




    </div>
  )
}
export default Project;