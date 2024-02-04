import React, { useEffect, useState } from "react";
import axios from "axios";
import Transfer from "./Transfer";
import Search from "./Search";
const Dashboard = () => {

  const [balance, setBalance] = useState(null);
  const [users, setUsers] = useState(null);
  const [SelectedUserId, setSelectedUserId] = useState("");
  const [showModal, setShowModal] = React.useState(false);

  const handleUserSelection = (user) => {
    if (user._id) {
      const selectedUserId = user._id; // Get the user ID directly

      setSelectedUserId(selectedUserId); // Set the state variable
      localStorage.setItem("selectedUserId", selectedUserId); // Store in localStorage

      console.log(selectedUserId);
      setShowModal(true);
    } else {
      return null;
    }
  };


  const closeModal = () => {
    setShowModal(false);
  };


  useEffect(() => {
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem("jwtToken");
    // If token is available, make a request to get money balance
    if (token) {
      // Include the token in the Authorization header
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Make a GET request to the backend to get money balance
      axios
        .get(`${import.meta.env.VITE_EXPRESS_URL}/account/balance`, { headers })
        .then((response) => {
          // Update the money balance state
          setBalance(response.data.balance);
        })
        .catch((error) => {
          console.error("Error fetching money balance:", error);
        });

      // Make a GET request to the backend to get the list of users
      axios
        .get(`${import.meta.env.VITE_EXPRESS_URL}/user/bulk`, { headers })
        .then((response2) => {
          // Update the users state with the received data
          setUsers(response2.data.user);
        })
        .catch((error) => {
          console.error("Error fetching users:", error);
        });
    }
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div>
      <div className="flex justify-center pt-5">
        <img
          className="h-8 w-auto"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png"
          alt="logo"
        />
      </div>
      <h1 className="text-2xl font-bold text-sky-500 p-5">Your Dashboard</h1>
      {balance !== null ? (
        <h3 className="text-2xl font-bold pl-5">Your balance: ${balance}</h3>
      ) : (
        <p>Loading money balance...</p>
      )}

      <div className="">
        {users !== null ? (
          <>
            <h3 className="text-2xl font-bold pl-5 pt-5">Users:</h3>

            <Search/>

            <ul>
              {users.map((user, index) => (
                <li key={user._id} className=" text-2xl font-bold flex items-center justify-between p-2 pl-5">
                  {index + 1}. {user.firstName} {user.lastName}
                  <button
                    onClick={() => handleUserSelection(user)}
                    className="bg-black text-white p-2 rounded-md text-xl font-normal  "
                  >
                    Transfer
                  </button>

                  <hr className="border-2 bg-black" />
                </li>
              ))}
              {showModal ? (
                <div
                  className=" backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                  <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    <Transfer closeModal={closeModal}  />
                    
                  </div></div>
              ) : null}
            </ul>
          </>
        ) : (
          <h2>Loading Users.....</h2>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
