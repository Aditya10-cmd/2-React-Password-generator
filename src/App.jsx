import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //ref hook use
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm"

    if(numAllowed) str += "0123456789";
    if(charAllowed) str += "!@#$%^&*()_+=-`~':;<>/?.,[]{}"

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass)

  } , [length, numAllowed, charAllowed, setPassword])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()}, [length,numAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className=" w-full max-w-xl mx-auto bg-gray-700 px-8 py-2 my-9 text-orange-400 
      rounded-lg ">
        <h1 className="text-white font-bold text-4xl mt-1 italic underline text-center">PassWord Generator</h1>
        <div className="flex shadow mb-4 gap-2 rounded-3xl">
          <input type="text" 
          value={password}
          placeholder='   password' 
          readOnly
          className="w-full mt-5 outline-none py-3 px-3 rounded-lg"
          ref={passwordRef} />
          <div className=''>
          <button onClick={copyPassword}
          className='outline-none bg-blue-700 mt-4 text-white px-3 h-14  shrink-0 rounded-xl'>
          Copy
          </button>
          </div>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
            min={8}
            max={80}
            value={length}
            className='cursor-pointer'
            onChange={(e) => {
              setLength(e.target.value)
            }} />
            <label >length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked={numAllowed}
            id='numberInput'
            className='cursor-pointer'
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }} />
            <label >Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox"
            defaultChecked = {charAllowed}
            id='charInput'
            className='cursor-pointer'
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }} />
            <label >Character</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
