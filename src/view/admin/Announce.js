import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/student/Announce.scss';
import { Breadcrumb, Divider, Pagination } from 'antd';
import { Link } from 'react-router-dom';

const AdminAnnounce = () => {
  const [announce, setAnnounce] = useState([]);
  const [total, setTotal] = useState();
  let pageSize = 15;
  const onChange = (page) => {
    axios.post('/api/get/announce', { page: page - 1, pageSize: pageSize }).then((res) => {
      setAnnounce(res.data.announce);
    })
  }
  useEffect(() => {
    axios.post('/api/get/announce', { page: 0, pageSize: pageSize }).then((res) => {
      setAnnounce(res.data.announce);
      setTotal(res.data.total);
    })
  }, [])
  return (
    <div className="announceContent">
      <div className="content">
        <div className='top'>
          <div className="head">当前栏目:</div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/admin/index' className="link">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/admin/announce" className="link">通知公告</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider className="divider" />
        <div className="body">
          {
            (announce || []).map((item, index) => {
              return (
                <Link key={index} className="link" to={{ pathname: "/admin/announce/detail", state: { id: item.id } }}>
                  <div className="title" key={index}>
                    {item.title}
                    <Divider className="divider" />
                  </div>
                </Link>
              )
            })
          }
        </div>
        <div className="bottom">
          <Pagination
            defaultCurrent={1}
            pageSize={pageSize}
            onChange={(page) => { onChange(page) }}
            total={total}
            showQuickJumper
          />
        </div>
      </div>
    </div>
  )
}
export default AdminAnnounce;
