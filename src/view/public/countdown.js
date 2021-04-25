import '../../styles/CountDown.scss';
import { Modal } from 'antd';
import { useHistory } from 'react-router-dom';

const CountDown = (props) => {
  const history = useHistory();
  let secondsToGo = 3;
  const modal = Modal.success({
    title: '您还未登录，请登录后访问！',
    content: ` ${secondsToGo} 秒后返回登录界面`,
  });
  const timer = setInterval(() => {
    secondsToGo -= 1;
    if (secondsToGo) {
      modal.update({
        content: ` ${secondsToGo}  秒后返回登录界面`,
      });
    } else {
      history.push('/');
    }
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    modal.destroy();
  }, secondsToGo * 1000);
};
export default CountDown;