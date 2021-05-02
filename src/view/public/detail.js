import {useEffect,useState} from 'react';
import {Form,Input} from 'antd';
import axios from 'axios';

const Detail=(props)=>{
  const [list,setList] = useState();
  useEffect(()=>{
    let tid=props?.tid;
    let id=props?.id;
    axios.post('/api/show/detail',{id:id,tid,tid}).then((res)=>{
      console.log(res,'---res');
    })
  },[]);
  return (
    <div>123</div>
  )
}
export default Detail;