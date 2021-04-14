
import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CardBase from '@material-ui/core/Card';
import { useMediaQuery, useTheme, Theme } from '@material-ui/core';

const Card = withStyles((theme: Theme) => makeStyles({
    root: {
        width:400,
        height:"100%",
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "center",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            height: "100%",
            maxWidth: "none"
        }
    }
}))(CardBase);

export default function MediaCard(props: { children: any; }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Card square={isMobile}>
            {props.children}
        </Card>
    );
}