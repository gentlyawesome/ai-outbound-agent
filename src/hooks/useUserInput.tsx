// react
import { useEffect, useRef, useState } from "react";

// api
import processAI from "../api/processAI";

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
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance>(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

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

  useEffect(() => {
    const handleMouseUp = () => {
      console.log("buttonRef: ", buttonRef.current);
      console.log("transcript: ", transcript);
      setUserInput(transcript);
    };

    document.addEventListener("mouseup", handleMouseUp);

    if (userInput.length > 0) {
      mutate(userInput);
    }
  }, [buttonRef, transcript, mutate, userInput, setUserInput]);

  return {
    startListening,
    buttonRef,
    SpeechRecognition,
    isLoading,
    isError,
    error,
    result,
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  };
};
