import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

import img_s from '../../images/s.png'
import img_article from '../../images/article.png'
import img_write from '../../images/write.png'
import img_idea from '../../images/idea.png'

export default class Right extends Component{
    render(){
        return(
            <div className="container_right">
                <ul className="home_rightnav">
                    <li>
                        <div className="home_ric"><img src={img_article} alt="" width="100%"/></div>
                        <p className="home_rp">写回答</p>
                    </li>
                    <li>
                        <NavLink to="/article">
                            <div className="home_ric"><img src={img_write} alt="" width="100%"/></div>
                            <p className="home_rp">写文章</p>
                        </NavLink>
                    </li>
                    <li>
                        <div className="home_ric"><img src={img_idea} alt="" width="100%"/></div>
                        <p className="home_rp">写想法</p>
                    </li>
                </ul>
                <ul className="home_rl">
                    <li>
                        <div className="home_rlicon"><img src={img_s} alt="" width="100%"/></div>
                        <p className="home_rltitle">我的收藏</p>
                    </li>
                    <li>
                        <div className="home_rlicon"><img src={img_s} alt="" width="100%"/></div>
                        <p className="home_rltitle">我的收藏</p>
                    </li>
                    <li>
                        <div className="home_rlicon"><img src={img_s} alt="" width="100%"/></div>
                        <p className="home_rltitle">我的收藏</p>
                    </li>
                    <li>
                        <div className="home_rlicon"><img src={img_s} alt="" width="100%"/></div>
                        <p className="home_rltitle">我的收藏</p>
                    </li>
                    <li>
                        <div className="home_rlicon"><img src={img_s} alt="" width="100%"/></div>
                        <p className="home_rltitle">我的收藏</p>
                    </li>
                </ul>
            </div>
        )
    }
}