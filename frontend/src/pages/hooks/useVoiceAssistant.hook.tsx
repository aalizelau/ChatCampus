import { getAIReplyOutput } from "@/pages/services/aivoiceassistant.service"
import {useState} from "react"

interface Message {
    text: string;
    isUser: boolean;
  }

const useVoiceAssistant = ()=>{
    const [isWaitingAIOutput,setIsWaitingAIOutput] = useState<boolean>(false)
    const [lastAIReplyURL,setLastAIReplyURL] = useState<string|undefined>(undefined)
    const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
    const [chatData, setChatData] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');

  const handleUserInput = (input: string) => {
    setChatData((prev) => [...prev, { text: input, isUser: true }]);
    // Simulate digital human response (dummy response)
    setTimeout(() => {
      const response = `Dummy response processed for "${input}".`;
      setChatData((prev) => [...prev, { text: response, isUser: false }]);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      handleUserInput(inputText);
      setInputText('');
    }
  };

    const handleUserVoiceRecorded = async (userAudioData: Blob) => {
        setIsWaitingAIOutput(true);
        const result = await getAIReplyOutput(userAudioData, selectedLanguage);
        setIsWaitingAIOutput(false);
        if (result) {
          const { transcriptionText, userQuery, base64AudioData } = result;
          setChatData((prevData) => [...prevData, {text: transcriptionText, isUser: true}]);
          const audioData = 'data:audio/mpeg;base64,' + base64AudioData;
          setLastAIReplyURL(audioData);
        }
    }

    const handleOnAudioPlayEnd = ()=>{
        setLastAIReplyURL(undefined)
    }

    const handleLanguageChange = (language:string) => {
        setSelectedLanguage(language);
    };

    return{
        handleUserVoiceRecorded,
        isWaitingAIOutput,
        lastAIReplyURL,
        handleOnAudioPlayEnd,
        selectedLanguage,
        handleLanguageChange,
        chatData,
        inputText,
        setInputText,
        handleSubmit,
    }
}


export default useVoiceAssistant;