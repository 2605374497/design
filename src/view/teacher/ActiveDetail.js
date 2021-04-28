import axios from 'axios';
import react, { useEffect, useState } from 'react';
import { Divider, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import '../../styles/student/ActiveDetail.scss'

const TeacherActiveDetail = (props) => {
  const [list, setList] = useState();
  useEffect(() => {
    axios.post('/api/get/activeDetail', { id: props?.location?.state?.id }).then((res) => {
      setList(res.data.list[0]);
    })
  }, [])
  return (
    <div className="activeDetail">
      <div className="detail">
        <div className='top'>
          <div className="head">当前栏目:</div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/teacher/index' className="link">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/teacher/active" className="link">教务动态</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/teacher/active/detail" className="link">教务动态详情</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider className="divider" />
        <div className="title">{list?.title}</div>
        <Divider className="divider" />
        <div className="content">{list?.content}</div>
      </div>
    </div>
  )
}
export default TeacherActiveDetail;