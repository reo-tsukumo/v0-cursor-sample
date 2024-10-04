import React, { useEffect, useState, useRef } from 'react';
import { Artifact } from '../types';
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown';

interface ArtifactViewerProps {
  artifact: Artifact;
}

export const ArtifactViewer: React.FC<ArtifactViewerProps> = ({ artifact }) => {
  const [displayedContent, setDisplayedContent] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const speed = 10; // テキストが表示される速度（ミリ秒）
  const hasStreamedRef = useRef<Set<number>>(new Set());
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayedContent('');
    setCurrentIndex(0);
  }, [artifact]);

  useEffect(() => {
    const shouldStream = !hasStreamedRef.current.has(artifact.id);

    if (shouldStream) {
      if (currentIndex < artifact.content.length) {
        const timeout = setTimeout(() => {
          setDisplayedContent(prev => prev + artifact.content[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        hasStreamedRef.current.add(artifact.id);
      }
    } else {
      // ストリーミングをしない場合、一度に全てのコンテンツを表示
      setDisplayedContent(artifact.content);
      setCurrentIndex(artifact.content.length);
    }
  }, [currentIndex, artifact.content, speed, artifact.id]);

  useEffect(() => {
    // コンテンツが更新されるたびに自動スクロール
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [displayedContent]);

  return (
    <ScrollArea className="flex-grow px-4 py-4" ref={scrollAreaRef}>
      <div className="markdown-content prose dark:prose-invert max-w-none">
        <ReactMarkdown>{displayedContent}</ReactMarkdown>
      </div>
    </ScrollArea>
  );
};