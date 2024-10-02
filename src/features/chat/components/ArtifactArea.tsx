import React from 'react';
import { ArtifactList } from '@/features/chat/components/ArtifactList';
import { ArtifactViewer } from '@/features/chat/components/ArtifactViewer';
import { Artifact } from '@/features/chat/types';

// アーティファクトエリアを表示するコンポーネント
interface ArtifactAreaProps {
  artifacts: Artifact[];
  currentArtifactId: number | null;
  onSelectArtifact: (id: number) => void;
}

export const ArtifactArea: React.FC<ArtifactAreaProps> = ({ artifacts, currentArtifactId, onSelectArtifact }) => {
  const currentArtifact = artifacts.find(a => a.id === currentArtifactId);

  return (
    <div className="w-1/2 flex flex-col">
      <ArtifactList 
        artifacts={artifacts} 
        currentArtifactId={currentArtifactId} 
        onSelectArtifact={onSelectArtifact} 
      />
      {currentArtifact && <ArtifactViewer artifact={currentArtifact} />}
    </div>
  );
};