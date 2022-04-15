import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  uploadString,
} from "firebase/storage";
import { async } from "@firebase/util";

const InputBox = () => {
  const [imagetoPost, setImageToPost] = useState(null);
  const session = useSession();

  const inputRef = useRef(null);
  const filePickerRef = useRef(null);
  const postRefCollection = collection(db, "posts");

  // const getUsers = async () => {
  //   const data = await getDocs(postRefCollection);
  //   setState(data.docs.map((doc) => ({...doc.data(),id:doc.id})))
  // }

  const sendPost = async (e) => {
    e.preventDefault();
    const postsRef = ref(storage, "posts");

    if (!inputRef.current.value) return;
    const sendData = await addDoc(postRefCollection, {
      message: inputRef.current.value,
      name: session && session.data.user?.name,
      email: session && session.data.user?.email,
      image: session && session.data.user?.image,
      timestamp: serverTimestamp(),
    }).then((doc) => {
      if (imagetoPost) {
        // const uploadTask = storage.ref(`posts/${doc.id}`).putString(imagetoPost,'data_url');
        const storageRef = ref(storage, `posts/${doc.id}`);
        const message = "This is testing";
        // const uploadTask = uploadString(postsRef,'posts').then((snapshot ) => {
        //   console.log('Uploaded a raw string!');
        // })
        const uploadTask = uploadBytesResumable(storageRef, imagetoPost);


        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }

            //Wehn Upload complete

            // getDownloadURL(ref(storage,`posts/${doc.id}`))
            // .then( async () => {
            //   await setDoc(doc(postRefCollection),{
            //     postImage:url
            //   })
            // })
          },
          (error) => {
            throw new Error(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref)
            .then(
               (downloadURL) => {
                console.log("File available at", downloadURL);
                // await setDoc(doc(postRefCollection), {
                //   postImage: downloadURL,
                // });
              }
            );
          }
        );
      }
      removeImage();

    });
    // db.collection("posts").add(docData);

    inputRef.current.value = "";
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  };
  const removeImage = () => {
    setImageToPost(null);
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
        {imagetoPost && (
          <div
            className="flex flex-col filter hover:brightness-110 transition duration-150 hover:scale-105 cursor-pointer"
            onClick={removeImage}
          >
            <img
              className="object-contain h-10"
              src={imagetoPost}
              alt="Image"
            />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>
      <div className="flex justify-evenly p-3">
        <div className="inputIcon ">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
        </div>
        <div
          onClick={() => filePickerRef.current.click()}
          className="inputIcon "
        >
          <CameraIcon className="h-7 text-green-500" />
          <p className="text-xs sm:text-sm xl:text-base">Upload Photo/Video</p>
          <input
            ref={filePickerRef}
            onChange={addImageToPost}
            type="file"
            hidden
          />
        </div>
        <div className="inputIcon ">
          <EmojiHappyIcon className="h-7 text-yellow-500" />
          <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
