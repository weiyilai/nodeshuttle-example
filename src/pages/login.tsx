import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import React from 'react'
import {useRouter} from 'next/router'

export default function Home() {

  let [username, setUsername] = React.useState<string>("");
  let [password, setPassword] = React.useState<string>("");
  let [error, setError] = React.useState<string>("");

  let router = useRouter()
  
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    try {
      await fetch(`http://localhost:9999/api/login`, 
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
          body: JSON.stringify({
            username: username,
            password: password
          }),
        })

      router.push("/dashboard");
      
    } catch(e: any) {
      console.log(`Error: ${e}`)
    }
  }
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-stone-300 w-screen h-screen grid lg:grid-cols-2 lg:grid-rows-1 ">
        <div className="col-span-1 flex flex-col items-center justify-center h-full w-full p-20 bg-stone-500">
          <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col items-center justify-center gap-6 w-max max-w-[40rem] bg-sky-200 px-5 py-5 rounded-md">  
              <p className="text-2xl">Log In</p>
              <label htmlFor="username" className="flex flex-row items-center gap-4 w-[20rem]">
                <span>Username:</span>
                <input className="px-5 py-2 w-full" name="username" type="text" placeholder="Username" value={username} required
                 onChange={(e) => setUsername((e.target as HTMLInputElement).value)}></input>
              </label>
              
<label htmlFor="password" className="flex flex-row items-center gap-4 w-[20rem]">
                <span>Password:</span>
                <input className="px-5 py-2 w-full" name="password" type="password" placeholder="Password" value={password} required
                onChange={(e) => setPassword((e.target as HTMLInputElement).value)}></input>
            
              </label>

            <p id="error" className="w-3/5 h-[2rem]"></p>
            <button type="submit" className="px-8 py-2 bg-stone-100 hover:bg-white transition-all">Submit</button>
           </form>

          
            <button className="px-8 py-2 bg-stone-100 hover:bg-white transition-all">I'm a new user</button>
         </div>
        
        <div className="flex flex-col col-span-1 bg-sky-200 h-full w-full items-center justify-center">
          <p className="text-5xl">Zest.</p>
          <p> Your number one source for Rust news.</p>
          </div>
      </main>
    </>
  )
}