// 注册
import React, { useState, useRef, useEffect } from 'react'

import { Form, Input, Col, Row, Button } from 'antd'

const Item = Form.Item

const RegisterForm = (props: any) => {

    const [checkSubmit, setCheckSubmit] = useState(false)

    const [second, setSecond] = useState(60)

    let sec = 60;

    const s = useRef()

    const subVerify = () => {
        // 发送验证码
        setCheckSubmit(true)
    }

    useEffect(() => {
        if (checkSubmit) {
            (s.current as any) = setInterval(() => {
                setSecond(--sec)
            }, 1000)
        }
    }, [checkSubmit])


    useEffect(() => {
        if (second <= 0) {
            setCheckSubmit(false)
            clearInterval(s.current)
        }
    }, [second])


    

    return (
        <Form>
            <Row>
                <Col span={17}>
                    <Item
                        label={'邮箱'}
                        rules={
                            [
                                {
                                    type: 'email',
                                    required: true,
                                    message: '老铁请输入的邮箱'
                                }
                            ]
                        }
                    >
                        <Input placeholder={'老铁请输入邮箱'} />
                    </Item>      
                </Col>
                <Col span={3} offset={1}>
                    <Button
                        style={{marginTop: '43px'}}
                        disabled={checkSubmit}
                        onClick={subVerify}
                    >
                        { checkSubmit ? (second < 10 ? '0' + second : second) + '(S)重新' : '发送验证码' }
                    </Button>
                </Col>
            </Row>
            <Item
                label={'验证码'}
                rules={
                    [
                        {
                            required: true,
                            message: '老铁请输入验证码'
                        }
                    ]
                }
            >
                <Input placeholder={'老铁请输入验证码'} />
            </Item>
            <Item
                label={'密码'}
                rules={
                    [
                        {
                            required: true,
                            message: '请输入老铁的密码'
                        }
                    ]
                }
            >
                <Input.Password placeholder={'请输入邮箱'} />
            </Item>
        </Form>
    )
}

export default Form.create()(RegisterForm)