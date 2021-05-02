import { Divider, Popconfirm, Table, Button } from 'antd';
import '../../styles/ProjectContent.scss';
import Method from '../public/unit';

const ProjectContent = (props) => {
  let project = props?.project || [];
  let type = props.type || 'teacher';
  const columns = [
    { title: '课程名称', dataIndex: 'name', key: 'name' },
    {
      title: '报名时间',
      dataIndex: 'signDate',
      key: 'signDate',
      render: (text, record) => {
        // console.div(record, '---record');
        return (
          <span>{record?.StartsignDate}-{record?.EndsignDate}</span>
        )
      }
    },
    {
      title: '课程开始日期',
      dataIndex: 'StartclassDate',
      key: 'start',
      render: (text, record) => {
        return (
          <span>{record?.StartclassDate}</span>
        )
      }
    },
    {
      title: '课程开始时间',
      dataIndex: 'EndclassDate',
      key: 'start',
      render: (text, record) => {
        return (
          <span>{record?.EndclassDate}</span>
        )
      }
    },
    {
      title: '课程人数',
      // dataIndex: `count`,
      key: 'count',
      render: (text, record) => {
        return (
          <span>{record?.count}/100</span>
        )
      }
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      render: (text, record) => {
        let state = record?.state;
        return state == "待报名" ?
          <div className="state">
            <div className="state1" />
            <span>{state}</span>
          </div>
          : state == "报名中" ?
            <div className="state">
              <div className="state2" />
              <span>{state}</span>
            </div> : state == "未开始" ?
              <div className="state">
                <div className="state3" />
                <span>{state}</span>
              </div> : state == "进行中" ?
                <div className="state">
                  <div className="state4" />
                  <span>{state}</span>
                </div> :
                <div className="state">
                  <div className="state5" />
                  <span>{state}</span>
                </div>
      }
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (record) => {
        // console.log(record, type);
        return type == "teacher" ?
          <div className="option">
            <Button size="small" >详情</Button>
            {
              record.state == "已结束" ?
                <div>
                  <Button size="small" >打分</Button>
                  <Button size="small" >查看评价</Button>
                </div> :
                <div>
                  <Button size="small" disabled >打分</Button>
                  <Button size="small" disabled >查看评价</Button>
                </div>
            }
          </div> :
          <div className="option">
            <Button size="small" >详情</Button>
            {
              record.state == "已结束" ?
                <div>
                  <Button size="small" >评价</Button>
                </div> :
                <div>
                  <Button size="small" disabled>评价</Button>
                </div>
            }
          </div>
      }
    },
  ];
  return (
    <div className="projectContent">
      <Table
        columns={columns}
        dataSource={project}
      // size="small"
      />
    </div>
  )
}
export default ProjectContent;