import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Enquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredEnquiries, setFilteredEnquiries] = useState([]);
    const [selectedEnquiry, setSelectedEnquiry] = useState(null);

    useEffect(() => {
        const getEnquiries = async () => {
            try {
                const response = await axios.get("https://bbse-commerce.onrender.com/getEnquiry");
                if (response.data.status === "ok") {
                    const enquiries = response.data.data;
                    setEnquiries(enquiries);
                    setFilteredEnquiries(enquiries);
                } else {
                    console.error("Error fetching enquiry data:", response.data.message);
                }
            } catch (error) {
                console.error('Error fetching enquiry data:', error);
            }
        };
        getEnquiries();
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        filterUsers(e.target.value);
    };

    const filterUsers = (searchTerm) => {
        if (!searchTerm) {
            setFilteredEnquiries(enquiries);
            return;
        }

        const lowercasedTerm = searchTerm.toLowerCase();
        const filtered = enquiries.filter(enquiry =>
            (enquiry.name && enquiry.name.toLowerCase().includes(lowercasedTerm)) ||
            (enquiry.mail && enquiry.mail.toLowerCase().includes(lowercasedTerm)) ||
            (enquiry.mobile && enquiry.mobile.toString().includes(lowercasedTerm)) ||
            (enquiry.message && enquiry.message.toLowerCase().includes(lowercasedTerm)) ||
            (enquiry.status && enquiry.status.toLowerCase().includes(lowercasedTerm))
        );

        setFilteredEnquiries(filtered.length > 0 ? filtered : null);
    };

    const handleEnquiryClick = (enquiry) => {
        setSelectedEnquiry(enquiry);
    };

    const closeModal = () => {
        setSelectedEnquiry(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedEnquiry((prevEnquiry) => ({
            ...prevEnquiry,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the form from submitting in the traditional way
        axios.put(`https://bbse-commerce.onrender.com/updateEnquiryStatus/${selectedEnquiry._id}`, selectedEnquiry)
            .then(response => {
                toast.success('Enquiry updated successfully', response);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch(error => {
                console.error('Error updating enquiry', error);
                toast.error('Error updating enquiry');
            });
    };

    return (
        <>
            <ToastContainer />
            <div className='bg-black p-3 text-center text-white fs-3'>VIEW ENQUIRY</div>
            <div className='searchProduct justify-content-center d-flex py-5 my-5'>
                <input
                    className='form-control w-50 mx-2'
                    placeholder='search enquiry'
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
                            <th>Mobile</th>
                            <th>Message</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEnquiries ? (
                            filteredEnquiries.map((enquiry, index) => (
                                <tr key={enquiry._id} onClick={() => handleEnquiryClick(enquiry)}>
                                    <td>{index + 1}</td>
                                    <td>{enquiry.name}</td>
                                    <td>{enquiry.mail}</td>
                                    <td>{enquiry.mobile}</td>
                                    <td>{enquiry.message}</td>
                                    <td>{enquiry.status}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No enquiries found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {selectedEnquiry && (
                <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Enquiry Details</h5>
                                    <button type="button" className="btn-close" onClick={closeModal}></button>
                                </div>
                                <div className="modal-body">
                                    <div className='d-flex p-1'>
                                        <label>Name:</label>
                                        <div className='ms-2'>{selectedEnquiry.name}</div>
                                    </div>
                                    <div className='d-flex p-1'>
                                        <label>E-mail:</label>
                                        <div className='ms-2'>{selectedEnquiry.mail}</div>
                                    </div>
                                    <div className='d-flex p-1'>
                                        <label>Mobile:</label>
                                        <div className='ms-2'>{selectedEnquiry.mobile}</div>
                                    </div>
                                    <div className='d-flex p-1'>
                                        <label>Message:</label>
                                        <div className='ms-2'>{selectedEnquiry.message}</div>
                                    </div>
                                    <div className='d-flex p-1'>
                                        <label>Status:</label>
                                        <select
                                            name="status" // Add name attribute
                                            value={selectedEnquiry.status}
                                            onChange={handleChange}
                                            className='ms-2'
                                        >
                                            <option value="new">New</option>
                                            <option value="resolved">Resolved</option>
                                            <option value="in-process">In-process</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                    <button type='submit' className='theme-btn'>Update Status</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};
