import Mock from 'mockjs'

// 登录接口
Mock.mock('/login', 'post', (params) => {
    // 请求参数
    // console.log(params);
    // console.log('post请求传入的参数是：', params.body);
    let loginData = JSON.parse(params.body);
    // console.log(loginData);

    let data;
    // 用户信息验证，用户名和密码正确后，返回token
    if(loginData.username=='admin' && loginData.password=='123456'){
        data = Mock.mock({
            "token": "@id",  // 随机生成18位数，模拟身份证号  获取生成token值
            "username": loginData.username
            })
        // console.log(data)
        return {
            status: 200,
            type: "ok",
            message: "请求用户信息成功",
            tData:data,
        }
    } else {
        data = Mock.mock({
            "token": "",
        })
        return {
            status: 300,
            type: "error",
            message: "请求用户信息失败",
            tData:data,
        }
    }
});

// 左侧菜单列表
Mock.mock('/layout', 'get', () => {

    const arr=Mock.mock(
[
            {
                "id":"1",
                "authName":"政务服务",
                "path":"/1",
                "children": [
                    {
                    "id":"11",
                    "authName":'事项同步',
                    "path":"/sx_info_sync",
                    }
                ]
            },
            {
                "id":"2",
                "authName":"练手项目",
                "path":"/2",
                "children": [
                    {
                        "id":"21",
                        "authName":'计数器路由',
                        "path":"/count",
                    },
                    {
                        "id":"22",
                        "authName":'图片轮播路由',
                        "path":"/imageshow",
                    },
                    {
                        "id":"23",
                        "authName":'todoList路由',
                        "path":"/todo",
                    },
                    {
                        "id":"24",
                        "authName":'天气查查查路由',
                        "path":"/weather",
                    },
                    {
                        "id":"25",
                        "authName":'知心姐姐聊天',
                        "path":"/chat",
                    },
                    {
                        "id":"26",
                        "authName":'手机品牌管理',
                        "path":"/phone",
                    },
                    {
                        "id":"27",
                        "authName":'天知道天气查看',
                        "path":"/weathernew",
                    },
                    {
                        "id":"28",
                        "authName":'悦听音乐播放器',
                        "path":"/musicplayer",
                    },
                    {
                        "id":"28",
                        "authName":'黑云音乐播放器',
                        "path":"/blackmusic",
                    },
                ]
            },
        ],

        )

    const meta = Mock.mock({
        "msg": "获取菜单列表成功",
        "status": 200,
    })
    // console.log(arr); //生成5组数据
        return {
            data:arr,
            meta:meta,

        }
});

// 用户列表
Mock.mock('/user', 'get', () => {

    const users=Mock.mock([
            {
                "id":"25",
                "username":"test117",
                "mobile":"13666666666",
                "tpe": 1,
                "email": "test117@163.com",
                "create_time": "2020-11-11T20:23:45.000Z",
                "mg_state": true, //用户状态
                "role_name": "门户管理员",
            },
            {
                "id":"26",
                "username":"test118",
                "mobile":"13666666688",
                "tpe": 1,
                "email": "test118@163.com",
                "create_time": "2020-11-22T20:23:45.000Z",
                "mg_state": false, //用户状态
                "role_name": "门户管理员2",
            },
        ])

    const meta = Mock.mock({
        "msg": "获取菜单列表成功",
        "status": 200,
    })
    // console.log(arr); //生成5组数据
    return {
        "totalpage": 5,
        "pagenum": 4,
        "total": 20,
        users:users,
        meta:meta,

    }
});
// 用户状态更新
Mock.mock('/user/:uId/state/:type', 'put', (params) => {

    let loginData = JSON.parse(params.body);
    console.log(loginData);
    const users=Mock.mock([
        {
            "id":"25",
            "rid": 28,
            "username":"test117",
            "mobile":"13666666666",
            "email": "test117@163.com",
            "mg_state": 0, //用户状态
        },
    ])

    const meta = Mock.mock({
        "msg": "设置用户状态成功",
        "status": 200,
    })
    // console.log(arr); //生成5组数据
    return {
        users:users,
        meta:meta,

    }
});
