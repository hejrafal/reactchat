import React, {Fragment} from 'react';
import {ListItem, List, ListItemText, Divider} from "@material-ui/core";
import shallowEqual from "react-redux/lib/utils/shallowEqual";

const RoomList = ({rooms, selected, onSelectConversation}) => {

    return (
        <List component="nav">
            {rooms.map(room => (<Fragment key={room.id}>
                    <ListItem onClick={() => onSelectConversation(room)} button selected={shallowEqual(selected, room)}>
                        <ListItemText primary={room.name}/>
                    </ListItem>
                    <Divider/>
                </Fragment>)
            )}
        </List>
    );
}

export default RoomList;
