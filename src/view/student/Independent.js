import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Independent.scss';
import { Divider, Button, Pagination, Message } from 'antd';

const Independent = () => {
  // 当前展示页数据
  const [list, setList] = useState();
  // 当前选课人数
  const [total, setTotal] = useState();
  // 已选列表
  const [addList, setAddList] = useState();
  // 当前展示页
  const [index, setIndex] = useState(0);
  let pageSize = 15;
  let sid = localStorage.getItem('id');
  useEffect(() => {
    axios.post('/api/get/independent', { page: index, pageSize: pageSize }).then((res) => {
      setList(res?.data?.Independent)
      setTotal(res.data.total);
    })
  }, [total]);
  const onChange = (page) => {
    axios.post('/api/get/independent', { page: page - 1, pageSize: pageSize }).then((res) => {
      setList(res?.data?.Independent)
      setTotal(res.data.total);
      setIndex(page - 1);
    })
  };
  const addClass = (id) => {
    axios.post('/api/get/addIndependent', { id: id, sid: sid }).then((res) => {
      if (res.data.msg == 200) {
        setAddList(res.data.list);
        axios.post('/api/get/independent', { page: index, pageSize: pageSize }).then((res) => {
          setList(res?.data?.Independent)
          setTotal(res.data.total);
        });
      } else {
        Message.error(res.data.msg, 3)
      }
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
                    <div className="item">
                      <div className="total">{item.total}</div>
                      <div className="test">/</div>
                      <div className="count">{item.count}</div>
                    </div>
                    <div className="tag">
                      <Button
                        onClick={() => { addClass(item.id) }}
                        size="small"
                        type="primary"
                        ghost>
                        选课
                         </Button>
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
        <div>
          {
            (addList || []).map((item, index) => {
              return (
                <div key={index}>{item.id}</div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
export default Independent;