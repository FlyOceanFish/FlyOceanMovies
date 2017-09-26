import React, {Component} from 'react';

import {styles} from '../styles/Main'

import {
    View,
    Text,
    ActivityIndicator
} from 'react-native';

export  default class MovieDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            movieDetail:'',
            loaded:false
        };
        const REQUEST_URL = `https://api.douban.com/v2/movie/subject/${this.props.item.id}`;
        this.fetchData(REQUEST_URL);
    }

    fetchData(REQUEST_URL) {
        fetch(REQUEST_URL)
            .then(response => response.json())
            .then(responseJson => {
                console.log('response-----：\n' + JSON.stringify(responseJson));
                this.setState({
                    movieDetail: responseJson,
                    loaded:true,
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render(){
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
        let movie = this.state.movieDetail;
        let summary = movie.summary.split(/\n/).map((p,key)=>{
            return (
                <View key={key} style={{marginBottom:15,paddingLeft:6,paddingRight:6}}>
                    <Text style={styles.itemText}>{p}</Text>
                </View>
            )
        });
        return (
            <View style={[styles.container,{paddingTop:70}]}>
                <View style={[styles.item,{flexDirection:'column'}]}>
                    {summary}
                </View>
            </View>
        )
    }
}