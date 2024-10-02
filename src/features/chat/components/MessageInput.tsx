import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from 'lucide-react';

// メッセージ入力フォームを表示するコンポーネント
interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    onSendMessage(inputMessage);
    setInputMessage('');
  };

  return (
    <div className="flex items-center p-4 border-t">
      <Input
        type="text"
        placeholder="Type your message..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        className="flex-grow mr-2"
      />
      <Button onClick={handleSendMessage} size="icon">
        <SendIcon className="w-4 h-4" />
        <span className="sr-only">Send</span>
      </Button>
    </div>
  );
};