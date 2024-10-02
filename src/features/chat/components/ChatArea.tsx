import React from 'react';
import { MessageList } from '@/features/chat/components/MessageList';
import { MessageInput } from '@/features/chat/components/MessageInput';
import { Message } from '@/features/chat/types';

// チャットエリアを表示するコンポーネント
interface ChatAreaProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ messages, onSendMessage }) => {
  return (
    <div className="w-1/2 flex flex-col border-r">
      <MessageList messages={messages} />
      <MessageInput onSendMessage={onSendMessage} />
    </div>
  );
};