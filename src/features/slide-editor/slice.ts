import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SlideEditorState, Slide } from '@/features/slide-editor/types';

const initialState: SlideEditorState = {
  slides: [{ id: 1, title: 'ようこそ', content: '最初のスライドを編集してください' }],
  currentSlideId: 1,
  isVertical: false,
};

const slideEditorSlice = createSlice({
  name: 'slideEditor',
  initialState,
  reducers: {
    addSlide: (state) => {
      const newSlide: Slide = {
        id: state.slides.length + 1,
        title: `スライド ${state.slides.length + 1}`,
        content: 'ここにコンテンツを追加',
      };
      state.slides.push(newSlide);
    },
    updateSlide: (state, action: PayloadAction<{ id: number; field: 'title' | 'content'; value: string }>) => {
      const { id, field, value } = action.payload;
      const slide = state.slides.find(s => s.id === id);
      if (slide) {
        slide[field] = value;
      }
    },
    setCurrentSlide: (state, action: PayloadAction<number>) => {
      state.currentSlideId = action.payload;
    },
    toggleOrientation: (state) => {
      state.isVertical = !state.isVertical;
    },
  },
});

export const { addSlide, updateSlide, setCurrentSlide, toggleOrientation } = slideEditorSlice.actions;
export default slideEditorSlice.reducer;