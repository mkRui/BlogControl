// 邮箱登录
import React, {  } from 'react'

import { Form, Input, Button } from 'antd'

import style from '@/styles/scss/components/Login/LoginForm/Form.module.scss'

const Item = Form.Item;

const EmailForm = (props: any) => {

    const { form } = props
    
    const  { getFieldDecorator } = form

    const handleSubmit = () => {
        console.log(1)
    }

    return (
        <div className={style['Form']}>
            <Form onSubmit={handleSubmit} layout='vertical'>
                <Item label='邮箱'>
                    {
                        getFieldDecorator('user', {
                            rules: [
                                {
                                    type: 'email',
                                    required: true,
                                    message: '请输入邮箱'
                                }
                            ]
                        })(
                            <Input placeholder='请输入邮箱' />
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

export default Form.create()(EmailForm)