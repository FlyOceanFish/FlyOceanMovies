[作者的小窝传送门](http://flyoceanfish.top/)

## 项目背景
本人练习的项目是一个通过豆瓣公共api实现了电影相关的一个APP。主要功能有推荐、搜索、登录、详情等，由于是刚学习完RN第一个练习项目，所以难免有些生疏和技术的不熟练，哪里有些的不好的地方希望大家可以不吝赐教。本项目是通过两个阶段完成的：第一阶段使用RN自带的控件比如[TabBarIOS](http://facebook.github.io/react-native/docs/tabbarios.html)、[NavigatorIOS](http://facebook.github.io/react-native/docs/navigatorios.html)、[Button](http://facebook.github.io/react-native/docs/button.html)、[Image](http://facebook.github.io/react-native/docs/image.html)等；第二阶段重构使用了比较火的一些第三方控件[react-native-navigation](https://www.npmjs.com/package/react-native-navigation)、[react-native-img-cache](https://github.com/remobile/react-native-cache-image)、[react-native-button](https://github.com/APSL/react-native-button)。
## 项目视频介绍

![introduce.gif](introduce.gif)

### 使用到的技术

* ES6 其中主要使用的是箭头函数这个特性，项目中代码其实使用了两种，我注释掉了一种。两种最大的区别就是箭头函数自动绑定this
* Flex 一种布局方式
* JavaScript
* Objective-c
### 项目详细介绍
1、项目初始化
由于使用到了react-native-navigation第三方框架导航，所以APP代码还有有挺大区别的。
直接在index.os.js中将所有的代码注释掉仅仅使用如下一句即可

````Objective-c
import app from './app/App'
````

1.1、App.js源码
App其实一方面`registerScreens()`方法注册了所有的Component，另一方面使用了`Navigation.startTabBasedApp`启动了整个App，实现了UITabBar的效果

````Objective-C
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
````

2、各个子页面
MovieList：首页
USBoxList：北美票房
SearchForm：搜索
MovieDetail：详情
Login：登录界面
SearchResult：搜索结果页
Main.js：相当于CSS样式，其实就是布局

其中MovieList自己实现了相当于iOS的segmentcontrol的效果使用到了ReactNative中的动画。

还有一些其他的关注点我都在代码加了注释，大家有兴趣可以详细看一下代码，由于里边包括了我两个阶段的所有代码，所以大家要耐心看哦。
## 总结
学习React Native有一段时间了，写这个项目其实不是很熟练，踩了不少坑，写的也不是非常的快。但是没遇到一个坑都停下来好好思考复习巩固自己没掌握的知识，让自己也提升了不少。所以万里之行始于足下，掌握知识的最快方法就是行动起来，找个项目从0开始，完整的写完一个项目。不仅验证了自己所学的知识，同时在写项目中能够学到之前没学到的知识,也巩固了自己的新知识。
