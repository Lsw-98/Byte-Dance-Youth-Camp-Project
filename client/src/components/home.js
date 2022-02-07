import React, {Component} from 'react'
import { options } from '../util/global'

import Header from './common/header'
import Item from './item'
import Right from './common/right'

const {url, http} = options;

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            dataList: [],
        }
    }
    componentDidMount(){
        this.getArticleList();
    }
    getArticleList = () => {
        let {dataList} = this.state;
        dataList = [];

        http.post(url + '/home', {}).then(res => {
            if(res.data){
                dataList = res.data;
                this.setState({dataList});
            }
        }).catch(err => {
            console.log(err);
        })
    }
    render(){
        let {dataList} = this.state;

        return (
            <div className="home">
                <Header />
                <div className="main">
                    <div className="container">
                        <div className="container_left">
                            {
                                dataList.length > 0 ? (
                                    dataList.map((item, index) => {
                                        return <Item item={item} key={index}/>;
                                    })
                                ) : (
                                    <p className="noarticle">暂无数据</p>
                                )
                            }
                        </div>
                        <Right />
                    </div>
                </div>
            </div>
        )
    }
}