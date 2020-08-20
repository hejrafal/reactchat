import React from 'react';
import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
});

const UserList = ({users}) => {

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <List>
            {users.map((user) => (
                <React.Fragment key={user.id}>
                    <ListItem button>
                        <ListItemAvatar>
                            <Avatar alt="Profile Picture"/>
                        </ListItemAvatar>
                        <ListItemText primary={`• ${user.name} ${user.surname}`} secondary={'last message'}/>
                    </ListItem>
                </React.Fragment>
            ))}
        </List>
    );
}

export default UserList;
