import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardBase from '@material-ui/core/Card';
import { useMediaQuery, useTheme, Theme } from '@material-ui/core';

const Card = withStyles((theme: Theme) => ({
    root: {
        width:400,
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "center",
        background: "#ffffff99",
        borderRadius: "24px",
        backdropFilter:
          "blur(10px) saturate(100%) contrast(45%) brightness(130%)",
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            height: "100%",
            borderRadius:"0px",
            justifyContent: "space-around",
            backdropFilter:
          "blur(30px) saturate(100%) contrast(45%) brightness(130%)",
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