
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
                <CardMedia
                    className={classes.media}
                    image="/book.jfif"
                    title="Vani"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Where are you from?
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        It will be interesting to know how diverse our country is
          </Typography>

                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="standard-basic" label="Pincode" type="number"  required />
                    </form>
                    {/* <input type="number" id="quantity" name="quantity" min="1" max="5" />*/}
        </CardContent>
            </CardActionArea>
            <CardActions>

                <Button variant="contained" size="small" color="primary" >
                    Next
        </Button>
            </CardActions>
        </Card>
    );
}


