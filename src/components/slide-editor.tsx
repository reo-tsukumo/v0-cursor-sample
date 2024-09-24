'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, LayoutTemplate, LayoutPanelTop, ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
  id: number;
  title: string;
  content: string;
}

export function SlideEditor() {
  const [slides, setSlides] = useState<Slide[]>([
    { id: 1, title: 'ようこそ', content: '最初のスライドを編集してください' },
  ]);
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [isVertical, setIsVertical] = useState<boolean>(false);
  const [isTitleEditing, setIsTitleEditing] = useState<boolean>(false);
  const [isContentEditing, setIsContentEditing] = useState<boolean>(false);

  const addNewSlide = () => {
    const newSlide: Slide = {
      id: slides.length + 1,
      title: `スライド ${slides.length + 1}`,
      content: 'ここにコンテンツを追加',
    };
    setSlides([...slides, newSlide]);
  };

  const updateSlideContent = (field: 'title' | 'content', value: string) => {
    setSlides(slides.map(slide => 
      slide.id === currentSlide ? { ...slide, [field]: value } : slide
    ));
  };

  const toggleOrientation = () => {
    setIsVertical(!isVertical);
  };

  const goToNextSlide = () => {
    if (currentSlide < slides.length) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const goToPreviousSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <header className="flex items-center justify-between border-b px-6 py-3 bg-white">
        <h1 className="text-2xl font-bold">スライドエディタ</h1>
        <Button onClick={toggleOrientation} variant="outline">
          {isVertical ? <LayoutTemplate className="h-4 w-4 mr-2" /> : <LayoutPanelTop className="h-4 w-4 mr-2" />}
          {isVertical ? '横型に変更' : '縦型に変更'}
        </Button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r bg-white flex flex-col">
          <div className="p-4">
            <Button onClick={addNewSlide} variant="default" className="w-full mb-4">
              <Plus className="h-4 w-4 mr-2" /> 新しいスライド
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4 pb-8">
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className={`${isVertical ? 'aspect-[3/4]' : 'aspect-video'} bg-white rounded-lg p-2 cursor-pointer border ${
                    currentSlide === slide.id ? 'ring-2 ring-primary' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setCurrentSlide(slide.id)}
                >
                  <div className="text-xs font-bold truncate">{slide.title}</div>
                  <div className="text-xs truncate mt-1">{slide.content}</div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>
        <main className="flex-1 p-6 flex flex-col items-center justify-center">
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
                updateSlideContent('title', e.currentTarget.textContent || '');
              }}
              style={{ minHeight: '1.5em', lineHeight: '1.5', padding: '0 2px' }}
            >
              {slides.find(slide => slide.id === currentSlide)?.title}
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
                updateSlideContent('content', e.currentTarget.textContent || '');
              }}
              style={{ padding: '2px' }}
            >
              {slides.find(slide => slide.id === currentSlide)?.content}
            </div>
          </div>
          <div className="flex items-center justify-center space-x-4 mt-4 bg-white rounded-full px-4 py-2 shadow">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={goToPreviousSlide}
              disabled={currentSlide === 1}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <span className="text-sm font-medium">
              スライド {currentSlide}/{slides.length}
            </span>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={goToNextSlide}
              disabled={currentSlide === slides.length}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}