/**
 * 配置本地环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * 
 */

let baseUrl = '';

if(process.env.NODE_ENV == 'development') { //本地环境
	baseUrl = 'http://192.168.0.103:8082';
} else if(process.env.NODE_ENV == 'production') { //线上环境
	baseUrl = window.location.origin;
}

console.log(process.env.NODE_ENV, '当前后台地址为   ' + baseUrl)
export {
	baseUrl,
}