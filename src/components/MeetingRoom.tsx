import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { useState } from "react"

const MeetingRoom = () => {
  const router = useRouter();
  const {useCallCallingState}=useCallStateHooks();
  
  const [layout,setLayout] = useState<"grid"|"speaker">("speaker");
  const [showParticipants, setShowParticipants] = useState(false);

  return (
    <div>MeetingRoom</div>
  )
}

export default MeetingRoom