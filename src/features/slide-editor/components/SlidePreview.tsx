import React from 'react';
import { Slide } from '@/features/slide-editor/types';

interface SlidePreviewProps {
  slide: Slide;
  isActive: boolean;
  isVertical: boolean;
  onClick: () => void;
}

export const SlidePreview: React.FC<SlidePreviewProps> = ({ slide, isActive, isVertical, onClick }) => (
  <div
    className={`${isVertical ? 'aspect-[3/4]' : 'aspect-video'} bg-white rounded-lg p-2 cursor-pointer border ${
      isActive ? 'ring-2 ring-primary' : 'hover:bg-gray-50'
    }`}
    onClick={onClick}
  >
    <div className="text-xs font-bold truncate">{slide.title}</div>
    <div className="text-xs truncate mt-1">{slide.content}</div>
  </div>
);