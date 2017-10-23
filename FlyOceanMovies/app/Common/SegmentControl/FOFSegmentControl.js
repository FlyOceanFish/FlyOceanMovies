
import React,{Component} from 'react';
import {
    View,
    TouchableHighlight,
    Animated,
    Text,
    StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types';

var width;

export default class FOFSegmentControl extends Component{
    constructor(props){
        super(props);
        this.state = {
            translateValue:new Animated.ValueXY({x:0,y:0})
        };
    }
    _startAnimation(i){
        Animated.spring(this.state.translateValue,{
            toValue:{x:this._offX(i), y:0},
            friction: 5,// 摩擦力，默认为7.
            tension: 15,// 张力，默认40。
        }).start();
    }
    _renderTitle(title, i) {
        return (
            <View style={styles.title}>
                <Text style={[this.props.titleStyle, i === this.props.selectedIndex && this.props.selectedTitleStyle]}>{title}</Text>
            </View>
        );
    }
    _offX(i){
        return (width/this.props.titles.length-this.props.barWidth)/2.0+width/this.props.titles.length*i;
    }
    renderTitle(title, i) {
        return (
            <View key={i} ref={i} style={{flex:1}}>
                <TouchableHighlight style={{flex:1}} underlayColor={this.props.underlayColor} onPress={() => {
                    this.props.onPress(i);
                    this._startAnimation(i);
                }}>
                    {this.props.renderTitle ? this.props.renderTitle(title, i) : this._renderTitle(title, i)}
                </TouchableHighlight>
            </View>
        );
    }
    render(){
        var items = [];
        var titles = this.props.titles;
        for(var i = 0;i<titles.length;i++){
            items.push(this.renderTitle(titles[i],i));
        }
        let scrollBar = (
            <Animated.View ref='scrollBar' style={[styles.scrollBar,{width:this.props.barWidth,backgroundColor:this.props.barColor,transform:[
                {translateX:this.state.translateValue.x},
                {translateY:this.state.translateValue.y}
            ]}]}/>
        )
        return(
            <View ref='parentView' {...this.props} style={[styles.container,this.props.style]}  onLayout={(event)=>{
                width = event.nativeEvent.layout.width;
                this.setState({
                    translateValue:new Animated.ValueXY({x:this._offX(this.props.selectedIndex),y:0})
                });
            }}>
                {this.props.barPosition=='top' && scrollBar}
                <View style={styles.titleContainer}>
                    {items}
                </View>
                {this.props.barPosition=='bottom' && scrollBar}
            </View>
        );
    }
}
FOFSegmentControl.prototypes = {
    titles:PropTypes.array,
    titleStyle:PropTypes.style,
    selectedTitleStyle:PropTypes.style,
    onPress:PropTypes.func,
    selectedIndex:PropTypes.number,
    renderTitle:PropTypes.func,
    underlayColor:PropTypes.string,
    barPosition:PropTypes.string,
    barColor:PropTypes.string,
    barWidth:PropTypes.number
};

FOFSegmentControl.defaultProps = {
    titleStyle:{
        fontSize:17,
        textAlign:'center',
    },
    selectedTitleStyle:{},
    onPress:()=>{},
    selectedIndex:0,
    underlayColor:'transparent',
    barPosition:'bottom',
    barColor:'red',
    barWidth:70
};

var styles = StyleSheet.create({
    container:{
        height:44
    },
    titleContainer:{
        flexDirection:'row',
        flex:1,
    },
    title:{
        flex:1,
        justifyContent:'center'
    },
    scrollBar:{
        height:1,
    },
});
