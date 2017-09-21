/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import MovieList from './app/Components/MovieList';
import USBox from './app/Components/USBox';
import Icons from './app/Assets/Icon';
import Featured from './app/Components/Featured'

import React, {Component} from 'react';

import {
    AppRegistry,
    TabBarIOS,
} from 'react-native'

export default class FlyOceanMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'us_box'
        };
    }

    render() {
        return (
            <TabBarIOS barTintColor='darkslateblue' tintColor='white'>
                <TabBarIOS.Item
                    title='推荐电影'
                    icon={{uri:Icons.star,scale:4.6}}
                    selectedIcon={{uri:Icons.starSelected,scale:4.6}}
                    selected={this.state.selectedTab==='featured'}
                    onPress={()=>{
                        this.setState({
                            selectedTab:'featured'
                        });
                    }}
                >
                    <Featured/>
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title='北美票房'
                    icon={{uri:Icons.featured}}
                    selectedIcon={{uri:Icons.featuredSelected}}
                    selected={this.state.selectedTab==='us_box'}
                    onPress={()=>{
                        this.setState({
                            selectedTab:'us_box'
                        });
                    }}
                >
                    <USBox/>
                </TabBarIOS.Item>

            </TabBarIOS>
        );
    }
}

AppRegistry.registerComponent('FlyOceanMovies', () => FlyOceanMovies);
