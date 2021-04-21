import axios from 'axios';
import react, { useEffect, useState } from 'react';
import { Divider } from 'antd';
import '../../styles/AnnounceDetail.scss'

const AnnounceDetail = (props) => {
  console.log(props,'--props');
  const [list, setList] = useState();
  useEffect(() => {
    axios.post('/api/get/announceDetail', { id:  props?.location?.state?.id }).then((res) => {
      setList(res.data.list[0]);
    })
  }, [])
  return (
    <div className="announceDetail">
      <div className="head">通知公告</div>
      <div className="detail">
        <div className="title">{list?.title}</div>
        <Divider className="divider" />
        <div className="content">{list?.content}</div>
      </div>
    </div>
  )
}
export default AnnounceDetail;