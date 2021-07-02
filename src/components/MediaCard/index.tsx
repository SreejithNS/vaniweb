import React, { useRef } from "react";
import {
  makeStyles,
  withStyles,
  createStyles,
  useTheme,
} from "@material-ui/core/styles";
import ResponsiveCardContainer from "../ResponsiveCardContainer";
import CardContentBase from "@material-ui/core/CardContent";
import CardMediaBase from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Theme, useMediaQuery } from "@material-ui/core";
import Owl from "../Owl";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      textAlign: "center",
      flexFlow: "column wrap",
      alignItems: "center",
      justifyContent: "space-between",
      height: "100%",
      "&>*": {
        flexGrow: 1,
        margin: theme.spacing(2) + "px " + theme.spacing(1) + "px",
      },
      "&>*:last-child": {
        flexGrow: 0,
      },
    },
  })
);

const CardMedia = withStyles((theme: Theme) => ({
  root: {
    flexGrow: 3,
    minHeight: 300,
  },
}))(CardMediaBase);

const CardContent = withStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    "&>form>div>*": {
      margin: {
        top: theme.spacing(1),
        bottom: theme.spacing(2),
      },
    },
  },
}))(CardContentBase);

interface PropTypes {
  imgSrc: any;
  cardTitle: string;
  cardContext: string;
  buttonText: string;
  onNext: () => void;
  formInput: React.ReactNode;
}

export default function MediaCard({
  imgSrc,
  cardTitle,
  cardContext,
  buttonText,
  onNext,
  formInput,
}: PropTypes) {
  const classes = useStyles();
  const formRef = useRef<HTMLFormElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef?.current) {
      const form = formRef.current;
      if (form.reportValidity()) {
        onNext();
      }
    }
    return false;
  };
  return (
    <ResponsiveCardContainer>
      {/* <CardMedia
                image={imgSrc}
                title="Children"
            /> */}
      <CardContent>
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          autoComplete="off"
          className={classes.form}
        >
          <Typography gutterBottom variant="h5" component="h2">
            {cardTitle}
          </Typography>
          <Owl />
          <Typography variant="body1" color="textSecondary" component="p">
            {cardContext}
          </Typography>
          {formInput}
          <div>
            <Button
              variant="contained"
              size="small"
              color="primary"
              type="submit"
            >
              {buttonText}
            </Button>
          </div>
        </form>
      </CardContent>
    </ResponsiveCardContainer>
  );
}
