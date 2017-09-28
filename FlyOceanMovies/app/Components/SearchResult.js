import React, {Component} from 'react';

import {styles} from '../styles/Main';
import {CachedImage} from "react-native-img-cache";

import MoveDetail from './MovieDetail';
import {
    View,
    Text,
    FlatList,
    TouchableHighlight,
} from 'react-native';

export  default class SearchResult extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: this.props.results,
        };
    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => (
        <TouchableHighlight underlayColor='rgba(34,26,38,0.2)' onPress={this._onPressButton.bind(this,item)}>
            <View style={styles.item}>
                <View style={styles.itemImage}>
                    <CachedImage source={{uri: item.images.large}} style={styles.image}/>
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
            component:MoveDetail,
            passProps:{item}
        });
    }

    render(){
        return (
            <View style={[styles.container]}>
                <FlatList
                    data={this.state.data}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    style={styles.container}
                />
            </View>
        );
    }
}