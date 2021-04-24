import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/Course.scss';
import { Divider, Button, Pagination, Message, Breadcrumb, Form, Radio } from 'antd';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';

const Course = () => {
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
 console.log(addList, 'addList');
 useEffect(() => {
  axios.post('/api/get/course', { page: index, pageSize: pageSize }).then((res) => {
   setList(res?.data?.Course)
   setTotal(res.data.total);
  })
  axios.post('/api/get/courselist', { sid: sid }).then((res) => {
   setAddList(res.data.list);
  })
 }, []);
 const onChange = (page) => {
  axios.post('/api/get/course', { page: page - 1, pageSize: pageSize }).then((res) => {
   setList(res?.data?.Course);
   setTotal(res.data.total);
   setIndex(page - 1);
  })
 };
 const addClass = (id) => {
  axios.post('/api/get/addCourse', { id: id, sid: sid }).then((res) => {
   if (res.data.msg == 200) {
    setAddList(res.data.list);
    axios.post('/api/get/course', { page: index, pageSize: pageSize }).then((res) => {
     setList(res?.data?.Course)
     setTotal(res.data.total);
    });
    axios.post('/api/get/courselist', { sid: sid }).then((res) => {
     setAddList(res.data.list);
    })
   } else {
    Message.error(res.data.msg, 3)
   }
  })
 }
 const deleteClass = (id) => {
  axios.post('/api/delete/course', { sid: sid, id: id }).then((res) => {
   return res?.data?.status;
  })
  axios.post('/api/get/courselist', { sid: sid }).then((res) => {
   setAddList(res.data.list);
  })
  axios.post('/api/get/course', { page: index, pageSize: pageSize }).then((res) => {
   setList(res?.data?.Course)
   setTotal(res.data.total);
  })
 }
 const search = (values) => {
  axios.post('/api/get/search', { type: values?.type, page: index, pageSize: pageSize }).then((res) => {
   setList(res.data.list);
   setTotal(res.data.total);
  })
 }
 return (
  <div className="course">
   <div className="container">
    <div className="breadcrump">
     <div className="online">当前栏目:</div>
     <Breadcrumb>
      <Breadcrumb.Item>
       <Link to='/student/index' className="link">首页</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
       <Link to="/student/chance/course" className="link">公选课</Link>
      </Breadcrumb.Item>
     </Breadcrumb>
    </div>
    <Divider className="divider" />
    {/* <Form
          className="form"
          onFinish={search}
        >
          <Form.Item
            name="type"
            className="formitem"
          >
            <Radio.Group name="radiogroup">
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
        <Divider className="divider" /> */}
    <div className="body">
     <div className="head">
      <div className="tag">课程</div>
      <div className="tag">类别</div>
      <div className="tag">上课地点</div>
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
          <div className="tag">{item.bulid}{item.address}</div>
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
      <div className="tag">上课地点</div>
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
          <div className="tag">{item.bulid}{item.address}</div>
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
export default Course;