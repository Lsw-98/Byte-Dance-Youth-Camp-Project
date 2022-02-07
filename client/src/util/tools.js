import msg from './message'
//验证
var verification = {
	notEmptyReg(value, content, type){
		if(typeof(value) == 'number'){
			value = value.toString();
		}
		if(!value || !value.trim().length){
			if(type){
				msg('warning', '警告', content);
			}else{
				msg('warning', '警告', content + '不能为空');
			}
			return false;
		}
		return true;
	}
}

export {verification}