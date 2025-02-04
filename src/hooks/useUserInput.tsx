// react
import { useEffect, useRef, useState } from "react";

// api
import { processAI, resetAI } from "../api/processAI";

// react-query
import { useMutation } from "react-query";

// react-speech-recognition
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export const useUserInput = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [result, setResult] = useState<string>("");
  const [userInput, setUserInput] = useState<string>("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  const {
    mutate: mutateReset,
    isLoading: resetIsLoading,
    isError: resetIsError,
    error: resetError,
  } = useMutation((input: string) => resetAI(), {
    onSuccess: (data) => {
      setResult(data.message);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const { mutate, isLoading, isError, error } = useMutation(
    (input: string) => processAI(input),
    {
      onSuccess: (data) => {
        setResult(data.message);
        window.speechSynthesis.speak(
          new SpeechSynthesisUtterance(data.message)
        );
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const handleStopRecording = () => {
    SpeechRecognition.stopListening();
  };

  const handleReset = () => {
    resetTranscript();
    setResult("");
    setUserInput("");
    mutateReset("");
  };

  const handleChange = (e: any) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    resetTranscript();
    setUserInput("");
    mutate(userInput);
  };

  useEffect(() => {
    if (listening) {
      console.log("Listening");
    } else {
      console.log("Not Listening");
      if (transcript.length > 0) {
        setUserInput(transcript);
      }
    }
  }, [mutate, setUserInput, transcript, listening]);

  return {
    startListening,
    handleStopRecording,
    handleReset,
    handleChange,
    handleSubmit,
    resetIsError,
    resetIsLoading,
    resetError,
    buttonRef,
    isLoading,
    isError,
    error,
    result,
    transcript,
    listening,
    resetTranscript,
    userInput,
    browserSupportsSpeechRecognition,
  };
};
