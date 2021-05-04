import { useEffect, useState } from 'react';
import { Button, Table, Breadcrumb, Divider, Modal, Input, message } from 'antd';
import axios from 'axios';
import '../../styles/student/Course.scss';
import { Link } from 'react-router-dom';
import ProjectContent from '../public/projectContent';
import Detail from '../public/detail';
import { SearchOutlined } from '@ant-design/icons';

const Course = () => {
  let sid = localStorage.getItem('id');
  const [project, setProject] = useState();
  const [detail, setDetail] = useState();
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  useEffect(() => {
    axios.get('/api/student/select').then((res) => {
      // console.log(res);
      setProject(res.data.project);
    })
  }, [])
  const onShowDetail = (tid, id) => {
    axios.post('/api/show/detail', { tid: tid, id: id }).then((res) => {
      setDetail(res.data.list);
      // console.log(res);
      setIsDetailVisible(true);
    })
  }
  const handle = () => {
    setIsDetailVisible(false)
  }
  const add = (tid, id) => {
    axios.post('/api/add/class', { tid: tid, id: id, sid: sid }).then((res) => {
      if (res?.data?.msg == '获取数据成功') {
        message.success('选课成功', 3);
        setProject(res?.data?.project);
      } else {
        message.error(res?.data?.msg, 3);
      }

    })
  }
  const search = (values) => {
    axios.post('/api/student/search', { name: values }).then((res) => {
      setProject(res.data.project);
    })
  }
  return (
    <div className="course">
      <div className='top'>
        <div className="head">当前栏目:</div>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to='/student/index' className="link">首页</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/student/chance/course" className="link">课程列表</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Divider className="divider" />
      {/* <Button
        type="primary"
        icon={<SearchOutlined />}
        htmlType="submit"
        block
      >
        查询
            </Button> */}
      <Input.Search
        // loading
        enterButton="查询"
        onSearch={search}
        placeholder="输入课程名"
      />
      <Divider className="divider" />
      <ProjectContent onAddClass={add} onShowDetail={onShowDetail} project={project} type="studentSelect" />
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
    </div>
  )

}
export default Course;