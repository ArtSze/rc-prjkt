import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, ThemeProvider } from '@material-ui/core';
import { theme } from '../../static/theme';
import Home from './Home';
import Footer from './Footer';
import NotFound from '../HelperComponents/NotFound';

const App = (): JSX.Element => {
    return (
        <ThemeProvider theme={theme}>
            <Container disableGutters maxWidth="md">
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route component={NotFound} />
                    </Switch>
                </Router>
            </Container>
            <Footer />
        </ThemeProvider>
    );
};

export default App;
