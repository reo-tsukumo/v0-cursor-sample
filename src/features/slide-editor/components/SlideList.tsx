import React from 'react';
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus } from "lucide-react";
import { SlidePreview } from '@/features/slide-editor/components/SlidePreview';
import { Slide } from '@/features/slide-editor/types';

interface SlideListProps {
  slides: Slide[];
  currentSlideId: number;
  isVertical: boolean;
  onAddSlide: () => void;
  onSlideSelect: (id: number) => void;
}

export const SlideList: React.FC<SlideListProps> = ({ slides, currentSlideId, isVertical, onAddSlide, onSlideSelect }) => (
  <aside className="w-64 border-r bg-white flex flex-col">
    <div className="p-4">
      <Button onClick={onAddSlide} variant="default" className="w-full mb-4">
        <Plus className="h-4 w-4 mr-2" /> 新しいスライド
      </Button>
    </div>
    <ScrollArea className="flex-1">
      <div className="p-4 space-y-4 pb-8">
        {slides.map((slide) => (
          <SlidePreview
            key={slide.id}
            slide={slide}
            isActive={currentSlideId === slide.id}
            isVertical={isVertical}
            onClick={() => onSlideSelect(slide.id)}
          />
        ))}
      </div>
    </ScrollArea>
  </aside>
);