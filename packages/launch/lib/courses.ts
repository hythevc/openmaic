export type Chapter = {
  title: string;
  kicker: string;
  heading: string;
  body: string[];
  takeaway: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};
export type Course = {
  id: string;
  title: string;
  category: string;
  description: string;
  chapters: Chapter[];
};
export const courses: Course[] = [
  {
    id: 'habits',
    title: 'The science of better habits',
    category: 'Psychology',
    description: 'Make a small change easier to start, repeat, and keep.',
    chapters: [
      {
        title: 'The idea',
        kicker: 'Start small',
        heading: 'Small habits. Lasting change.',
        body: [
          'A habit is a behavior that becomes more automatic when you repeat it in a familiar context. The goal is to make a useful action easier to start, rather than to depend on feeling motivated every time.',
          'Think of reading one page after your morning coffee. One page is small enough to do on a busy day, and the coffee gives it a place in your existing routine.',
        ],
        takeaway: 'Choose one small action and connect it to something you already do.',
        question: 'Which is the easiest habit to begin repeating?',
        options: [
          'Read more whenever I feel motivated',
          'Read one page after my morning coffee',
          'Finish a book every weekend',
        ],
        answer: 1,
        explanation:
          'A small, specific action with a consistent cue is easier to repeat than a broad intention or a demanding target.',
      },
      {
        title: 'How habits form',
        kicker: 'Notice the cue',
        heading: 'Give the action a reliable home.',
        body: [
          'A cue is something that prompts an action: finishing breakfast, arriving at your desk, or putting on your shoes. Repeating an action after the same cue can make the connection easier to remember.',
          'Write a simple plan: “After I do X, I will do Y.” Keep X specific and already part of your day. A calendar reminder can help at first, but it is not a substitute for a workable routine.',
        ],
        takeaway: 'After I finish lunch, I will walk outside for two minutes.',
        question: 'What makes a useful cue?',
        options: [
          'It happens reliably in your existing routine',
          'It requires a completely new schedule',
          'It only appears when you have free time',
        ],
        answer: 0,
        explanation:
          'A reliable cue creates repeatable opportunities. A cue that rarely appears makes repetition much harder.',
      },
      {
        title: 'Make it work',
        kicker: 'Design your environment',
        heading: 'Make the next step obvious.',
        body: [
          'Friction is the effort between an intention and an action. A book on your pillow is easier to notice than one hidden in a drawer. Shoes by the door make a short walk simpler to start.',
          'Try removing one obstacle before adding more ambition. Prepare what you need, shrink the first step, and choose a time that usually fits your day. If the plan keeps failing, change the plan rather than judging yourself.',
        ],
        takeaway: 'Put the tools for your small action where you will use them.',
        question: 'You want to sketch after dinner. What reduces friction?',
        options: [
          'Buy every drawing tool available',
          'Wait until you have an uninterrupted hour',
          'Leave a pencil and sketchbook on your table',
        ],
        answer: 2,
        explanation:
          'Having the tools visible and ready makes starting easier. A larger shopping list or a perfect time adds obstacles.',
      },
      {
        title: 'Practice',
        kicker: 'Keep it flexible',
        heading: 'Build a routine you can return to.',
        body: [
          'Missing a day does not erase your previous practice. Look for the cause: Was the action too big? Was the cue unreliable? Did your environment change? Adjust one thing and try again.',
          'There is no universal number of days that guarantees a habit. Focus on a useful behavior you can repeat in your own context. Your next repetition matters more than a perfect streak.',
        ],
        takeaway: 'Pick one action, one cue, and one way to make starting easier. Try it tomorrow.',
        question: 'You miss a day. What is a constructive next step?',
        options: [
          'Double the target to make up for it',
          'Review the obstacle and return to a small action',
          'Assume the routine cannot work',
        ],
        answer: 1,
        explanation:
          'Adjusting the plan and resuming a manageable action supports repetition without making the next attempt harder.',
      },
    ],
  },
  {
    id: 'ai',
    title: 'AI, without the jargon',
    category: 'Technology',
    description: 'Understand what AI can do, where it falls short, and how to use it thoughtfully.',
    chapters: [
      {
        title: 'The big picture',
        kicker: 'Get your bearings',
        heading: 'Useful patterns. Not magic.',
        body: [
          'Artificial intelligence is a broad term for computer systems that perform tasks such as recognizing patterns, making predictions, or generating content. Different AI systems work in different ways.',
          'Machine learning is one approach to AI. Instead of writing a rule for every case, developers use data to help a system learn statistical patterns. Those patterns can be useful without representing a human-like understanding of the world.',
        ],
        takeaway: 'AI is the broad field; machine learning is one way to build AI systems.',
        question: 'How do AI and machine learning relate?',
        options: [
          'They describe every computer program',
          'Machine learning is one approach within AI',
          'AI only means chatbots',
        ],
        answer: 1,
        explanation:
          'AI covers many approaches. Machine learning is a major subset, and chatbots are only one application.',
      },
      {
        title: 'Learning patterns',
        kicker: 'From examples to predictions',
        heading: 'The examples shape the result.',
        body: [
          'Imagine showing a system many labeled photos of cats and dogs. Training adjusts its internal parameters so its predictions better match the examples. Later, it can try to classify a photo it has not seen before.',
          'Performance depends on the examples and the task. If training data misses important situations, the system may perform poorly on them. A good result in a familiar setting does not guarantee reliability in a new one.',
        ],
        takeaway:
          'Always ask whether the examples and evaluation reflect the situation where the tool will be used.',
        question: 'Why might a model work poorly in a new setting?',
        options: [
          'Its training examples may not represent the new situation',
          'All models become more accurate in new environments',
          'Training data never affects results',
        ],
        answer: 0,
        explanation:
          'A mismatch between training data and real use can reduce performance. Testing in the intended setting is essential.',
      },
      {
        title: 'Generating content',
        kicker: 'A helpful draft',
        heading: 'Fluent does not always mean factual.',
        body: [
          'A language model generates text by predicting likely continuations based on learned patterns and the context you provide. This can produce useful summaries, drafts, explanations, and code.',
          'The same process can also produce confident errors, fabricated references, or an answer that misses your constraints. Some products add search or other tools, but you still need to check important claims and sources.',
        ],
        takeaway:
          'Treat generated text as a draft to inspect, especially when facts or decisions matter.',
        question: 'An AI answer includes a convincing research citation. What next?',
        options: [
          'Trust it because it looks academic',
          'Ask it to say the same thing more confidently',
          'Find and read the actual source',
        ],
        answer: 2,
        explanation:
          'A plausible citation may be wrong or invented. Checking the actual source is the reliable next step.',
      },
      {
        title: 'Use it well',
        kicker: 'Put judgment first',
        heading: 'Give context. Keep responsibility.',
        body: [
          'A useful request explains your goal, relevant context, constraints, and the format you need. For example: “Explain this concept to a beginner in three steps, then give one example.”',
          'Review the output before using it. Avoid entering confidential or personal information unless you understand the product’s data policy and have permission to share it. For consequential decisions, involve a qualified person.',
        ],
        takeaway:
          'Use AI to extend your thinking, with clear context and a deliberate review step.',
        question: 'Which request is most useful?',
        options: [
          'Help',
          'Draft a 100-word welcome email for a beginner workshop; use a warm tone and include the start time below',
          'Do everything perfectly',
        ],
        answer: 1,
        explanation:
          'A specific task with audience, format, constraints, and context gives the system a clearer target and makes review easier.',
      },
    ],
  },
  {
    id: 'thinking',
    title: 'Think in first principles',
    category: 'Thinking',
    description: 'Separate what you assume from what you know, then build a better answer.',
    chapters: [
      {
        title: 'The question',
        kicker: 'Start with the problem',
        heading: 'A better answer starts one level deeper.',
        body: [
          'First-principles thinking means breaking a problem into basic facts or constraints, then building an answer from those foundations. It is useful when familiar solutions stop working.',
          'Start by stating the outcome you need without including a preferred solution. “Help people find the right document quickly” leaves more room for discovery than “Build a better folder tree.”',
        ],
        takeaway: 'Describe the outcome before choosing the solution.',
        question: 'Which statement leaves room for a new solution?',
        options: [
          'Make our meetings twice as long',
          'Help the team make a clear decision with the information it needs',
          'Use the same process as our competitor',
        ],
        answer: 1,
        explanation:
          'The outcome is a clear decision. A longer meeting or a copied process assumes a solution before examining the need.',
      },
      {
        title: 'Facts and assumptions',
        kicker: 'Name what you know',
        heading: 'Separate the evidence from the story.',
        body: [
          'A fact is supported by evidence you can inspect. An assumption is something you are treating as true without enough evidence. Both can be useful, but they should not be confused.',
          '“Five customers could not find the export button in our test” is an observation. “Customers do not want to export” is an interpretation that needs more evidence. Write assumptions down so you can test them.',
        ],
        takeaway: 'Ask: What evidence supports this, and what would change my mind?',
        question: 'Which statement is an assumption?',
        options: [
          'The file contains 12 pages',
          'Three people abandoned the task in yesterday’s test',
          'Everyone will prefer a more complex dashboard',
        ],
        answer: 2,
        explanation:
          'A prediction about everyone’s preference requires evidence. The other statements describe observable, checkable details.',
      },
      {
        title: 'Build from basics',
        kicker: 'Reframe the options',
        heading: 'Keep the constraint. Question the convention.',
        body: [
          'Some constraints are real: a deadline, an accessible design requirement, or the need to keep customer data safe. Other constraints are habits: “We have always done it this way.”',
          'Try listing several ways to achieve the outcome while respecting the real constraints. A clearer template, a smaller process, or removing a step may work better than adding another feature.',
        ],
        takeaway: 'Distinguish a necessary constraint from a familiar convention.',
        question: 'Which is most clearly a real constraint?',
        options: [
          'We have always used a spreadsheet',
          'Personal data must be protected',
          'Every competitor has this feature',
        ],
        answer: 1,
        explanation:
          'Protecting personal data is a genuine requirement. Existing tools and competitor choices may be useful context, but are not proof that a solution is necessary.',
      },
      {
        title: 'Test the idea',
        kicker: 'Learn before you scale',
        heading: 'Make the next experiment small.',
        body: [
          'Reasoning helps you create a promising option. An experiment helps you learn whether it works. Choose the riskiest assumption and design a small test with an observable result.',
          'If you think a shorter onboarding flow will help people finish, define what completion means, test the change with an appropriate group, and look for both benefits and problems. A small test informs your next decision; it does not prove a universal rule.',
        ],
        takeaway: 'Write one assumption, one test, and the result that would make you reconsider.',
        question: 'What makes an experiment useful?',
        options: [
          'It can produce evidence that changes your decision',
          'It is guaranteed to confirm your idea',
          'It measures as many unrelated things as possible',
        ],
        answer: 0,
        explanation:
          'A useful test can challenge an assumption and inform a decision. Confirmation alone is not the goal.',
      },
    ],
  },
];
export function getCourse(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}
