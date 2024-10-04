import React from 'react';
import { ArtifactList } from '@/features/chat/components/ArtifactList';
import { ArtifactViewer } from '@/features/chat/components/ArtifactViewer';
import { Artifact } from '@/features/chat/types';
import { Button } from "@/components/ui/button";

interface ArtifactAreaProps {
  artifacts: Artifact[];
  currentArtifactId: number | null;
  onSelectArtifact: (id: number) => void;
  onSummarize: () => void;
  onPaginate: () => void;
}

export const ArtifactArea: React.FC<ArtifactAreaProps> = ({ 
  artifacts, 
  currentArtifactId, 
  onSelectArtifact,
  onSummarize,
  onPaginate
}) => {
  const currentArtifact = artifacts.find(a => a.id === currentArtifactId);

  return (
    <div className="w-1/2 flex flex-col">
      <ArtifactList 
        artifacts={artifacts} 
        currentArtifactId={currentArtifactId} 
        onSelectArtifact={onSelectArtifact} 
      />
      <div className="flex space-x-4 p-4">
        <Button variant="outline" className="rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200" onClick={onSummarize}>
          要約を再生成
        </Button>
        <Button variant="outline" className="rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200" onClick={onPaginate}>
          ページネーションを作成
        </Button>
      </div>
      {currentArtifact && <ArtifactViewer artifact={currentArtifact} />}
    </div>
  );
}