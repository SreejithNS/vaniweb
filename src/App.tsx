import React, { Props } from 'react';
import coverImage from "./assets/welcome-card-cover.jpg";
import "./index.css"
import MediaCard from './components/MediaCard';
import { TextField, Container, CssBaseline, makeStyles, Theme, Grid, Box } from '@material-ui/core';

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

function App() {
    const classes = useStyles();
    const dummyFunction = () => console.log("clicked");

    return (
        <>
            <CssBaseline />
            <Container fixed disableGutters className={classes.root}>
                <WelcomeCards>
                    <MediaCard
                        imgSrc={coverImage}
                        cardTitle="Welcome to Vani"
                        cardContext="Some text within paragraph"
                        buttonText="Next"
                        formInput={<TextField id="standard-basic" label="Age" type="number" required />}
                        onNext={dummyFunction}
                    />
                </WelcomeCards>
            </Container>
        </>
    );
}

export default App;
