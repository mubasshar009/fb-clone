import { useSession } from "next-auth/react";
import Image from "next/image";
import React,{useRef,useEffect,useState} from "react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { db } from "../firebase";
import { addDoc, collection, getDoc, getDocs, serverTimestamp} from "firebase/firestore"; 


const InputBox = () => {
  const [state,setState ] = useState([]);
  const session = useSession();

  const inputRef = useRef(null)
  const postRefCollection = collection(db,'posts');
  
  // const getUsers = async () => {
  //   const data = await getDocs(postRefCollection);
  //   setState(data.docs.map((doc) => ({...doc.data(),id:doc.id})))
  // }
  

  const sendPost = async (e) => {

    e.preventDefault();

    if(!inputRef.current.value) return;
    await addDoc(postRefCollection,{
      message: inputRef.current.value,
      name: session &&  session.data.user?.name,
      email: session &&  session.data.user?.email,
      image: session &&  session.data.user?.image,
      timestamp: serverTimestamp(),
    })
    // db.collection("posts").add(docData);

    inputRef.current.value = ''

  };
  return (
    <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session.data.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            ref={inputRef}
            type="text"
            className="rounded-full h-12 bg-gray-100 flex-grow px-5 outline-none"
            placeholder={`what's on your mind ${session.data.user.name}`}
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>
      </div>
    <div className="flex justify-evenly p-3">
        <div className="inputIcon ">
            <VideoCameraIcon  
            className="h-7 text-red-500" 
            />
            <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div className="inputIcon ">
            <CameraIcon  
            className="h-7 text-green-500" 
            />
            <p className="text-xs sm:text-sm xl:text-base">Upload Photo/Video</p>
        </div>
        <div className="inputIcon ">
            <EmojiHappyIcon  
            className="h-7 text-yellow-500" 
            />
            <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
    </div>
    </div>
  );
};

export default InputBox;
