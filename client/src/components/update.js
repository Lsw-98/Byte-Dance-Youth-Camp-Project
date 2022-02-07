import React, {Component} from 'react'
import Header from './common/header'
import { Input, Button, Icon } from 'antd'
import img_head from '../images/user.jpg'

const {TextArea} = Input;

export default class User extends Component{
    callback(key) {
        console.log(key);
    }
    render(){
        return(
            <div className="user">
                <Header />
                <div className="main">
                    <div className="container up_con">
                        <div className="cardt"></div>
                        <div className="user_icon">
                            <div className="user_iconimg">
                                <img src={img_head} width="100%" height="100%"/>
                                <div className="up_head">编辑头像<input type="file"/></div>
                            </div>
                        </div>
                        <div className="up_main">
                            <div className="up_box">
                                <div className="up_title">昵称</div>
                                <div className="up_ipt">
                                    <Input placeholder="Enter your username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large"/>
                                </div>
                            </div>
                            <div className="up_box">
                                <div className="up_title">性别</div>
                                <div className="up_ipt">
                                    <Input placeholder="Enter your username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large"/>
                                </div>
                            </div>
                            <div className="up_box">
                                <div className="up_title">居住地</div>
                                <div className="up_ipt">
                                    <Input placeholder="Enter your username" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} size="large"/>
                                </div>
                            </div>
                            <div className="up_box">
                                <div className="up_title">个人简介</div>
                                <div className="up_ipt">
                                    <TextArea className="up_textarea" rows={4} />
                                </div>
                            </div>
                            <div className="up_box">
                                <Button type="primary" style={{marginRight: '25px'}}>保存</Button>
                                <Button>返回</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}