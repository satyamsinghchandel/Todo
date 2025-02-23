import React, { useEffect } from 'react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { account } from '../appwrite/config'

function Verify() {
  const [params] = useSearchParams()
  const secret = params.get("secret")
  const id = params.get("userId")
  const Navigate = useNavigate()
  console.log(secret, id)
  
  async function updateVerify(){
    try{
       const verify = await account.updateVerification(id, secret)
       alert("user is verified")
       Navigate("/Dashbboard")
    }
    catch(e){
        console.log(e)
    }
  }
  if (secret && id) {
    updateVerify();
  } else {
    console.error("Missing query parameters.");
  }
  
  return (
    <>
     
    </>
  )
}

export default Verify
