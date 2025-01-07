import { View, Text,Image } from 'react-native'
import React from 'react'

export default function UserItem({userInfo}) {
  return (
    <View> 
    <View style={{
        marginVertical:7,
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center'
    }}>
    <Image source={{uri:userInfo?.imageUrl}}
    style={{
        width:40,
        height:40,
        borderRadius:99
    }}
    />
    <Text style={{
        fontFamily:'outfit-medium',
        fontSize:20

    }}>{userInfo?.name} </Text>
     </View>
     <View style={{
        borderWidth:0.2,marginVertical:5,borderColor:'grey'
    }}>
    </View>
    </View>
  )
}