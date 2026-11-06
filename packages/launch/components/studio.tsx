'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { ArrowRight, BookOpen, Check, ChevronDown, Compass, Home, Info } from 'lucide-react';
import { Brand, CourseArt } from './ui';
import { EarlyAccessForm } from './early-access-form';
import { courses } from '../lib/courses';
import './studio.css';

type CourseKind = 'habits' | 'ai' | 'thinking';
type Progress = { chapter: number; completed: boolean };
type Brief = { topic: string; level: string; length: string };
const BRIEF_KEY = 'syllivo-course-brief';
const INITIAL_BRIEF: Brief = { topic: '', level: 'Beginner', length: '10 minutes' };

export default function Studio() {
  const [brief, setBrief] = useState<Brief>(INITIAL_BRIEF);
  const [progress, setProgress] = useState<Record<string, Progress>>({});
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [topicError, setTopicError] = useState('');

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const stored = localStorage.getItem(BRIEF_KEY);
        if (stored) {
          const draft = JSON.parse(stored);
          if (draft && typeof draft.topic === 'string') {
            setBrief({
              topic: draft.topic.slice(0, 2000),
              level: ['Beginner', 'Intermediate', 'Advanced'].includes(draft.level)
                ? draft.level
                : INITIAL_BRIEF.level,
              length: ['5 minutes', '10 minutes', '20 minutes'].includes(draft.length)
                ? draft.length
                : INITIAL_BRIEF.length,
            });
          }
        }
        const nextProgress: Record<string, Progress> = {};
        for (const course of courses) {
          const storedProgress = localStorage.getItem(`syllivo-progress-${course.id}`);
          if (!storedProgress) continue;
          try {
            const value = JSON.parse(storedProgress);
            if (Number.isInteger(value.chapter) && value.chapter >= 0) {
              nextProgress[course.id] = {
                chapter: Math.min(value.chapter, course.chapters.length - 1),
                completed: value.completed === true,
              };
            }
          } catch {
            // An invalid progress entry should not hide the lesson library.
          }
        }
        setProgress(nextProgress);
      } catch {
        // The studio remains usable when a browser disables local storage.
      }
    });
    return () => {
      active = false;
    };
  }, []);

  function saveBrief(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const topic = brief.topic.trim();
    if (topic.length < 5) {
      setTopicError('Describe your topic in at least five characters.');
      return;
    }
    setTopicError('');
    try {
      localStorage.setItem(BRIEF_KEY, JSON.stringify({ ...brief, topic }));
      setSaveError(false);
    } catch {
      setSaveError(true);
    }
    setSaved(true);
  }

  return (
    <div className="studio-shell">
      <a className="studio-skip" href="#studio-main">
        Skip to learning studio
      </a>
      <aside className="studio-sidebar" aria-label="Studio navigation">
        <Brand />
        <nav className="studio-nav">
          <Link className="studio-nav-link is-active" href="/studio" aria-current="page">
            <BookOpen size={22} aria-hidden="true" /> My learning
          </Link>
          <a className="studio-nav-link" href="#samples">
            <Compass size={22} aria-hidden="true" /> Explore lessons
          </a>
          <Link className="studio-nav-link" href="/">
            <Home size={22} aria-hidden="true" /> Back to home
          </Link>
        </nav>
        <p className="studio-sidebar-note">Early access preview</p>
      </aside>

      <main className="studio-main" id="studio-main">
        <header className="studio-heading">
          <h1>
            What will <span>click</span> today?
          </h1>
          <p>A new skill. A fresh perspective. Start with a little curiosity.</p>
        </header>

        <form className="studio-composer" onSubmit={saveBrief}>
          <h2>Create your next learning experience</h2>
          <label className="studio-visually-hidden" htmlFor="course-topic">
            What would you like to understand?
          </label>
          <textarea
            id="course-topic"
            name="topic"
            placeholder="What would you like to understand?"
            value={brief.topic}
            minLength={5}
            maxLength={2000}
            required
            onChange={(event) => {
              setBrief({ ...brief, topic: event.target.value });
              setSaved(false);
              setTopicError('');
            }}
            aria-describedby="studio-generation-note"
            aria-invalid={topicError ? true : undefined}
          />
          {topicError && (
            <p className="studio-topic-error" role="alert">
              {topicError}
            </p>
          )}
          <div className="studio-composer-bottom">
            <label className="studio-field" htmlFor="course-level">
              <span>Your level</span>
              <div className="studio-select">
                <select
                  id="course-level"
                  name="level"
                  value={brief.level}
                  onChange={(event) => {
                    setBrief({ ...brief, level: event.target.value });
                    setSaved(false);
                  }}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
                <ChevronDown size={20} aria-hidden="true" />
              </div>
            </label>
            <label className="studio-field" htmlFor="course-length">
              <span>Lesson length</span>
              <div className="studio-select">
                <select
                  id="course-length"
                  name="length"
                  value={brief.length}
                  onChange={(event) => {
                    setBrief({ ...brief, length: event.target.value });
                    setSaved(false);
                  }}
                >
                  <option>5 minutes</option>
                  <option>10 minutes</option>
                  <option>20 minutes</option>
                </select>
                <ChevronDown size={20} aria-hidden="true" />
              </div>
            </label>
            <button className="studio-build-button" type="submit">
              Build my course
            </button>
          </div>
        </form>

        <p className="studio-generation-note" id="studio-generation-note">
          <Info size={20} aria-hidden="true" />
          Course generation is coming with early access. Explore a sample below.
        </p>

        {saved && (
          <section className="studio-saved-brief" aria-label="Your course brief">
            <p role="status">
              <Check size={20} aria-hidden="true" />
              {saveError
                ? 'Your browser could not save this brief. Join early access for course generation.'
                : 'Your brief is saved on this device. Join early access for course generation.'}
            </p>
            <EarlyAccessForm />
          </section>
        )}

        <section className="studio-samples" id="samples" aria-labelledby="studio-samples-title">
          <h2 id="studio-samples-title">A little curiosity goes a long way.</h2>
          <p className="studio-samples-intro">Curated sample lessons</p>
          <div className="studio-course-grid">
            {courses.map((course) => {
              const courseProgress = progress[course.id];
              return (
                <Link className="studio-course-card" href={`/learn/${course.id}`} key={course.id}>
                  <div className={`studio-course-art studio-course-art-${course.id}`}>
                    <CourseArt kind={course.id as CourseKind} />
                  </div>
                  <div className="studio-course-content">
                    <span className="studio-course-category">{course.category}</span>
                    <h3>{course.title}</h3>
                    <div className="studio-course-meta">
                      <span>
                        {courseProgress?.completed
                          ? 'Lesson completed'
                          : courseProgress && courseProgress.chapter > 0
                            ? `Continue chapter ${courseProgress.chapter + 1} of ${course.chapters.length}`
                            : `${course.chapters.length} chapters · 5 min`}
                      </span>
                      <span className="studio-course-arrow" aria-hidden="true">
                        {courseProgress?.completed ? <Check size={21} /> : <ArrowRight size={21} />}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <p className="studio-progress-note">Sample lesson progress stays on this device.</p>
        </section>
      </main>
    </div>
  );
}
