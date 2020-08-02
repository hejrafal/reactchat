import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Message from "../Message/Message";

export default function getNameDialog({open, handleClose}) {

    const [username, setUsername] = useState('')

    const usernameChanged = (e) => {
        setUsername(e.target.value);
    }

    return (
        <Dialog open={open} onClose={() => handleClose(username)} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Podaj login</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Wpisz swój login pod którym będziesz widoczny dla innych użytkowników
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="login"
                    label="Login"
                    type="text"
                    fullWidth
                    value={username}
                    onChange={usernameChanged}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleClose(username)} color="primary">
                    Akceptuj
                </Button>
            </DialogActions>
        </Dialog>
    )
}