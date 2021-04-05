import React from 'react';
import { Container, AppBar, Typography, Grow , Grid} from '@material-ui/core';
import tasksimage from './images/tasks.jpg';
const App = () => {
    return(

        <Container maxidth="lg">
            <AppBar position="static" color="inherit">
                <Typography variant="h2" align="center">Tasks</Typography>
                <img src={tasksimage} alt="tasks" height="60"/>
            </AppBar>
        </Container>
    );
}
export default App;