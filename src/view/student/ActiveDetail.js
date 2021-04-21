import axios from 'axios';
import react, { useEffect, useState } from 'react';
import { Divider } from 'antd';
import '../../styles/ActiveDetail.scss'

const ActiveDetail = (props) => {
  const [list, setList] = useState();
  useEffect(() => {
    axios.post('/api/get/activeDetail', { id: props?.location?.state?.id }).then((res) => {
      setList(res.data.list[0]);
    })
  }, [])
  return (
    <div className="activeDetail">
      <div className="head">教务动态</div>
      <div className="detail">
        <div className="title">{list?.title}</div>
        <Divider className="divider" />
        <div className="content">{list?.content}</div>
      </div>
    </div>
  )
}
export default ActiveDetail;