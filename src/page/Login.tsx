import React from 'react'

import { TransitionGroup, CSSTransition } from 'react-transition-group';

// 引入路由
import { Switch, Redirect, Route } from 'react-router-dom';

import styles from '@/styles/scss/Login.module.scss'

// 引入路由
import LoginForm from '@/components/Login/LoginForm'

const Login = (props: any) => {
    console.log(styles)


    const ANIMATION_MAP ={
        '/Login/LoginForm': 'forward',
        '/Login/Registered/0': 'back',
        '/Login/Forget': 'forward'
    };


    return (
        <div className={styles['Login']}>
            <TransitionGroup
                className={styles['content']}
                childFactory={
                    (child: any) => React.cloneElement(child, {
                            'classNames': ((ANIMATION_MAP as any)[props.location.pathname])
                        }
                    )
                }
            >
                {/** 注意 css Transition key 必须可变 */}
                <CSSTransition key={props.location.pathname} timeout={600}>
                    <Switch location={props.location}>
                        {/** switch location 用于匹配 当前路由path */}
                        <Route
                            exact
                            path="/Login"
                            render={() => <Redirect to="/Login/LoginForm" />}
                        />
                        <Route exact path="/Login/LoginForm" component={LoginForm}></Route>
                        {/* <Route
                            exact
                            path="/Login/Registered/:step"
                            component={Registered}
                        ></Route> */}
                        {/* <Route exact path="/Login/Forget" component={Forget}></Route> */}
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    )
}

export default Login