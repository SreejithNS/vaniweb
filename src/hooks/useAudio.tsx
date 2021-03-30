import { useState, useEffect } from "react";
import MediaRecorder from 'opus-media-recorder';

type RecorderStates = 'inactive' | 'recording' | 'paused' | 'stopped';

interface ErrorState {
    status: boolean;
    message: string;
}

// opus-media-recorder options
const workerOptions = {
    encoderWorkerFactory: function () {
        return new Worker(process.env.PUBLIC_URL + '/opus-media-recorder/encoderWorker.umd.js')
    },
    OggOpusEncoderWasmPath: process.env.PUBLIC_URL + '/opus-media-recorder/OggOpusEncoder.wasm',
    WebMOpusEncoderWasmPath: process.env.PUBLIC_URL + '/opus-media-recorder/WebMOpusEncoder.wasm',
};

let recorder: MediaRecorder;

export default function useAudio(onSave?: (blob: Blob) => void) {
    const [recordingState, setRecordingState] = useState<RecorderStates | void>(recorder && recorder.state || void 0);
    const [error, setError] = useState<ErrorState>({ status: false, message: "" });

    useEffect(() => {
        if (!recorder) navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(createRecorder).catch(catchError);
    });

    function createRecorder(stream: any) {
        recorder = new MediaRecorder(stream, {
            type: 'audio',
            mimeType: "audio/ogg"
        }, workerOptions);

        setRecordingState(recorder.state);

        recorder.addEventListener('dataavailable', (result) => onSave ? onSave(result.data) : console.log(result.data, "output.wav"));
        recorder.addEventListener('start', (e) => {
            console.log('Audio Recorder:start');
            setRecordingState('recording');
        })
        recorder.addEventListener('stop', (e) => {
            console.log('Audio Recorder:stop');
            setRecordingState('inactive');
        })
        recorder.addEventListener('pause', (e) => {
            console.log('Audio Recorder:pause');
            setRecordingState('paused');
        })
        recorder.addEventListener('resume', (e) => {
            console.log('Audio Recorder:resume');
            setRecordingState('recording');
        })
        recorder.addEventListener('error', (e) => {
            console.log('Audio Recorder:error');
            catchError(e.error);
        })
    }

    function startRecorder() {
        if (recorder.state as unknown === "paused") recorder.resume();
        else recorder.start();
        setRecordingState(recorder.state)
    }

    function stopRecorder() {
        recorder.stop();
    }

    function pauseRecorder() {
        recorder.pause();
        setRecordingState(recorder.state)
    }

    function resetRecorder() {
        recorder.addEventListener('dataavailable', () => void 0);
        recorder.stop();
        setRecordingState();
    }

    function catchError(error: Error) {
        try {
            setRecordingState(recorder.state)
            setError({ status: true, message: error.message });
        } catch (e) {
            setError({ status: true, message: e.message });
        }
    }

    return { recordingState, error, stopRecorder, pauseRecorder, resetRecorder, startRecorder };
}