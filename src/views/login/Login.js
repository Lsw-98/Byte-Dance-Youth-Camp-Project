import React, { useState } from 'react';
import { Form, Input, Button, message, Image } from 'antd';
import './Login.css'
import axios from 'axios';
import Particles from 'react-tsparticles';
import { getQrCode } from '../../api/login';
import Verify from '../../components/login/Verify';

export default function Login(props) {
  const [visible, setVisible] = useState(false);
  const [phone, setPhone] = useState(false);

  const childRef = React.useRef();

  const onFinish = (values) => {
    if (values.verify && childRef.current.validate(values.verify)) {
      axios.get(`/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res => {
        if (res.data.length === 0) {
          message.error("用户名或密码错误")
        } else {
          localStorage.setItem("token", JSON.stringify(res.data[0]))
          props.history.push("/")
        }
      })
    } else {
      message.error('验证码错误', 2);
    }
  };

  const qrHandle = () => {
    setVisible(true);
    setPhone(false);
  }

  const usernameHandle = () => {
    setVisible(false);
    setPhone(false);
  };

  // 获取二维码
  const getQr = () => {
    getQrCode.then((res) => {
      if (res.code === 0) {

      }
    })
  }

  const phoneHandle = () => {

  }

  return (
    <div style={{ background: "rgb(35, 39, 65)", height: "100%", overflow: "hidden" }} >
      <Particles height={document.documentElement.clientHeight} params={
        {
          "background": {
            "color": {
              "value": "rgb(35, 39, 65)"
            },
            "position": "50% 50%",
            "repeat": "no-repeat",
            "size": "cover"
          },
          "fullScreen": {
            "enable": true,
            "zIndex": 1
          },
          "interactivity": {
            "events": {
              "onClick": {
                "enable": true,
                "mode": "push"
              },
              "onHover": {
                "enable": true,
                "mode": "bubble",
                "parallax": {
                  "force": 60
                }
              }
            },
            "modes": {
              "bubble": {
                "distance": 400,
                "duration": 2,
                "opacity": 1,
                "size": 40
              },
              "grab": {
                "distance": 400
              }
            }
          },
          "particles": {
            "color": {
              "value": "#ffffff"
            },
            "links": {
              "color": {
                "value": "#fff"
              },
              "distance": 150,
              "opacity": 0.4
            },
            "move": {
              "attract": {
                "rotate": {
                  "x": 600,
                  "y": 1200
                }
              },
              "enable": true,
              "outModes": {
                "default": "bounce",
                "bottom": "bounce",
                "left": "bounce",
                "right": "bounce",
                "top": "bounce"
              },
              "speed": 6
            },
            "number": {
              "density": {
                "enable": true
              },
              "value": 170
            },
            "opacity": {
              "animation": {
                "speed": 1,
                "minimumValue": 0.1
              }
            },
            "shape": {
              "options": {
                "character": {
                  "fill": false,
                  "font": "Verdana",
                  "style": "",
                  "value": "*",
                  "weight": "400"
                },
                "char": {
                  "fill": false,
                  "font": "Verdana",
                  "style": "",
                  "value": "*",
                  "weight": "400"
                },
                "polygon": {
                  "nb_sides": 5
                },
                "star": {
                  "nb_sides": 5
                },
                "image": {
                  "height": 32,
                  "replace_color": true,
                  "src": "/logo192.png",
                  "width": 32
                },
                "images": {
                  "height": 32,
                  "replace_color": true,
                  "src": "/logo192.png",
                  "width": 32
                }
              },
              "type": "image"
            },
            "size": {
              "value": 16,
              "animation": {
                "speed": 40,
                "minimumValue": 0.1
              }
            },
            "stroke": {
              "color": {
                "value": "#000000",
                "animation": {
                  "h": {
                    "count": 0,
                    "enable": false,
                    "offset": 0,
                    "speed": 1,
                    "sync": true
                  },
                  "s": {
                    "count": 0,
                    "enable": false,
                    "offset": 0,
                    "speed": 1,
                    "sync": true
                  },
                  "l": {
                    "count": 0,
                    "enable": false,
                    "offset": 0,
                    "speed": 1,
                    "sync": true
                  }
                }
              }
            }
          }
        }
      } />
      <div className='formContainer'>
        <div className="title">全球新闻发布管理系统</div>
        {
          !visible && (
            <>
              <Form
                name="normal_login"
                className="login-form"
                onFinish={onFinish}
              >
                <Form.Item
                  label="用户名："
                  name="username"
                  rules={[{ required: true, message: '请输入用户名！' }]}
                >
                  <Input placeholder="请输入用户名" />
                </Form.Item>
                <Form.Item
                  label="密码："
                  name="password"
                  rules={[{ required: true, message: '请输入密码！' }]}
                >
                  <Input
                    type="password"
                    placeholder="请输入密码"
                    autoComplete='off'
                  />
                </Form.Item>
                <Form.Item
                  label="验证码："
                  name="verify"
                  rules={[{ required: true, message: '请输入验证码！' }]}
                >
                  <Input
                    placeholder="请输入验证码"
                    autoComplete='off'
                  />
                </Form.Item>
                <Form.Item>
                  <Button htmlType="submit" className="login-form-button">
                    登录
                  </Button>
                  <Button className="login-form-qr" style={{ marginLeft: "5px" }} onClick={phoneHandle}>
                    手机号登录
                  </Button>
                  <Button className="login-form-qr" style={{ marginLeft: "5px" }} onClick={qrHandle}>
                    二维码登录
                  </Button>
                  <Verify cRef={childRef}></Verify>
                </Form.Item>
              </Form>
            </>
          )
        }
        {
          visible && (
            <>
              <div className='qr-container'>
                <Image
                  width={150}
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
                <Form.Item>
                  < Button className="qr-to-username" onClick={usernameHandle}>
                    账号密码登录
                  </Button>
                  < Button className="phone-to-username" style={{ marginLeft: "5px" }} onClick={usernameHandle}>
                    手机号登录
                  </Button>
                </Form.Item>
              </div>
            </>
          )
        }
      </div>
    </ div >
  );
}
