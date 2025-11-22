import { useState } from 'react';
import '../../assets/css/sections/faq.css';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  links?: { text: string; url: string }[];
}

const FAQ = () => {
  const [openId, setOpenId] = useState<number | null>(1);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: 'What types of products can you animate or render?',
      answer:
        'We can create photorealistic 3D animations and renders for almost any product — from beauty and skincare to electronics, furniture, and luxury goods. If it exists (or is planned), we can bring it to life.',
    },
    {
      id: 2,
      question: 'How long does a typical 3D animation take?',
      answer:
        'Timelines vary depending on complexity, but a standard 15–20 second animation usually takes 7–14 working days after final concept approval.',
    },
    {
      id: 3,
      question: 'Do you work with existing CAD files or need product samples?',
      answer:
        'We can work with both. If you have CAD or 3D models, we can import and refine them. If not, we can create models from physical product samples or detailed reference images.',
    },
    {
      id: 4,
      question: 'How do you price your services?',
      answer:
        'Pricing is based on animation length, complexity, number of renders, and modeling requirements. You can view our detailed pricing on our pricing page.',
      links: [{ text: 'pricing page', url: '#pricing' }],
    },
    {
      id: 5,
      question: 'Can we request changes after delivery?',
      answer:
        'Yes. All revisions are covered under our revision policy, which ensures smooth updates without unexpected scope creep.',
      links: [{ text: 'revision policy', url: '/revision-policy' }],
    },
    {
      id: 6,
      question: "Will the renders match our brand's visual style?",
      answer:
        "Absolutely. We customize lighting, materials, camera angles, and animation pacing to fit your brand's identity and marketing needs.",
    },
    {
      id: 7,
      question: 'What formats do you deliver in?',
      answer:
        'We typically deliver in MP4 (H.264) for videos and high-resolution PNG/JPG for stills. Other formats like MOV, ProRes, or transparent-background renders are available on request.',
    },
    {
      id: 8,
      question: 'Can you handle large-scale projects or bulk renders?',
      answer:
        'Yes, we regularly work on bulk orders for 10+ animations or 50+ renders. We optimize workflows to maintain quality and meet tight deadlines.',
    },
    {
      id: 9,
      question: 'Do you offer creative direction or only technical execution?',
      answer:
        'We do both. Our team can develop creative concepts, storyboards, and camera moves, or simply execute your pre-approved vision.',
    },
    {
      id: 10,
      question: 'How do we get started?',
      answer:
        "Simply contact us with your project details, references, and timeline. We'll provide a proposal and next steps.",
      links: [{ text: 'contact us', url: '#contact' }],
    },
  ];

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const renderAnswer = (faq: FAQItem) => {
    if (!faq.links || faq.links.length === 0) {
      return <p className="faq-answer-text">{faq.answer}</p>;
    }

    const linkTexts = faq.links.map(l => l.text).join('|');
    const regex = new RegExp(`(${linkTexts})`, 'g');
    const parts = faq.answer.split(regex);
    
    return (
      <p className="faq-answer-text">
        {parts.map((part, index) => {
          const link = faq.links?.find((l) => l.text === part);
          if (link) {
            return (
              <a key={index} href={link.url} className="faq-link">
                {link.text}
              </a>
            );
          }
          return <span key={index}>{part}</span>;
        })}
      </p>
    );
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Answers to common questions we get from brands about 3D animation and rendering for products.
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`faq-item ${openId === faq.id ? 'faq-item-open' : ''}`}
            >
              <button className="faq-question" onClick={() => toggleFAQ(faq.id)}>
                <span className="faq-number">{faq.id}.</span>
                <span className="faq-question-text">{faq.question}</span>
                <svg
                  className="faq-icon"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M19 9l-7 7-7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="faq-answer">{renderAnswer(faq)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;