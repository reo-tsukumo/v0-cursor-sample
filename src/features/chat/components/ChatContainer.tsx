'use client'

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChatArea } from '@/features/chat/components/ChatArea';
import { ArtifactArea } from '@/features/chat/components/ArtifactArea';
import { RootState } from '@/store';
import { addMessage, addArtifact, setCurrentArtifact } from '@/features/chat/slice';
import { Message, Artifact } from '@/features/chat/types';

// チャット機能のメインコンテナコンポーネント
export const ChatContainer: React.FC = () => {
  const dispatch = useDispatch();
  // Reduxストアから必要な状態を取得
  const { messages, artifacts, currentArtifactId } = useSelector((state: RootState) => state.chat);

  // メッセージ送信処理
  const handleSendMessage = async (content: string) => {
    // ユーザーメッセージをストアに追加
    const userMessage: Message = { id: Date.now(), content, sender: 'user' };
    dispatch(addMessage(userMessage));

    try {
      // APIにメッセージを送信
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });
      const data = await response.json();

      // ボットの応答をストアに追加
      const botMessage: Message = { id: Date.now() + 1, content: data.botResponse, sender: 'bot' };
      dispatch(addMessage(botMessage));

      // アーティファクトが生成された場合、ストアに追加
      if (data.artifact) {
        const newArtifact: Artifact = { id: Date.now() + 2, ...data.artifact };
        dispatch(addArtifact(newArtifact));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // エラーハンドリング（ユーザーへの通知など）を追加することをお勧めします
    }
  };

  return (
    <div className="flex h-screen">
      <ChatArea messages={messages} onSendMessage={handleSendMessage} />
      {artifacts.length > 0 && (
        <ArtifactArea
          artifacts={artifacts}
          currentArtifactId={currentArtifactId}
          onSelectArtifact={(id) => dispatch(setCurrentArtifact(id))}
        />
      )}
    </div>
  );
};