
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ResponsiveCardContainer from '../ResponsiveCardContainer';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Theme, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    cardContent: {
        height: `calc(100% - ${250}px)`,
        [theme.breakpoints.down('xs')]: {
            height: `calc(100% - ${60}vh)`
        }
    },
    media: {
        height: 250,
        [theme.breakpoints.down('xs')]: {
            height: "60vh"
        }
    },
    gridHeight: {
        height: "100%"
    }
}));

interface PropTypes {
    imgSrc: any;
    cardTitle: string;
    cardContext: string;
    buttonText: string;
    onNext: () => void;
    formInput: React.ReactNode;
}

export default function MediaCard({ imgSrc, cardTitle, cardContext, buttonText, onNext, formInput }: PropTypes) {
    const classes = useStyles();

    return (
        <ResponsiveCardContainer>
            <CardMedia
                className={classes.media}
                image={imgSrc}
            />
            <CardContent className={classes.cardContent}>
                <Grid
                    container
                    direction="column"
                    justify="space-between"
                    alignItems="stretch"
                    className={classes.gridHeight}
                >
                    <Grid item>
                        <Typography gutterBottom variant="h5" component="h2">
                            {cardTitle}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {cardContext}
                        </Typography>
                        <form noValidate autoComplete="off" onSubmit={onNext}>
                            {formInput}
                        </form>
                    </Grid>
                    <Grid item style={{ textAlign: "right" }}>
                        <Button variant="contained" size="small" color="primary" onClick={onNext}>
                            {buttonText}
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </ResponsiveCardContainer>
    );
}