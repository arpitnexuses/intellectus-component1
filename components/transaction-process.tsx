"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

const transactionSteps = [
  {
    id: 1,
    title: "Engagement",
    description: "Understand goals, set roadmap, align stakeholders.",
    iconSrc: "/1.png",
  },
  {
    id: 2,
    title: "Preparation",
    description: "Review operations, prepare materials, secure data.",
    iconSrc: "/2.png",
  },
  {
    id: 3,
    title: "Outreach",
    description: "Target investors, share materials, drive interest.",
    iconSrc: "/3.png",
  },
  {
    id: 4,
    title: "Diligence",
    description: "Manage reviews, address queries, ensure compliance.",
    iconSrc: "/4.png",
  },
  {
    id: 5,
    title: "Negotiation",
    description:
      "Safeguard interests through balanced, clear agreements.",
    iconSrc: "/5.png",
  },
  {
    id: 6,
    title: "Completion",
    description:
      "Ensure seamless close with smooth coordination.",
    iconSrc: "/6.png",
  },
]

export default function TransactionProcess() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Ensure currentIndex is within bounds
  const maxIndex = isMobile ? transactionSteps.length - 1 : 4
  const safeCurrentIndex = Math.max(0, Math.min(currentIndex, maxIndex))

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1))
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section className="py-12 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-medium text-gray-900 mb-4">Our Transaction Process</h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Our process guides you from assessment to completion with precision, ensuring a seamless transaction and
            minimal business disruption.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="w-full max-w-xs mx-auto px-1 md:max-w-6xl md:px-0 md:pl-0">
            <div
              ref={containerRef}
              className="flex gap-2 md:gap-6 transition-transform duration-300 ease-in-out md:pl-0 md:-ml-0"
              style={{
                transform: `translateX(-${safeCurrentIndex * (isMobile ? 100 : 280)}${isMobile ? '%' : 'px'})`,
              }}
            >
            {transactionSteps.map((step, index) => {
              return (
                <div
                  key={step.id}
                  className="rounded-xl p-3 md:p-6 shadow-lg flex-shrink-0 w-[calc(100%-0.5rem)] h-52 md:w-80 md:h-60 flex flex-col items-center justify-between text-center cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#03293C", color: "#ffffff" }}
                  onClick={() => window.open('https://intellectuscapital.com.au/capabilities-2/', '_blank')}
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-3 md:mb-4">
                        <Image
                        src={step.iconSrc}
                          alt={`${step.title} icon`}
                          width={80}
                          height={80}
                          className="w-16 h-16 md:w-20 md:h-20 opacity-70"
                        />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3" style={{ color: "#ffffff" }}>
                      {step.title}
                    </h3>
                  </div>
                  <p
                    className="text-sm md:text-base leading-relaxed flex-1 flex items-center justify-center px-2 md:px-3"
                    style={{ color: "#e2e8f0" }}
                  >
                    {step.description}
                  </p>
                </div>
              )
            })}
            </div>
          </div>
        </div>

        {/* Navigation Controls - Below First Card */}
        <div className="flex justify-start items-center mt-8 ml-0 space-x-4">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="hover:opacity-80 transition-opacity duration-200"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="leftArrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#007bff" />
                  <stop offset="50%" stopColor="#00bcd4" />
                  <stop offset="100%" stopColor="#00aaff" />
                </linearGradient>
              </defs>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" fill="url(#leftArrowGradient)" />
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="flex space-x-2">
            {/* Mobile: Show all 6 dots (one card at a time) */}
            <div className="flex space-x-2 md:hidden">
              {Array.from({ length: transactionSteps.length }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-200 ${
                    index === safeCurrentIndex 
                      ? 'w-6 h-2 bg-gray-800 rounded-sm' 
                      : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Desktop: Show 5 dots (3.5 cards view) - UNCHANGED */}
            <div className="hidden md:flex space-x-2">
              {Array.from({ length: 5 }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-200 ${
                    index === safeCurrentIndex 
                      ? 'w-6 h-2 bg-gray-800 rounded-sm' 
                      : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="hover:opacity-80 transition-opacity duration-200"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
              <defs>
                <linearGradient id="rightArrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#007bff" />
                  <stop offset="50%" stopColor="#00bcd4" />
                  <stop offset="100%" stopColor="#00aaff" />
                </linearGradient>
              </defs>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" fill="url(#rightArrowGradient)" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
