import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './MessagingStyles.js';

export default function Header({otherUser, profilepic, item, trades, navigation}) {


  return (
    <View style={styles.styleHeader}>
      <View>
        <Text style={{ position: 'absolute', color:'white', padding:'3%', fontSize:40}} onPress={() => navigation.navigate('TradeView', {data: item, group: trades})}>&#x2039;</Text>
      </View>
      <View style={{alignSelf:'center', justifyContent:'center', marginTop:'7%'}}>
        <Image style={{backgroundColor:'white', width: 35, height: 35 ,borderRadius:50} source={profilepic}}>
        </Image>
        <Text style={styles.headerText}>{otherUser}</Text>
      </View>
    </View>
  )
}