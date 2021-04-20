import Mock from 'mockjs';

const { student, active, teacher, announce } = Mock.mock({
    'studentMessage|10': [

    ],
    // 学生信息
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
            'major': '通信工程'
        },
        {
            'netID|+1': 17050618101,
            'name': '@cname',
            'address': '@city',
            'belong': '文传学院',
            'test': '@cparagraph',
            'brithday': '20@date("yy-MM-dd")',
            'age|18-22': 20,
            'password': 'student',
            'major': '汉语言文学'
        },
        {
            'netID|+1': 17050718101,
            'name': '@cname',
            'address': '@city',
            'belong': '音舞学院',
            'test': '@cparagraph',
            'brithday': '20@date("yy-MM-dd")',
            'age|18-22': 20,
            'password': 'student',
            'major': '音乐表演'
        },
        {
            'netID|+1': 17050718101,
            'name': '@cname',
            'address': '@city',
            'belong': '音舞学院',
            'test': '@cparagraph',
            'brithday': '20@date("yy-MM-dd")',
            'age|18-22': 20,
            'password': 'student',
            'major': '经济管理'
        },
    ],
    // 教师信息
    'teacher|10': [
        {
            'netID|+1': 111111,
            'password': 'admin'
        }
    ],
    // 通知公告
    'announce|50': [
        {
            'id|+1': 1,
            'title': '关于开展课程思政示范课展示的通知',
            'content': `根据相关文件要求，结合学校实际情况，我校开学前两周施行线上教学。
            为确保线上教学工作顺利开展，学校各部门、各学院均提前进入工作状态，为开展师生线上教学做出了很大努力，为新学期教学工作的顺利开展做好了充分的准备。 
            从检查情况看，大部分教师课前准备充分，教学内容熟练，讲解清晰，课堂教学效果较好。但也发现个别教师照本宣科，全程一个语调照着课件读，教学效果较差。建议授课教师在教学过程中要加大教学投入力度，深挖课堂教学思政元素，深度思考如何上好网课，提高教学效果。针对部分实践性较强的课程，如实验、体育类课程，为确保教学效果，
            经学院申请教务处批准，实行线下教学，师生精神风貌良好`
        },
    ],
    // 教务动态
    'active|50': [
        {
            'id|+1': 1,
            'title': '新学期线上教学工作顺利进行',
            'content': `根据相关文件要求，结合学校实际情况，我校开学前两周施行线上教学。
            为确保线上教学工作顺利开展，学校各部门、各学院均提前进入工作状态，为开展师生线上教学做出了很大努力，为新学期教学工作的顺利开展做好了充分的准备。 
            从检查情况看，大部分教师课前准备充分，教学内容熟练，讲解清晰，课堂教学效果较好。但也发现个别教师照本宣科，全程一个语调照着课件读，教学效果较差。建议授课教师在教学过程中要加大教学投入力度，深挖课堂教学思政元素，深度思考如何上好网课，提高教学效果。针对部分实践性较强的课程，如实验、体育类课程，为确保教学效果，
            经学院申请教务处批准，实行线下教学，师生精神风貌良好`
        },
    ],
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
// 通知公告
Mock.mock('/api/get/announce', 'post', (req) => {
    let page = JSON.parse(req.body).page;
    let pageSize = JSON.parse(req.body).pageSize || 5;
    let list = [];
    for (let i = page * pageSize; i < (page + 1) * pageSize; i++) {
        list.push(announce[i]);
    }
    console.log(list);
    return {
        status: 200,
        msg: '获取数据成功',
        announce: list
    }
})
// 教务动态
Mock.mock('/api/get/active', 'post', (req) => {
    let page = JSON.parse(req.body).page;
    let pageSize = JSON.parse(req.body).pageSize || 5;
    let list = [];
    for (let i = page * pageSize; i < (page + 1) * pageSize; i++) {
        list.push(active[i]);
    }
    return {
        status: 200,
        msg: '获取数据成功',
        active: list
    }
})
