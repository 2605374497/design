import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Independent.scss';
import { Divider, Button, Pagination } from 'antd';

const Independent = () => {
  const [list, setList] = useState();
  const [total, setTotal] = useState();
  // const [page, setPage] = useState(0);
  let pageSize = 15;
  useEffect(() => {
    axios.post('/api/get/independent', { page: 0, pageSize: pageSize }).then((res) => {
      setList(res?.data?.Independent)
      setTotal(res.data.total);
    })
  }, []);
  const onChange = (page) => {
    axios.post('/api/get/independent', { page: page - 1, pageSize: pageSize }).then((res) => {
      setList(res?.data?.Independent)
      setTotal(res.data.total);
    })
  }
  return (
    <div className="independent">
      <div className="container">
        <div className="top">选课</div>
        <Divider className="divider" />
        <div className="body">
          <div className="head">
            <div className="tag">课程</div>
            <div className="tag">类别</div>
            <div className="tag">剩余量</div>
            <div className="tag">操作</div>
          </div>
          <Divider className="divider" />
          {
            (list || []).map((item, index) => {
              console.log(item, 'item');
              return (
                <div key={index} className="title">
                  <div className="head">
                    <div className="tag">{item.name}</div>
                    <div className="tag">
                      {item.type == 1 ? '自然科学' :
                        item.type == 2 ? '文学艺术' :
                          item.type == 3 ? '社会科学' : '创新创业'
                      }
                    </div>
                    <div className="tag">{item.total} / {item.count}</div>
                    <div className="tag">
                      <Button>选课</Button>
                    </div>
                  </div>
                  <Divider className="divider" />
                </div>
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
            showQuickJumper={false}
          />
        </div>
      </div>
    </div>
  )
}
export default Independent;