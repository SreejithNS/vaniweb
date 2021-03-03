import React from "react";
import { makeStyles, Theme, Container } from "@material-ui/core";
import coverImage from "../../assets/welcome-card-cover.jpg";
import MediaCard from "../../components/MediaCard";
import { TextField } from "@material-ui/core";
import { useLocation, Route, Switch, useHistory } from "react-router-dom";
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";
import routes from "../routes.enum";
import ReadingCard from "../../components/ReadingCard";


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: "100vh",
    },
    centered: {
        [theme.breakpoints.down('xs')]: {
            height: "100%",
            width: "100%"
        },
        [theme.breakpoints.up('xs')]: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
        }
    }
}))

const WelcomeCards: React.FunctionComponent = props => {
    const classes = useStyles();
    return (
        <div className={classes.centered}>
            {props.children}
        </div>
    )
};

export default function Welcome() {
    const classes = useStyles();
    const location = useLocation();
    const history = useHistory();
    const dummyFunction = (point:string) => () => history.push(routes.WELCOME + point);
    return (
        <Container fixed disableGutters className={classes.root}>
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames="fade"
                    timeout={300}
                >
                    <Switch location={location}>
                        <Route exact path={routes.WELCOME + "/"}>
                            <WelcomeCards>
                                <MediaCard
                                    imgSrc={coverImage}
                                    cardTitle="Welcome to Vani"
                                    cardContext="Some text within paragraph"
                                    buttonText="Next"
                                    formInput={<TextField label="Age" type="number" required />}
                                    onNext={dummyFunction("/2")}
                                />
                            </WelcomeCards>
                        </Route>
                        <Route path={routes.WELCOME + "/2"}>
                            <WelcomeCards>
                                <MediaCard
                                    imgSrc={coverImage}
                                    cardTitle="Let us know where you are from"
                                    cardContext="Only if you provide us you region, we can make sure you get the apt sentence to read."
                                    buttonText="Start"
                                    formInput={<TextField label="Pincode" type="number" required />}
                                    onNext={dummyFunction("/3")}
                                />
                            </WelcomeCards>
                        </Route>
                        <Route path={routes.WELCOME + "/3"}>
                            <WelcomeCards>
                                <ReadingCard/>
                            </WelcomeCards>
                        </Route>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </Container>

    )
}