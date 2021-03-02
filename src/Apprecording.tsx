
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';
import CloudUploadTwoToneIcon from '@material-ui/icons/CloudUploadTwoTone';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function MediaCard() {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>

                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Read the text below
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                            The text to be read displayed here.
          </Typography>

        
        
        </CardContent>
            </CardActionArea>
            <CardActions>

                <Button variant="contained" size="small" color="secondary">
                 <MicIcon />
        </Button>
                <Button variant="contained" size="small" color="secondary" >
                 <StopIcon />
        </Button>
                <Button variant="contained" size="small" color="secondary" >
                 <CloudUploadTwoToneIcon />
        </Button>
            </CardActions>
        </Card>
    );
}


