import React, {Component} from 'react'
import {Button, Tabs} from 'antd'
import Header from './common/header'
import Item from './item'

import img_head from '../images/user.jpg'

const TabPane = Tabs.TabPane;

export default class User extends Component{
    callback(key) {
        console.log(key);
    }
    render(){
        return(
            <div className="user">
                <Header />
                <div className="main">
                    <div className="container">
                        <div className="card">
                            <div className="cardt"></div>
                            <div className="cardb">
                                <div className="user_msg">
                                    <h1 className="username">lianglz <span>web前端工程师</span></h1>
                                    <p className="userdesc">没什么描述</p>
                                </div>
                                <Button className="userupd">编辑个人资料</Button>
                            </div>
                            <div className="user_icon">
                                <div className="user_iconimg"><img src={img_head} width="100%" height="100%"/></div>
                            </div>
                        </div>
                    </div>
                    <div className="container dcontainer">
                        <div className="container_left user_nav">
                            <Tabs defaultActiveKey="1" onChange={this.callback.bind(this)}>
                                <TabPane tab="关注" key="1">
                                    <div className="user_dt">关注</div>
                                    <Item />
                                    <Item />
                                    <Item />
                                </TabPane>
                                <TabPane tab="收藏" key="2">
                                    <div className="user_dt">收藏</div>
                                    <Item />
                                    <Item />
                                    <Item />
                                </TabPane>
                            </Tabs>
                        </div>
                        <div className="container_right">
                            <div className="user_count">
                                <div className="user_count_left">
                                    <p className="user_count_title">关注了</p>
                                    <p className="user_count_num">0</p>
                                </div>
                                <div className="user_count_right">
                                    <p className="user_count_title">关注者</p>
                                    <p className="user_count_num">0</p>
                                </div>
                            </div>
                            <ul className="user_list">
                                <li>
                                    <p className="user_list_title">关注的话题</p>
                                    <p className="user_list_count">15</p>
                                </li>
                                <li>
                                    <p className="user_list_title">关注的专栏</p>
                                    <p className="user_list_count">15</p>
                                </li>
                                <li>
                                    <p className="user_list_title">关注的问题</p>
                                    <p className="user_list_count">15</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}