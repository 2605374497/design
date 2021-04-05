import Mock from 'mockjs';

const { student, teacher } = Mock.mock({
    'student|10': [
        {
            'netID|+1': 17050518101,
            'password': 'student'
        }
    ],
    'teacher|10': [
        {
            'netID|+1': 111111,
            'password': 'admin'
        }
    ]
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
