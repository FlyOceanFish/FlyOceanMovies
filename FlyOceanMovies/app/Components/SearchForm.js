

import React,{Component} from 'react';
import {styles} from '../styles/Main';
import URLs from '../Base/URLs'

import {
    View,
    TextInput,
    ActivityIndicator,
    Animated,
} from 'react-native';
import SearchResult from './SearchResult'

export  default class SearchForm extends Component{
    constructor(props){
        super(props);
        this.state=({
            query:'',
            loaded:false,
            translateValue: new Animated.ValueXY({x:0, y:0})
        });
    }

    _keyExtractor = (item, index) => item.subject.id;

    fetchData(){
        this.setState({
            loaded:true
        });
        const REQUEST_URL = `${URLs.REQUEST_URL_SEARCH}{this.state.query}`;
        fetch(REQUEST_URL)
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    loaded:false
                });
                console.log('response-----：\n' + JSON.stringify(responseJson));
                this.props.navigator.push({
                    title:responseJson.title,
                    component:SearchResult,
                    passProps:{
                       results:responseJson.subjects
                    }
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }
    // startAnimal(){
    //     this.state.translateValue.setValue({x:0, y:0});
    //
    //     Animated.spring(this.state.translateValue,{
    //             toValue:{x:200, y:0},
    //             friction: 5,// 摩擦力，默认为7.
    //             tension: 20,// 张力，默认40。
    //     }).start();
    // }
    componentDidMount() {
        // this.startAnimal();
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{
                    paddingTop:7,
                    paddingLeft:7,
                    paddingRight:7,
                    borderColor:'rgba(100,53,201,0.1)',
                    borderBottomWidth:1
                }}>
                <TextInput style={{height:44,fontSize:16}}
                           returnKeyType='search'
                           autoCorrect={false}
                           // autoFocus={true}
                           placeholder='搜索....'
                           onChangeText={(text) => {
                               this.setState({
                               query:text
                           });
                           }
                           }
                           onSubmitEditing={this.fetchData.bind(this)}

                />
                 <ActivityIndicator
                     size='small'
                     color = '#6435c9'
                     animating={this.state.loaded}
                     style={{
                         position:'absolute',
                         right:10,
                         top:20
                     }}
                 />
                </View>
            </View>
        );
    }
}