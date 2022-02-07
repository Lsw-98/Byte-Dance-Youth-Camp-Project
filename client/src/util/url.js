const model = 'development';
var localUrl = '';
var globalUrl = '';
var host = window.document.location.host;
var pathName = window.document.location.pathname;
var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);

if(model == 'development'){
	localUrl = 'http://127.0.0.1:6000/api';
	globalUrl = 'http://127.0.0.1:6000';
}else if(model == 'production'){
	localUrl = 'http://' + host + projectName + '/api';
	globalUrl = 'http://' + host + projectName;
}

export {localUrl, globalUrl}
