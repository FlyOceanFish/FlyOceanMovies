/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import USBox from './app/Components/USBox';
import Icons from './app/Assets/Icon';
import Featured from './app/Components/Featured'
import Search from './app/Components/Search'
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
                    renderAsOriginal = {false}
                    selectedIcon={{uri:Icons.starSelected,scale:4}}
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
                    icon={{uri:Icons.featured,scale:1.1}}
                    renderAsOriginal = {false}
                    selectedIcon={{uri:Icons.featuredSelected,scale:1.1}}
                    selected={this.state.selectedTab==='us_box'}
                    onPress={()=>{
                        this.setState({
                            selectedTab:'us_box'
                        });
                    }}
                >
                    <USBox/>
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title='搜索'
                    icon={{uri:Icons.search,scale:1.2}}
                    selectedIcon={{uri:Icons.search,scale:1.2}}
                    renderAsOriginal = {false}
                    selected={this.state.selectedTab==='search'}
                    onPress={()=>{
                        this.setState({
                            selectedTab:'search'
                        });
                    }}
                >
                    <Search/>
                </TabBarIOS.Item>
            </TabBarIOS>
        );
    }
}

AppRegistry.registerComponent('FlyOceanMovies', () => FlyOceanMovies);
