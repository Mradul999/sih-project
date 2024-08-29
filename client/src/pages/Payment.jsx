import axios from 'axios'
import React, { useEffect } from 'react'

const Payment = () => {
    useEffect(()=>{
        const getProductInfo=async()=>{
            try {
                const response=await axios.get("")
                
            } catch (error) {
                
            }

        }
        getProductInfo();

    })
  return (


    <div>
        Do payment here
      
    </div>
  )
}

export default Payment
