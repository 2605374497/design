import Mock from 'mockjs';

const { student } = Mock.mock({
    'student|10': [
        {
            'netID': '17050518@increment(1)',
            'password': '111111'
        }
    ]
});

// 获取学生信息
Mock.mock('/api/get/student', 'get', () => {
    return {
        status: 200,
        msg: '获取数据成功',
        student: student
    }
})
