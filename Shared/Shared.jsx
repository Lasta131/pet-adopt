import { db } from '@/config/FirebaseConfig';
import{doc,getDoc,setDoc, updateDoc} from "firebase/firestore"

export const GetFavListList=async(user)=>{
const docSnap=await getDoc(doc(db,'UserFavPet',user?.primaryEmailAddress?.emailAddress));
if(docSnap?.exists())
{
    return docSnap.data();
}
else{
    await setDoc(doc(db,'UserFavPet',user?.primaryEmailAddress),{

        email:user?.primaryEmailAddress?.emailAddress,
        favorites:[]
    })
}

}
 const UpdateFav=async(user,favorites)=>{
    const docRef=doc(db,'UserFavPet',user?.primaryEmailAddress?.emailAddress);
    try{
        await updateDoc(docRef,{
            favorites:favorites
        })
    } catch(e){

    }
}
    export default{
        GetFavListList,
        UpdateFav
}