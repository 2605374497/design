import { useState, useEffect } from 'react';
import ProjectContent from '../public/projectContent';
import { Link } from 'react-router-dom';
import { Breadcrumb,Button,Divider } from 'antd';
import '../../styles/teacher/Project.scss';

const Project = () => {
  const [project, setProject] = useState();
  useEffect(() => {
    setProject([]);
  }, []);
  const addClass=()=>{
    console.log('添加课程');
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
              <Link to="/student/active" className="link">课程列表</Link>
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
      
    </div>
  )
}
export default Project;