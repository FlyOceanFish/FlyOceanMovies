/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View,
    FlatList,
    Image,
    Text
} from 'react-native';

export default class FlyOceanMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
        this.fetchData();
    }

    _keyExtractor = (item, index) => item.id;

    fetchData() {
        fetch('https://api.douban.com/v2/movie/top250')
            .then(response => response.json())
            .then(responseJson => {
                console.log('response-----：\n' + JSON.stringify(responseJson));
                this.setState({
                    data: responseJson.subjects
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    _renderItem = (movie) => (
        <View style={styles.item}>
            <View style={styles.itemImage}>
                <Image source={{uri: movie.images}} style={styles.image}/>
            </View>
            <View style={styles.itemContent}>
                <Text style={styles.itemHeader}>{movie.title}</Text>
                <Text style={styles.meta}>{movie.original_title}({movie.year})</Text>
                <Text style={styles.redText}>{movie.rating}</Text>

            </View>
        </View>

    );

    render() {
        return (
            <View style={styles.container}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffb40b',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        fontSize: 15,
        marginBottom: 5,
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'rgba(100,253,201,0.1)',
        flex: 1,
        marginBottom: 6
    },
    itemImage: {
        flex: 1,
        width: 50,
        height: 70
    },
    itemContent: {
        flex: 1,
        marginLeft: 13,
        marginTop: 6,
    },
    itemHeader: {
        fontSize: 18,
        fontFamily: 'Helvetica Neue',
        fontWeight: '300',
        color: '#6435c9',
        marginBottom: 6
    },
    redText: {}
});

AppRegistry.registerComponent('FlyOceanMovies', () => FlyOceanMovies);
