"use client"

// React
import { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";;
// import required modules
import { Pagination } from 'swiper/modules'
// Hooks
import useAppContext from "@/app/hooks/useAppContext";
// Lang
import locales from "@/app/langs/components/home/reviews";
// Reviews Mock Data
import REVIEWS from "@/mockData/Reviews";

export default function ReviewsSection() {

    const { lang } = useAppContext();

    return (
        <section className={`border-zinc-300 py-28 overflow-hidden border-t`} id="client-comments">
            <div className={"flex flex-col gap-20 px-6 sm:px-10"}>
                <div className="flex flex-col gap-5 items-center">
                    <span
                        className={`uppercase font-bold text-neutral-600`}
                    >{locales[lang].subtitle}</span>
                    <h2
                        className={`text-center text-3xl sm:text-5xl font-bold`}
                    >{locales[lang].title}</h2>
                    <div className={`flex flex-col items-center gap-2 border-t pt-5 border-neutral-300`}>
                        <div>{locales[lang].averageRating}</div>
                        <div className={"flex items-center gap-1"}>
                            <i className={"fa-solid fa-star text-primary"}></i>
                            <i className={"fa-solid fa-star text-primary"}></i>
                            <i className={"fa-solid fa-star text-primary"}></i>
                            <i className={"fa-solid fa-star text-primary"}></i>
                            <i className={"fa-solid fa-star text-primary"}></i>
                        </div>
                    </div>
                </div>
                <div className={"reviews"}>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={20}
                        breakpoints={{
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            1024: {
                                slidesPerView: 2.5,
                                spaceBetween: 20
                            }
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[Pagination]}
                        // className={`process-swiper ${darkMode ? "bullet-darkmode" : "bullet-lightmode"}`}
                        className={`process-swiper bullet-lightmode`}
                    >
                        <div className={"h-full"}>
                            {REVIEWS[lang].map((review, index) => (
                                <SwiperSlide key={index} className={"cursor-move"}>
                                    <ReviewCard
                                        title={review?.title}
                                        description={review?.description}
                                        name={review?.name}
                                        gender={review?.gender}
                                    />
                                </SwiperSlide>
                            ))}
                        </div>
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

function ReviewCard({ title, description, name, gender }) {

    return (
        <div className={`flex flex-col gap-4 justify-center border shadow-sm w-full h-full px-10 py-8 rounded-lg`}>
            <div className={"flex flex-col h-full gap-6"}>
                <div className={"flex flex-col gap-1"}>
                    <div className={`font-bold`}>{name}</div>
                    <Stars stars={5} classes={"text-sm"} />
                </div>
                <div className={"flex flex-col gap-2"}>
                    <div className={"text-lg font-semibold"}>{title}</div>
                    <div className={`text-neutral-900 text-[0.93rem] font-medium`}>{description}</div>
                </div>
                {/* <div className={"flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-0"}>
                    <div className={"flex items-center gap-4"}>
                        <div className={`grid place-content-center w-16 h-16 bg-neutral-200 rounded-full text-zinc-500`}>
                            {gender == 'male' ? (
                                <i className="fa-solid fa-user-hair text-3xl text-primary"></i>
                            ) : (
                                <i className="fa-solid fa-user-hair-long text-3xl text-primary"></i>
                            )}
                        </div>
                        <div className={`font-light text-lg text-neutral-700`}>{name}</div>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

function Stars({ stars, classes }) {

    const [remainingStars] = useState(5 - stars);

    return (
        <div className={`flex items-center gap-[2px] ${classes}`}>
            {Array.from(Array(stars), (star, index) => (
                <i key={index} className={"fa-solid fa-star text-primary"}></i>
            ))}
            {remainingStars ? (
                Array.from(Array(remainingStars), (star, index) => (
                    <i key={index} className={`fa-solid fa-star text-neutral-300`}></i>
                ))
            ) : null}
        </div>
    )
}