"use client"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    q: "What is this platform?",
    a:
      "Our platform connects brands with Nigeria's top content creators across various niches. We provide opportunities for creators to showcase their talents while helping brands connect with authentic voices that shape the future of digital storytelling."
  },
  { q: "How do I join as a creator?", a: "Sign up, complete your profile, and start showcasing your work." },
  { q: "How do I join as a brand?", a: "Create a brand account to discover and connect with creators." },
  { q: "Is the platform free to use?", a: "Yes. Premium tools and placements are available for brands." },
  { q: "Can creators work with multiple brands?", a: "Absolutely—creators can collaborate with as many brands as they like." }
]

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0)

  const toggle = (idx: number) => {
    setOpenIndex(prev => (prev === idx ? -1 : idx))
  }

  return (
    <section aria-labelledby="faq-heading" className="w-full">
      <div className="w-full px-6 md:px-10">
        <div className="mx-auto max-w-[1100px] grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <div className="flex items-start">
            <h2 id="faq-heading" className="text-[24px] md:text-[32px] font-bold text-black tracking-tighter">
              Frequently Asked
              <br />
              Questions
            </h2>
          </div>

          <div role="list" className="w-full">
            <div className="divide-y divide-[#DFE2EB] border-y border-[#EFEFEF] rounded-[12px] bg-white">
              {faqs.map((item, idx) => {
                const isOpen = openIndex === idx
                const panelId = `faq-panel-${idx}`
                const buttonId = `faq-button-${idx}`
                return (
                  <article role="listitem" key={item.q} className="">
                    <div className="">
                      <button
                        id={buttonId}
                        aria-controls={panelId}
                        aria-expanded={isOpen}
                        onClick={() => toggle(idx)}
                        className="w-full flex items-center justify-between p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <span className="text-[14px] md:text-[16px] font-semibold text-black">{item.q}</span>
                        <ChevronDown
                          aria-hidden
                          className={`h-5 w-5 text-black transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                        />
                      </button>

                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        hidden={!isOpen}
                        className="px-4 pb-4"
                      >
                        <p className="text-[14px] leading-[22px] md:text-[16px] md:leading-[24px] text-text-color-200">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQSection