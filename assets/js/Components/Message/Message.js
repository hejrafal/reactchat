import React from 'react';
import {Paper, Grid, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import avatarUrlGenerator from "../../Utils/avatar";

function Message({createdAt, message, userMessage}) {

    const getFullName = user => `${user.name} ${user.surname}`;

    return (
        <Grid container>
            <Grid item xs={1}>
                <img src={avatarUrlGenerator(userMessage)} />
            </Grid>
            <Grid item xs={11}>
                <Grid item xs={12}>
                    {getFullName(userMessage)}
                    {createdAt}
                </Grid>
                <Grid item xs={12}>
                    {message}
                </Grid>
            </Grid>
        </Grid>

    )
}

export default Message;
