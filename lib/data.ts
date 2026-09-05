export const profile = {
  name: "Edward",
  role: "Full-Stack Software Engineer",
  location: "Remote · Worldwide",
  email: "edward@example.com",
  github: "https://github.com/edward",
  linkedin: "https://linkedin.com/in/edward",
  tagline:
    "I design, build and ship reliable web products end to end — from database schema to pixel-perfect UI.",
  about: [
    "I'm a full-stack engineer who enjoys taking a product from idea to launch. I work across the stack: Node.js and TypeScript on the backend, React and Next.js on the frontend, and the glue — infra, CI, and payments — in between.",
    "Lately I've been building CoachFlow, a SaaS that lets coaches sell courses, take bookings and run their business from one dashboard. I care about clean architecture, fast iteration, and code that's boring to maintain.",
  ],
  // Drop an mp4 in public/ (e.g. public/intro.mp4) and set introVideoSrc below.
  // Or paste a YouTube/Vimeo share URL and the section will embed it instead.
  introVideoSrc: "https://youtu.be/UldaND7ug6I",
  introVideoPoster: "",
};

export const skills = [
  {
    group: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Accessibility"],
  },
  {
    group: "Backend",
    items: ["Node.js", "REST APIs", "PostgreSQL", "Prisma", "Redis"],
  },
  {
    group: "DevOps & Tools",
    items: ["Docker", "CI/CD", "Vercel", "AWS", "Stripe API", "Git"],
  },
];

export const experience = [
  {
    role: "Founding Engineer",
    company: "CoachFlow",
    period: "2025 — Present",
    summary:
      "Built a SaaS platform for coaches end to end: Stripe subscriptions, booking integrations, a client portal and an analytics dashboard. Designed the schema, shipped the frontend, and set up deployments.",
  },
  {
    role: "Software Engineer",
    company: "Your Company",
    period: "2023 — 2025",
    summary:
      "Placeholder role — describe what you built, the team you led, and the impact you had. Numbers matter (users, latency, revenue).",
  },
  {
    role: "Junior Developer",
    company: "First Job",
    period: "2021 — 2023",
    summary:
      "Placeholder role — keep the same format: what you did, who it helped, and the outcome.",
  },
];

export const projects = [
  {
    name: "CoachFlow",
    description:
      "A SaaS toolkit for coaches: Stripe subscriptions, session booking, a client portal, and a revenue dashboard. Built with Next.js, Prisma and Stripe.",
    stack: ["Next.js", "TypeScript", "Prisma", "Stripe", "Tailwind CSS"],
    repo: "https://github.com/edward/coachflow",
    demo: "http://localhost:3000",
  },
  {
    name: "Placeholder Project",
    description:
      "Replace me with your own project. One line on the problem, one line on what you built, and mention the tech and the outcome.",
    stack: ["React", "Node.js", "PostgreSQL"],
    repo: "https://github.com/edward",
  },
  {
    name: "Another Project",
    description:
      "A second example card. Keep descriptions crisp — recruiters skim. Lead with the result, then the how.",
    stack: ["TypeScript", "AWS", "Docker"],
    repo: "https://github.com/edward",
  },
];