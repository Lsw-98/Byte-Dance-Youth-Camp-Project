import React, {Component} from 'react'
import {Input} from 'antd'
import img_logo from '../../images/slogo.png'
import img_user from '../../images/user.png'
import img_admin from '../../images/admin.jpg'
import img_close from '../../images/close.jpg'

const {Search} = Input;

export default class Header extends Component{
    render(){
        return(
            <div className="h_header">
                <div className="h_hc">
                    <div className="h_logo"><img src={img_logo} alt="logo" width="100%"/></div>
                    <nav className="h_nav">
                        <a href="www.baidu.com">首页</a>
                        <a href="www.baidu.com">首页</a>
                        <a href="www.baidu.com">首页</a>
                    </nav>
                    <Search
                        placeholder="input search text"
                        onSearch={value => console.log(value)}
                        style={{ width: 340 }}/>
                        
                    <div className="userinfo">
                        <div className="header_icons"><img src={img_user} width="100%"/></div>
                        <p className="header_admin">loginName</p>
                        <div className="header_block">
                            <div className="header_block_exit">
                                <div className="header_block_icon">
                                    <img src={img_admin} width="100%"/>
                                </div>
                                <p className="header_block_txt">修改密码</p>
                            </div>
                            <div className="header_block_exit" style={{borderTop: '1px solid #e6e6e6'}}>
                                <div className="header_block_icon">
                                    <img src={img_close} width="100%" />
                                </div>
                                <p className="header_block_txt">退出账号</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}