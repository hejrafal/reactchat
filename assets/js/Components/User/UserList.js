import React from 'react';
import {Typography} from "@material-ui/core";


const UserList = (users) => {

    return <div>
        {users.map(user => <Typography key={user.id}>{user.username}</Typography>)}
    </div>
}

export default UserList;
