import styled from 'styled-components';
import { IconButton, Box } from '@mui/material';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';



const ImageSliderContainer = styled.div`
  position: relative;
  height: 250px;
`;

const ImageSliderImage = styled.img`
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageSliderButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

const ImageSlider = () => {
const imageSliderRef = useRef<HTMLDivElement>(null);

  const [scrollLeft, setScrollLeft] = useState(0);

  const scroll = (scrollOffset:number) => {
    if (imageSliderRef?.current) {
      imageSliderRef.current.scrollLeft += scrollOffset;
      setScrollLeft(imageSliderRef.current.scrollLeft);
    } 
  };

  return (
    <ImageSliderContainer>
      <ImageSliderButton onClick={() => scroll(-400)} disabled={scrollLeft === 0}>
        <ChevronLeft />
      </ImageSliderButton>
      <ImageSliderButton onClick={() => scroll(400)} disabled={scrollLeft === imageSliderRef.current?.scrollWidth - imageSliderRef.current?.clientWidth}>
        <ChevronRight />
      </ImageSliderButton>
      
          <Box sx={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none', '::-webkit-scrollbar': { display: 'none' } }}>
            <ImageSliderImage src="https://www.planetware.com/photos-large/THA/thailand-railay-beach.jpg" alt="image 1" />
            <ImageSliderImage src="https://www.planetware.com/wpimages/2019/10/thailand-top-attractions-waterfalls-erawan-national-park.jpg" alt="image 2" />
            <ImageSliderImage src="https://www.planetware.com/wpimages/2022/06/thailand-best-places-to-visit-koh-samui-beaches-swing-1.jpg" alt="image 3" />
            <ImageSliderImage src="https://www.planetware.com/photos-large/THA/thailand-koh-phi-phi.jpg" alt="image 4" />
          </Box>
        </ImageSliderContainer>
  );
};

export default ImageSlider;
