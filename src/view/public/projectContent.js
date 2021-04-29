import { Divider, Table } from 'antd';
import '../../styles/ProjectContent.scss';
import Method from '../public/unit';

const ProjectContent = (props) => {
  let project = props?.project || [];
  // console.log(project,'----pasdpa');
  let type = props.type;
  const columns = [
    { title: '课程名称', dataIndex: 'name', key: 'name' },
    // {
    //   title: '报名时间',
    //   // dataIndex: 'signDate',
    //   key: 'signDate',
    //   render: (text, record) => {
    //     console.log(record,'---record');
    //     return (
    //       <span>{record?.StartsignDate}-{record?.EndsignDate}</span>
    //     )
    //   }
    // },
    // {
    //   title: '课程开始日期',
    //   //  dataIndex: 'address',
    //   key: 'start',
    //   render: (text, record) => {
    //     let start = Method.getDate(record?.classDate[0]['_d']);
    //     return (
    //       <span>{start}</span>
    //     )
    //   }
    // },
    // {
    //   title: '课程开始时间',
    //   //  dataIndex: 'address',
    //   key: 'start',
    //   render: (text, record) => {
    //     let end = Method.getDate(record?.classTime[1]['_d']);
    //     return (
    //       <span>{end}</span>
    //     )
    //   }
    // },
    {
      title: '课程人数',
      // dataIndex: `count`,
      key: 'count',
      render: (text, record) => {
        return (
          <span>{record.count}/100</span>
        )
      }
    },
    { title: '状态', dataIndex: 'state', key: 'state' },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      // render: () => <a>Delete</a>,
    },
  ];
  return (
    <div className="projectContent">
      <Table
        columns={columns}
        dataSource={project}
      />
    </div>
  )
}
export default ProjectContent;