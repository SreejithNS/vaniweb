
import React from 'react';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MicIcon from '@material-ui/icons/Mic';
import StopIcon from '@material-ui/icons/Stop';
import CloudUploadTwoToneIcon from '@material-ui/icons/CloudUploadTwoTone';
import ResponsiveCardContainer from '../ResponsiveCardContainer';
import useAudio from '../../hooks/useAudio';

// const useStyles = makeStyles({
// });

export default function ReadingCard() {
    //const dummyOnFinish = (blob: any) => console.log("Recording done", blob);
    const { startRecorder, stopRecorder, recordingState } = useAudio();

    const Controls = () => {
        switch (recordingState) {
            case "inactive":
                return (
                    <Button variant="contained" startIcon={<MicIcon />} size="small" color="secondary" onClick={startRecorder}>
                        Start
                    </Button>
                )
            case "recording":
                return (
                    <Button variant="contained" startIcon={<StopIcon />} size="small" color="secondary" onClick={stopRecorder}>
                        Stop
                    </Button>
                )
            case "stopped":
                return (
                    <Button variant="contained" startIcon={<CloudUploadTwoToneIcon />} size="small" color="secondary" >
                        Processing
                    </Button>
                )
        }
    }

    return (
        <ResponsiveCardContainer>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom color="textSecondary" variant="h6" component="h2">
                        Read the text below
                    </Typography>
                    <Typography variant="h5" component="p">
                        Alexander the Great was a successful ruler because his actions created long lasting effects on cultures that continue to the present day. One example of his legacy was thecreation of a Hellenistic society. Hellenism was the combination of Greek, Persian, and Egyptian cultures. During this remarkable time period, people were encouraged to pursue a formal education and produce many different kinds of art. New forms of math, science, and design made a great impact on society.
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {Controls()}
            </CardActions>
        </ResponsiveCardContainer>
    );
}


