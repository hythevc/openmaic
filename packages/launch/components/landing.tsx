'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  MessageCircle,
  Play,
  Sparkles,
} from 'lucide-react';
import { Brand } from './ui';
import { EarlyAccessForm } from './early-access-form';
import './landing.css';

const chapters = [
  {
    label: 'The idea',
    heading: (
      <>
        Small habits.
        <br />
        Lasting change.
      </>
    ),
    root: ['A small', 'habit'],
    branches: [
      ['Builds', 'momentum'],
      ['Fits into', 'your life'],
      ['Leads to', 'bigger change'],
    ],
    question: 'What makes a habit stick?',
    reply: 'Let’s break it down together.',
  },
  {
    label: 'How habits form',
    heading: (
      <>
        A simple loop.
        <br />A useful starting point.
      </>
    ),
    root: ['A daily', 'cue'],
    branches: [
      ['Notice', 'the moment'],
      ['Take one', 'small action'],
      ['Enjoy a', 'small reward'],
    ],
    question: 'What could be your daily cue?',
    reply: 'Think of something you already do.',
  },
  {
    label: 'Make it work',
    heading: (
      <>
        Start smaller.
        <br />
        Make it easier.
      </>
    ),
    root: ['Your next', 'step'],
    branches: [
      ['Choose one', 'tiny action'],
      ['Attach it to', 'a routine'],
      ['Make it', 'easy to repeat'],
    ],
    question: 'Where would your habit fit?',
    reply: 'Build a plan around your real day.',
  },
  {
    label: 'Practice',
    heading: (
      <>
        Your turn.
        <br />
        Make a little progress.
      </>
    ),
    root: ['A habit', 'to try'],
    branches: [
      ['After my', 'morning coffee'],
      ['I will read', 'one page'],
      ['Then mark', 'a small win'],
    ],
    question: 'Ready to try it for yourself?',
    reply: 'Open the lesson and put it into practice.',
  },
];

function HabitDiagram({ chapter }: { chapter: (typeof chapters)[number] }) {
  return (
    <svg
      className="landing-habit-diagram"
      viewBox="0 0 500 195"
      role="img"
      aria-label={`${chapter.root.join(' ')}: ${chapter.branches.map((branch) => branch.join(' ')).join(', ')}`}
    >
      <path
        d="M70 103H130C206 103 186 28 280 28H320M70 103H320M70 103H130C206 103 186 178 280 178H320"
        fill="none"
        stroke="#b5df32"
        strokeWidth="3"
      />
      <circle cx="70" cy="103" r="19" fill="#244c38" />
      {[28, 103, 178].map((y) => (
        <circle key={y} cx="320" cy={y} r="15" fill="#c4e93d" />
      ))}
      <text x="70" y="148" textAnchor="middle" fill="#17231d" fontSize="20">
        <tspan x="70">{chapter.root[0]}</tspan>
        <tspan x="70" dy="23">
          {chapter.root[1]}
        </tspan>
      </text>
      {chapter.branches.map((branch, i) => (
        <text key={branch[0]} x="350" y={[22, 97, 172][i]} fill="#17231d" fontSize="20">
          <tspan x="350">{branch[0]}</tspan>
          <tspan x="350" dy="23">
            {branch[1]}
          </tspan>
        </text>
      ))}
    </svg>
  );
}

