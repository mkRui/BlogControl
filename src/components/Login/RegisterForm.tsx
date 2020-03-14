// 注册
import React, {  } from 'react'

import { Icon, Steps } from 'antd'

import styles from '@/styles/scss/components/Login/RegisterForm.module.scss'

const { Step } = Steps;

const RegisterForm = (props: any) => {

    let { history } = props

    const backFun = () => {
        history.push('/Login/LoginForm')
    }

    return (
        <div className={styles['Register']}>
            <div className={styles['content']}>
                <header>
                    <Steps progressDot current={1}>
                        <Step
                            title="注册"
                        />
                    </Steps>
                </header>
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