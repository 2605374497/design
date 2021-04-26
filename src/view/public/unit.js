const Method = {
  getDate: (date) => {
    let starttime = new Date().getTime();
    let endtime = date.getTime();
    let year = date.getFullYear();
    let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
    let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
    let minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
    let second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
    return {
      time: `${year}-${month}-${day} ${hour}:${minute}:${second}`,
      state: endtime - starttime > 0 ? endtime - starttime : 0
    }
  }
}
export default Method;
