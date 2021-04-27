import { Divider } from 'antd';
import '../../styles/ProjectContent.scss';

const ProjectContent = (props) => {
  let project = props?.project || [];
  let type = props.type;
  return (
    <div className="projectContent">
      <div className="head">
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
      </div>
    </div>
  )
}
export default ProjectContent;