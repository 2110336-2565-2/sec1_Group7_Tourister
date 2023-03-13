import { useState ,FC, SetStateAction} from 'react';
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { AttractionInterface } from "@/interfaces/AttractionInterface";
import Carousel from "react-material-ui-carousel";
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { COLOR } from '@/theme/globalTheme';


const StyledCarousel = styled(Carousel)(({ theme }) => ({
    '& .image': {
      height: 310,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
    },
    '& img': {
      maxHeight: '100%',
      maxWidth: '100%',
    },
  }));

interface IImageSliderProbs {
    dayTrips: { date: string; attractions: AttractionInterface[] }[];
  }
  
  
  const ImageSlider: FC<IImageSliderProbs> = ({dayTrips}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const allImages: string[] = [];

  dayTrips.forEach((dayTrip) => {
    dayTrip.attractions.forEach((attraction:any) => {
      allImages.push(attraction.file);
    });
  });


  return (
    <>
    <StyledCarousel
      animation="slide"
      autoPlay={true}
      indicators={true}
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}
      NextIcon={<ChevronRight/>}
      PrevIcon={<ChevronLeft/>}
      >
      {allImages.map((image, index) => (
        <div key={index}  className = 'image'>
          <img
            src={`data:image/jpeg;base64,${image}`}
            alt={`Image ${index}`}
          />
        </div>
      ))}
    </StyledCarousel>
    </>
  );
}

export default ImageSlider;
