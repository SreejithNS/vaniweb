import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MicIcon from "@material-ui/icons/Mic";
import StopIcon from "@material-ui/icons/Stop";
import CloudUploadTwoToneIcon from "@material-ui/icons/CloudUploadTwoTone";
import ResponsiveCardContainer from "../ResponsiveCardContainer";
import useSchonell from "../../hooks/useSchonell";
import { CircularProgress, makeStyles, Theme } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import AlertError from "@material-ui/icons/Error";
const Zoom = require("react-reveal/Zoom");

const useStyles = makeStyles((theme: Theme) => ({
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "&:hover": {
      opacity: 1,
    },
  },
  controls: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: theme.spacing(2),
  },
  recordButton: {
    background: red[500],
    color: "#fff",
  },
  stopButton: {
    background: "#fff",
    border: "2px solid " + red[500],
    color: red[500],
    animation: `$pulse 0.5s ${theme.transitions.easing.easeOut} infinite alternate`,
  },
  "@keyframes pulse": {
    "0%": {
      transform: "scale(1)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(1.1)",
      opacity: 0.5,
      filter: "blur(0.5px)",
    },
  },
}));

const TextCard = ({ text }: { text: string }) => {
  return (
    <Zoom bottom key={text}>
      <Typography variant="h3">{text}</Typography>
    </Zoom>
  );
};

export default function ReadingCard() {
  const classes = useStyles();

  const {
    endTest,
    recordingState,
    error,
    next,
    startTest,
    word,
    loading,
  } = useSchonell((score)=>void 0);

  const Controls = () => {
    switch (recordingState) {
      case "inactive":
        return (
          <IconButton
            size="medium"
            className={classes.recordButton}
            color="default"
            onClick={startTest}
          >
            <MicIcon />
          </IconButton>
        );
      case "recording":
        return (
          <IconButton
            size="medium"
            className={classes.stopButton}
            color="default"
            onClick={endTest}
          >
            <StopIcon />
          </IconButton>
        );
      case "stopped":
        return (
          <IconButton
            size="medium"
            className={classes.stopButton}
            color="default"
          >
            <CloudUploadTwoToneIcon />
          </IconButton>
        );
    }
  };
  if (error.status) {
    return (
      <div style={{ textAlign: "center" }}>
        <AlertError /> <br />
        {"Oops! something went wrong please refresh"}
        <br />
        {error.message ?? ""}
      </div>
    );
  }
  //  !loading && setTimeout(next, 15 * 1000);
  return (
    <ResponsiveCardContainer>
      <CardContent>
        {loading ? (
          <div style={{ textAlign: "center" }}>
            <CircularProgress />
          </div>
        ) : recordingState === "inactive" ? (
          <Typography
            gutterBottom
            color="textSecondary"
            style={{ textAlign: "center" }}
            component="div"
          >
            Please start recoding
          </Typography>
        ) : (
          <>
            <Typography
              gutterBottom
              color="textSecondary"
              variant="h6"
              component="h2"
            >
              Read the text below
            </Typography>
            <TextCard text={word} />
          </>
        )}
      </CardContent>
      <CardActions className={classes.controls}>
        {!loading && (
          <>
            <IconButton
              disabled={loading || recordingState === "inactive"}
              color="secondary"
              onClick={() => void 0}
            >
              <KeyboardArrowLeftIcon />
            </IconButton>
            {Controls()}
            <IconButton
              disabled={loading || recordingState === "inactive"}
              color="primary"
              onClick={next}
            >
              <KeyboardArrowRightIcon />
            </IconButton>
          </>
        )}
      </CardActions>
    </ResponsiveCardContainer>
  );
}
