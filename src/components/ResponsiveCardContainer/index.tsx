
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { useMediaQuery, useTheme, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width:400,
        height:"100%",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            height: "100%",
            maxWidth: "none"
        }
    }
}));

export default function MediaCard(props: { children: any; }) {
    const classes = useStyles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Card square={isMobile} className={classes.root}>
            {props.children}
        </Card>
    );
}