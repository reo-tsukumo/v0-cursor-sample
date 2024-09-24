import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addSlide, updateSlide, setCurrentSlide, toggleOrientation } from '@/features/slide-editor/slice';

export const useSlideManagement = () => {
  const dispatch = useDispatch();
  const { slides, currentSlideId, isVertical } = useSelector((state: RootState) => state.slideEditor);

  const currentSlide = slides.find(slide => slide.id === currentSlideId);

  const addNewSlide = () => dispatch(addSlide());
  const updateSlideContent = (id: number, field: 'title' | 'content', value: string) => 
    dispatch(updateSlide({ id, field, value }));
  const changeCurrentSlide = (id: number) => dispatch(setCurrentSlide(id));
  const toggleSlideOrientation = () => dispatch(toggleOrientation());

  return {
    slides,
    currentSlide,
    isVertical,
    addNewSlide,
    updateSlideContent,
    changeCurrentSlide,
    toggleSlideOrientation,
  };
};