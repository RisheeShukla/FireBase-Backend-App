import {createContext,useContext,useState,useEffect} from "react";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,onAuthStateChanged
,signOut,updateProfile}  from "firebase/auth";
import {getFirestore,collection,addDoc,getDocs,getDoc,doc,query,where}  from "firebase/firestore";
import {initializeApp}  from "firebase/app";


 const FirebaseContext = createContext(null);

 const firebaseConfig = {
  apiKey:process.env.REACT_APP_API_KEY,
  authDomain:process.env.REACT_APP_AUTH_DOMAIN,
  projectId:process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};


 export const useFirebase=()=>useContext(FirebaseContext);

 const firebaseApp=initializeApp(firebaseConfig);
 const firebaseAuth=getAuth(firebaseApp);
 const googleProvider=new GoogleAuthProvider();
 const firestore=getFirestore(firebaseApp);

 
 export const FirebaseProvider =(props)=>{
   const [user,setUser]=useState(null);

    useEffect(()=>{
   onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser){
     setUser(currentUser);
    }
    else
    {
        setUser(null);
    }
   })
 },[])
    const signupUserWithEmailAndPassword=async(name,email,password)=>{
        const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
  );

  await updateProfile(userCredential.user, {
    displayName: name,
  });
    }
    const signinUserWithEmailAndPassword=async(email,password)=>{
        await signInWithEmailAndPassword(firebaseAuth,email,password)
    }
    const signinUserWithGoogle=async()=>{
        await signInWithPopup(firebaseAuth,googleProvider)
    }
    const isLoggedIn=user!==null;

    const handleCreateNewListing=async(name,isbn,price,cover)=>{
        await addDoc(collection(firestore,"books"),{
            name,
            isbn,
            price,
            cover,
            userID:user.uid,
            userEmail:user.email,
            displayName:user.displayName,
            photoURL:cover
        })
    }
    const logout=()=>{
        signOut(firebaseAuth);
        setUser(null);
    }

        const listAllBooks=()=>{
            return getDocs(collection(firestore,"books"))
        }
      const getBookById=(id)=>{
            const docRef=doc(firestore,"books",id);
            const result=getDoc(docRef);
            return result;
        }
        const placeOrder=async(bookId,qty)=>{
            const collectionRef=collection(firestore,"books",bookId,"orders")
            const result=await addDoc(collectionRef,{
                userID:user.uid,
            userEmail:user.email,
            displayName:user.displayName,
            photoURL:user.photoURL,
            quantity:Number(qty)
            })
           return result;
        }

        const fetchMyBooks=async(userID)=>{
            const collectionRef=collection(firestore,"books")
            const q=query(collectionRef,where("userID",'==',userID))

            const result=await getDocs(q)
            return result;
        }
    const getOrdersByBookId=async(bookId)=>{
        const collectionRef=collection(firestore,"books",bookId,"orders")
        const result=await getDocs(collectionRef)
        return result;
    }
    return (
        <FirebaseContext.Provider value={{logout, signupUserWithEmailAndPassword,signinUserWithEmailAndPassword,signinUserWithGoogle,isLoggedIn,handleCreateNewListing,listAllBooks,getBookById,placeOrder,fetchMyBooks,user,getOrdersByBookId}}>
            {props.children}
        </FirebaseContext.Provider>
    )
 }
 