function LessonPreview() {
  const [active, setActive] = useState(0);
  const chapter = chapters[active];

  return (
    <section className="landing-preview" aria-label="Interactive lesson preview">
      <div className="landing-preview-top">
        <span>Your learning space</span>
        <span className="landing-window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className="landing-preview-body">
        <nav className="landing-preview-chapters" aria-label="Preview chapters">
          {chapters.map((item, index) => (
            <button
              key={item.label}
              type="button"
              className={active === index ? 'is-active' : ''}
              aria-current={active === index ? 'step' : undefined}
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="landing-lesson-canvas" aria-live="polite" aria-atomic="true">
          <h2>{chapter.heading}</h2>
          <HabitDiagram chapter={chapter} />
          <div className="landing-tutor-note">
            <MessageCircle size={31} strokeWidth={1.7} aria-hidden="true" />
            <div>
              <strong>{chapter.question}</strong>
              <p>{chapter.reply}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="landing-preview-bottom">
        <span className="landing-preview-count">0{active + 1} / 04</span>
        <div>
          <button
            type="button"
            onClick={() => setActive((value) => Math.max(0, value - 1))}
            disabled={active === 0}
            aria-label="Previous preview chapter"
          >
            <ArrowLeft size={25} aria-hidden="true" />
          </button>
          {active < chapters.length - 1 ? (
            <button
              className="landing-preview-next"
              type="button"
              onClick={() => setActive((value) => value + 1)}
              aria-label="Next preview chapter"
            >
              <ArrowRight size={25} aria-hidden="true" />
            </button>
          ) : (
            <Link
              className="landing-preview-next"
              href="/learn/habits"
              aria-label="Open the habits lesson"
            >
              <ArrowRight size={25} aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Landing() {
  return (
    <div className="landing">
      <a className="landing-skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="landing-header">
        <Brand />
        <nav className="landing-navigation" aria-label="Main navigation">
          <Link href="/#how-it-works">How it works</Link>
          <Link href="/studio">Explore lessons</Link>
          <Link href="/#early-access">Early access</Link>
        </nav>
        <Link className="landing-button landing-header-cta" href="/studio">
          Open studio <ArrowRight aria-hidden="true" />
        </Link>
      </header>

      <main id="main-content">
        <section className="landing-hero" aria-labelledby="landing-title">
          <div className="landing-hero-copy">
            <h1 id="landing-title">
              Make knowledge
              <br />
              click.
            </h1>
            <p className="landing-hero-description">
              Turn what you want to learn into a lesson you can actually get into. Explore,
              practice, and make it stick.
            </p>
            <div className="landing-hero-actions">
              <Link className="landing-button" href="/learn/habits">
                Try a sample lesson
              </Link>
              <Link className="landing-text-link" href="/#how-it-works">
                See how it works <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <p className="landing-hero-caption">Interactive lessons. At your pace.</p>
            <span className="landing-positioning">A lesson, not another PDF.</span>
          </div>
          <LessonPreview />
        </section>

        <div className="landing-learning-strip">
          <p>Read less passively. Learn more actively.</p>
          <div>
            <span>
              <BookOpen aria-hidden="true" />
              Understand it
            </span>
            <span>
              <Play aria-hidden="true" />
              Try it
            </span>
            <span>
              <MessageCircle aria-hidden="true" />
              Talk it through
            </span>
          </div>
        </div>

        <section
          className="landing-how landing-section"
          id="how-it-works"
          aria-labelledby="landing-how-title"
        >
          <div className="landing-section-intro">
            <span className="landing-eyebrow">A better way in</span>
            <h2 id="landing-how-title">
              From curious
              <br />
              to “I get it.”
            </h2>
            <p>Give a topic your full attention. A little structure makes a big difference.</p>
          </div>
          <div className="landing-steps">
            <article>
              <span className="landing-step-number">01</span>
              <div>
                <h3>Find your starting point.</h3>
                <p>
                  Choose a sample lesson and get a clear path through the topic, one idea at a time.
                </p>
              </div>
            </article>
            <article>
              <span className="landing-step-number">02</span>
              <div>
                <h3>Get involved.</h3>
                <p>
                  Explore visual explanations, check your understanding, and try what you’ve
                  learned.
                </p>
              </div>
            </article>
            <article>
              <span className="landing-step-number">03</span>
              <div>
                <h3>Leave with something that sticks.</h3>
                <p>
                  Reflect on the idea and take a practical next step. Come back whenever you need.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section
          className="landing-samples landing-section"
          aria-labelledby="landing-samples-title"
        >
          <div className="landing-samples-heading">
            <div>
              <span className="landing-eyebrow">Follow your curiosity</span>
              <h2 id="landing-samples-title">A good place to start.</h2>
            </div>
            <Link className="landing-text-link" href="/studio">
              Explore the studio <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="landing-lesson-rail">
            <Link className="landing-sample landing-sample-habits" href="/learn/habits">
              <div className="landing-sample-art" aria-hidden="true">
                <span className="landing-growing-dot" />
                <span className="landing-growing-dot" />
                <span className="landing-growing-dot" />
                <span className="landing-growing-dot" />
              </div>
              <span className="landing-sample-topic">Everyday learning</span>
              <h3>
                Small habits.
                <br />
                Lasting change.
              </h3>
              <p>Build a little momentum, one day at a time.</p>
              <span className="landing-sample-action">
                Explore lesson <ArrowRight aria-hidden="true" />
              </span>
            </Link>
            <Link className="landing-sample landing-sample-ai" href="/learn/ai">
              <div className="landing-sample-art" aria-hidden="true">
                <Sparkles size={66} strokeWidth={1.2} />
              </div>
              <span className="landing-sample-topic">Understand the technology</span>
              <h3>
                AI, without
                <br />
                the mystery.
              </h3>
              <p>Get comfortable with the ideas behind AI.</p>
              <span className="landing-sample-action">
                Explore lesson <ArrowRight aria-hidden="true" />
              </span>
            </Link>
            <Link className="landing-sample landing-sample-thinking" href="/learn/thinking">
              <div className="landing-sample-art landing-thinking-art" aria-hidden="true">
                <span />
                <span />
                <span />
                <Check size={30} strokeWidth={1.5} />
              </div>
              <span className="landing-sample-topic">A clearer perspective</span>
              <h3>
                Think it
                <br />
                through.
              </h3>
              <p>Ask better questions. Make a clearer decision.</p>
              <span className="landing-sample-action">
                Explore lesson <ArrowRight aria-hidden="true" />
              </span>
            </Link>
          </div>
        </section>

        <section
          className="landing-early-access landing-section"
          id="early-access"
          aria-labelledby="landing-access-title"
        >
          <div>
            <span className="landing-eyebrow">Help shape what’s next</span>
            <h2 id="landing-access-title">
              Your curiosity.
              <br />A whole new classroom.
            </h2>
            <p>
              Explore the sample lessons today. Join the early-access list for updates as we build
              the full Syllivo learning experience.
            </p>
          </div>
          <div className="landing-access-form">
            <h3>Be part of the next chapter.</h3>
            <EarlyAccessForm />
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div>
          <Brand />
          <p>Make knowledge click.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/credits">Open-source credits</Link>
        </nav>
        <p className="landing-copyright">© {new Date().getFullYear()} Syllivo</p>
      </footer>
    </div>
  );
}
