import React from 'react'

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import styles from '@/styles/scss/Login.module.scss'

const Login = () => {
    console.log(styles)
    return (
        <div className={styles['Login']}>1</div>
    )
}

export default Login