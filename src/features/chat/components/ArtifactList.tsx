import React from 'react';
import { Artifact } from '../types';
import { Button } from "@/components/ui/button";

// アーティファクトのリストを表示するコンポーネント
interface ArtifactListProps {
  artifacts: Artifact[];
  currentArtifactId: number | null;
  onSelectArtifact: (id: number) => void;
}

export const ArtifactList: React.FC<ArtifactListProps> = ({ artifacts, currentArtifactId, onSelectArtifact }) => {
  return (
    <div className="flex items-center space-x-2 p-4 border-b">
      {artifacts.map((artifact) => (
        <Button
          key={artifact.id}
          variant={artifact.id === currentArtifactId ? "default" : "outline"}
          onClick={() => onSelectArtifact(artifact.id)}
        >
          {artifact.title}
        </Button>
      ))}
    </div>
  );
};