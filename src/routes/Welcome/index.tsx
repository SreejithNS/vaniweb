import React from "react";
import { makeStyles, Theme, Container, withStyles } from "@material-ui/core";
import coverImage from "../../assets/welcome-card-cover.webp";
import MediaCard from "../../components/MediaCard";
import { TextField as TextFieldBase } from "@material-ui/core";
import { useLocation, Route, Switch, useHistory } from "react-router-dom";
import {
    TransitionGroup,
    CSSTransition
} from "react-transition-group";
import routes from "../routes.enum";

const TextField = withStyles((theme: Theme) => ({
    root:{
        backgroundColor:"#fff",
        borderRadius:"4px"
    }
}))(TextFieldBase)

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    centered: {
        [theme.breakpoints.down('xs')]: {
            height: "100%",
            width: "100%",
        },
        [theme.breakpoints.up('xs')]: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
        }
    }
}))

export const WelcomeCards: React.FunctionComponent = props => {
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
    const [age, setAge] = React.useState<string | undefined>();
    const [pincode, setPincode] = React.useState<string | undefined>();

    const dummyFunction = (point: string) => () => history.push(routes.WELCOME + point);
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
                                    imgSrc={Image1}
                                    cardTitle="Welcome to Vani"
                                    cardContext="Hey there, lets find out you reading age. First enter your Biological Age"
                                    buttonText="Next"
                                    formInput={
                                        <TextField
                                            label="Biological Age"
                                            variant="outlined"
                                            type="text"
                                            value={age ?? ""}
                                            autoFocus
                                            inputProps={
                                                {
                                                    pattern: "^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$",
                                                    title: "Enter a valid Age"
                                                }
                                            }
                                            required onChange={(e) => {
                                                setAge(e.target.value);
                                            }}
                                        />
                                    }
                                    onNext={dummyFunction("/2")}
                                />
                            </WelcomeCards>
                        </Route>
                        <Route path={routes.WELCOME + "/2"}>
                            <WelcomeCards>
                                <MediaCard
                                    imgSrc={Image2}
                                    cardTitle="Let us know where you are from"
                                    cardContext="Only if you provide us your region, we can make sure you get the apt sentence to read."
                                    buttonText="Start"
                                    formInput={
                                        <TextField
                                            label="Pincode"
                                            variant="outlined"
                                            type="text"
                                            autoFocus
                                            inputProps={
                                                {
                                                    pattern: "^[1-9]{1}[0-9]{2}[0-9]{3}$",
                                                    title: "Enter a valid Indian Pincode"
                                                }
                                            }
                                            value={pincode ?? ""}
                                            required
                                            onChange={(e) => {
                                                setPincode(e.target.value.replace(" ", ""));
                                            }}
                                        />
                                    }
                                    onNext={() => {
                                        const path = routes.SUBMISSION.replace(":age", age?.toString() ?? "");
                                        history.push(path.replace(":pincode", pincode?.toString() ?? ""));
                                    }}
                                />
                            </WelcomeCards>
                        </Route>
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </Container>

    )
}