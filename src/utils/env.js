let baseUrl = '';
if(process.env.ENV_CONFIG == 'development'){
    baseUrl = "http://zl.haiyunzy.com/zltdd"
}else if(process.env.ENV_CONFIG == 'test'){
    baseUrl = "http://zl.haiyunzy.com/zltdd"
}else if(process.env.ENV_CONFIG == 'prod'){
    baseUrl = "http://www.xxx.com"
}
export{
    baseUrl
}