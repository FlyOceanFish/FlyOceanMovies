/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import MoveDetail from './MovieDetail';
import {styles} from '../styles/Main'
import URLs from '../Base/URLs'
import {CachedImage} from "react-native-img-cache";

import {
    View,
    FlatList,
    Image,
    Text,
    ActivityIndicator,
    TouchableHighlight,
    Dimensions,
    Animated,
} from 'react-native';

const ScreenWidth = Dimensions.get('window').width;

var page  = 0;
var currentIndex = 0;
const ITEM_WIDTH = 70;
const offXItem = ((ScreenWidth-15*2)/3.0-ITEM_WIDTH)/2.0;

export default class MovieList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loaded: false,
            refresh:false,
            translateValue:new Animated.ValueXY({x:0,y:0})
        };
        this.fetchNewFilmData();
    }

    _keyExtractor = (item, index) => index;
    fetchTop250Data() {
        let requestURL = `${URLs.REQUEST_URL_TOP250}?start=${page*this.state.data.length}&count=10`;
        fetch(requestURL)
            .then(response => response.json())
            .then(responseJson => {
                console.log('response-----：\n' + JSON.stringify(responseJson));
                let arrayData = responseJson.subjects;
                if(arrayData instanceof Array){
                    let data  = this.state.data;
                    this.setState({
                        data: (page==0?arrayData:[...data,...arrayData]),
                        loaded: true,
                        refresh:false
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    fetchNewFilmData(){
        let requestURL = `${URLs.REQUEST_URL_NEW}?start=${page*this.state.data.length}&count=10`;
        fetch(requestURL)
            .then(response => response.json())
            .then(responseJson => {
                console.log('response-----：\n' + JSON.stringify(responseJson));
                let arrayData = responseJson.subjects;
                if(arrayData instanceof Array){
                    let data  = this.state.data;
                    this.setState({
                        data: (page==0?arrayData:[...data,...arrayData]),
                        loaded: true,
                        refresh:false
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    fetchSoonFilmData(){
        let requestURL = `${URLs.REQUEST_URL_SOON}?start=${page*this.state.data.length}&count=10`;
        fetch(requestURL)
            .then(response => response.json())
            .then(responseJson => {
                console.log('response-----：\n' + JSON.stringify(responseJson));
                let arrayData = responseJson.subjects;
                if(arrayData instanceof Array){
                    let data  = this.state.data;
                    this.setState({
                        data: (page==0?arrayData:[...data,...arrayData]),
                        loaded: true,
                        refresh:false
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    _fetchData(){
        switch (currentIndex){
            case 0:{
                this.fetchNewFilmData();
                break;
            }
            case 1:{
                this.fetchTop250Data();
                break;
            }
            case 2:{
                this.fetchSoonFilmData();
                break;
            }
        }
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
            component:MoveDetail,
            passProps:{item}
        });
        console.log(`<<${item.title}>>被点击了`);
    }
    _onRefresh = () => {
        this.setState({
            refresh:true
        });
        this._fetchData();
    }
    renderFunction({item}) {
        return (
            <TouchableHighlight underlayColor='red' onPress={this._onPressButton(item)}>
                <View style={styles.item}>
                    <View style={styles.itemImage}>
                        <CachedImage source={{uri: item.images.large}} style={styles.image}/>
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
    _startRightAnimation() {
        Animated.spring(this.state.translateValue,{
            toValue:{x:offXItem*2*currentIndex+ITEM_WIDTH*currentIndex, y:0},
            friction: 5,// 摩擦力，默认为7.
            tension: 15,// 张力，默认40。
        }).start();
    }
    _startLeftAnimation() {
        Animated.spring(this.state.translateValue,{
            toValue:{x:offXItem*2*currentIndex+ITEM_WIDTH*currentIndex, y:0},
            friction: 5,// 摩擦力，默认为7.
            tension: 15,// 张力，默认40。
        }).start();
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
                <View style={{height:44,marginLeft:15,marginRight:15}}>
                    <View style={{flexDirection:'row', flex:1,justifyContent:'center',alignItems:'center'}}>
                        <TouchableHighlight underlayColor='transparent' style={{flex:1}} onPress={()=>{
                                currentIndex = 0;
                                page = 0;
                                this._startLeftAnimation();
                                this.fetchNewFilmData();
                                this.refs.flatList.scrollToOffset(0);
                            }
                        }>
                        <Text style={styles.segmentItem}>正在热映</Text>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='transparent' style={{flex:1}} onPress={()=>{
                                page = 0;
                                currentIndex = 1;
                                this._startRightAnimation();
                                this.fetchTop250Data();
                                this.refs.flatList.scrollToOffset(0);
                            }
                        }>
                        <Text style={styles.segmentItem}>Top250</Text>
                        </TouchableHighlight>
                        <TouchableHighlight underlayColor='transparent' style={{flex:1}} onPress={()=>{
                                page = 0;
                                currentIndex = 2;
                                this._startRightAnimation();
                                this.fetchSoonFilmData();
                                this.refs.flatList.scrollToOffset(0);
                            }
                        }>
                            <Text style={styles.segmentItem}>即将上映</Text>
                        </TouchableHighlight>
                    </View>
                    <Animated.View style={{height:1,backgroundColor:'red',width:ITEM_WIDTH, marginLeft:offXItem,transform:[
                        {translateX:this.state.translateValue.x},
                        {translateY:this.state.translateValue.y}
                    ]}}/>
                </View>

                <FlatList
                    data={this.state.data}
                    ref = 'flatList'
                    // renderItem={this.renderFunction.bind(this)} 一定要绑定this，要不TouchableHighlight不起作用
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    style={styles.container}
                    refreshing={this.state.refresh}
                    onEndReachedThreshold= {0.4}
                    onRefresh={this._onRefresh}
                    onEndReached = {() =>{
                        page++;
                        this._fetchData();
                     console.log('到底部了');
                    }}
                />
            </View>
        );
    }
}
