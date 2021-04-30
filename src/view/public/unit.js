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
      classdate: `${year}.${month}.${day}`,
      classtime: `${hour}:${minute}:${second}`,
      time: `${year}-${month}-${day} ${hour}:${minute}:${second}`,
      state: endtime - starttime > 0 ? endtime - starttime : 0
    }
  },
  compareDate: (date1, date2, date3, date4) => {
    let start1 = new Date(date1?.replace(".", "/"));
    let end1 = new Date(date2?.replace(".", "/"));
    let start2 = new Date(date3?.replace(".", "/"));
    let end2 = new Date(date4?.replace(".", "/"));
    if ((start1 <= start2 && start2 < end1) || (start1 < end2 && end2 <= end1) || (start2 <= start1 && end1 <= end2)) {
      return true;
    } else {
      return false;
    }
  },
  compareDate1: (date1, date2) => {
    let start = new Date(date1?.replace(".", "/"));
    let end = new Date(date2?.replace(".", "/"));
    return start < end
  },
  compareDate2: (date1, date2, date3) => {
    let start = new Date(date1?.replace(".", "/"));
    let middle = new Date(date2?.replace(".", "/"));
    let end = new Date(date3?.replace(".", "/"));
    return start <= middle && middle < end
  },
  compareTime: (time1, time2, time3, time4) => {
    var date = new Date();
    var a = time1.split(":");
    var b = time2.split(":");
    var c = time3.split(":");
    var d = time4.split(":");
    let start1 = date.setHours(a[0], a[1], a[2]);
    let end1 = date.setHours(b[0], b[1], b[2]);
    let start2 = date.setHours(c[0], c[1], c[2]);
    let end2 = date.setHours(d[0], d[1], d[2]);
    if ((start1 <= start2 && start2 < end1) || (start1 < end2 && end2 <= end1) || (start2 <= start1 && end1 <= end2)) {
      return true;
    } else {
      return false;
    }
  }
}
export default Method;
