'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { LayoutTemplate, LayoutPanelTop } from "lucide-react";
import { SlideList } from '@/features/slide-editor/components/SlideList';
import { SlideControls } from '@/features/slide-editor/components/SlideControls';
import { useSlideManagement } from '@/features/slide-editor/hooks/useSlideManagement';

export function SlideEditor() {
  const { 
    slides, 
    currentSlide, 
    isVertical, 
    addNewSlide, 
    updateSlideContent, 
    changeCurrentSlide, 
    toggleSlideOrientation 
  } = useSlideManagement();

  const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);
  const [isContentEditing, setIsContentEditing] = useState<boolean>(false);

  const goToNextSlide = () => {
    if (currentSlide && currentSlide.id < slides.length) {
      changeCurrentSlide(currentSlide.id + 1);
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlide && currentSlide.id > 1) {
      changeCurrentSlide(currentSlide.id - 1);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <header className="flex items-center justify-between border-b px-6 py-3 bg-white">
        <h1 className="text-2xl font-bold">スライドエディタ</h1>
        <Button onClick={toggleSlideOrientation} variant="outline">
          {isVertical ? <LayoutTemplate className="h-4 w-4 mr-2" /> : <LayoutPanelTop className="h-4 w-4 mr-2" />}
          {isVertical ? '横型に変更' : '縦型に変更'}
        </Button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <SlideList
          slides={slides}
          currentSlideId={currentSlide?.id || 1}
          isVertical={isVertical}
          onAddSlide={addNewSlide}
          onSlideSelect={changeCurrentSlide}
        />
        <main className="flex-1 p-6 flex flex-col items-center justify-center">
          {currentSlide && (
            <div 
              className={`${isVertical ? 'aspect-[3/4] w-[50%]' : 'aspect-[16/9] w-[70%]'} bg-white rounded-lg shadow-lg p-8 flex flex-col border`}
            >
              <div
                className={`text-4xl font-bold mb-4 border rounded transition-colors duration-200 ease-in-out ${
                  isTitleEditing ? 'border-blue-500' : 'border-transparent'
                }`}
                contentEditable
                suppressContentEditableWarning
                onFocus={() => setIsTitleEditing(true)}
                onBlur={(e) => {
                  setIsTitleEditing(false);
                  updateSlideContent(currentSlide.id, 'title', e.currentTarget.textContent || '');
                }}
                style={{ minHeight: '1.5em', lineHeight: '1.5', padding: '0 2px' }}
              >
                {currentSlide.title}
              </div>
              <div
                className={`text-xl flex-1 border rounded transition-colors duration-200 ease-in-out ${
                  isContentEditing ? 'border-blue-500' : 'border-transparent'
                }`}
                contentEditable
                suppressContentEditableWarning
                onFocus={() => setIsContentEditing(true)}
                onBlur={(e) => {
                  setIsContentEditing(false);
                  updateSlideContent(currentSlide.id, 'content', e.currentTarget.textContent || '');
                }}
                style={{ padding: '2px' }}
              >
                {currentSlide.content}
              </div>
            </div>
          )}
          <SlideControls
            currentSlide={currentSlide?.id || 1}
            totalSlides={slides.length}
            onPrevious={goToPreviousSlide}
            onNext={goToNextSlide}
          />
        </main>
      </div>
    </div>
  );
}