import { notification } from 'antd';

let key = 'laryer';
let message = (type, title, description) => {
    notification.close(key);
    notification[type]({
        key,
        message: title,
        description: description,
        duration: 3
    });
}
export default message