import React, {  } from 'react'

import { Form, Input } from 'antd'

const Item = Form.Item

const EditInfo = (props: any) => {

    const { form } = props
    
    const  { getFieldDecorator } = form

    return (
        <Form>
            <Item label='用户名'>
                {
                    getFieldDecorator('nickname', {
                        rules: [
                            {
                                type: 'nickname',
                                required: true,
                                message: '请输入用户名'
                            }
                        ]
                    })(
                        <Input placeholder='请输入用户名' />
                    )
                }
            </Item>
        </Form>
    )
}


export default Form.create()(EditInfo)