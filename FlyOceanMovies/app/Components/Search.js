

import React,{Component} from 'react';
import {styles} from '../styles/Main';
import {
    NavigatorIOS
} from 'react-native';
import SearchForm from './SearchForm'
export  default class Search extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <NavigatorIOS
                style={styles.container}
                initialRoute={{
                    title:'搜索',
                    component:SearchForm
                }}
                barTintColor='darkslateblue'
                titleTextColor='rgba(255,255,255,0.8)'
                tintColor='rgba(255,255,255,0.8)'
                translucent={true}
            />
        );
    }
}