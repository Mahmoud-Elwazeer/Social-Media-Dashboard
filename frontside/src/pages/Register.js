import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks from backend API
        axios.get('/')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    }, []);

    return (
        <div>
            <h1>Register Page</h1>
        </div>
    );
};

export default Register;
