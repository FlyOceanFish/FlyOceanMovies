import {Platform} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {registerScreens,registerScreenVisibilityListener} from './Screens/index';

import Icons from './Assets/Icon';

// screen related book keeping
registerScreens();
registerScreenVisibilityListener();

const tabs = [{
        label: '推荐',
        screen: 'com.fof.FlyOceanMovies.MovieList',
        icon: {uri:Icons.star,scale:4.6},
        title: '热门推荐',
    },
    {
        label: '北美票房',
        screen: 'com.fof.FlyOceanMovies.USBoxList',
        icon: {uri:Icons.featured,scale:1.1},
        title: '北美票房',
    },
    {
        label: '搜索',
        screen: 'com.fof.FlyOceanMovies.SearchForm',
        icon: {uri:Icons.search,scale:1.2},
        title: '搜索',
    }
    ];

// this will start our app
Navigation.startTabBasedApp({
    tabs,
    animationType: Platform.OS === 'ios' ? 'slide-down' : 'fade',
    tabsStyle: {
        tabBarBackgroundColor: '#003a66',
        tabBarButtonColor: '#ffffff',
        tabBarSelectedButtonColor: '#ff505c',
        tabFontFamily: 'BioRhyme-Bold',
    },
    appStyle: {
        tabBarBackgroundColor: '#003a66',
        navBarButtonColor: '#ffffff',
        tabBarButtonColor: '#ffffff',
        navBarTextColor: '#ffffff',
        tabBarSelectedButtonColor: '#ff505c',
        navigationBarColor: '#003a66',
        navBarBackgroundColor: '#003a66',
        statusBarColor: '#002b4c',
        tabFontFamily: 'BioRhyme-Bold',
    },
});
