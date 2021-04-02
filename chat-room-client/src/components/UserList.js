import React, {useEffect, useState} from "react";
import socket from "./Socket";
import COLORS from "../colors";

const UserList = () => {

    useEffect(() => {
        socket.on("new_user", (user) => {
            console.log("New user", user);
            setUsers([...users, user])
        });
    });

    const [users, setUsers] = useState([]);

    return (<div style={{backgroundColor: COLORS.chatBackground}}>
        <h4> Users </h4>
        {users.length === 0 ?
            "No connnected users" :
            users.map((user, i) => {
                return (<div key={i}>{user.name}</div>);
            })}
    </div>);
}

export default UserList;