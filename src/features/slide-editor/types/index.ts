export interface Slide {
    id: number;
    title: string;
    content: string;
  }
  
  export interface SlideEditorState {
    slides: Slide[];
    currentSlideId: number;
    isVertical: boolean;
  }