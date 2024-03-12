"use client"
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
export default function Home() {

  
  const [inputVal, setinputVal] = useState("");
  const {push} = useRouter()

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    push(`./prediction/${inputVal}`)
  };


  return (
    <div>
      <div>Type Your Name</div>

      <form onSubmit={handleSubmit}>

        <input 

        type="text" 
        placeholder="enter your name..." 
        value={inputVal}
        className="text-black"
        onChange={(e) => setinputVal(e.target.value)} />

        <button type="submit">Predict Data</button>

      </form>
    </div>
  );
}
