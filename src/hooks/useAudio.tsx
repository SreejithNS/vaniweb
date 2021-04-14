import { useState, useEffect, useCallback } from "react";
import MediaRecorder from "opus-media-recorder";

type RecorderStates = "inactive" | "recording" | "paused";

interface ErrorState {
  status: boolean;
  message: string;
}

// opus-media-recorder options
const workerOptions = {
  encoderWorkerFactory: function () {
    return new Worker(
      process.env.PUBLIC_URL + "/opus-media-recorder/encoderWorker.umd.js"
    );
  },
  OggOpusEncoderWasmPath:
    process.env.PUBLIC_URL + "/opus-media-recorder/OggOpusEncoder.wasm",
  WebMOpusEncoderWasmPath:
    process.env.PUBLIC_URL + "/opus-media-recorder/WebMOpusEncoder.wasm",
};

let recorder: MediaRecorder;

export default function useAudio(onSaveHandler?: (blob: Blob) => void) {
  const onSave = useCallback((blob:Blob) => {
    onSaveHandler && onSaveHandler(blob);
  },[onSaveHandler]);
  const [recordingState, setRecordingState] = useState<RecorderStates | void>(
    (recorder && recorder.state) || void 0
  );
  const [error, setError] = useState<ErrorState>({
    status: false,
    message: "",
  });

  useEffect(() => {
    if (!recorder)
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then((stream) => {
          recorder = new MediaRecorder(
            stream,
            {
              type: "audio",
              mimeType: "audio/ogg",
            },
            workerOptions
          );

          setRecordingState(recorder.state);

          recorder.addEventListener("dataavailable", (result) =>
            onSave
              ? onSave(result.data)
              : console.log(result.data, "output.wav")
          );
          recorder.addEventListener("start", (e) => {
            console.log("Audio Recorder:start", recorder.state);
            setRecordingState(recorder.state);
          });
          recorder.addEventListener("stop", (e) => {
            console.log("Audio Recorder:stop");
            setRecordingState(recorder.state);
          });
          recorder.addEventListener("pause", (e) => {
            console.log("Audio Recorder:pause");
            setRecordingState(recorder.state);
          });
          recorder.addEventListener("resume", (e) => {
            console.log("Audio Recorder:resume");
            setRecordingState(recorder.state);
          });
          recorder.addEventListener("error", (e) => {
            console.log("Audio Recorder:error");
            catchError(e.error);
          });
        })
        .catch(catchError);
  }, [onSave]);

  function startRecorder() {
    if ((recorder.state as unknown) === "paused") recorder.resume();
    else if (recorder.state === "inactive") recorder.start();
  }

  function stopRecorder() {
    if (recorder.state !== "inactive") recorder.stop();
  }

  function pauseRecorder() {
    if (recorder.state !== "recording") recorder.pause();
  }

  function resetRecorder(end?: boolean) {
    if (end) {
      recorder.stop();
    } else {
      recorder.stop();
      recorder.start();
    }
  }

  function catchError(error: Error) {
    try {
      setRecordingState(recorder.state);
      setError({ status: true, message: error.message });
    } catch (e) {
      setError({ status: true, message: e.message });
    }
  }

  return {
    recordingState,
    error,
    stopRecorder,
    pauseRecorder,
    resetRecorder,
    startRecorder,
  };
}
