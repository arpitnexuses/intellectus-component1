"use client"

import { useState, useRef } from "react"
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
  const containerRef = useRef<HTMLDivElement>(null)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % transactionSteps.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + transactionSteps.length) % transactionSteps.length)
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
          <div className="w-full max-w-5xl mx-auto">
            <div
              ref={containerRef}
              className="flex gap-6 transition-transform duration-300 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (320 + 24)}px)`,
              }}
            >
            {transactionSteps.map((step, index) => {
              return (
                <div
                  key={step.id}
                  className="rounded-xl p-6 shadow-lg flex-shrink-0 w-80 h-56 flex flex-col items-center justify-between text-center cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: "#03293C", color: "#ffffff" }}
                  onClick={() => window.open('https://intellectuscapital.com.au/capabilities-2/', '_blank')}
                >
                  <div className="flex flex-col items-center">
                    <div className="mb-2">
                        <Image
                        src={step.iconSrc}
                          alt={`${step.title} icon`}
                          width={48}
                          height={48}
                          className="w-12 h-12 opacity-70"
                        />
                    </div>
                    <h3 className="text-base font-semibold mb-1" style={{ color: "#ffffff" }}>
                      {step.title}
                    </h3>
                  </div>
                  <p
                    className="text-sm leading-relaxed flex-1 flex items-center justify-center px-1"
                    style={{ color: "#e2e8f0" }}
                  >
                    {step.description}
                  </p>
                </div>
              )
            })}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 z-10"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-6 space-x-3">
          {Array.from({ length: 4 }, (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-gray-800 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
