import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

const ContractId = () => {
    const currentUser=useSelector((state)=>state.user.currentUser);
    const {contractId}=useParams();


   
  return (
    <div className='min-h-screen flex justify-center'>
        <div className='max-w-[1000px] w-full mx-2 my-4 '>
            <h1 className='text-center text-3xl font-semibold mb-6'>You have successfully filled your details in the Contract</h1>
            <h2 className='font-semibold text-center text-2xl'>Contract ID = {contractId}</h2>

            <p className='text-center text-2xl mt-2'>Share this contract ID to your {currentUser.role==="farmer"?"buyer":"farmer"}</p>
        </div>
        
      
    </div>
  )
}

export default ContractId
