import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideControlsProps {
  currentSlide: number;
  totalSlides: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const SlideControls: React.FC<SlideControlsProps> = ({ currentSlide, totalSlides, onPrevious, onNext }) => (
  <div className="flex items-center justify-center space-x-4 mt-4 bg-white rounded-full px-4 py-2 shadow">
    <Button 
      variant="ghost" 
      size="icon"
      onClick={onPrevious}
      disabled={currentSlide === 1}
    >
      <ChevronLeft className="h-6 w-6" />
    </Button>
    <span className="text-sm font-medium">
      スライド {currentSlide}/{totalSlides}
    </span>
    <Button 
      variant="ghost" 
      size="icon"
      onClick={onNext}
      disabled={currentSlide === totalSlides}
    >
      <ChevronRight className="h-6 w-6" />
    </Button>
  </div>
);