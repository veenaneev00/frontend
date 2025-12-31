import { useState } from 'react';
import '../assets/css/sections/faq.css';

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
      question: 'What is 3D product animation and how can it help my business?',
      answer:
        '3D product animation is a realistic visual representation of your product in motion. It helps explain features, highlight details that are hard to show in photos, and increases engagement, conversions, and brand perception—especially for ads, websites, and social media.',
    },
    {
      id: 2,
      question: 'What types of products do you specialize in?',
      answer:
        'We specialize in consumer products, electronics, cosmetics, packaging, FMCG items, industrial products, and luxury goods. If you have a physical or conceptual product, we can visualize it realistically—even before manufacturing.',
    },
    {
      id: 3,
      question: 'What do you need from me to get started?',
      answer:
        'To begin, we typically need: Product images, sketches, or CAD files, Dimensions or scale references, Brand guidelines (if available), A brief describing the goal, style, and platform usage. If you don’t have everything, we’ll guide you through the process.',
    },
    {
      id: 4,
      question: 'How realistic will the final render or animation be?',
      answer:
        'Our goal is photo-realism. We focus heavily on accurate materials, lighting, textures, and reflections so the final visuals look indistinguishable from real photography—often even better.',
    },
    {
      id: 5,
      question: 'How long does a 3D product animation or render take?',
      answer:
        'Timelines depend on complexity: Still renders: 2–5 days, Short animations (5–10 sec): 7–14 days, Advanced or luxury animations: 2–4 weeks. We always provide a clear timeline before starting.',
    },
    {
      id: 6,
      question: "Can you work with products that are not manufactured yet?",
      answer:
        "Yes. Many of our clients use 3D visuals before production for marketing, pitching, or pre-launch campaigns. As long as we have dimensions or references, we can create accurate visuals.",
    },
    {
      id: 7,
      question: 'How much do 3D product animation and rendering services cost?',
      answer:
        'We offer custom quotes to match your budget and project goals—without compromising quality.',
    },
    {
      id: 8,
      question: 'What revisions are included?',
      answer:
        'We include multiple revision rounds during key stages (modeling, lighting, animation). This ensures the final result aligns perfectly with your expectations before delivery.',
    },
    {
      id: 9,
      question: 'Where can I use the final 3D visuals?',
      answer:
        'You can use them across: Websites & landing pages, Social media ads, Amazon & eCommerce listings, Product launches & presentations, TV, YouTube, and paid campaigns. We deliver files optimized for your intended platforms.',
    },
    {
      id: 10,
      question: 'Why should I choose you over other 3D studios?',
      answer:
        "We combine high-end realism, strong visual storytelling, fast communication, and business-focused results. Our priority isn’t just making things look good—it’s helping your product sell.",
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