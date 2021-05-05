import Mock from 'mockjs';
import Method from '../view/public/unit';

const { admin, Time, student, active, teacher, announce, Independent, Course } = Mock.mock({
    // 选课时间
    'Time': new Date('2021/5/26 23:21:21'),
    // 学生信息
    'student|25': [
        {
            'netID|+1': 17050518101,
            'name': '@cname',
            'address': '@city(true)',
            'belong': '数计学院',
            'age|18-22': 20,
            'password': 'student',
            'major': '通信工程',
            'independent': [],
            'email': Mock.mock('@EMAIL()'),
            'sex': Mock.Random.integer(0, 1),
            'phone': /^1[0-9]{10}$/,
            'project': [],
        }
    ],
    // 教师信息
    'teacher|10': [
        {
            'netID|+1': 111111,
            'password': 'teacher',
            'name': '@cname',
            'age|30-55': 20,
            'email': Mock.mock('@EMAIL()'),
            'sex': Mock.Random.integer(0, 1),
            'phone': /^1[0-9]{10}$/,
            'address': '@city(true)',
            'project': [
                {
                    "name": "教师1测试课程1",
                    "description": "123123",
                    "detail": "123",
                    "phone": "13732907822",
                    "signDate": [
                        "2021-05-02T14:10:21.770Z",
                        "2021-05-04T14:10:21.770Z"
                    ],
                    "classDate": [
                        "2021-05-09T14:10:24.311Z",
                        "2021-05-14T14:10:24.311Z"
                    ],
                    "classTime": [
                        "2021-05-02T21:00:00.046Z",
                        "2021-05-02T22:00:00.335Z"
                    ],
                    "address": "123123",
                    "StartsignDate": "2021.05.02",
                    "EndsignDate": "2021.05.06",
                    "StartclassDate": "2021.05.09",
                    "EndclassDate": "2021.05.14",
                    "StartclassTime": "05:00:00",
                    "EndclassTime": "06:00:00",
                    "count": 0,
                    'tid|+1': 111111,
                    "id": 1,
                    "state": "报名中"
                },
                {
                    "name": "教师2测试课程1",
                    "description": "123123",
                    "detail": "123",
                    "phone": "13732907822",
                    "signDate": [
                        "2021-05-02T14:10:21.770Z",
                        "2021-05-04T14:10:21.770Z"
                    ],
                    "classDate": [
                        "2021-05-09T14:10:24.311Z",
                        "2021-05-14T14:10:24.311Z"
                    ],
                    "classTime": [
                        "2021-05-02T21:00:00.046Z",
                        "2021-05-02T22:00:00.335Z"
                    ],
                    "address": "123123",
                    "StartsignDate": "2021.05.02",
                    "EndsignDate": "2021.05.06",
                    "StartclassDate": "2021.05.09",
                    "EndclassDate": "2021.05.14",
                    "StartclassTime": "05:00:00",
                    "EndclassTime": "06:00:00",
                    "count": 0,
                    'tid|+1': 111111,
                    "id": 1,
                    "state": "报名中"
                },
                {
                    "name": "12312",
                    "description": "123123",
                    "detail": "123",
                    "phone": "13732907822",
                    "signDate": [
                        "2021-05-19T14:10:41.496Z",
                        "2021-05-20T14:10:41.496Z"
                    ],
                    "classDate": [
                        "2021-05-31T14:10:43.833Z",
                        "2021-06-05T14:10:43.833Z"
                    ],
                    "classTime": [
                        "2021-05-02T17:00:00.991Z",
                        "2021-05-02T18:00:00.254Z"
                    ],
                    "address": "123123",
                    "StartsignDate": "2021.05.19",
                    "EndsignDate": "2021.05.20",
                    "StartclassDate": "2021.05.31",
                    "EndclassDate": "2021.06.05",
                    "StartclassTime": "01:00:00",
                    "EndclassTime": "02:00:00",
                    "count": 0,
                    'tid|+1': 111111,
                    "id": 2,
                    "state": "待报名"
                }
            ],
            'belong|1': ['音舞学院', '数计学院', '医学院', '文传学院', '体育学院'],
        }
    ],
    // 管理员信息
    'admin': {
        'netID|+1': 'admin',
        'password': 'admin',
        'list': [],
    },
    // 通知公告
    'announce|50': [
        {
            'id|+1': 1,
            'title': '关于开展课程思政示范课展示的通知',
            'content': `根据相关文件要求，结合学校实际情况，我校开学前两周施行线上教学。为确保线上教学工作顺利开展，学校各部门、各学院均提前进入工作状态，为开展师生线上教学做出了很大努力，为新学期教学工作的顺利开展做好了充分的准备。 从检查情况看，大部分教师课前准备充分，教学内容熟练，讲解清晰，课堂教学效果较好。但也发现个别教师照本宣科，全程一个语调照着课件读，教学效果较差。建议授课教师在教学过程中要加大教学投入力度，深挖课堂教学思政元素，深度思考如何上好网课，提高教学效果。针对部分实践性较强的课程，如实验、体育类课程，为确保教学效果，经学院申请教务处批准，实行线下教学，师生精神风貌良好`
        },
    ],
    // 教务动态
    'active|50': [
        {
            'id|+1': 1,
            'title': '新学期线上教学工作顺利进行',
            'content': `亲爱的大学生朋友们\n大家新春好！\n庚子年的春节假期一定会让同学们终身难忘。面对来势汹涌的新型冠状病毒感染的肺炎疫情，全国人民正众志成城，万众一心，打一场坚决、必胜的疫情防控阻击战。1月24日江苏省启动重大突发公共卫生事件一级响应以来，为了广大学生的生命安全和身体健康，按照省委省政府和教育部的工作部署，省教育厅和各高校第一时间部署安排，科学有序、从严从实开展疫情防控。\n此时此刻，我们牵挂着每一位大学生的健康与平安。目前，疫情防控正处于关键时期，需要每个人同舟共济，共渡难关，在此，我们真切地向同学们提出五点希望："\n"积极应对疫情。密切关注准确的疫情信息，不信谣不传谣，做负责任的信息传播者；掌握正确的防控知识，提高自我防护能力，做科学防控的示范者；主动配合、坚决服从当地政府和社区的管控措施，做群防群控的践行者。"\n"做好安全防护。居室定时开窗通风，保持清淡饮食，注重合理作息，加强身体锻炼。尽量少出行、少串门，不扎堆聚集。出门、出行务必戴好口罩，尽量减少触摸公共场所的物品。回家要及时洗手"\n"不要提前返校。我省统一要求2月17日前不开学，请大家密切关注所在学校的官网、官微、班级群等平台发布的通知，除校方规定的特殊情况外，不要提前返校。假期留校的同学要自觉服从学校防控工作的制度规定。"\n"及时问诊就医。如出现发烧、咳嗽等可疑症状，务必到当地定点医疗机构及时就诊，配合医生的相关调查。在接到通知返校前，如出现体温异常等相关症状，请留在家中观察、治疗，暂缓返校。凡有上述情况，务必及时向辅导员老师报告，报请学校同意方可返校。"\n"加强自我管理。在接到返校通知后，同学们要注意旅途中的自我防范和保护。到校后，自觉配合学校做好体温检测、宿舍卫生通风、公共场所管理等工作。假期在重点疫区的学生，返苏后要按疫情防控要求，主动与卫生防疫部门和学校联系，自觉居家或到学校指定场所观察隔离两周。同学中一旦出现疑似症状，须第一时间报告学校专门人员作出处理。"\n"疫情就是命令、防控就是责任。希望全省大学生朋友们以新时代新青年的责任与担当，与全省人民同舟共济，合力打赢这场疫情防控阻击战！"\n"祝同学们学习进步、阖家安康！`
        },
    ],
    // 课程信息
    'Independent|150': [
        {
            'id|+1': 1,
            'name|+1': ['明史十讲', '考古与人类', '心理学', 'ps', '近现代史', '水务创新', '网络技术'],
            'count': 150,
            'total|1': [148, 1, 85, 8, 100, 99],
            'type|1': [1, 2, 3, 4]
        }
    ],
    'Course|150': [
        {
            'id|+1': 1,
            'name|+1': ['明史十讲', '考古与人类', '心理学', 'ps', '近现代史', '水务创新', '网络技术'],
            'bulid|1': ['教学楼', '逸夫楼', '二教楼'],
            'address|+1': [101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116],
            'count': 150,
            'total|1': [148, 1, 85, 8, 100, 99],
            'type|1': [1, 2, 3, 4]
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
// 管理员登录
Mock.mock('/api/get/admin', 'get', () => {
    return {
        status: 200,
        msg: '获取数据成功',
        admin: admin
    }
})
// 通知公告
Mock.mock('/api/get/announce', 'post', (req) => {
    let page = JSON.parse(req.body).page;
    let pageSize = JSON.parse(req.body).pageSize || 5;
    let list = [];
    for (let i = page * pageSize; i < (page + 1) * pageSize && i < announce.length; i++) {
        list.push(announce[i]);
    }
    return {
        status: 200,
        msg: '获取数据成功',
        announce: list,
        total: announce.length
    }
})
// 教务动态
Mock.mock('/api/get/active', 'post', (req) => {
    let page = JSON.parse(req.body).page;
    let pageSize = JSON.parse(req.body).pageSize || 5;
    let list = [];
    for (let i = page * pageSize; i < (page + 1) * pageSize && i < active.length; i++) {
        list.push(active[i]);
    }
    return {
        status: 200,
        msg: '获取数据成功',
        active: list,
        total: active.length
    }
})
// 教务动态详情
Mock.mock('/api/get/activeDetail', 'post', (req) => {
    let id = JSON.parse(req.body).id;
    let list = []
    active.map((item) => {
        if (item.id === id) {
            list.push(item)
        }
    });
    return {
        status: 200,
        msg: '获取数据成功',
        list: list
    }
})
// 通知公告详情
Mock.mock('/api/get/announceDetail', 'post', (req) => {
    let id = JSON.parse(req.body).id;
    let list = []
    announce.map((item) => {
        if (item.id === id) {
            list.push(item)
        }
    });
    return {
        status: 200,
        msg: '获取数据成功',
        list: list
    }
})
// 自主选课数据
Mock.mock('/api/get/independent', 'post', (req) => {
    let page = JSON.parse(req.body).page;
    let pageSize = JSON.parse(req.body).pageSize || 5;
    let type = JSON.parse(req.body).type || 0;
    let data = [], list = [];
    if (type == 0) {
        data = Independent;
    } else {
        Independent.map((item) => {
            if (item.type == type) {
                data.push(item);
            }
        })
    }
    for (let i = page * pageSize; i < (page + 1) * pageSize && i < data.length; i++) {
        list.push(data[i]);
    }
    return {
        status: 200,
        msg: '获取数据成功',
        Independent: list,
        total: data.length,
    }
})
// 添加自选课程
Mock.mock('/api/get/addIndependent', 'post', (req) => {
    let id = JSON.parse(req.body).id;
    let sid = JSON.parse(req.body).sid;
    let list, msg, index;
    student.map((item, i) => {
        if (item.netID == sid) {
            list = item.independent;
            index = i;
        }
    })
    if (list.length < 2) {
        Independent.map((item) => {
            if (item.id == id) {
                if (item.total < 150) {
                    if (list.length > 0) {
                        if (list[0].id == id) {
                            msg = "不能选择同一门课程"
                        } else {
                            list.push(item)
                            item.total++;
                            msg = 200;
                        }
                    } else {
                        list.push(item);
                        item.total++;
                        msg = 200;
                    }
                } else {
                    msg = "该门课程剩余量为0";
                }
            }
        });
    } else {
        msg = '最多可选两门课程'
    }
    return {
        status: 200,
        msg: msg,
        list: list
    }
})
// 获取已选课程
Mock.mock('/api/get/classlist', 'post', (req) => {
    let sid = JSON.parse(req.body).sid;
    let list;
    student.map((item) => {
        if (item.netID == sid) {
            list = item.independent;
        }
    })
    return {
        status: 200,
        msg: '获取数据成功',
        list: list
    }
})
// 删除自选课程
Mock.mock('/api/delete/class', 'post', (req) => {
    let id = JSON.parse(req.body).id;
    let sid = JSON.parse(req.body).sid;
    let list;
    (student || []).map((item) => {
        if (item?.netID == sid) {
            list = item?.independent;
            (list || []).map((items, index) => {
                if (items.id == id) {
                    list.splice(index, 1);
                    (Independent || []).map((pro, i) => {
                        if (pro?.id == id) {
                            pro.total -= 1;
                        }
                    })
                }
            })
        }
    })
    return {
        status: 200,
        msg: '获取数据成功',
        list: list
    }
})
// 查询自选课程
Mock.mock('/api/get/search', 'post', (req) => {
    let type = JSON.parse(req?.body)?.type || 0;
    let page = JSON.parse(req.body).page;
    let pageSize = JSON.parse(req.body).pageSize || 5;
    let list = [], show = [];
    if (type == 0) {
        show = Independent;
    } else {
        Independent.map((item) => {
            if (item.type == type) {
                show.push(item);
            }
        })
    }
    for (let i = page * pageSize; i < (page + 1) * pageSize && i < show.length; i++) {
        list.push(show[i]);
    }
    return {
        status: 200,
        msg: '获取数据成功',
        list: list,
        total: show.length,
    }
})
// 公选课数据
Mock.mock('/api/get/course', 'post', (req) => {
    let page = JSON.parse(req.body).page;
    let pageSize = JSON.parse(req.body).pageSize || 5;
    let list = [];
    for (let i = page * pageSize; i < (page + 1) * pageSize && i < Course.length; i++) {
        list.push(Course[i]);
    }
    return {
        status: 200,
        msg: '获取数据成功',
        Course: list,
        total: Course.length,
    }
})
// 添加公选课程
Mock.mock('/api/get/addCourse', 'post', (req) => {
    let id = JSON.parse(req.body).id;
    let sid = JSON.parse(req.body).sid;
    let list, msg, index;
    student.map((item, i) => {
        if (item.netID == sid) {
            list = item.course;
            index = i;
        }
    })
    if (list.length < 1) {
        Course.map((item) => {
            if (item.id == id) {
                if (item.total < 150) {
                    list.push(item);
                    item.total++;
                    msg = 200;
                } else {
                    msg = "该门课程剩余量为0";
                }
            }
        });
    } else {
        msg = '已选择课程'
    }
    return {
        status: 200,
        msg: msg,
        list: list
    }
})
// 获取已选公选课程
Mock.mock('/api/get/courselist', 'post', (req) => {
    let sid = JSON.parse(req.body).sid;
    let list;
    student.map((item) => {
        if (item.netID == sid) {
            list = item.course;
        }
    })
    return {
        status: 200,
        msg: '获取数据成功',
        list: list
    }
})
// 删除公选课程
Mock.mock('/api/delete/course', 'post', (req) => {
    let id = JSON.parse(req.body).id;
    let sid = JSON.parse(req.body).sid;
    let list;
    (student || []).map((item) => {
        if (item?.netID == sid) {
            list = item?.course;
            (list || []).map((items, index) => {
                if (items.id == id) {
                    list.splice(index, 1);
                    (Course || []).map((pro, i) => {
                        if (pro?.id == id) {
                            pro.total -= 1;
                        }
                    })
                }
            })
        }
    })
    return {
        status: 200,
        msg: '获取数据成功',
        list: list
    }
})
// 获取选课时间
Mock.mock('/api/get/time', 'get', () => {
    return {
        status: 200,
        msg: '获取数据成功',
        time: Time
    }
})
// 获取所有课程
Mock.mock('/api/get/project', 'get', (req) => {
    let list = [];
    (teacher || []).map((items) => {
        (items?.project || []).map((item) => {
            list.push(list);
        })
    });
    return {
        status: 200,
        msg: '获取数据成功',
        project: list
    }
})
// 教师自建课程 
Mock.mock('/api/teacher/project', 'post', (req) => {
    let sid = JSON.parse(req.body).sid;
    let list;
    (teacher || []).map((items) => {
        if (items?.netID == sid) {
            list = items?.project;
        }
    });
    list.map((list) => {
        let date = Method.getDate(new Date())?.classdate;
        if (Method.compareDate1(date, list.StartsignDate)) {
            list.state = "待报名";
        } else if (Method.compareDate2(list.StartsignDate, date, list.EndsignDate)) {
            list.state = "报名中";
        } else if (Method.compareDate2(list.EndsignDate, date, list.StartclassDate)) {
            list.state = "未开始";
        } else if (Method.compareDate2(list.StartclassDate, date, list.EndclassDate)) {
            list.state = "进行中";
        } else {
            list.state = "已结束";
        }
    })
    return {
        status: 200,
        msg: '获取数据成功',
        project: list
    }
})
// 创建课程
Mock.mock('/api/teacher/create', 'post', (req) => {
    let sid = JSON.parse(req.body).sid;
    let list = JSON.parse(req.body).list;
    let project = []
    teacher.map((item) => {
        if (item.netID == sid) {
            item.project.push(list);
            project = item.project;
        }
    })
    return {
        status: 200,
        msg: '获取数据成功',
        project: project
    }
})
// 课程详情
Mock.mock('/api/show/detail', 'post', (req) => {
    let tid = JSON.parse(req.body).tid;
    let id = JSON.parse(req.body).id;
    console.log(tid);
    console.log(id);
    let list;
    (teacher || []).map((items) => {
        if (items.netID == tid) {
            // console.log(1111);
            // console.log(items,'items');
            (items?.project || []).map((item) => {
                // console.log(222);
                if (item.id == id) {
                    // console.log(222);
                    list = item;
                    list.teacher = items.name;
                }
            })
        }
    });
    // console.log(list);
    return {
        status: 200,
        msg: '获取数据成功',
        list: list
    }
})
// 选课数据
Mock.mock('/api/student/select', 'get', (req) => {
    let date = Method.getDate(new Date())?.classdate;
    let project = [];
    (teacher || []).map((items) => {
        // console.log(items.project);
        (items.project || []).map((item) => {
            if (Method.compareDate2(item.StartsignDate, date, item.EndsignDate)) {
                // console.log(222);
                project.push(item);
            }
        })
    })
    return {
        status: 200,
        msg: '获取数据成功',
        project: project
    }
})
// 添加课程
Mock.mock('/api/add/class', 'post', (req) => {
    let tid = JSON.parse(req.body).tid;
    let id = JSON.parse(req.body).id;
    let sid = JSON.parse(req.body).sid;
    // console.log(sid, id, tid);
    let bool = false;
    let date = Method.getDate(new Date())?.classdate;
    let already = [], msg = '获取数据成功', project = [];
    (student || []).map((item) => {
        if (item.netID == sid) {
            already = item?.project;
        }
    });
    (already || []).map((item) => {
        // console.log(item,'---item');
        if (item.id == id) {
            bool = true;
        }
    });
    (teacher || []).map((items) => {
        if (items?.netID == tid) {
            (items?.project || []).map((item) => {
                console.log(bool);
                if (item.id == id) {
                    if (item?.count < 100 && !bool) {
                        item.count++;
                        (student || []).map((i) => {
                            if (i.netID == sid) {
                                i?.project.push(item);
                            }
                        });
                    } else {
                        if (item.count >= 100) {
                            msg = "选课人数已满";
                        } else {
                            msg = "该课程已选";
                        }
                    }
                }
            })
        }
    });
    (teacher || []).map((items) => {
        (items.project || []).map((item) => {
            if (Method.compareDate2(item.StartsignDate, date, item.EndsignDate)) {
                // console.log(222);
                project.push(item);
            }
        })
    });
    console.log(student[0]);
    return {
        status: 200,
        msg: msg,
        project: project
    }
})
// 自主选课查询
Mock.mock('/api/student/search', 'post', (req) => {
    let date = Method.getDate(new Date())?.classdate;
    let name = JSON.parse(req.body).name;
    var reg = new RegExp(name);
    let project = [];
    (teacher || []).map((items) => {
        (items.project || []).map((item) => {
            if (Method.compareDate2(item.StartsignDate, date, item.EndsignDate)) {
                // console.log(222);
                if (name && reg.test(item.name)) {
                    project.push(item);
                } else if (!name) {
                    project.push(item);
                }
            }
        })
    })
    return {
        status: 200,
        msg: '获取数据成功',
        project: project
    }
})
// 学生课程
Mock.mock('/api/student/project', 'post', (req) => {
    let sid = JSON.parse(req.body).sid;
    let project;
    (student || []).map((item) => {
        if (item.netID == sid) {
            project = item.project;
        }
    })
    console.log(project);
    return {
        status: 200,
        msg: '获取数据成功',
        project: project
    }
})
// 获取选择该课程的学生信息
Mock.mock('/api/get/list', 'post', (req) => {
    let id = JSON.parse(req?.body).id;
    let tid = JSON.parse(req?.body).tid;
    let list = [];
    (student || []).map((items) => {
        (items?.project || []).map((item) => {
            if (item.tid == tid && item.id == id) {
                let data = { ...item }
                data.sname = items?.name;
                data.sid = items?.netID;
                list.push(data);
            }
        })
    })
    return {
        status: 200,
        msg: '获取数据成功',
        list: list
    }
})
// 打分
Mock.mock('/api/set/score', 'post', (req) => {
    let id = JSON.parse(req?.body).id;
    let tid = JSON.parse(req?.body).tid;
    let sid = JSON.parse(req?.body).sid;
    let values = JSON.parse(req?.body).values;
    // console.log(id, tid, sid, values);
    // let list = [];
    (student || []).map((items) => {
        if (items.netID == sid) {
            // console.log(2222);
            (items?.project || []).map((item) => {
                // console.log(333);
                if (item.tid == tid && item.id == id) {
                    // console.log(444);
                    item.score = values;
                    // console.log(item,'--item');
                    // student[index]?.project[i].score = values;
                }
            })
        }
    });
    // console.log(student);
    return {
        status: 200,
        msg: '获取数据成功',
        list: student
    }
})
// 获取评价课程
Mock.mock('/api/student/appraise', 'post', (req) => {
    let id = JSON.parse(req?.body).id;
    let tid = JSON.parse(req?.body).tid;
    let list;
    (teacher || []).map((items) => {
        if (items.netID == tid) {
            (items?.project || []).map((item) => {
                if (item.id == id) {
                    console.log(item);
                    list = item;
                }
            })
        }
    });
    // console.log(student);
    return {
        status: 200,
        msg: '获取数据成功',
        list: list
    }
})
// 评价课程
Mock.mock('/api/set/appraise', 'post', (req) => {
    let id = JSON.parse(req?.body).id;
    let tid = JSON.parse(req?.body).tid;
    let sid = JSON.parse(req?.body).sid;
    let value = JSON.parse(req?.body).value;
    // console.log(req);
    let list;
    (student || []).map((items) => {
        if (items.netID == sid) {
            (items?.project || []).map((item) => {
                if (item.tid == tid && item.id == id) {
                    item.appraise = value;
                    list = item;
                }
            })
        }
    })
    return {
        status: 200,
        msg: '获取数据成功',
        list: list
    }
})
// 获取学生评价
Mock.mock('/api/get/appraise', 'post', (req) => {
    console.log(req);
    let id = JSON.parse(req?.body).id;
    let tid = JSON.parse(req?.body).tid;
    let appraise = [0, 0, 0, 0, 0];
    (student || []).map((items) => {
        (items?.project || []).map((item) => {
            if (item?.tid == tid && item?.id == id) {
                if (item.appraise == 1) {
                    appraise[0]++;
                } else if (item.appraise == 2) {
                    appraise[1]++;
                } else if (item.appraise == 3) {
                    appraise[2]++;
                } else if (item.appraise == 4) {
                    appraise[3]++;
                } else if (item.appraise == 5) {
                    appraise[4]++;
                }
            }
        })
    });
    return {
        status: 200,
        msg: '获取数据成功',
        result: appraise
    }
})
// 教师修改信息
Mock.mock('/api/teacher/setMessage', 'post', (req) => {
    let values = JSON.parse(req.body).values;
    let tid = JSON.parse(req.body).tid;
    console.log(values);
    console.log(tid);
    (teacher || []).map((item) => {
        if (item?.netID == tid) {
            item = { ...values };
            console.log(item, '--item');
        }
    })
    return {
        status: 200,
        msg: '获取数据成功',
        teacher: teacher
    }
})
// 教师修改密码
Mock.mock('/api/set/password', 'post', (req) => {
    let password = JSON.parse(req.body).password;
    let tid = JSON.parse(req.body).tid;
    let pwd = JSON.parse(req.body).newPwd;
    let msg;
    (teacher || []).map((item) => {
        if (item?.netID == tid) {
            if (item.password == password) {
                item.password = pwd;
                msg = 1;
            } else {
                msg = 0;
            }
        }
    })
    return {
        status: 200,
        msg: msg,
        teacher: teacher
    }
})