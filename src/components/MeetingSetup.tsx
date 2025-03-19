import { useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react"
import { Card } from "./ui/card";

const MeetingSetup = ({onSetupComplete}: {onSetupComplete: ()=> void}) => {

    const [isCameraDisabled, setIsCameraDisabled] = useState(true);
    const [isMicDisabled, setIsMicDisabled] = useState(true);

    const call = useCall();

    if(!call) return null;

    useEffect(() => {
        if(isCameraDisabled) call.camera.disable();
        else call.camera.enable();
    },[isCameraDisabled,call.camera])

    useEffect(() => {
        if(isMicDisabled) call.microphone.disable();
        else call.microphone.enable();
    },[isMicDisabled,call.microphone])

    const handleJoinMeeting = async () => {
        await call.join();
        onSetupComplete();
    }
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background/95">
        <div className="w-full max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* VIDEO PREVIEW CONTAINER */}
                <Card className="md:col-span-1 p-6 flex flex-col">
                    <div>
                    <h1 className="text-xl font-semibold mb-1">Camera Preview</h1>
                    <p className="text-sm text-muted-foreground">Make sure you look good!</p>
                    </div>

                    {/* VIDEO PREVIEW */}
                    <div className="mt-4 flex-1 min-h-[400px] rounded-xl overflow-hidden bg-muted/50 border relative">
                    <div className="absolute inset-0">
                        <VideoPreview className="h-full w-full" />
                    </div>
                    </div>
                </Card>

                {/* CARD CONTROLS */}

                <Card className="md:col-span-1 p-6">
                    <div className="h-full flex flex-col">
                        {/*Meeting details*/}
                        
                    </div>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default MeetingSetup