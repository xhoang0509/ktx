import { RoomDetail } from "../types";
import Slider from "react-slick";
import { useRef, useState } from "react";
import "./RoomImages.css";

interface RoomImagesProps {
    images: RoomDetail["images"];
}

export default function RoomImages({ images }: RoomImagesProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const mainSliderRef = useRef<Slider | null>(null);
    const thumbnailSliderRef = useRef<Slider | null>(null);

    // Custom navigation arrow components
    const PrevArrow = (props: any) => {
        const { className, onClick } = props;
        return (
            <button
                className={`${className} custom-prev-arrow`}
                onClick={onClick}
                aria-label="Previous slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                </svg>
            </button>
        );
    };

    const NextArrow = (props: any) => {
        const { className, onClick } = props;
        return (
            <button
                className={`${className} custom-next-arrow`}
                onClick={onClick}
                aria-label="Next slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                </svg>
            </button>
        );
    };

    // Settings for the main slider
    const mainSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        beforeChange: (_: number, next: number) => {
            setCurrentSlide(next);
            if (thumbnailSliderRef.current) {
                thumbnailSliderRef.current.slickGoTo(next);
            }
        },
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true
                }
            }
        ]
    };

    // Settings for the thumbnail slider
    const thumbnailSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: images.length > 4 ? 4 : images.length,
        slidesToScroll: 1,
        arrows: false,
        focusOnSelect: true,
        centerMode: images.length > 4,
        centerPadding: '60px',
        swipeToSlide: true,
        beforeChange: (_: number, next: number) => {
            setCurrentSlide(next);
            if (mainSliderRef.current) {
                mainSliderRef.current.slickGoTo(next);
            }
        },
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: images.length > 3 ? 3 : images.length,
                    centerPadding: '40px',
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: images.length > 2 ? 2 : images.length,
                    centerPadding: '30px',
                }
            }
        ]
    };

    if (images.length === 0) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Hình ảnh phòng</h2>
                <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
                    <p className="text-gray-500">Không có hình ảnh</p>
                </div>
            </div>
        );
    }

    // Single image display
    if (images.length === 1) {
        return (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Hình ảnh phòng</h2>
                <div className="overflow-hidden rounded-lg">
                    <img
                        src={images[0]}
                        alt="Room image"
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Hình ảnh phòng</h2>
            
            {/* Main carousel */}
            <div className="mb-4">
                <Slider 
                    ref={mainSliderRef}
                    {...mainSettings} 
                    className="room-slider"
                >
                    {images.map((image, index) => (
                        <div key={index} className="outline-none">
                            <div className="aspect-[16/9] overflow-hidden rounded-lg">
                                <img
                                    src={image}
                                    alt={`Room image ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            
            {/* Thumbnail navigation */}
            {images.length > 1 && (
                <div className="mt-2">
                    <Slider 
                        ref={thumbnailSliderRef}
                        {...thumbnailSettings} 
                        className="thumbnail-slider"
                    >
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer p-1 outline-none ${
                                    currentSlide === index ? "opacity-100" : "opacity-50"
                                }`}
                                onClick={() => {
                                    if (mainSliderRef.current) {
                                        mainSliderRef.current.slickGoTo(index);
                                    }
                                }}
                            >
                                <div className="aspect-[4/3] overflow-hidden rounded-md">
                                    <img
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            )}
            
            {/* Image counter */}
            <div className="mt-2 text-right text-sm text-gray-500">
                {currentSlide + 1} / {images.length}
            </div>
        </div>
    );
}
