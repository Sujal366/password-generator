import { useState } from 'react'
import './App.css'
import usePasswordGenerator from './customHook/usePasswordGenerator'

function App() {
  const [passwordLength, setPasswordLength] = useState(4)
  const [checkboxes, setCheckboxes] = useState([
    {
      title: "Include uppercase",
      state: false
    },
    {
      title: "Include lowercase",
      state: false
    },
    {
      title: "Include numbers",
      state: false
    },
    {
      title: "Include symbols",
      state: false
    }
  ])
  const {password, errorMessage, generatePassword} = usePasswordGenerator();

  const handlePasswordLength = (e) => {
    if(e.target.value<4)return;
    setPasswordLength(e.target.value)
  }

  const handleChange = (i) =>{
    const updatedCheckboxes = [...checkboxes]
    updatedCheckboxes[i] = {
      ...updatedCheckboxes[i],
      state: !updatedCheckboxes[i].state
    }
    setCheckboxes(updatedCheckboxes)
  }

  return (
    <>
      <h1>Random Password Generator</h1>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col'>

        {/* Password and copy button */}
        {password && 
        <div className="flex justify-between items-center p-2">
          <p>{password}</p>
          <button onClick={()=>navigator.clipboard.writeText(password)}>Copy</button>
        </div>}
        
        {/* Password length, slider and checkboxes */}
          <div className="flex justify-between items-center p-2">
            <p>Password length:</p>
            <p>{passwordLength}</p>
          </div>

          <div className='flex flex-col gap-4'>

            <input type="range" value={passwordLength} min={0} max={20} className='w-full' onChange={(e)=>handlePasswordLength(e)} />

            <div className='grid grid-cols-2 gap-2'>
              {checkboxes.map((checkbox, i)=>{
                return (
                  <div className="flex gap-2" key={i}>
                    <input
                      type="checkbox"
                      checked={checkbox.state}
                      onChange={() => handleChange(i)}
                    />
                    <p>{checkbox.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        {/* generate button */}
        <button className='w-full' onClick={()=>generatePassword(checkboxes, passwordLength)}>Generate password</button>
      </div>
    </>
  );
}

export default App
