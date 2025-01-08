import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  fetchChatByProject,
  fetchChatMessages,
  sendMessage,
} from "@/Redux/Chat/Action";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const { auth, chat } = useSelector((store) => store);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatByProject(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (chat.chat?.id) {
      dispatch(fetchChatMessages(chat.chat.id));
    }
  }, [chat.chat?.id, dispatch]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    dispatch(
      sendMessage({
        senderId: auth.user?.id,
        projectId: id,
        content: message,
      })
    );
    setMessage("");
    console.log("mensaje", message);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(e.key);
      handleSendMessage();
    }
  };

  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <h1 className="p-5 border-b">Chat</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
          {chat.messages?.map((item) =>
            item.sender.id !== auth.user.id ? (
              <div className="flex justify-start gap-2 mb-2" key={item.id}>
                <Avatar>
                  <AvatarFallback>{item.sender.fullName[0]}</AvatarFallback>
                </Avatar>
                <div className="px-5 py-2 space-y-2 border rounded-ss-2xl rounded-e-xl">
                  <p>{item.sender.fullName}</p>
                  <p className="text-gray-300">{item.content}</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-end gap-2 mb-2" key={item.id}>
                <div className="px-5 py-2 space-y-2 border rounded-se-2xl rounded-s-xl">
                  <p>{item.sender.fullName}</p>
                  <p className="text-gray-300">{item.content}</p>
                </div>
                <Avatar>
                  <AvatarFallback>{item.sender.fullName[0]}</AvatarFallback>
                </Avatar>
              </div>
            )
          )}
        </ScrollArea>
        <div className="relative p-0">
          <Input
            value={message}
            onChange={handleMessageChange}
            onKeyDown={handleKeyDown}
            rows="2"
            className="border-t border-b-0 rounded-none outline-none py-7 focus:outline-none focus:ring-0 border-x-0"
            placeholder="Escribe tu mensaje..."
          />
          <Button
            onClick={handleSendMessage}
            type="submit"
            className="absolute rounded-full right-2 top-3"
            size="icon"
          >
            <PaperPlaneIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
