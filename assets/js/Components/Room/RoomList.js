import React, {Fragment} from 'react';
import {ListItem, List, ListItemText, Divider, ListItemSecondaryAction, IconButton} from "@material-ui/core";
import shallowEqual from "react-redux/lib/utils/shallowEqual";
import MoreVertIcon from '@material-ui/icons/MoreVert';

const RoomList = ({rooms, selected, onSelectConversation}) => {

    const data = selected ? selected.data : null;
    return (
        <List component="nav">
            {rooms.map(room => (
                <Fragment key={room.id}>
                    <ListItem onClick={() => onSelectConversation(room)} button selected={shallowEqual(data, room)}>
                        <ListItemText primary={room.name}/>
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="comments">
                                <MoreVertIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider/>
                </Fragment>)
            )}
        </List>
    );
}

export default RoomList;
