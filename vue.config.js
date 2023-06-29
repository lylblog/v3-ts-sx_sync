// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   devServer: {
//     allowedHosts: [
//         '23165e1b11.zicp.fun',
//         '.zicp.fun'
//     ]
//   },
//   transpileDependencies: true
// })
const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//     devServer: {
//         allowedHosts: [
//             '23165e1b11.zicp.fun',
//             '.zicp.fun'
//         ]
//     },
//     transpileDependencies: true
// })
module.exports = defineConfig({
    publicPath: '/',
    devServer: {
        allowedHosts: [
            '23165e1b11.zicp.fun',
            '.zicp.fun'
        ],
        proxy: {
            '/api': {
                target: 'http://10.223.70.133:8888/', //接口域名
                changeOrigin: true,             //是否跨域
                ws: true,                       //是否代理 websockets
                secure: false,                   //是否https接口
                pathRewrite: {                  //路径重置
                    ['^' + "/api"]: ''
                }
            }
        }
    },
    transpileDependencies: true,
    lintOnSave: false
});
