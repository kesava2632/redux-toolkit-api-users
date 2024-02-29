import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from './store';

const User = () => {
    const dispatch = useDispatch();
 
    let data = useSelector((state) => state.user.users);
    let status = useSelector((state) => state.user.status);
    let errorData = useSelector((state) => state.user.error);



    useEffect(() => {
        dispatch(fetchData());
    }, []); // Include dispatch in the dependencies array

    return (
        <div className='container'>
            <h1 className='text-primary text-center mb-5 mt-2'>User Data</h1>
            {status === 'Loading' && <h1>Data loading please wait</h1>}
            {status === "success" && (
                <table className='table table-bordered text-center'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Website</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.phone}</td>
                                <td>{user.website}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {status === 'fail' && <h1 className='text-danger'>{errorData}</h1>}
        </div>
    );
};

export default User;
