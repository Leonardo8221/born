import React, { useState, useEffect, useRef, FC } from 'react';
import clsx from 'clsx';
import styles from '@/components/molecules/CollectionCard/CollectionCard.module.css';
import { arrowIcon } from '../CollectionCard';

interface CarouselProps {
  children: any;
}

const Carousel: FC<CarouselProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef<any>(null);

  const itemsCount = React.Children.count(children);

  const handlePrev = () => {
    setActiveIndex(activeIndex === 0 ? itemsCount - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex(activeIndex === itemsCount - 1 ? 0 : activeIndex + 1);
  };

  useEffect(() => {
    if (contentRef?.current) {
      setContentWidth(contentRef?.current?.offsetWidth);
    }
  }, []);

  return (
    <div className="carousel relative">
      <div
        className="flex"
        style={{
          transform: `translateX(-${
            ((activeIndex * (contentWidth / itemsCount)))
          }px)`,
          transition: 'transform 0.3s ease',
        }}
        ref={contentRef}
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className={`relative carousel__item ${
              index === activeIndex ? 'active' : ''
            }`}
            style={{
              width: `calc(${100 / (React.Children.count(children) / 2)}%)`,
            }}
          >
            {child}
            {activeIndex === index - 1 && itemsCount - 1 > activeIndex && (
              <div className="absolute w-[calc(100%-40px)] left-5 h-[calc(100%-40px)] z-[4] top-0 bottom-0 my-auto">
                <div
                  className={clsx(
                    'flex h-full w-full left-0 full z-[2] absolute top-0 items-center justify-center',
                    styles.overlay
                  )}
                >
                  <div
                    className={clsx(
                      'cursor-pointer hover:bg-shades-black h-10 w-10 rounded-[100px] border border-neutral-100 text-neutral-100 border-neutral-100 flex items-center justify-center ml-[150px]',
                      styles.arrowButton
                    )}
                    onClick={handleNext}
                  >
                    {arrowIcon}
                  </div>
                </div>
              </div>
            )}
            {activeIndex !== 0 && index + 1 === activeIndex && (
              <div className="absolute w-[calc(100%-40px)] right-5 h-[calc(100%-40px)] z-[4] top-0 bottom-0 my-auto">
                <div
                  className={clsx(
                    'h-full w-full z-[2] absolute top-0 right-0',
                    styles.overlay
                  )}
                ></div>
                <div
                  className={clsx(
                    'cursor-pointer hover:bg-shades-black  h-10 w-10 rounded-[100px] border border-neutral-100 !rotate-180 text-neutral-100 z-[5] absolute right-[60px] top-0 bottom-0 my-auto border-neutral-100 flex items-center justify-center',
                    styles.arrowButton
                  )}
                  onClick={handlePrev}
                >
                  {arrowIcon}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
