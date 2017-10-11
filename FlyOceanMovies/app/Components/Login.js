
import React,{Component} from 'react';
import {
    View,
    Text,
    TextInput,
} from 'react-native';
import {styles} from '../styles/Main'
import Button from 'apsl-react-native-button'

export default class Login extends Component{
    static navigatorButtons = {
            leftButtons:[
                {
                icon:require('../Assets/back.png'),
                    // icon:{uri:'back.png'},这种方式是加载xcode中Assets文件夹管理的图片
                id:'back',
            }
        ]
    }
    constructor(props){
        super(props)
        this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this))
    }
    _onNavigatorEvent(event){
        if (event.type=='NavBarButtonPress'){
            this.props.navigator.dismissModal({
                animationType:'slide-down'
            })
        }
    }

    render(){
        return(
            <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.2)'}}>
                <View style={[styles.item,{borderBottomColor:'rgba(0,0,0,0.4)'
                    ,borderTopWidth:1,borderTopColor:'rgba(0,0,0,0.4)',marginTop:20,
                    backgroundColor:'white',alignItems:'center'}]}>
                    <Text style={styles.loginText}>账号</Text>
                    <TextInput style={{fontSize:16,height:44,marginLeft:8}}
                               placeholder='手机号/会员名/邮箱'
                    />
                </View>
                <View style={[styles.item,{borderBottomColor:'rgba(0,0,0,0.4)',backgroundColor:'white',alignItems:'center'}]}>
                    <Text style={styles.loginText}>登录密码</Text>
                    <TextInput style={{fontSize:16,height:44,marginLeft:8}}
                               placeholder='请输入密码'
                    />
                </View>
                <Button style={{backgroundColor: 'rgb(225,10,50)',marginTop:20,
                    marginLeft:15,marginRight:15,borderColor:'transparent'}}
                        textStyle={{fontSize: 18,color:'white'}}
                        onPress={() => {
                                this.props.navigator.dismissModal({
                                    animationType: 'slide-down'
                                })
                            }
                        }
                       >
                    登录
                </Button>
                <Button style={{borderColor:'transparent',width:60,alignSelf:'flex-end', marginRight:15}}
                        textStyle={{fontSize: 14,color:'rgba(0,0,0,0.8)'}}>
                    忘记密码
                </Button>
                <Button style={{borderColor:'rgb(238,114,24)',width:120,height:35,alignSelf:'center'}}
                        textStyle={{fontSize: 15,color:'rgb(238,114,24)'}}>
                    免费注册
                </Button>
            </View>
        )
    }
}