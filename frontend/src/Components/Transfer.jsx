import React from 'react';
import axios from 'axios';
import { useState } from 'react';

const Transfer = ({closeModal}) => {
    const [amount, setAmount] = useState("");
    const selectedUserId = localStorage.getItem("selectedUserId");
    const handleTransfer = () => {
       
        const token = localStorage.getItem("jwtToken");
if(token){ 
    
    const data = {
          to: selectedUserId,
          amount: parseFloat(amount),
        }
    
     const headers = {
                Authorization: `Bearer ${token}`,
              };

        axios.post(`${import.meta.env.Express_URL}/account/transfer`, data,{headers})
        .then((response) => {
          // Handle success
          console.log("Transfer successful:", response.data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error transferring money:", error);
        });
    
}
    }
    const handleClose = () => {
        // Call the closeModal function passed as a prop to close the modal
        closeModal();
      };
        ;
  return (
    <div className="font-manrope flex h-screen w-full items-center justify-center">
  <div className="mx-auto box-border w-[365px] border bg-white p-4">
    <div className="flex items-center justify-between">
      <span className="text-[#64748B]">Sending Money</span>
      <div className="cursor-pointer border rounded-[4px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-[#64748B]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          onClick={handleClose}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
    <div className="mt-6">
      <div className="font-semibold">How much would you like to send?</div>
      <div>
      <input
              className="mt-1 w-full rounded-[4px] border border-[#A0ABBB] p-2"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
      </div>
    </div>
    
    
    <div className="mt-6">
      <div className="w-full cursor-pointer rounded-[4px] bg-green-700 px-3 py-[6px] text-center font-semibold text-white" onClick={handleTransfer}>
        Send 
      </div>
    </div>
  </div>
</div>

  )
}

export default Transfer