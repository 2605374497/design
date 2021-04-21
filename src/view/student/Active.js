import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Active.scss';
import { Breadcrumb, Divider, Pagination } from 'antd';
import { Link } from 'react-router-dom';

const Active = () => {
  const [active, setActive] = useState([]);
  const [total, setTotal] = useState();
  let pageSize = 15;
  const onChange = (page) => {
    axios.post('/api/get/active', { page: page - 1, pageSize: pageSize }).then((res) => {
      setActive(res.data.active);
    })
  }
  useEffect(() => {
    axios.post('/api/get/active', { page: 0, pageSize: pageSize }).then((res) => {
      setActive(res.data.active);
      setTotal(res.data.total);
    })
  }, [])
  return (
    <div className="activeContent">
      <div className="content">
        <div className='top'>
          <div className="head">当前栏目:</div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/student/index' className="link">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/student/active" className="link">教务动态</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider className="divider" />
        <div className="body">
          {
            (active || []).map((item, index) => {
              return (
                <Link key={index} className="link" to={{ pathname: "/student/active/detail", state: { id: item.id } }}>
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
export default Active;