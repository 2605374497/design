import { Divider, Popconfirm, Table, Button } from 'antd';
import '../../styles/ProjectContent.scss';
import Method from '../public/unit';
import { useEffect } from 'react';

const StudentProjectContent = (props) => {
  let project = props?.project || [];
  let type = props.type;
  const show = (tid, id) => {
    props.onShowDetail(tid, id);
  }
  const select = (tid, id) => {
    props?.onAddClass(tid, id)
  }
  const appraise = (tid, id) => {
    props?.appraise(tid, id);
  }
  const columns = [
    { title: '课程名称', dataIndex: 'name', key: 'name' },
    {
      title: '报名时间',
      align: 'center', 
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
      align: 'center', 
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
      align: 'center', 
      dataIndex: 'EndclassDate',
      key: 'start',
      render: (text, record) => {
        return (
          <span>{record?.EndclassDate}</span>
        )
      }
    },
    {
      title: '状态',
      align: 'center', 
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
      title: '课程人数',
      align: 'center', 
      // dataIndex: `count`,
      key: 'count',
      render: (text, record) => {
        return (
          <span>{record?.count}/100</span>
        )
      }
    },
    {
      title: '成绩',
      align: 'center', 
      dataIndex: 'state',
      key: 'state',
      render: (text, record) => {
        return (
          <span>{record?.score || '暂无成绩'}</span>
        )
      }
    },
    {
      title: '操作',
      align: 'center', 
      dataIndex: '',
      key: 'x',
      render: (record) => {
        return type == "teacher" ?
          <div className="option">
            <Button size="small" onClick={() => { show(record.id) }}>详情</Button>
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
          type == "student" ?
            <div className="option">
              <Button size="small" onClick={() => { show(record.tid, record.id) }}>详情</Button>
              {
                record.state == "已结束" ?
                  <div>
                    <Button size="small" onClick={() => { appraise(record.tid, record.id) }}>评价</Button>
                  </div> :
                  <div>
                    <Button size="small" disabled onClick={() => { appraise(record.tid, record.id) }}>评价</Button>
                  </div>
              }
            </div> :
            <div className="option">
              <Button size="small" onClick={() => { show(record.tid, record.id) }}>详情</Button>
              <Button size="small" onClick={() => { select(record.tid, record.id) }}>报名</Button>
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
export default StudentProjectContent;