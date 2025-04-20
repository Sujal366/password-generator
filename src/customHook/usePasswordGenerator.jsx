import { useState } from 'react'

const shuffleArray = (array) => {
  for(let i=array.length-1;i>0;i--){
    let j = Math.floor(Math.random()*(i+1));
    [array[i],array[j]]=[array[j],array[i]];
  }
  return array;
}

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  
  const generatePassword = (checkboxes, passwordLength) => {
    const selectedOptions = checkboxes.filter((checkbox) => checkbox.state);

    let charset = ""
    let guarnteedChars = []
    
    if(selectedOptions.length===0){
      setErrorMessage("Select atleast one option!")
      setPassword("")
      return;
    }

    const categories = {
      "Include uppercase": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "Include lowercase": "abcdefghijklmnopqrstuvwxyz",
      "Include numbers": "0123456789",
      "Include symbols": "!@#$%^&*()",
    };
    
    selectedOptions.forEach((checkbox)=>{
      let chars = categories[checkbox.title]
      if(chars){
        charset+=chars
        const randomChar = chars[Math.floor(Math.random()*chars.length)]
        guarnteedChars.push(randomChar)
      }
    })

    let remainingLength = passwordLength - guarnteedChars.length;
    
    let passwordChars = [...guarnteedChars]

    for(let i=0;i<remainingLength;i++){
      const randomChar = charset[Math.floor(Math.random() * charset.length)]
      passwordChars.push(randomChar)
    }
    const finalPassword = shuffleArray(passwordChars);
    
    setPassword(finalPassword.join(""))
    setErrorMessage("")
  };
  return {password, errorMessage, generatePassword}
}

export default usePasswordGenerator