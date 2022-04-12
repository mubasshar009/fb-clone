import Image from "next/image";
import React from "react";
import { signIn } from "next-auth/react";
const Login = () => {
  return (
    <div className="grid place-items-center p-4 ">
      <Image
        src="https://links.papareact.com/5me"
        width={200}
        height={200}
        layout="fixed"
      />
      <h1 onClick={() => signIn("facebook")} className="mt-5 p-4 text-white text-center bg-blue-500 rounded-full cursor-pointer">FaceBook Login Here</h1>
    </div>
  );
};

export default Login;
