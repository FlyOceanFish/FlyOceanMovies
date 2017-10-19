
import React,{Component} from 'react';
import {
    View,
    TouchableHighlight,
    Animated,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';

import PropTypes from 'prop-types';

const ScreenWidth = Dimensions.get('window').width;
const SCROLL_BAR_WIDTH = 70;
var preIndex = 0;

export default class FOFSegementControl extends Component{
    constructor(props){
        super(props);
        var offXItem = ((ScreenWidth-15*2)/this.props.titles.length-SCROLL_BAR_WIDTH)/2.0;
    }
    _startRightAnimation() {
        Animated.spring(this.state.translateValue,{
            toValue:{x:offXItem*2*currentIndex+SCROLL_BAR_WIDTH*currentIndex, y:0},
            friction: 5,// 摩擦力，默认为7.
            tension: 15,// 张力，默认40。
        }).start();
    }
    _startLeftAnimation() {
        Animated.spring(this.state.translateValue,{
            toValue:{x:offXItem*2*currentIndex+SCROLL_BAR_WIDTH*currentIndex, y:0},
            friction: 5,// 摩擦力，默认为7.
            tension: 15,// 张力，默认40。
        }).start();
    }
    _startAnimation(i){
        if (preIndex<i){
            this._startRightAnimation();
        }else {
            this._startLeftAnimation();
        }
    }
    _renderTitle(title, i) {
        return (
            <View style={styles.title}>
                <Text style={[this.props.titleStyle, i === this.props.index && this.props.selectedTitleStyle]}>{title}</Text>
            </View>
        );
    }
    renderTitle(title, i) {
        return (
            <View key={i} ref={i} style={{ flex: this.props.stretch ? 1 : 0 }}>
                <TouchableHighlight underlayColor={this.props.underlayColor} onPress={() => {
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
            <Animated.View style={[styles.bar,{backgroundColor:this.props.barColor,marginLeft:offXItem,transform:[
                {translateX:this.state.translateValue.x},
                {translateY:this.state.translateValue.y}
            ]}]}/>
        )
        return(
            <View {...this.props} style={[styles.container,this.props.style]}>
                {this.props.barPosition=='top' && scrollBar}
                <View style={styles.titleContainer}>
                    {items}
                </View>
                {this.props.bar=='bottom' && scrollBar}
            </View>
        );
    }
}
FOFSegementControl.prototypes = {
    titles:PropTypes.array,
    titleStyle:Text.prototypes.style,
    selectedTitleStyle:Text.prototype.style,
    barColor:PropTypes.string,
    onPress:PropTypes.func,
    selectedIndex:PropTypes.number,
    renderTitle:PropTypes.func,
    underlayColor:PropTypes.string,
    barPosition:PropTypes.string,
    barColor:PropTypes.string
};

FOFSegementControl.defaultProps = {
    barColor:'#44B7E1',
    titleStyle:{
        color:'black',
        fontSize:17,
        textAlign:'center'
    },
    selectedTitleStyle:{},
    onPress:()=>{},
    selectedIndex:0,
    underlayColor:'transparent',
    barPosition:'bottom',
    barColor:'red'
};

var styles = StyleSheet.create({
    container:{
        flex:1
    },
    titleContainer:{
        flexDirection:'row',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        color:'black',
        fontSize:17,
        textAlign:'center'
    },
    scrollBar:{
        height:1,
        width:SCROLL_BAR_WIDTH,
    }
})
