import React from 'react';
import { Artifact } from '../types';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CopyIcon, DownloadIcon } from 'lucide-react';

// 選択されたアーティファクトを表示するコンポーネント
interface ArtifactViewerProps {
  artifact: Artifact;
}

export const ArtifactViewer: React.FC<ArtifactViewerProps> = ({ artifact }) => {
  return (
    <div className="flex-grow flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-semibold">{artifact.title}</h1>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon">
            <CopyIcon className="h-4 w-4" />
            <span className="sr-only">Copy content</span>
          </Button>
          <Button variant="outline" size="icon">
            <DownloadIcon className="h-4 w-4" />
            <span className="sr-only">Download content</span>
          </Button>
        </div>
      </div>
      <ScrollArea className="flex-grow p-4">
        <div className="prose max-w-none">
         <p>{artifact.content}</p>
        </div>
      </ScrollArea>
    </div>
  );
};