import { Divider, Table } from 'antd';
import '../../styles/ProjectContent.scss';

const ProjectContent = (props) => {
  let project = props?.project || [];
  let type = props.type;
  const columns = [
    { title: '课程名称', dataIndex: 'name', key: 'name' },
    // { title: '报名时间', dataIndex: 'signDate', key: 'signDate' },
    // { title: '课程开始日期', dataIndex: 'address', key: 'start' },
    // { title: '课程结束日期', dataIndex: 'address', key: 'end' },
    {
      title: '课程人数',
      dataIndex: `count`,
      key: 'count',
      render: (text, record) => (
        <span>{record.count}/100</span>
      ),
    },
    { title: '状态', dataIndex: 'state', key: 'state' },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: () => <a>Delete</a>,
    },
  ];
  return (
    <div className="projectContent">
      {/* <div className="head">
        <div className="tag">课程名称</div>
        <div className="tag">报名时间</div>
        <div className="tag">课程开始时间</div>
        <div className="tag">课程结束时间</div>
        <div className="tag">课程人数</div>
        <div className="tag">状态</div>
        <div className="tag">操作</div>
      </div>
      <Divider className="divider" />
      <div>
        {
          project.length > 0 ? 
          <div className="empty">{project[0].name}</div>
           : <div className="empty">课程为空</div>
        }
      </div> */}
      <Table
        columns={columns}
        dataSource={project}
      />,
    </div>
  )
}
export default ProjectContent;