import React, {Component} from 'react'
import {Button} from 'antd'

import Header from './common/header'
import DetailItem from './detailItem'
import Right from './common/right'

export default class Details extends Component{
    render(){
        return (
            <div className="detail">
                <Header />
                <div className="d_header">
                    <div className="d_heamain">
                        <div className="d_healeft">
                            <h1>TypeScript解决了什么痛点？</h1>
                            <p className="d_headescribe">如果说是因为类型检查的话，为什么作为弱类型的PHP做web后端这么多年了没有流行“TypePHP”之类的“PHP超集”？</p>
                            <div className="d_btns">
                                <Button type="primary" className="d_btn_follow">关注问题</Button>
                                <Button icon="highlight" className="d_btn_write">写回答</Button>
                            </div>
                        </div>
                        <div className="d_hearight">
                            <div className="d_hrflow d_hrflowb">
                                <div className="d_hrtitle">被浏览</div>
                                <p className="d_count">15000</p>
                            </div>
                            <div className="d_hrflow">
                                <div className="d_hrtitle">关注者</div>
                                <p className="d_count">150</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container dcontainer">
                    <div className="container_left">
                        <div className="d_item">
                            <DetailItem />
                            <DetailItem />
                            <DetailItem />
                            <DetailItem />
                        </div>
                    </div>
                    <Right />
                </div>
            </div>
        )
    }
}