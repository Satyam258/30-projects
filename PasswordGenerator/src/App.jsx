import { useCallback, useEffect, useRef, useState } from "react"



function App() {
  
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() =>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str += "1023456789"
    if(charAllowed) str += "~!@$%^&*(){}\/*-+<>"

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random()* str.length + 1)
      pass += str.charAt(char)
      
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword])

  const copyNumberToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    // passwordRef.current?.setSelectionRange(0,4);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

   const [copied, setCopied] = useState(false);

  return (
    <>
      
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg
       px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className='text-center text-white my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4 bg-white">
          <input 
          type="text"
          value={password}
          className=" outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
          />
          <button onClick={copyNumberToClipboard} className={`outline-none text-white px-3 shrink-0 rounded 
        ${copied ? "bg-green-600" : "bg-blue-700"}`}>{copied ? "Copied" : "Copy"}</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {setLength(e.target.value)}} />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={()=>{
              setNumberAllowed((prev) => !prev);
            }} />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={()=>{
              setCharAllowed((prev) => !prev);
            }} />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
       </div>
    </>
  )
}

export default App
