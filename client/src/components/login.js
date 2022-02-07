import React, {Component} from 'react'
import { Switch } from 'antd';
import { options } from '../util/global'
import img_logo from '../images/logo.png'

const {http, url, msg} = options;

export default class Login extends Component{
    constructor(props){
        super(props)
        this.state = {
            attrArr: [],
            areaArr: []
        }
    }
    componentDidMount(){
        let status = false;
        localStorage.getItem('status') == 'true' ? status = true : status = false;
        if(status){
            this.initRender();
            setTimeout(() => {
                this.rePosition();
            }, 1000);
        }
    }
    //记录位置类名
    initRender(){
        let {attrArr} = this.state;

        for(let i in this.refs){
            attrArr.push({
                top: this.refs[i].getBoundingClientRect().top + 'px',
                left: this.refs[i].getBoundingClientRect().left + 'px',
                className: this.refs[i].className,
            });
            this.getRandom(this.refs[i]);
        }

        this.setState({attrArr})
    }
    //初始随机渲染
    getRandom(dom){
        let {areaArr} = this.state;
        let randomT = 100 + (Math.random() * 700);
        let randomL = 100 + (Math.random() * 1600);
        let randomR = Math.random() * 180;

        if(areaArr.length > 0){
            for(let i=0; i<areaArr.length; i++){
                if((randomL + 100 > areaArr[i].l && randomT + 100 > areaArr[i].t) &&
                    (randomL - 100 < areaArr[i].l && randomT + 100 > areaArr[i].t) &&
                    (randomL + 100 > areaArr[i].l && randomT - 100 < areaArr[i].t) &&
                    (randomL - 100 < areaArr[i].l && randomT - 100 < areaArr[i].t)){
                    this.getRandom(dom);
                }else{
                    continue;
                }
            }
        }

        areaArr.push({
            l: randomL,
            t: randomT
        });
        this.setState({areaArr});

        dom.style.top = randomT + 'px';
        dom.style.left = randomL + 'px';
        dom.style.transform = `rotate(${randomR}deg)`;
        dom.className = 'login_position'
    }
    //恢复位置
    rePosition(){
        let {attrArr} = this.state;
        let count = 0;
        let delay = 0.2;

        for(let i in this.refs){
            this.refs[i].style.top = attrArr[count].top;
            this.refs[i].style.left = attrArr[count].left;
            this.refs[i].style.transform = 'rotate(0deg)';
            this.refs[i].style.transitionDelay = `${delay}s`
            
            if(i.split('el')[1] > 6){
                this.refs[i].className = 'login_position login_transition login_wh0';
            }else{
                this.refs[i].className = 'login_position login_transition';
            }

            count ++;
            delay += 0.2;
        }
        setTimeout(() => {
            this.reClass();
        }, 1000)
    }
    //恢复类名
    reClass(){
        let {attrArr} = this.state;
        let count = 0;

        for(let i in this.refs){
            this.refs[i].className = `login_position login_transition ${attrArr[count].className}`;
            count ++;
        }
        setTimeout(() => {
            this.removePosition();
        }, 1500)
    }
    //去除延迟
    removePosition(){
        let {attrArr} = this.state;
        let count = 0;

        for(let i in this.refs){
            this.refs[i].style.transitionDelay = '0s';
            this.refs[i].className = `login_position ${attrArr[count].className}`;
            count ++;
        }
    }
    //效果开关状态
    effectState = status =>{
        localStorage.setItem('status', status);
    }
    //登录方法
    onLogin = () => {
        let username = this.refs.el3.value;
        let password = this.refs.el4.value;
        http.post(url + '/login', {
            username,
            password
        }).then(res => {
            if(res.data){
                if(res.data.success){
                    localStorage.setItem('token', res.data.result.token);
                    msg('info', '成功', res.data.message);
                    this.props.history.push('/home');
                }else{
                    msg('warning', '警告', res.data.message);
                }
            }
        }).catch(err => {
            console.log(err);
        })
    }
    render(){
        let status = false;
        localStorage.getItem('status') == 'true' ? status = true : status = false;
        return (
            <div className="login">
                <div className="login_title" ref="el1"><img src={img_logo} width="170"/></div>
                <p className="login_design" ref="el2">在这里你会相信，海内总会有知己，天涯再远若比邻。</p>
                <input className="login_name" placeholder="请输入用户名" ref="el3"/>
                <input className="login_pwd" placeholder="请输入密码" type="password" ref="el4"/>
                <div className="login_btn" ref="el5" onClick={this.onLogin}>登 陆</div>
                <div className="login_register" ref="el6">没有账号 ？<a>注册</a></div>
                <div className="login_line1" ref="el7"></div>
                <div className="login_line2" ref="el8"></div>
                <div className="login_line3" ref="el9"></div>
                <div className="login_line4" ref="el10"></div>
                <div className="login_line5" ref="el11"></div>
                <Switch className="login_switch" defaultChecked={status} onChange={this.effectState}/>
            </div>
        )
    }
}