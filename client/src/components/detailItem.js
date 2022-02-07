import React, {Component} from 'react'

import img_head from '../images/head.jpg'
import img_z from '../images/z.png'
import img_p from '../images/p.png'
import img_f from '../images/f.png'
import img_s from '../images/s.png'

export default class DetailIten extends Component{
    render(){
        return (
            <div className="d_itema">
                <div className="dh">
                    <div className="d_head"><img src={img_head} alt="" width="100%" height="100%"/></div>
                    <div className="d_huser">
                        <div className="d_name">郭力</div>
                        <div className="d_desc">game programmer</div>
                    </div>
                </div>
                <p className="d_z">9人赞同了该回答</p>
                <p className="content">所以就出现了模版前移的运动，属于前后端分离的一部分。这个时期出现了巨量的前端 JS 模版，比如 EJS、Jade、Pug 等，单页应用 SPA 也开始流行起来。后端只负责初始 HTML 页面，给你加载个 JS 地址，JS 内容和整个页面全部你来搞，顶多再给你输出个全局变量带初始化的数据。</p>
                <p className="content_date">编辑于 2019-1-30</p>
                <div className="item_bottom">
                    <ul className="item_icons">
                        <li>
                            <div className="item_icon"><img src={img_z} alt="" width="100%"/></div>
                            <p className="item_handle">赞</p>
                        </li>
                        <li>
                            <div className="item_icon"><img src={img_p} alt="" width="100%"/></div>
                            <p className="item_handle">评论</p>
                        </li>
                        <li>
                            <div className="item_icon"><img src={img_f} alt="" width="100%"/></div>
                            <p className="item_handle">分享</p>
                        </li>
                        <li>
                            <div className="item_icon"><img src={img_s} alt="" width="100%"/></div>
                            <p className="item_handle">收藏</p>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}