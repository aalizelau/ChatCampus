import Head from 'next/head';
import VoiceAssistantProvider from './context/VoiceAssistantProvider';
import DigitalHumanContainer from './components/DigitalHumanContainer/DigitalHumanContainer.component';
import ConversationContainer from "./components/ConversationContainer/ConversationContainer.component"
import HeaderContainer from './components/HeaderContainer/HeaderContainer.component'

export default function Home() {
  return (
    <>
      <Head>
        <title>🎓 ChatCampus</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <VoiceAssistantProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <HeaderContainer/>
        <main className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
          <DigitalHumanContainer/>
          <ConversationContainer />
        </main>
      </div>
        </VoiceAssistantProvider>
    </>
  );
}