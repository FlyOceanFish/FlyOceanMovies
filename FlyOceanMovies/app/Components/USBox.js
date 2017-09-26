/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import USBoxList from './USBoxList'

import {styles} from '../styles/Main'

import {
    NavigatorIOS
} from 'react-native';

export default class USBox extends Component {
    render(){
        return(
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                        component:USBoxList,
                        title:'北美票房',
                        rightButtonTitle: '增加',
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
