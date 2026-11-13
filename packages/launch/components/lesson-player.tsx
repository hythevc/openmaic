'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  RotateCcw,
} from 'lucide-react';
import type { Course } from '../lib/courses';
import { Brand, CourseArt } from './ui';
import './lesson-player.css';

type SavedProgress = { chapter: number; completed: boolean };

export default function LessonPlayer({ course }: { course: Course }) {
  const [chapterIndex, setChapterIndex] = useState(0);
  const [selection, setSelection] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [answered, setAnswered] = useState<number[]>([]);
  const [storageNotice, setStorageNotice] = useState('');
  const headingRef = useRef<HTMLHeadingElement>(null);
  const storageKey = `syllivo-progress-${course.id}`;
  const chapter = course.chapters[chapterIndex];
  const artKind = course.id === 'ai' ? 'ai' : course.id === 'thinking' ? 'thinking' : 'habits';
  const progress = hasCompleted ? 100 : Math.round((chapterIndex / course.chapters.length) * 100);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      setChapterIndex(0);
      setCompleted(false);
      setHasCompleted(false);
      setSelection(null);
      setSubmitted(false);
      setAnswered([]);
      try {
        const raw = localStorage.getItem(storageKey);
        if (!raw) return;
        const saved: unknown = JSON.parse(raw);
        if (saved && typeof saved === 'object' && 'chapter' in saved && 'completed' in saved) {
          const value = saved as SavedProgress;
          if (
            Number.isInteger(value.chapter) &&
            value.chapter >= 0 &&
            value.chapter < course.chapters.length &&
            typeof value.completed === 'boolean'
          ) {
            setChapterIndex(value.chapter);
            setCompleted(value.completed);
            setHasCompleted(value.completed);
          }
        }
      } catch {
        setStorageNotice(
          'Progress cannot be saved in this browser. You can still enjoy the whole lesson.',
        );
      }
    });
    return () => {
      active = false;
    };
  }, [storageKey, course.chapters.length]);

  function saveProgress(index: number, isComplete: boolean) {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ chapter: index, completed: isComplete }));
    } catch {
      setStorageNotice(
        'Progress cannot be saved in this browser. You can still enjoy the whole lesson.',
      );
    }
  }

  function goToChapter(index: number, preserveCompletion = hasCompleted) {
    if (index < 0 || index >= course.chapters.length) return;
    setChapterIndex(index);
    setSelection(null);
    setSubmitted(false);
    setCompleted(false);
    saveProgress(index, preserveCompletion);
    requestAnimationFrame(() => headingRef.current?.focus());
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function checkAnswer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selection === null) return;
    setSubmitted(true);
    setAnswered((previous) =>
      previous.includes(chapterIndex) ? previous : [...previous, chapterIndex],
    );
    saveProgress(chapterIndex, hasCompleted);
  }

  function finish() {
    if (!submitted) return;
    setCompleted(true);
    setHasCompleted(true);
    saveProgress(chapterIndex, true);
    requestAnimationFrame(() => headingRef.current?.focus());
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function restart() {
    setAnswered([]);
    setHasCompleted(false);
    goToChapter(0, false);
  }

  return (
    <div className="lesson-player">
      <a className="lesson-skip" href="#lesson-content">
        Skip to lesson
      </a>
      <aside className="lesson-rail" aria-label="Lesson navigation">
        <Brand />
        <Link href="/studio" className="lesson-back">
          <ArrowLeft size={17} /> My learning
        </Link>
        <div className="lesson-rail-course">
          <span className="lesson-category">{course.category}</span>
          <h2>{course.title}</h2>
          <p>{course.chapters.length} chapters · About 5 minutes</p>
        </div>
        <nav aria-label="Chapters" className="lesson-chapters">
          {course.chapters.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={`lesson-chapter-link ${!completed && index === chapterIndex ? 'is-current' : ''}`}
              aria-current={!completed && index === chapterIndex ? 'step' : undefined}
              onClick={() => goToChapter(index)}
            >
              <span className="lesson-chapter-number">
                {hasCompleted || answered.includes(index) ? (
                  <Check size={16} aria-label="Explored" />
                ) : (
                  String(index + 1).padStart(2, '0')
                )}
              </span>
              <span>{item.title}</span>
              {!completed && index === chapterIndex && (
                <ChevronRight size={16} className="lesson-chapter-chevron" aria-hidden="true" />
              )}
            </button>
          ))}
        </nav>
        <div className="lesson-rail-bottom">
          <div className="lesson-progress-label">
            <span>Your progress</span>
            <span>{progress}%</span>
          </div>
          <progress value={progress} max={100} aria-label="Lesson progress" />
          <p>Saved on this device</p>
          <Link href="/studio#samples">
            <BookOpen size={16} /> Explore more lessons
          </Link>
        </div>
      </aside>

      <div className="lesson-main">
        <header className="lesson-topbar">
          <Link href="/studio" className="lesson-mobile-back">
            <ArrowLeft size={18} /> My learning
          </Link>
          <span className="lesson-sample-label">Curated sample lesson</span>
          <span className="lesson-chapter-count">
            {completed ? 'Complete' : `Chapter ${chapterIndex + 1} of ${course.chapters.length}`}
          </span>
        </header>

        <main id="lesson-content" className="lesson-content">
          {storageNotice && (
            <p className="lesson-storage-notice" role="status">
              {storageNotice}
            </p>
          )}
          {completed ? (
            <section className="lesson-complete" aria-labelledby="lesson-title">
              <div className="lesson-complete-mark">
                <CheckCircle2 size={44} strokeWidth={1.5} />
              </div>
              <span className="lesson-category">A little more understanding.</span>
              <h1 id="lesson-title" ref={headingRef} tabIndex={-1}>
                That clicked.
              </h1>
              <p className="lesson-complete-intro">
                You explored <strong>{course.title.toLowerCase()}</strong>. Take one idea with you
                and try it in your own life.
              </p>
              <div className="lesson-recap">
                <h2>Your takeaways</h2>
                {course.chapters.map((item, index) => (
                  <p key={item.title}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {item.takeaway}
                  </p>
                ))}
              </div>
              <div className="lesson-complete-actions">
                <Link href="/studio#samples" className="lesson-primary">
                  Find your next lesson <ArrowRight size={18} />
                </Link>
                <button type="button" className="lesson-text-button" onClick={restart}>
                  <RotateCcw size={16} /> Start again
                </button>
              </div>
            </section>
          ) : (
            <>
              <article className="lesson-article">
                <span className="lesson-category">{chapter.kicker}</span>
                <h1 id="lesson-title" ref={headingRef} tabIndex={-1}>
                  {chapter.heading}
                </h1>
                <div className="lesson-article-copy">
                  {chapter.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {chapterIndex === 0 && (
                  <div className={`lesson-art lesson-art-${artKind}`}>
                    <CourseArt kind={artKind} />
                  </div>
                )}
                <div className="lesson-takeaway">
                  <Lightbulb size={21} aria-hidden="true" />
                  <div>
                    <strong>The idea to keep</strong>
                    <p>{chapter.takeaway}</p>
                  </div>
                </div>
              </article>

              <section className="lesson-practice" aria-labelledby="practice-title">
                <div className="lesson-practice-heading">
                  <span className="lesson-category">Make it stick</span>
                  <span>Quick check</span>
                </div>
                <h2 id="practice-title">{chapter.question}</h2>
                <form onSubmit={checkAnswer}>
                  <fieldset disabled={submitted}>
                    <legend className="lesson-sr-only">Choose one answer</legend>
                    {chapter.options.map((option, index) => (
                      <label
                        key={option}
                        className={`lesson-option ${selection === index ? 'is-selected' : ''} ${submitted && index === chapter.answer ? 'is-correct' : ''} ${submitted && selection === index && selection !== chapter.answer ? 'is-incorrect' : ''}`}
                      >
                        <input
                          type="radio"
                          name={`answer-${chapterIndex}`}
                          value={index}
                          checked={selection === index}
                          onChange={() => setSelection(index)}
                          required
                        />
                        <span className="lesson-option-letter">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span>{option}</span>
                        {submitted && index === chapter.answer && (
                          <CheckCircle2 size={20} aria-hidden="true" />
                        )}
                      </label>
                    ))}
                  </fieldset>
                  {!submitted && (
                    <div className="lesson-check-row">
                      <button
                        type="submit"
                        className="lesson-primary"
                        disabled={selection === null}
                      >
                        Check my answer <Check size={17} />
                      </button>
                      <details className="lesson-hint">
                        <summary>Need a hint?</summary>
                        <p>{chapter.takeaway}</p>
                      </details>
                    </div>
                  )}
                </form>
                {submitted && (
                  <div
                    className={`lesson-answer-feedback ${selection === chapter.answer ? 'is-correct' : ''}`}
                    role="status"
                  >
                    <strong>
                      {selection === chapter.answer ? 'You’ve got it.' : 'A useful distinction.'}
                    </strong>
                    <p>{chapter.explanation}</p>
                    {selection !== chapter.answer && (
                      <button
                        type="button"
                        className="lesson-text-button"
                        onClick={() => {
                          setSelection(null);
                          setSubmitted(false);
                        }}
                      >
                        Try the question again <RotateCcw size={14} />
                      </button>
                    )}
                  </div>
                )}
              </section>

              <footer className="lesson-pagination">
                <button
                  type="button"
                  className="lesson-text-button"
                  disabled={chapterIndex === 0}
                  onClick={() => goToChapter(chapterIndex - 1)}
                >
                  <ArrowLeft size={18} /> Previous chapter
                </button>
                {chapterIndex === course.chapters.length - 1 ? (
                  <button
                    type="button"
                    className="lesson-primary"
                    disabled={!submitted}
                    onClick={finish}
                  >
                    Complete lesson <Check size={18} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="lesson-primary"
                    disabled={!submitted}
                    onClick={() => goToChapter(chapterIndex + 1)}
                  >
                    Next chapter <ArrowRight size={18} />
                  </button>
                )}
              </footer>
              {!submitted && <p className="lesson-next-note">Try the quick check to continue.</p>}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
