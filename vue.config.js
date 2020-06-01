module.exports = {
    publicPath: './',
    assetsDir: "assets",
    lintOnSave: false,
    indexPath: 'index.html' ,
    devServer: {
        port: 8080,
        https: false,
        proxy: {
            '/index': {
                target: 'http://47.98.142.113:8443/api',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/index': ''
                }
            }
        }
    },
    
}