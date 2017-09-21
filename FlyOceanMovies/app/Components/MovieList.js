/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import MoveDetail from './MovieDetail';

import {styles} from '../styles/Main'

import {
    View,
    FlatList,
    Image,
    Text,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';

const REQUEST_RUL = 'https://api.douban.com/v2/movie/top250'

export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false
        };
        this.fetchData();
    }

    _keyExtractor = (item, index) => item.id;

    fetchData() {
        fetch(REQUEST_RUL)
            .then(response => response.json())
            .then(responseJson => {
                console.log('response-----：\n' + JSON.stringify(responseJson));
                this.setState({
                    data: responseJson.subjects,
                    loaded: true
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _renderItem = ({item}) => (
        <TouchableHighlight underlayColor='rgba(34,26,38,0.2)' onPress={this._onPressButton.bind(this,item)}>
            <View style={styles.item}>
                <View style={styles.itemImage}>
                    <Image source={{uri: item.images.large}} style={styles.image}/>
                </View>
                <View style={styles.itemContent}>
                    <Text style={styles.itemHeader}>{item.title}</Text>
                    <Text style={styles.meta}>{item.original_title}({item.year})</Text>
                    <Text style={styles.redText}>{item.rating.average}</Text>

                </View>
            </View>
        </TouchableHighlight>

    );
    _onPressButton = (item) => {
        this.props.navigator.push({
            title:item.title,
            component:MoveDetail
        });
        console.log(`<<${item.title}>>被点击了`);
    }

    renderFunction({item}) {
        return (
            <TouchableHighlight underlayColor='red' onPress={this._onPressButton(item)}>
                <View style={styles.item}>
                    <View style={styles.itemImage}>
                        <Image source={{uri: item.images.large}} style={styles.image}/>
                    </View>
                    <View style={styles.itemContent}>
                        <Text style={styles.itemHeader}>{item.title}</Text>
                        <Text style={styles.itemMeta}>{item.original_title}({item.year})</Text>
                        <Text style={styles.redText}>{item.rating.average}</Text>

                    </View>
                </View>
            </TouchableHighlight>

        );
    }

    render() {
        if (!this.state.loaded) {
            return (
                <View style={[styles.container, {marginTop:64,marginBottom:48}]}>
                    <View style={styles.loading}>
                        <ActivityIndicator
                            size='large'
                            style={[styles.centering, {height: 80}]}
                            color='#aa00aa'
                        />
                    </View>
                </View>
            );
        }
        return (
            <View style={[styles.container,{marginTop:64,marginBottom:48}]}>
                <FlatList
                    data={this.state.data}
                    // renderItem={this.renderFunction.bind(this)} 一定要绑定this，要不TouchableHighlight不起作用
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    style={styles.container}
                />
            </View>
        );
    }
}
