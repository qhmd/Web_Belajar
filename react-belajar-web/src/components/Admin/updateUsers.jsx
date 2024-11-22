import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Ganti useHistory dengan useNavigate

const UpdateUserForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const { id } = useParams(); // Ambil ID dari URL
    const navigate = useNavigate(); // Ganti history dengan navigate

    // Ambil data pengguna untuk mengisi form
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/users/${id}`)
            .then(response => {
                setName(response.data.name);
                setEmail(response.data.email);
            })
            .catch(error => {
                console.error("Error fetching user:", error);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedUser = { name, email };
            axios.put('http://localhost:8000/users/65', {
            name: 'John Doe',
            email: 'john.doe@example.com',
            })
            .then(response => console.log(response.data))
            .catch(error => console.error('Error:', error));

        
    };

    return (
        <div>
            <h2>Update User</h2>
            <form onSubmit={handleSubmit} method="POST">

                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default UpdateUserForm;
