import React,{ useRef, useState } from 'react'
import ai from './ai.jpg'
import './App.css'

function App() {
  const [img_url, setImg_url] = useState('/');
  let inputRef=useRef(null);

  const imgGenerator=async()=> {
    if(inputRef.current.value===''){
      return 0;
    }
    const response=await fetch(
      'https://api.openai.com/v1/images/generations',
      {
      method:"post",
      header:{
        "Content-Type":"application/json",
        Authorization:
        `sk-DsiNKB2exc2a3ZEXxYyecMQf-HetKoFrCWX3aq8sZNT3BlbkFJ1WSKcOncoAAC2bUcEbxS8p2oHDAeJbrSOUWHDxkdwA`,
        "User-Agent":"Chrome",
      },
      body:JSON.stringify({
        prompt:`${inputRef.current.value}`,
        n:1,
        size:"512*512",
      }),
    }
  );
  let data=await response.json();
  let data_array=data.data;
  setImg_url(data_array[0].url);
}

  return (
    <>
      <div className='border-4 border-green-600 flex flex-col justify-center h-full gap-10'>
        <div className='font-bold text-3xl'>
          <h1>AI IMAGE <span className='underline text-green-600'>GENERATOR</span></h1>
        </div>
        <div className='flex justify-center'>
          <img src={img_url==='/'?ai:img_url} className='h-72'></img>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <input type='text' ref={inputRef} placeholder='Describe What You Want To See...' className='rounded-full h-12 w-80 px-4 text-black text-lg outline-none'></input>
          <button className='bg-green-600 px-10 py-3 rounded-full' onClick={()=>{imgGenerator()}}>Generate</button>
        </div>
      </div>
    </>
  )
}

export default App
