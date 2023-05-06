import "./index.scss";
import { useEffect, useState } from "react";
import User from "../../model/user"
import { getAllRegisteredUsers } from "../../services/userService";
const RegistratedUsersPage = () => {

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let obj = await getAllRegisteredUsers();
        setUsers(obj.data);
        console.log(obj.data);
    };


    return (<div>
        <table className="my-table">
            <thead className="my-table-header">
                <tr>
                    <th className="my-table-header-cell">Email</th>
                    <th className="my-table-header-cell">Username</th>
                    <th className="my-table-header-cell">Password</th>
                    <th className="my-table-header-cell">Role</th>
                </tr>
            </thead>
            <tbody className="my-table-body">
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.username}</td>
                        <td>{user.password}</td>
                        <td>{user.role}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
}

export default RegistratedUsersPage;