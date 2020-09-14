import React, {useState} from 'react';
import {Grid, Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as actions from "../../store/actions";
import {connect} from "react-redux";


const style = {
    Paper: {padding: 20, margin: 10, height: 500, overflowY: 'auto'}
};

function LoginBox ({onUserLogged, setUserList, setRooms}) {

    const [username, setUsername] = useState('user0');
    const [password, setPassword] = useState('qwe123');

    const usernameChanged = (e) => {
        setUsername(e.target.value);
    }

    const passwordChanged = (e) => {
        setPassword(e.target.value);
    }

    const logIn = (username, password) => {
        const data = {
            username,
            password,
            '_csrf_token': 'ueQp3v_yUU4fntTLVLPmoxpVuGc4gaBmITyqR5W7xHY'
        };

        fetch('login', {
            method: 'POST',
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    onUserLogged(data.user);
                    setUserList(data.users);
                    setRooms(data.rooms);
                }
            });
    }

    const onKeyPress = event => {
        if (event.key === 'Enter') {
            logIn(username, password);
        }
    }

    return (
        <Grid container>
            <Grid item>
                <Paper style={style.Paper}>
                    Wpisz swój login pod którym będziesz widoczny dla innych użytkowników
                    <TextField
                        autoFocus
                        margin="dense"
                        id="login"
                        label="Login"
                        type="text"
                        fullWidth
                        value={username}
                        onKeyDown={onKeyPress}
                        onChange={usernameChanged}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Password"
                        type="text"
                        fullWidth
                        value={password}
                        onKeyDown={onKeyPress}
                        onChange={passwordChanged}
                    />
                    <Button onClick={() => logIn(username, password)} color="primary">
                        Akceptuj
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    );

}

const mapStateToProps = state => {
    return {};
};

const mapDispatchToProps = dispatch => {
    return {
        onUserLogged: user => dispatch({type: actions.USER_LOGGED, user: user}),
        setUserList: users => dispatch({type: actions.USER_LIST, users: users}),
        setRooms: rooms => dispatch({type: actions.SET_ROOMS, rooms: rooms})
    }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {forwardRef: true})(LoginBox)
