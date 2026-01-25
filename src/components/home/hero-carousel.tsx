import { useEffect, useState } from 'react';
import useEmblaCarousel, { type UseEmblaCarouselType } from 'embla-carousel-react';
import ClassNames from 'embla-carousel-class-names';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import "./home-carousel.css"
import PlayerCard from '../player-card';
import type { PlayerData } from '@/types/player';

type EmblaCarouselType = NonNullable<UseEmblaCarouselType[1]>;

function HeroCarousel({ playerData }: { playerData: PlayerData[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: 'center',
            skipSnaps: false,
            duration: 25,
        },
        [ClassNames({ snapped: 'is-snapped', inView: 'is-in-view' })]
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const goToPrev = () => emblaApi?.scrollPrev();
    const goToNext = () => emblaApi?.scrollNext();
    const goToIndex = (index: number) => emblaApi?.scrollTo(index)

    const setupSnaps = (emblaApi: EmblaCarouselType) => setScrollSnaps(emblaApi?.scrollSnapList());
    const setActiveSnaps = (emblaApi: EmblaCarouselType) => setSelectedIndex(emblaApi.selectedScrollSnap());


    useEffect(() => {
        if (!emblaApi) return;

        setupSnaps(emblaApi)
        setActiveSnaps(emblaApi)

        emblaApi.on('reInit', setupSnaps)
        emblaApi.on('reInit', setActiveSnaps)
        emblaApi.on('select', setActiveSnaps)
    }, [emblaApi]);

    return (
        <div>

            <div className='hero-carousel'>
                <button
                    onClick={goToPrev}
                    className="hero-carousel__arrow hero-carousel__arrow--prev"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={20} strokeWidth={1.5} />
                </button>

                <div className="hero-carousel__viewport">
                    <div className='embla' ref={emblaRef}>
                        <div className="embla__container">
                            {playerData.map((player) => (
                                <div key={player.id} className="embla__slide">
                                    <div className="embla__slide-inner">
                                        <PlayerCard playerData={player} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <button
                    onClick={goToNext}
                    className="hero-carousel__arrow hero-carousel__arrow--next"
                    aria-label="Next slide"
                >
                    <ChevronRight size={20} strokeWidth={1.5} />
                </button>

                <div className="hero-carousel__pagination">
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToIndex(index)}
                            className={`hero-carousel__pagination-dot ${index === selectedIndex ? 'hero-carousel__pagination-dot--active' : ''}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HeroCarousel