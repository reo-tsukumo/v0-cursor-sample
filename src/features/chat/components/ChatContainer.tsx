'use client'

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChatArea } from '@/features/chat/components/ChatArea';
import { ArtifactArea } from '@/features/chat/components/ArtifactArea';
import { RootState } from '@/store';
import { addMessage, addArtifact, setCurrentArtifact } from '@/features/chat/slice';
import { setError, setExtractedText } from '@/features/upload-file/slice';
import { Message, Artifact } from '@/features/chat/types';
import { Loader2 } from 'lucide-react';

export const ChatContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { messages, artifacts, currentArtifactId } = useSelector((state: RootState) => state.chat);
  const { uploadedFileNames, error } = useSelector((state: RootState) => state.uploadFile);
  const [isProcessing, setIsProcessing] = useState(true);
  const [conversationId, setConversationId] = useState<string | null>(null);

  useEffect(() => {
    const fetchGeminiResponse = async () => {
      try {
        let response;
        do {
          response = await fetch('/api/gemini', {
            method: 'GET',
          });
          if (response.status === 202) {
            // まだ処理中の場合は少し待ってから再試行
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        } while (response.status === 202);

        if (response.ok) {
          const data = await response.json();
          dispatch(setExtractedText(data.text));
          dispatch(addMessage({ id: Date.now(), content: data.text, sender: 'bot' }));
        } else {
          throw new Error('PDFの処理中にエラーが発生しました');
        }
      } catch (error) {
        console.error('Gemini API error:', error);
        dispatch(setError(error instanceof Error ? error.message : 'PDFの処理中にエラーが発生しました'));
      } finally {
        setIsProcessing(false);
      }
    };

    if (uploadedFileNames.length > 0) {
      fetchGeminiResponse();
    } else {
      setIsProcessing(false);
    }
  }, [dispatch, uploadedFileNames]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = { id: Date.now(), content, sender: 'user' };
    dispatch(addMessage(userMessage));

    try {
      const response = await fetch('/api/dify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: content,
          context: '私はエンジニアです。Metaで働いています。',
          task: 'summary',
          user: 'default_user'
        }),
      });
      const data = await response.json();

      const llmMessage: Message = { id: Date.now() + 1, content: data.llmMessage, sender: 'bot' };
      dispatch(addMessage(llmMessage));

      if (data.artifact) {
        const newArtifact: Artifact = { id: Date.now() + 2, ...data.artifact };
        dispatch(addArtifact(newArtifact));
      }

      setConversationId(data.conversationId);
    } catch (error) {
      console.error('Error sending message:', error);
      dispatch(setError('メッセージの送信中にエラーが発生しました。'));
    }
  };

  if (isProcessing) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
        <p className="ml-2">PDFを処理中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

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