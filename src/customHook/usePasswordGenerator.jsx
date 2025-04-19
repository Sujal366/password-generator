import React, { useState } from 'react'

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  
  const generatePassword = (checkboxes, passwordLength) => {
    let charset = "";
    let generatedPassword = "";
    const selectedOptions = checkboxes.filter((checkbox) => checkbox.state);    
    
    if(selectedOptions.length===0){
      setErrorMessage("Select atleast one option!")
      setPassword("")
      return;
    }

    selectedOptions.forEach((checkbox) => {
      switch (checkbox.title) {
        case "Include uppercase":
          charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          break;
        case "Include lowercase":
          charset += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Include numbers":
          charset += "0123456789";
          break;
        case "Include symbols":
          charset += "!@#$%^&*()";
          break;
        default:
          break;
      }
    });

      for(let i=0;i<passwordLength;i++){
        const randomIndex = Math.floor(Math.random() * charset.length)
        generatedPassword += charset[randomIndex]
      }
      setPassword(generatedPassword)
      setErrorMessage("")
  };
  return {password, errorMessage, generatePassword}
}

export default usePasswordGenerator