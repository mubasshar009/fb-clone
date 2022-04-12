import { getSession } from "next-auth/react";
import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Login from "../components/Login";
import SideBar from "../components/SideBar";
export default function Home({session}) {

  if(!session) return  <Login />
  return (
    <div >
      <Head >
        <title>FaceBook</title>
      </Head>
      

    {/* Header  */}
    <Header />
    
    <main className="flex items-center">
            {/* SideBar */}

      <SideBar />
      
      {/* Feed */}
      <Feed />
      {/* Widgets */}
    </main>
    </div>
  );
}

export async function getServerSideProps(context){
  //Get User
  const session = await getSession(context)
  return {
    props:{
      session
    }
  }
}