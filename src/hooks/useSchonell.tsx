import { useEffect, useRef, useState } from "react";
import useAudio from "./useAudio";
import axios from "../components/Axios";
import { words, ages } from "../assets/schonell_sentences.json";

interface ResponseData {
  value: boolean;
}

interface ErrorState {
  status: boolean;
  message: string;
}

function makeData(word: string, audio?: Blob) {
  let data = new FormData();

  data.append("word", word);
  audio && data.append("audio", audio);

  return data;
}

export default function useSchonell(onTestEnd: (score: number) => void) {
  //Test Init state
  const [testInit, setTestInit] = useState<Boolean>(false);

  //Loading & Error State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorState>({
    status: false,
    message: "",
  });

  //Schonell Sentence Pointers
  const [i, setI] = useState(0);
  const [j, setJ] = useState(-1);
  const position = useRef({ set: i, word: j });

  //Sentence Responses
  const [audioResponses, setAudioResponses] = useState<(Boolean | null)[][]>(
    new Array(13).fill(null).map(() => new Array(5))
  );
  const audioResponsesRef = useRef(audioResponses);

  //Audio Recorder
  const handleAudioData = () => (data: Blob) => {
    const { set, word } = position.current;
    setAudioResponses((prevState) => {
      var newState = [...prevState];
      newState[set][word] = null;
      return newState;
    });
    axios
      .post<ResponseData>(
        "/default/test-func/testapi/upload",
        makeData(words[set][word], data),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(
        (response) => {
          setAudioResponses((prevState) => {
            var newState = [...prevState];
            newState[set][word] = response.data.value;
            audioResponsesRef.current[set][word] = newState[set][word];
            return newState;
          });
        },
        (error) => {
          console.error(error);
          setError({ status: true, message: error.message });
        }
      );
  };

  const {
    startRecorder,
    stopRecorder,
    recordingState,
    error: recorderError,
  } = useAudio(handleAudioData());

  function startTest() {
    if (!testInit) {
      startRecorder();
      setTestInit(true);
    }
  }

  useEffect(() => {
    if (testInit && recordingState === "inactive") {
      //Check for consecutive 10 wrong readings
      var consecutiveFalse = 0;
      for (let word of audioResponses.flat()) {
        if (word === true) {
          consecutiveFalse = 0;
        } else if (word === false) {
          consecutiveFalse++;
        }
        if (consecutiveFalse >= 10) {
          break;
        }
      }

      //End test if 10 consecutive wrong words
      if (consecutiveFalse >= 10) {
        return endTest();
      }

      if (j < 4) setJ(j + 1);
      else {
        setJ(0);
        if (i > words.length - 1) endTest();
        else setI(i + 1);
      }
      startRecorder();
    }
    //eslint-disable-next-line
  }, [testInit, recordingState]);

  useEffect(() => {
    position.current = { set: i, word: j };
  }, [i, j, audioResponsesRef]);

  function next() {
    if (!testInit || recordingState === "inactive") {
      startTest();
    } else if (recordingState === "recording") {
      console.log("Stopping recorder");
      stopRecorder();
    }
  }

  function endTest() {
    if (recordingState === "recording") stopRecorder();
    var score = audioResponses.flat().filter((value) => value === true).length;
    onTestEnd(score);
  }

  //Load if more than 5 requests are pending
  const responseCheck = audioResponses.flat().filter((value) => value !== undefined).length;
  useEffect(() => {
    const nullList = audioResponses.flat().filter((value) => value === null)
      .length;
    if (nullList > 5) {
      setLoading(true);
    }
    if (nullList <= 2) {
      setLoading(false);
    }
    if (recorderError) {
      setError(recorderError as any);
    }
  }, [
    audioResponses,
    responseCheck,
    recorderError
  ]);

  function calculateReadingAge() {
    const correctCount = audioResponses.filter(Boolean).length;
    return correctCount > ages.length - 1 ? ages[-1] : ages[correctCount];
  }

  return {
    startTest,
    endTest,
    next,
    word: words[i][j],
    position: [i, j],
    score: calculateReadingAge(),
    error,
    loading,
    recordingState,
  };
}
