// 注册
import React, { useState } from 'react'

import { Icon, Steps, Button } from 'antd'

import styles from '@/styles/scss/components/Login/RegisterForm.module.scss'

import Email from './RegisterForm/EmailRegister'

const { Step } = Steps;

const RegisterForm = (props: any) => {

    let { history } = props

    const [step, setStep] = useState(0)

    const backFun = () => {
        history.push('/Login/LoginForm')
    }


    const next = () => {
        setStep(1)
    }

    

    return (
        <div className={styles['Register']}>
            <div className={styles['content']}>
                <header>
                    <Steps progressDot current={step}>
                        <Step
                            title="注册"
                        />
                        <Step
                            title="编辑信息"
                        />
                        <Step
                            title="完成"
                        />
                    </Steps>
                </header>
                <div className={styles['Form']}>
                    <Email/>
                </div>
                <div className={styles['footer']}>
                    <Button onClick={next} type='primary'>{step > 1 ? '下一步' : '登录'}</Button>
                </div>
            </div>
            <div className={styles['side-bar']}>
                <div>
                    <Icon type="left" onClick={backFun} />
                </div>
            </div>
        </div>
    )
}

export default RegisterForm