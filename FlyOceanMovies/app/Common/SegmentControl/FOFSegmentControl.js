
import React,{Component} from 'react';
import {
    View,
    TouchableHighlight,
    Animated,
    Text,
    Dimensions,
    StyleSheet,
} from 'react-native';

import PropTypes from 'prop-types';

const SCROLL_BAR_WIDTH = 70;
var preIndex = 0;
export default class FOFSegmentControl extends Component{
    constructor(props){
        super(props);


        this.state = {
            offXItem:0,
            translateValue:new Animated.ValueXY({x:0,y:0})
        };
    }

    componentDidMount() {
        // this.refs.parentView.measure((x,y,width,height,pageX,pageY)=>{//此时调用全部返回0，所以不适用此时调用
        //     offXItem = (width/3.0-SCROLL_BAR_WIDTH)/2.0;
        //     console.log(x,y,width,pageX,pageY,height);
        // })
    }
    _startRightAnimation(i) {
        Animated.spring(this.state.translateValue,{
            toValue:{x:this.state.offXItem*2*i+SCROLL_BAR_WIDTH*i, y:0},
            friction: 5,// 摩擦力，默认为7.
            tension: 15,// 张力，默认40。
        }).start();
    }
    _startLeftAnimation(i) {
        Animated.spring(this.state.translateValue,{
            toValue:{x:this.state.offXItem*2*i+SCROLL_BAR_WIDTH*i, y:0},
            friction: 5,// 摩擦力，默认为7.
            tension: 15,// 张力，默认40。
        }).start();
    }
    _startAnimation(i){
        if (preIndex<i){
            this._startRightAnimation(i);
        }else {
            this._startLeftAnimation(i);
        }
    }
    _renderTitle(title, i) {
        return (
            <View style={styles.title}>
                {/*<Text style={[this.props.titleStyle, i === this.props.index && this.props.selectedTitleStyle]}>{title}</Text>*/}
                <Text style={this.props.titleStyle}>{title}</Text>

            </View>
        );
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
            <Animated.View ref='scrollBar' style={[styles.scrollBar,{opacity:0,backgroundColor:this.props.barColor,marginLeft:this.state.offXItem,transform:[
                {translateX:this.state.translateValue.x},
                {translateY:this.state.translateValue.y}
            ]}]}/>
        )
        return(
            <View ref='parentView' {...this.props} style={[styles.container,this.props.style]}  onLayout={(event)=>{
                let width = event.nativeEvent.layout.width;
                this.refs.scrollBar.setNativeProps({//也可以使用setState来实现
                    style:{opacity:1}
                })
                this.setState({offXItem:(width/3.0-SCROLL_BAR_WIDTH)/2.0});
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
    barColor:PropTypes.string,
    onPress:PropTypes.func,
    selectedIndex:PropTypes.number,
    renderTitle:PropTypes.func,
    underlayColor:PropTypes.string,
    barPosition:PropTypes.string,
    barColor:PropTypes.string
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
    barColor:'red'
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
        width:SCROLL_BAR_WIDTH,
    },
});
