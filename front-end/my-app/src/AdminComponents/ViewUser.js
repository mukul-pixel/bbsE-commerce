import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const ViewUser = () => {
    const [users,setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    useEffect(()=>{
      const getUsers = async ()=>{
        try{
        const response = await axios.get("http://localhost:5000/getUsers");
        if (response.data.status === "ok") {
          // Extract product data from the response
          const users = response.data.data;
          setUsers(users);
          setFilteredUsers(users);
      } else {
          // Handle error if response status is not "ok"
          console.error("Error fetching user data:", response.data.message);
      }
      }catch (error) {
          // Handle errors if the request fails
          console.error('Error fetching user data:', error);
        }
      }
      getUsers();
    },[])
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      filterUsers(e.target.value);
    };
  
    const filterUsers = (searchTerm) => {
      if (!searchTerm) {
        setFilteredUsers(users);
        return;
      }

      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = users.filter(user =>
        (user.name && user.name.toLowerCase().includes(lowercasedTerm)) ||
        (user.mail && user.mail.toLowerCase().includes(lowercasedTerm)) ||
        (user.location && user.location.toLowerCase().includes(lowercasedTerm)) ||
        (user.contact && user.contact.toString().includes(lowercasedTerm)) ||
        (user.role && user.role.toLowerCase().includes(lowercasedTerm))
      );
  
      setFilteredUsers(filtered.length > 0 ? filtered : null);
    };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };
    return (
      <>
      <div className='bg-black p-3 text-center text-white fs-3'>VIEW USER</div>
      <div className='searchProduct justify-content-center d-flex py-5 my-5'>
      <input
          className='form-control w-50 mx-2'
          placeholder='search user'
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className='btn btn-outline-dark' onClick={() => filterUsers(searchTerm)}>Search</button>
      </div>
      <div className="table-responsive px-3">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Mail</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers ? (
              filteredUsers.map((user, index) => (
                  <tr key={user._id} onClick={() => handleUserClick(user)}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.mail}</td>
                  <td>{user.location}</td>
                  <td>{user.contact}</td>
                  <td>{user.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p><img src={selectedUser.imageSrc} alt='profile' style={{borderRadius:"50%", height:"110px", width:"110px"}}/></p>
                <p><strong>Name:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.mail}</p>
                <p><strong>Location:</strong> {selectedUser.location}</p>
                <p><strong>Contact:</strong> {selectedUser.contact}</p>
                <p><strong>Role:</strong> {selectedUser.role}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )}
      </>
    )
}
