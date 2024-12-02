"use client";

export const getTextFromAudio = async (userAudioData: Blob) => {
  //backend API
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 
  
  const audioFile = new File([userAudioData], "userVoiceInput", {
    type: "audio/mpeg",
  });
  const formData = new FormData();
  formData.append("file", audioFile);

  const requestOptions = {
    method: "POST",
    body: formData,
  };
  try {
    const result = await fetch(`${BASE_URL}/voice-assistant/audio-message`, requestOptions);
    // Parse the JSON response
    const data = await result.json();
    return {
      userQuery: data.user_query,
    };
  } catch (error) {
    console.error("Error handling user voice data >> ", error);
  }
};

export const getAIAudioFromText = async (userQuery: string, selectedLanguage: string) => {
  const formData = new FormData();
  formData.append("language", selectedLanguage)
  formData.append("user_query", userQuery)

  const requestOptions = {
    method: "POST",
    body: formData,
  };
  try {
    const result = await fetch(`${BASE_URL}/voice-assistant/audio-response`, requestOptions);
    const data = await result.json();
    const transcriptionText = data.ai_response_text;
    const base64AudioData = data.audio_data;
    return {
      transcriptionText,
      base64AudioData,
    };
  } catch (error) {
    console.error("Error handling user query and return audio >> ", error);
  }
}

export const getAIReplyFromText = async (textInput: string) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(textInput),
  };

  try {
    const result = await fetch(`${BASE_URL}/voice-assistant/text-message`, requestOptions);
    const data = await result.json();
    return {
      aiResponseText: data.response,
    };
  } catch (error) {
    console.error("Error handling user text data >> ", error);
  }
};

export default getAIReplyFromText;