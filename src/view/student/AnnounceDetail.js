import axios from 'axios';
import react, { useEffect, useState } from 'react';
import { Divider,Breadcrumb } from 'antd';
import '../../styles/AnnounceDetail.scss';
import {Link} from 'react-router-dom';

const AnnounceDetail = (props) => {
  console.log(props, '--props');
  const [list, setList] = useState();
  useEffect(() => {
    axios.post('/api/get/announceDetail', { id: props?.location?.state?.id }).then((res) => {
      setList(res.data.list[0]);
    })
  }, [])
  return (
    <div className="announceDetail">
      <div className="detail">
        <div className='top'>
          <div className="head">当前栏目:</div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/student/index' className="link">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/student/announce" className="link">通知公告</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/student/announce/detail" className="link">公告详情</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="title">{list?.title}</div>
        <Divider className="divider" />
        <div className="content">{list?.content}</div>
      </div>
    </div>
  )
}
export default AnnounceDetail;