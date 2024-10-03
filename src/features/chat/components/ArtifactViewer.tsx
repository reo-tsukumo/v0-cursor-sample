import React from 'react';
import { Artifact } from '../types';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CopyIcon, DownloadIcon } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ArtifactViewerProps {
  artifact: Artifact;
}

export const ArtifactViewer: React.FC<ArtifactViewerProps> = ({ artifact }) => {
  return (
    <ScrollArea className="flex-grow px-4 py-4">
      <div className="markdown-content prose dark:prose-invert max-w-none">
        <ReactMarkdown>{artifact.content}</ReactMarkdown>
      </div>
    </ScrollArea>
  );
};