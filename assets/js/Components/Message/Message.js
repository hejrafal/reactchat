import React from 'react';
import {Paper, Grid, Typography} from "@material-ui/core";

export default function getMessage({username, date, message}) {

    return (
        <Grid item>
            {username}: {message}
        </Grid>

        /*<Grid container wrap="nowrap" spacing={2}>
            <Grid item>
                {username}:
            </Grid>
            <Grid item xs>
                <Typography>{message}</Typography>
            </Grid>
        </Grid>*/
    )
}