import React, {useState} from 'react';
import {Grid} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import GetNameDialog from "../Dialog/GetNameDialog";
import Message from "../Message/Message";

const style = {
    Paper: {padding: 20, margin: 10}
};

export default function Home() {
    const [open, setOpen] = React.useState(true);
    const [username, setUsername] = useState('');
    const [messages, setMessages] = useState([
        {id: 1, username: 'Rafał', date: '2020-08-01 20:21', message: 'Cześć'},
        {id: 2, username: 'Sylwia', date: '2020-08-01 20:23', message: 'Siemano'},
        {id: 3, username: 'Rafał', date: '2020-08-01 20:24', message: 'Co tam słychać?'},
    ]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (username) => {
        setOpen(false);
        setUsername(username);
    };

    const messagesList = (<div>
        {messages.map(item =>
            <Message
                key={item.id}
                username={item.username}
                date={item.date}
                message={item.message}/>)
        }
    </div>);

    console.log(messagesList);
    return (
        <Grid container>

            <Typography variant="h5" gutterBottom>
                Witaj {username}
            </Typography>
            <Grid item xs={12}>
                {messagesList}
            </Grid>
            <Grid xs={4} item>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Open form dialog
                </Button>
            </Grid>

            <GetNameDialog open={open} handleClose={handleClose}/>

        </Grid>
    )

}