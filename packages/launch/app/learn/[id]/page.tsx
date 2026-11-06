import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import LessonPlayer from '../../../components/lesson-player';
import { courses, getCourse } from '../../../lib/courses';
export function generateStaticParams() {
  return courses.map(({ id }) => ({ id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const course = getCourse((await params).id);
  return { title: course?.title ?? 'Lesson not found' };
}
export default async function LearnPage({ params }: { params: Promise<{ id: string }> }) {
  const course = getCourse((await params).id);
  if (!course) notFound();
  return <LessonPlayer course={course} />;
}
