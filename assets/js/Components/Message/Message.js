import React from 'react';
import {Paper, Grid, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import * as actions from "../../store/actions";

function Message({createdAt, message, userMessage, user}) {

    const getFullName = user => `${user.name} ${user.surname}`;

    return (
        <Grid container>
            <Grid item xs={2}>
                img
            </Grid>
            <Grid item xs={10}>
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

const mapStateToProps = state => {
    return {
        user: state.main.user
    };
};

const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);
