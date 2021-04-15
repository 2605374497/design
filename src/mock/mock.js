import Mock from 'mockjs';

const { student, teacher, announce } = Mock.mock({
    'studentMessage|10': [

    ],
    'student|25': [
        {
            'netID|+1': 17050518101,
            'name': '@cname',
            'address': '@city',
            'belong': '数计学院', 
            'test': '@cparagraph',
            'brithday': '20@date("yy-MM-dd")',
            'age|18-22': 20,
            'password': 'student',
            'major':'通信工程'
        },
        {
            'netID|+1': 17050618101,
            'name': '@cname',
            'address': '@city',
            'belong':  '文传学院',
            'test': '@cparagraph',
            'brithday': '20@date("yy-MM-dd")',
            'age|18-22': 20,
            'password': 'student',
            'major':'汉语言文学'
        },
        {
            'netID|+1': 17050718101,
            'name': '@cname',
            'address': '@city',
            'belong':  '音舞学院',
            'test': '@cparagraph',
            'brithday': '20@date("yy-MM-dd")',
            'age|18-22': 20,
            'password': 'student',
            'major':'音乐表演'
        },
        {
            'netID|+1': 17050718101,
            'name': '@cname',
            'address': '@city',
            'belong':  '音舞学院',
            'test': '@cparagraph',
            'brithday': '20@date("yy-MM-dd")',
            'age|18-22': 20,
            'password': 'student',
            'major':'经济管理'
        },
    ],
    'teacher|10': [
        {
            'netID|+1': 111111,
            'password': 'admin'
        }
    ],
    'announce|20': [
        {
            'year': '@natural(2010, 2020)',
        }
    ],
    // 'announce|'
});

// 学生登录
Mock.mock('/api/get/student', 'get', () => {
    return {
        status: 200,
        msg: '获取数据成功',
        student: student
    }
})
// 教师登录
Mock.mock('/api/get/teacher', 'get', () => {
    return {
        status: 200,
        msg: '获取数据成功',
        teacher: teacher
    }
})
// 教务通知
Mock.mock('/api/get/announce', 'get', () => {
    return {
        status: 200,
        msg: '获取数据成功',
        announce: announce
    }
})
