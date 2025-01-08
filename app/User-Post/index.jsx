import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { FlatList } from 'react-native';
import PetListItem from '@/components/Home/PetListItem'
import { useUser } from '@clerk/clerk-expo';
export default function UserPost() {
    const {user}=useUser();
    const [loader,setLoader]=useState(false);
    const [userPostList,setUserPostList]=useState([]);

    const navigation=useNavigation();
    useEffect(()=>{
        navigation.setOptions({
            headerTitle:'User Post'
        })
        user&&GetUserPost();
    },[user]);
    const GetUserPost=async()=>{
        setLoader(true)
        setUserPostList([]);
        const q=query(collection(db,'Pets'),where('email','==',user?.primaryEmailAddress?.emailAddress));
        const querySnapshot=await getDocs(q);
        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            setUserPostList(prev=>[...prev,doc.data()])
        })
        setLoader(false);
    }
    const OnDeletePost=(docId)=>{
Alert.alert('Do you want to Delete','Do you really want to delete this post',[
{
    text:'Cancel',
    onPress:()=>console.log("Cancel Click"),
    style:'cancel'

},
{
    text:'Delete',
    onPress:()=>deletePost(docId)

    }
])
    }
    const deletePost=async(docId)=>{
await deleteDoc(doc(db,'Pets',docId));
GetUserPost();
    }
  return (
    <View style={{
        padding:20
    }}>
      <Text style={{
        fontFamily:'outfit-medium',
        fontSize:30
      }}>UserPost</Text>
      <FlatList
      data={userPostList}
      numColumns={2}
      refreshing={loader}
      onRefresh={GetUserPost}
      renderItem={({item,index})=>(
        <View>

       <PetListItem pet={item} key={index}/> 
       <Pressable onPress={()=>OnDeletePost(item?.id)} style={styles.deleteButton}>
        <Text style={{
            fontFamily:'outfit',
            textAlign:'center'
        }}>Delete </Text>
       </Pressable >
       </View>
      )}
      />

      {userPostList?.length==0 && <Text>No Post Found </Text>}
    </View>
  )
}
const styles = StyleSheet.create({
    deleteButton:{
backgroundColor:'#8F8E8D',
padding:5,
borderRadius:7,
marginTop:5,
marginRight:10
    }
})