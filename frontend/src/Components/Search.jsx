import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
const Search = () => {
  const [formData, setFormData] = useState({
    firstName: ''
  });
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const modalRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${import.meta.env.Express_URL}/user/bulk`, {
        params: {
          filter: formData.firstName
        }
      });

      console.log('Search successful:', response.data);

      // Update the searchResults state with the received user data
      setSearchResults(response.data.user);

      // Show the modal
      setShowModal(true);
    } catch (error) {
      // Handle errors
      console.error('Search error:', error);
    }
  };

  const closeModal = () => {
    // Close the modal
    setShowModal(false);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        // Click occurred outside the modal, close it
        closeModal();
      }
    };

    // Add event listener when the component mounts
    document.addEventListener('mousedown', handleOutsideClick);

    // Remove event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <form className="w-full p-5" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            name="firstName"
            className="w-full border h-12 shadow p-5 rounded-full"
            placeholder="Search user"
            value={formData.firstName}
            onChange={handleChange}
          />
          <button type="submit">
            <svg
              className="text-teal-400 h-5 w-5 absolute top-3.5 right-3 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              style={{ enableBackground: 'new 0 0 56.966 56.966' }}
              xmlSpace="preserve"
            >
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
            </svg>
          </button>
        </div>
      </form>

      {/* Modal */}
      {showModal && (
        <div className="backdrop-blur-sm justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div ref={modalRef} className="relative w-auto my-6 mx-auto max-w-3xl border shadow-lg bg-black p-5 rounded-xl">
            <button className="modal-close scale-125 text-white" onClick={closeModal}>
              &times;
            </button>
            <h2 className="text-xl font-bold text-white">Search Results :</h2>
            <ul>
              {searchResults.map((user, index) => (
                <li key={user._id} className="text-lg font-bold text-sky-500 border rounded-lg px-3 py-1 mt-2">
                  {index + 1}. {user.firstName} {user.lastName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
