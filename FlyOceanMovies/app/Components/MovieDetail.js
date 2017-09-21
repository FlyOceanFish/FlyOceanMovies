import React, {Component} from 'react';

import {styles} from '../styles/Main'

import {
    View,
    FlatList,
    Image,
    Text,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';

export  default class MovieDetail extends Component{
    render(){
        return (
            <View style={styles.container}>
                <View style={styles.loading}>
                    <Text>详情</Text>
                </View>
            </View>
        )
    }
}