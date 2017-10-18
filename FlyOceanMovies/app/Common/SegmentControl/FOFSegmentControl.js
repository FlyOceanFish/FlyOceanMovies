
import React,{Component,PropTypes} from 'react';
import {
    View,
    TouchableHighlight,
    Animated,
    Text,
    Dimensions,
    StyleSheet
} from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const ITEM_WIDTH = 70;
const offXItem = ((ScreenWidth-15*2)/this.props.titles.length-ITEM_WIDTH)/2.0;
var preIndex = 0;

export default class FOFSegementControl extends Component{
    constructor(props){
        super(props);

    }
    _startRightAnimation() {
        Animated.spring(this.state.translateValue,{
            toValue:{x:offXItem*2*currentIndex+ITEM_WIDTH*currentIndex, y:0},
            friction: 5,// 摩擦力，默认为7.
            tension: 15,// 张力，默认40。
        }).start();
    }
    _startLeftAnimation() {
        Animated.spring(this.state.translateValue,{
            toValue:{x:offXItem*2*currentIndex+ITEM_WIDTH*currentIndex, y:0},
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
        return(
            <View {...this.props} style={[styles.container,this.props.style]}>

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
};

FOFSegementControl.defaultProps = {
    barColor:'#44B7E1',
    titleStyle:{},
    selectedTitleStyle:{},
    onPress:()=>{},
    selectedIndex:0,
    underlayColor:'transparent',
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
    }
})
