// hook
import { useUserInput } from "./hooks/useUserInput";

function App() {
  const {
    isLoading,
    isError,
    error,
    result,
    listening,
    SpeechRecognition,
    transcript,
    buttonRef,
    startListening,
  } = useUserInput();

  return (
    <div className="flex flex-col h-[100vh] w-1/2 m-auto">
      <div className="text-center text-2xl pt-4">
        AI Voice Customer Support{" "}
      </div>
      <div className="m-4 flex flex-col">
        <div className="flex justify-between items-center ">
          <div
            className={`${
              listening ? "bg-green-500" : "bg-red-500"
            } text-white py-2 px-4 rounded`}
          >
            Microphone: {listening ? <span>On</span> : <span>Off</span>}
          </div>
          <button
            className="bg-gray-500 text-white py-4 px-2 rounded cursor-pointer hover:bg-blue-500 active:bg-green-500"
            ref={buttonRef}
            onMouseDown={startListening}
            onMouseUp={SpeechRecognition.stopListening}
          >
            Hold to talk
          </button>
        </div>
        <p className="border-t-2 mt-4 border-gray-300">
          Transcript: {transcript}
        </p>
        <p className="border-t-2 mt-4 border-gray-300">Result: {result}</p>
        {isLoading && <div className="m-4 text-blue-500">Processing...</div>}
        {isError && (
          <div className="m-4 text-red-500">{(error as Error).message}</div>
        )}
      </div>
    </div>
  );
}

export default App;
