import React from 'react';
import Container from '@material-ui/core/Container';
import Home from "./Page/Home";
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';

function MainPage() {
    return (
        <BrowserRouter>
            <Container>
                <Route path="/" exact component={Home} />
            </Container>
        </BrowserRouter>
    )
}

export default MainPage;
