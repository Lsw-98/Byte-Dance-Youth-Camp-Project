import React, {Component} from 'react'
import { Input, Button, Upload, Icon, message} from 'antd';
import { options } from '../util/global'
import Header from './common/header'

const {TextArea} = Input;
const {url, msg, http, verify} = options;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}
  
function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}
  
export default class Write extends Component{
    constructor(){
        super()
        this.state = {
            imageUrl: '',
            headUrl: '',
            loading: false,
            title: '',
            content: ''
        }
    }
    handleChange = (info) => {
        var {response} = info.file;

        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
        
        if(response.success){
            msg('success', '成功', response.message);
            this.setState({headUrl: response.results.headUrl})
        }else{
            msg('error', '失败', response.message);
        }
    }
    addArticle = () => {
        let {title, content, headUrl} = this.state;

        if(!verify.notEmptyReg(title, '标题') || !verify.notEmptyReg(content, '内容')){ 
            return;
        }
        
        http.post(url + '/addarticle', {
            title,
            content,
            headUrl
        }).then(res => {
            if(res.data){
                if(res.data.success){
                    msg('success', '成功', res.data.message);
                    this.props.history.goBack();
                }else{
                    msg('warning', '警告', res.data.message);
                }
            }
        }).catch(err => {
            console.log(err);
        })
    }
    render(){
        const {loading, imageUrl, title, content} = this.state;
        const uploadButton = (
            <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">添加题图</div>
            </div>
        );
        return (
            <div className="user">
                <Header />
                <div className="main">
                    <div className="container up_con">
                        <div className="article_box">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action={url + "/upload"}
                                beforeUpload={beforeUpload}
                                onChange={this.handleChange}>
                                {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                            </Upload>
                            <Input className="article_title" placeholder="请输入标题（最多50个字）" onChange={e => {this.setState({title: e.target.value})}}/>
                            <TextArea className="article_content" placeholder="请输入正文" autosize={{ minRows: 5, maxRows: 6 }} onChange={e => {this.setState({content: e.target.value})}}/>
                            <div className="up_box">
                                <Button type="primary" style={{marginRight: '25px'}} onClick={this.addArticle}>保存</Button>
                                <Button onClick={() => this.props.history.goBack()}>返回</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}