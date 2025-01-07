import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import {query} from 'firebase/firestore'
import {collection,where} from 'firebase/firestore'
import {useUser} from '@clerk/clerk-expo'
import {db} from '@/config/FirebaseConfig'

export default function Inbox() {
  const {user} =useUser();
  const [userList,setUserList]=useState([]);
  const [loader,setLoader]=useState(false);
  useEffect(()=>{

    user&&GetUserList();
    
  },[user])
  // Get User List Depends on Current User Emails 
  const GetUserList=async()=>{
    setLoader(true)
    setUserList([])
    const q=query(collection(db,'Chat'),
        where('userIds','array-contains',user?.primaryEmailAddress?.emailAddress));
        const querySnapshot=await getDocs(q);
        querySnapshot.forEach(doc=>{
          console.log(doc.data());
          setUserList(prevList=>[...prevList,doc.data()])
        })
setLoader(false)
  }
  const MapOtherUserList=()=>{
    const list=[];
    userList.forEach((record)=>{
      const otherUser=record.users?.filter(user=>user?.email!=user);
      const result={
        docId:record.id,
        ...otherUser[0]
      }
      list.push(result)
    })
    return list;
  }
  return (
    <View style={{
      padding:20,
      marginTop:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>Inbox</Text>
      <FlatList
      data={MapOtherUserList()}
      rehreshing={GetUserList}
      onRefresh={loader}
      style={{
        marginTop:20
      }}
      renderItem={({item,index})=>(
        <UserItem userInfo={item} key={index}/>
      )}
      />
    </View>
    
  )
}