import React from 'react';
import {Box} from "@material-ui/core";

export default function getMessage({username, date, message}) {

    return (
        <Box>
            {username}: {message}
        </Box>
    )
}