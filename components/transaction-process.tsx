"use client"

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
  return (
    <section className="py-12 px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Transaction Process</h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Our process guides you from assessment to completion with precision, ensuring a seamless transaction and
            minimal business disruption.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex gap-4 will-change-transform"
            style={{
              animation: "smoothScroll 12s linear infinite",
              transform: "translateZ(0)",
            }}
          >
            {/* Render cards twice for seamless loop */}
            {[...transactionSteps, ...transactionSteps].map((step, index) => {
              return (
                <div
                  key={`${step.id}-${index}`}
                  className="rounded-xl p-5 shadow-lg flex-shrink-0 w-64 h-48 flex flex-col items-center justify-between text-center cursor-pointer hover:opacity-90 transition-opacity"
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
        </div>
      </div>

      <style jsx>{`
        @keyframes smoothScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        /* Optimized hardware acceleration */
        .flex {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </section>
  )
}
