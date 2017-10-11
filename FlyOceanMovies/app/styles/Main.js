/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#feffdd',
    },
    item: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'rgba(100,253,201,0.1)',
    },
    itemImage: {

    },
    itemText:{
        fontSize:16,
        fontFamily:'Helvetica Neue',
        fontWeight:'300',
        color:'rgba(0,0,0,0.8)',
        lineHeight:26,
    },
    image: {
        width: 60,
        height: 80,
        marginBottom: 6,
        marginTop: 6,
    },
    itemContent: {
        flex: 1,
        marginLeft: 13,
        marginTop: 6,
    },
    itemHeader: {
        fontSize: 18,
        fontFamily: 'Helvetica Neue',
        fontWeight: '300',
        color: '#6435c9',
        marginBottom: 6,
        textAlign: 'left'
    },
    redText: {
        marginTop: 5,
        fontSize: 12,
        color:'#db2828'
    },
    itemMeta:{
        fontSize:16,
        color:'rgba(0,0,0,0.6)',
        marginBottom:6
    },
    loading:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    segmentItem:{
        color:'black',
        fontSize:17,
        textAlign:'center'
    },
    loginText:{
        color:'#1A1A1A',
        fontSize:17,
        textAlign:'left',
        marginLeft:15
    }
});
