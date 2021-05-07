import { useState, useEffect } from 'react';
import StudentProjectContent from '../public/student';
import { Link } from 'react-router-dom';
import { Breadcrumb, Divider, Modal, Radio, Button, Form } from 'antd';
import '../../styles/teacher/Project.scss';
import axios from 'axios';
import Method from '../public/unit';
import Detail from '../public/detail.js';

const Project = () => {
  const [project, setProject] = useState();
  const [detail, setDetail] = useState();
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isAppraiseVisible, setIsAppraiseVisible] = useState(false);
  const [list, setList] = useState();

  useEffect(() => {
    axios.post('/api/student/project', { sid: sid }).then((res) => {
      setProject(res.data.project);
    })
  }, []);
  const sid = localStorage.getItem('id');
  const onShowDetail = (tid, id) => {
    axios.post('/api/show/detail', { tid: tid, id: id }).then((res) => {
      setDetail(res.data.list);
      setIsDetailVisible(true);
    })
  }
  const appraiseHandle = () => {
    setIsAppraiseVisible(false);
  }
  const handle = () => {
    setIsDetailVisible(false)
  }
  const appraise = (tid, id) => {
    axios.post('/api/student/appraise', { tid: tid, id: id }).then((res) => {
      setList(res?.data?.list);
      setIsAppraiseVisible(true);
    })
  }
  const setAppraise = (values) => {
    // console.log(values);
    axios.post('/api/set/appraise', { tid: list?.tid, id: list?.id, sid: sid, value: values.select }).then((res) => {
      setIsAppraiseVisible(false);
    })
  }

  return (
    <div className="project">
      <div className="container">
        <div className='top'>
          <div className="head">当前栏目:</div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/student/index' className="link">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/student/project" className="link">课程列表</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider className="divider" />
        <StudentProjectContent
          onShowDetail={onShowDetail}
          appraise={appraise}
          project={project}
          type="student"
        />
      </div>
      {
        isDetailVisible && (<Modal
          maskClosable={false}
          title="课程详情"
          visible={isDetailVisible}
          onCancel={handle}
          footer={[]}
          width={window.screen.width * 0.5}
        >
          <Detail detail={detail} />
        </Modal>)
      }
      <Modal
        maskClosable={false}
        title="课程评价"
        visible={isAppraiseVisible}
        onCancel={appraiseHandle}
        footer={[]}
        okText='确定'
        width={window.screen.width * 0.5}
      >
        <Form
          className="form"
          name="basic"
          initialValues={{ remember: true }}
          onFinish={setAppraise}
        >
          <Form.Item
            name="select"
            className="appraise"
          >
            <Radio.Group value="student" className="appraise" name="appraise">
              <Radio value={1} className="radio">满意</Radio>
              <Radio value={2} className="radio">较满意</Radio>
              <Radio value={3} className="radio">一般</Radio>
              <Radio value={4} className="radio">较差</Radio>
              <Radio value={5} className="radio">特别差</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              确定
        </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
export default Project;