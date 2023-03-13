import styled from 'styled-components';
import { IconButton, Box } from '@mui/material';
import { useRef, useState, useEffect, FC } from 'react';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { AttractionInterface } from "@/interfaces/AttractionInterface";


interface IImageSliderProbs {
  dayTrips: { date: string; attractions: AttractionInterface[] }[];
}


const ImageSliderContainer = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden; /* Hide overflowing images */
`;
const ImageSliderImage = styled.img<{ aspectRatio: number }>`
  flex-shrink: 0;
  width: 100%;
  object-fit: cover;
  ${({ aspectRatio }) =>
    aspectRatio < 1 /* Image is narrower than container */
      ? `
      width: 100%;
      height: auto;
      margin-left: 50%;
      transform: translateX(-50%);
      background-color: rgba(0, 0, 0, 0.5);
      `
      : `
      width: auto;
      min-width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
    `}
`;

const ImageSliderButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;


const ImageSlider: FC<IImageSliderProbs> = ({dayTrips }) => {
    const imageSliderRef = useRef<HTMLDivElement>(null);
    const [scrollLeft, setScrollLeft] = useState(0);
  
    useEffect(() => {
        const handleResize = () => {
          if (imageSliderRef.current) {
            const images = imageSliderRef.current.querySelectorAll('img');
            images.forEach((img) => {
              const { naturalWidth, naturalHeight } = img;
              const aspectRatio = naturalWidth / naturalHeight;
              img.setAttribute('aspectRatio', aspectRatio.toString());
            });
          }
        };
      
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, []);
      

    const scroll = (scrollOffset: number) => {
        if (imageSliderRef?.current) {
          imageSliderRef.current.scrollLeft += scrollOffset;
          setScrollLeft(imageSliderRef.current.scrollLeft);
        }
      };
      
  return (
    <ImageSliderContainer ref={imageSliderRef}>
      <ImageSliderButton onClick={() => scroll(-400)} disabled={scrollLeft === 0}>
        <ChevronLeft />
      </ImageSliderButton>
      <ImageSliderButton onClick={() => scroll(400)} disabled={scrollLeft === imageSliderRef.current?.scrollWidth - imageSliderRef.current?.clientWidth}>
        <ChevronRight />
      </ImageSliderButton>
      
      <Box sx={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none', '::-webkit-scrollbar': { display: 'none' } }}>
        <ImageSliderImage src="https://www.planetware.com/photos-large/THA/thailand-railay-beach.jpg" aspectRatio={1.5}/>
        <ImageSliderImage src="https://www.planetware.com/wpimages/2019/10/thailand-top-attractions-waterfalls-erawan-national-park.jpg" aspectRatio={1.5} />
        <ImageSliderImage src="https://www.planetware.com/wpimages/2022/06/thailand-best-places-to-visit-koh-samui-beaches-swing-1.jpg" aspectRatio={1.5} />
        <ImageSliderImage src="https://www.planetware.com/photos-large/THA/thailand-koh-phi-phi.jpg" aspectRatio={1.5} />
      </Box>
    </ImageSliderContainer>
  );
};

export default ImageSlider;
