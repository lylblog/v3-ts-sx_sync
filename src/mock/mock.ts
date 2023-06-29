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
