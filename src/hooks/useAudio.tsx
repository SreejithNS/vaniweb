import { useState, useEffect } from "react";
import RecordRTCPromisesHandler, { invokeSaveAsDialog, StereoAudioRecorder } from "recordrtc";

interface ErrorState {
    status: boolean;
    message: string;
}

let recorder: RecordRTCPromisesHandler;

export default function useAudio(onSave?: (blob: Blob) => void) {
    const [recordingState, setRecordingState] = useState<RecordRTCPromisesHandler.State | void>(recorder?.getState());
    const [error, setError] = useState<ErrorState>({ status: false, message: "" });

    useEffect(() => {
        if (!recorder) navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(createRecorder).catch(catchError);
    });

    function createRecorder(stream: any) {
        recorder = new RecordRTCPromisesHandler(stream, {
            type: 'audio',
            mimeType: "audio/ogg",
            recorderType: StereoAudioRecorder
        });
        setRecordingState(recorder.getState())
    }

    function startRecorder() {
        if (recorder.getState() as unknown === "paused") recorder.resumeRecording();
        else recorder.startRecording();
        setRecordingState(recorder.getState())
    }

    function stopRecorder() {

        recorder.stopRecording(function () {
            setRecordingState(recorder.getState())
            try {
                let blob = recorder.getBlob();
                onSave ? onSave(blob) : invokeSaveAsDialog(blob, "output.wav");
            } catch (e) { catchError(e) }
        });
    }

    function pauseRecorder() {
        recorder.pauseRecording();
        setRecordingState(recorder.getState())
    }

    function resetRecorder() {
        recorder.reset();
        setRecordingState(recorder.getState());
    }

    function catchError(error: Error) {
        try {
            setRecordingState(recorder.getState())
            setError({ status: true, message: error.message });
        } catch (e) {
            setError({ status: true, message: e.message });
        }
    }

    return { recordingState, error, stopRecorder, pauseRecorder, resetRecorder, startRecorder };
}