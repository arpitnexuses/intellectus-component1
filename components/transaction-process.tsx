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
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current)
      }
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current)
      }
    }
  }, [])

  // Ensure currentIndex is within bounds
  const maxIndex = isMobile ? transactionSteps.length - 1 : 4
  const safeCurrentIndex = Math.max(0, Math.min(currentIndex, maxIndex))

  // Debounced navigation to prevent rapid navigation
  const debouncedNavigation = (direction: 'next' | 'prev' | 'goto', index?: number) => {
    if (isNavigating) return
    
    setIsNavigating(true)
    
    // Clear existing timeout
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current)
    }
    
    if (direction === 'next') {
      setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1))
    } else if (direction === 'prev') {
      setCurrentIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1))
    } else if (direction === 'goto' && index !== undefined) {
      setCurrentIndex(index)
    }
    
    // Reset navigation lock after animation completes
    navigationTimeoutRef.current = setTimeout(() => {
      setIsNavigating(false)
    }, 400) // Slightly longer than transition duration
  }

  const nextSlide = () => {
    debouncedNavigation('next')
  }

  const prevSlide = () => {
    debouncedNavigation('prev')
  }

  const goToSlide = (index: number) => {
    debouncedNavigation('goto', index)
  }

  // Swipe detection functions
  const minSwipeDistance = 80 // Increased threshold to prevent accidental swipes
  const maxVerticalDistance = 100 // Prevent vertical swipes from triggering navigation

  const onTouchStart = (e: React.TouchEvent) => {
    if (isNavigating) return
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    if (isNavigating) return
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (isNavigating || !touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  // Trackpad scroll detection
  const [wheelDelta, setWheelDelta] = useState(0)
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const onWheel = (e: React.WheelEvent) => {
    if (isNavigating) return
    
    e.preventDefault()
    
    // Clear existing timeout
    if (wheelTimeoutRef.current) {
      clearTimeout(wheelTimeoutRef.current)
    }
    
    // Accumulate wheel delta
    const newDelta = wheelDelta + e.deltaX
    setWheelDelta(newDelta)
    
    // Check if we've reached the threshold (increased for better control)
    if (Math.abs(newDelta) > 150) {
      if (newDelta > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
      setWheelDelta(0)
    }
    
    // Reset delta after a longer delay to prevent rapid scrolling
    wheelTimeoutRef.current = setTimeout(() => {
      setWheelDelta(0)
    }, 300)
  }

  // Mouse drag detection for trackpad (improved)
  const [mouseStart, setMouseStart] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const onMouseDown = (e: React.MouseEvent) => {
    if (isNavigating) return
    // Only start drag on left mouse button
    if (e.button === 0) {
      setIsDragging(true)
      setMouseStart(e.clientX)
    }
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || mouseStart === null || isNavigating) return
    
    const currentX = e.clientX
    const distance = mouseStart - currentX
    
    // Trigger navigation when threshold is reached (increased threshold)
    if (Math.abs(distance) > 100) {
      if (distance > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
      setIsDragging(false)
      setMouseStart(null)
    }
  }

  const onMouseUp = () => {
    setIsDragging(false)
    setMouseStart(null)
  }

  const onMouseLeave = () => {
    setIsDragging(false)
    setMouseStart(null)
  }

  return (
    <section className="py-12 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-semibold text-gray-900 mb-4" style={{ fontFamily: 'Inter, sans-serif', fontSize: '35.84px' }}>Our Transaction Process</h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto" style={{ fontFamily: 'Inter, sans-serif', fontSize: '18px', fontWeight: 'normal', lineHeight: '1.6' }}>
            Our process guides you from assessment to completion with precision, ensuring a seamless<br />
            transaction and minimal business disruption.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="w-full max-w-xs mx-auto px-1 md:max-w-6xl md:px-0 md:pl-0">
          <div
              ref={containerRef}
              className="flex gap-2 md:gap-6 transition-transform duration-300 ease-in-out md:pl-0 md:-ml-0 select-none"
            style={{
                transform: `translateX(-${safeCurrentIndex * (isMobile ? 100 : 280)}${isMobile ? '%' : 'px'})`,
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onWheel={onWheel}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
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
