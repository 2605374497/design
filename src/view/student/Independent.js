import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/student/Independent.scss';
import { Divider, Button, Pagination, Message, Breadcrumb, Form, Radio } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import Method from '../public/unit';

const Independent = () => {
  // 当前展示页数据
  const [list, setList] = useState();
  // 当前选课人数
  const [total, setTotal] = useState();
  // 已选列表
  const [addList, setAddList] = useState();
  // 当前展示页
  const [index, setIndex] = useState(0);
  // 当前展示类型
  const [type, setType] = useState(0);
  // 截至时间
  const [time, setTime] = useState();
  // 是否超过截至时间
  const [bool, setBool] = useState();
  let pageSize = 15;
  let sid = localStorage.getItem('id');
  useEffect(() => {
    axios.post('/api/get/independent', { page: index, pageSize: pageSize, type: type }).then((res) => {
      setList(res?.data?.Independent)
      setTotal(res.data.total);
    })
    axios.post('/api/get/classlist', { sid: sid }).then((res) => {
      setAddList(res.data.list);
    })
    axios.get('/api/get/time').then((res) => {
      let date = new Date(res.data.time);
      let data = Method.getDate(date);
      setTime(data.time);
      let state = data.state > 0 ? true : false;
      setBool(state);
      console.log(state);
    })
  }, []);
  const onChange = (page) => {
    axios.post('/api/get/independent', { page: page - 1, pageSize: pageSize, type: type }).then((res) => {
      setList(res?.data?.Independent);
      setTotal(res.data.total);
      setIndex(page - 1);
    })
  };
  const addClass = (id) => {
    if (bool) {
      axios.post('/api/get/addIndependent', { id: id, sid: sid }).then((res) => {
        if (res.data.msg == 200) {
          setAddList(res.data.list);
          axios.post('/api/get/independent', { page: index, pageSize: pageSize, type: type }).then((res) => {
            setList(res?.data?.Independent)
            setTotal(res.data.total);
          });
        } else {
          Message.error(res.data.msg, 3)
        }
      })
    } else {
      Message.error('当前不在选课时间范围', 3);
    }
  }
  const deleteClass = (id) => {
    if (bool) {
      axios.post('/api/delete/class', { sid: sid, id: id }).then((res) => {
        setAddList(res.data.list);
      })
    } else {
      Message.error('当前不在选课时间范围', 3);
    }
  }
  const search = (values) => {
    axios.post('/api/get/search', { type: values?.type, page: 0, pageSize: pageSize }).then((res) => {
      setList(res.data.list);
      setTotal(res.data.total);
      setType(values.type);
      setIndex(0);
    })
  }
  return (
    <div className="independent">
      <div className="container">
        <div className="time">选课截至时间：{time}</div>
        <Divider className="divider" />
        <div className="breadcrump">
          <div className="online">当前栏目:</div>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to='/student/index' className="link">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/student/chance/independent" className="link">自主选课</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <Divider className="divider" />
        <Form
          className="form"
          onFinish={search}
        >
          <Form.Item
            name="type"
            className="formitem"
            initialValue="0"
          >
            <Radio.Group name="radiogroup">
              <Radio.Button value="0" className="radio">全部</Radio.Button>
              <Radio.Button value="1" className="radio">自然科学</Radio.Button>
              <Radio.Button value="2" className="radio">文学艺术</Radio.Button>
              <Radio.Button value="3" className="radio">社会科学</Radio.Button>
              <Radio.Button value="4" className="radio">创新创业</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item className="formitem">
            <Button
              type="primary"
              icon={<SearchOutlined />}
              htmlType="submit"
              block
            >
              查询
            </Button>
          </Form.Item>
        </Form>
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
                        ghost
                      >
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
            current={index + 1}
            defaultCurrent={1}
            pageSize={pageSize}
            onChange={(page) => { onChange(page) }}
            total={total}
            showQuickJumper={false}
          />
        </div>
        <div>
          <div className="head">
            <div className="tag">课程</div>
            <div className="tag">类别</div>
            <div className="tag">操作</div>
          </div>
          <Divider className="divider" />
          {
            (addList || []).map((item, index) => {
              return (
                <div key={index}>
                  <div className="classlist">
                    <div className="tag">{item.name}</div>
                    <div className="tag">
                      {item.type == 1 ? '自然科学' :
                        item.type == 2 ? '文学艺术' :
                          item.type == 3 ? '社会科学' : '创新创业'
                      }
                    </div>
                    <div className="tag">
                      <Button
                        onClick={() => { deleteClass(item.id) }}
                        size="small"
                        type="primary"
                        ghost
                      >
                        退选
                    </Button>
                    </div>
                  </div>
                  <Divider className="divider" />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
export default Independent;