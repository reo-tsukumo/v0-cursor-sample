import React from 'react';
import { Message } from '../types';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";


// メッセージリストを表示するコンポーネント
interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
      <ScrollArea className="flex-grow px-4 py-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} py-2`}>
            <div className={`flex items-start ${message.sender === 'user' ? 'max-w-[70%] flex-row-reverse' : 'flex-row'}`}>
              {message.sender === 'bot' && (
                <Avatar>
                  <AvatarFallback>B</AvatarFallback>
                </Avatar>
              )}
              {message.sender === 'user' ? (
                <Card className="mx-2 bg-gray-100">
                  <CardContent className="p-3 text-base">
                    <p>{message.content}</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="mx-2 p-3 text-base">
                  <p>{message.content}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </ScrollArea>
    );
  };