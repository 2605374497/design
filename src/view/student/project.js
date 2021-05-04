import { useState, useEffect } from 'react';
import StudentProjectContent from '../public/student';
import { Link } from 'react-router-dom';
import { Breadcrumb,Divider,  Modal,  } from 'antd';
import '../../styles/teacher/Project.scss';
import axios from 'axios';
import Method from '../public/unit';
import Detail from '../public/detail.js';


const Project = () => {
  const [project, setProject] = useState();
  const [detail, setDetail] = useState();
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  useEffect(() => {
    axios.post('/api/student/project', { sid: sid }).then((res) => {
      setProject(res.data.project);
    })
  }, []);
  const sid = localStorage.getItem('id');
  const onShowDetail = (tid,id) => {
    axios.post('/api/show/detail', { tid: tid, id: id }).then((res) => {
      setDetail(res.data.list);
      setIsDetailVisible(true);
    })
  }
  const handle = () => {
    setIsDetailVisible(false)
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
        <StudentProjectContent onShowDetail={onShowDetail} project={project} type="student" />
      </div>
      <Modal
        maskClosable={false}
        title="课程详情"
        visible={isDetailVisible}
        onCancel={handle}
        footer={[]}
        width={window.screen.width * 0.5}
      >
        <Detail detail={detail} />
      </Modal>
    </div>
  )
}
export default Project;