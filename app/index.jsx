import { Link, Redirect, useRootNavigationState } from "expo-router";
import { Text, View, } from "react-native";
import { useAuth,useUser } from '@clerk/clerk-expo'
import { useEffect } from "react";


export default function Index() {
   const { user } = useUser();
  const { isSignedIn } = useAuth()
const rootNavigationState=useRootNavigationState()
useEffect(()=>{
  CheckNavLoaded();

},[])
const CheckNavLoaded=()=>{
  if(!rootNavigationState.key)
    return null;
}

  return (
    <View
      style={{
        flex: 1,

      }}
    >
      {user?
      
        <Redirect href={'/(tabs)/home'} />
        : <Redirect href={'/login'} />}
      
    </View>
  );
}

