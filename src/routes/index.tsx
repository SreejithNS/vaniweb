import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import routes from "./routes.enum";
import Welcome, { WelcomeCards } from "./Welcome";
import ReadingCard from "../components/ReadingCard";
import ResponsiveCardContainer from '../components/ResponsiveCardContainer';
import Typography from '@material-ui/core/Typography';

export default function Routes() {
    return (
        <Router>
            <Switch>
                <Route path={routes.WELCOME}>
                    <Welcome />
                </Route>
                <Route path={routes.SUBMISSION}>
                    <WelcomeCards>
                        <ReadingCard />
                    </WelcomeCards>
                </Route>
                <Route path={routes.POSTSUBMIT}>
                    <WelcomeCards>
                        <ResponsiveCardContainer>
                            <Typography gutterBottom color="textSecondary" variant="h6" style={{textAlign:"center"}} component="h2">
                                Audio Submitted
                            </Typography>
                        </ResponsiveCardContainer>
                    </WelcomeCards>
                </Route>
                <Route exact path="/">
                    <Redirect to={routes.WELCOME} />
                </Route>
            </Switch>
        </Router >
    );
}