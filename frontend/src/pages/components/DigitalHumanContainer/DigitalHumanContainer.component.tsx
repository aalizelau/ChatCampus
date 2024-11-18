import { useContext } from 'react';
import VoiceAssistantContext from '../../context/VoiceAssistantContext';

import VoiceAssistantAvatar from '../VoiceAssistantAvatar/VoiceAssistantAvatar.component';
import VoiceRecorder from '../VoiceRecorder/VoiceRecorder.component';
import AudioPlayer from '../AudioPlayer/AudioPlayer.component';
import ReactLoading from 'react-loading';

const DigitalHumanContainer = () => {
  const {
    handleUserVoiceRecorded,
    isWaitingAIOutput,
    lastAIReplyURL,
    handleOnAudioPlayEnd,
  } = useContext(VoiceAssistantContext);

  return (
    <div className="digital-human-container">
      <VoiceAssistantAvatar />
      <VoiceRecorder onAudioRecordingComplete={handleUserVoiceRecorded} />
      {isWaitingAIOutput && (
        <ReactLoading type="bars" color="#4287f5" width={200} />
      )}
      <AudioPlayer
        audioFileUrl={lastAIReplyURL}
        onAudioPlayEnd={handleOnAudioPlayEnd}
      />
    </div>
  );
};

export default DigitalHumanContainer;