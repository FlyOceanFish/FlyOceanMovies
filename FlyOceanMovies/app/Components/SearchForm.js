

import React,{Component} from 'react';
import {styles} from '../styles/Main';
import {
    View,
    TextInput,
    ActivityIndicator
} from 'react-native';
import SearchResult from './SearchResult'

export  default class SearchForm extends Component{
    constructor(props){
        super(props);
        this.state=({
            query:'',
            loaded:false
        });
    }

    _keyExtractor = (item, index) => item.subject.id;

    fetchData(){
        this.setState({
            loaded:true
        });
        const REQUEST_URL = `https://api.douban.com/v2/movie/search?q=${this.state.query}`;
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
    render(){
        return(
            <View style={[styles.container,{paddingTop:64}]}>
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