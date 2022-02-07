import React, {Component} from 'react'

import img_item from '../images/title.jpg'
import img_z from '../images/z.png'
import img_p from '../images/p.png'
import img_f from '../images/f.png'
import img_s from '../images/s.png'

export default class Item extends Component{
    constructor(props){
        super(props);
        this.state = {
            item: null
        }
    }
    componentWillMount(){
        let {item} = this.props;
        this.setState({item});
    }
    dealContent(content){
        if(content.length > 100){
            var con = content.substring(0, 100);
            content = con + '...';
        }
        return content;
    }
    render(){
        let {item} = this.state;
        return (
            <div className="item">
                { item.title && (<h2 className="item_h2">{item.title}</h2>) }
                <div className="item_boxbefore">
                    {
                        item.headUrl &&  (
                            <div className="item_box">
                                <img src={item.headUrl} alt="" width="100%" height="100%"/>
                            </div>
                        )
                    }
                    { item.content && (<div className="item_txt">{this.dealContent(item.content)}</div>) }
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
            </div>
   
        )
    }
}