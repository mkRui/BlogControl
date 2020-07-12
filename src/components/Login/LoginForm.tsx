/** 登录 form */

import React, { } from 'react';

import { Tabs } from 'antd';

// 两种登录方式
import EmailForm from './LoginForm/EmailLogin';

import UserLogin from './LoginForm/UserLogin';

import styles from '@/styles/components/Login/LoginForm.module.scss'

const TabPane = Tabs.TabPane;


const LoginForm = (props: any) => {
    let { history } = props
    // 跳转到 注册
    const Jump = () => {
        history.push('/Login/Registered/0')
    }

    return (
        <div className={styles['LoginForm']}>
            <div className={styles['slider']}>
                <img src={require('@/img/logo.png')} className={styles['logo']} alt=""/>
                <h1>Bolg Management</h1>
                <p>welcome to the blog Management Platform of CoderRui</p>
                <span onClick={Jump}>{'先行注册吧～ >'}</span>
            </div>
            <div className={styles['content']}>
                <Tabs
                    tabBarStyle={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    defaultActiveKey="1"
                    >
                    <TabPane
                        tab={'用户登录'}
                        key="1"
                    >
                        <UserLogin/>
                    </TabPane>
                    <TabPane
                        tab={'邮箱登录'}
                        key="2"
                    >
                        <EmailForm/>
                    </TabPane>
                </Tabs>
            </div>
        </div> 
    )
}

export default LoginForm