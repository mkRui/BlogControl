// 用户等旅
import React, {  } from 'react'

import { Form, Input, Button } from 'antd'

import style from '@/styles/components/Login/LoginForm/Form.module.scss'

const Item = Form.Item;

const UserForm = (props: any) => {
    
    const { form } = props
    
    const  { getFieldDecorator } = form

    const handleSubmit = () => {
        console.log(1)
    }

    return (
        <div className={style['Form']}>
            <Form onSubmit={handleSubmit} layout='vertical'>
                <Item label='用户名'>
                    {
                        getFieldDecorator('user', {
                            rules: [
                                {
                                    type: 'email',
                                    required: true,
                                    message: '请输入用户名'
                                }
                            ]
                        })(
                            <Input placeholder='请输入用户名' />
                        )
                    }
                </Item>
                <Item label='密码'>
                    {
                        getFieldDecorator('user', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入密码'
                                }
                            ]
                        })(
                            <Input.Password />
                        )
                    }
                </Item>
                <Item>
                    <Button htmlType="submit" type='primary' style={{width: '100%'}} >
                        登录
                    </Button>
                </Item>
            </Form>
        </div>

    )
}

export default Form.create()(UserForm)