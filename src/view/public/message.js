import { Divider, Popconfirm, Table, Button } from 'antd';
import '../../styles/ProjectContent.scss';
import Method from '../public/unit';
import { useEffect } from 'react';

const ProjectContent = (props) => {
  const show = (id) => {
    props?.show(id);
  }
  const columns = [
    {
      title: 'netID',
      align: 'center',
      dataIndex: 'netID',
      key: 'netID'
    },
    {
      title: '姓名',
      align: 'center',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      align: 'center',
      dataIndex: 'sex',
      key: 'sex',
      render: (text, record) => {
        return (
          <span>
            {
              record?.sex == 0 ? '女' : '男'
            }
          </span>
        )
      }
    },
    {
      title: '操作',
      dataIndex: '',
      align: 'center',
      key: 'x',
      render: (record) => {
        return props?.type == "teacher" ?
          <div className="option">
            <Button size="small" onClick={() => { show(record.netID) }}>查看信息</Button>
          </div> :
          <div className="option">
            <Button size="small" onClick={() => { show(record.netID) }}>查看信息</Button>
          </div>
      }
    },
  ];
  return (
    <div className="projectContent">
      <Table
        columns={columns}
        dataSource={props?.list}
      />
    </div>
  )
}
export default ProjectContent;