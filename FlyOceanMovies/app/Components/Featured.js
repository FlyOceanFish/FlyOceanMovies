/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import MovieList from './MovieList'

import {styles} from '../styles/Main'

import {
    NavigatorIOS
} from 'react-native';

export default class Featured extends Component {
    render(){
        return(
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                        component:MovieList,
                        title:'推荐电影',
                        rightButtonTitle: '登录',
                        onRightButtonPress:()=>{

                        }
                    }
                }
                shadowHidden={true}
                barTintColor='darkslateblue'
                titleTextColor='rgba(255,255,255,0.8)'
                tintColor='rgba(255,255,255,0.8)'
                translucent={true}
            />
        )
    }
}
