import {
  profile,
  skills,
  experience,
  projects,
} from "@/lib/data";

const navLinks = [
  { href: "#intro-video", label: "Intro" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

function embedUrl(url: string): string {
  const youTubeMatch = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/
  );
  if (youTubeMatch) {
    return `https://www.youtube.com/embed/${youTubeMatch[1]}`;
  }
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }
  return url;
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-white/10 bg-zinc-950/80 backdrop-blur">
        <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <a href="#" className="font-semibold text-white">
            {profile.name}
            <span className="text-zinc-500">.dev</span>
          </a>
          <div className="hidden items-center gap-6 text-sm text-zinc-400 sm:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full bg-white px-4 py-1.5 font-medium text-zinc-900 transition-opacity hover:opacity-80"
            >
              Hire me
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 py-24 sm:py-36">
          <p className="mb-4 font-mono text-sm text-emerald-400">
            &gt; hello world
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Hi, I&apos;m {profile.name} — {profile.role.toLowerCase()}.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
            {profile.tagline}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="rounded-full bg-white px-6 py-3 font-medium text-zinc-900 transition-opacity hover:opacity-80"
            >
              See my work
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
            >
              Get in touch
            </a>
          </div>
        </section>

        <section id="intro-video" className="border-t border-white/10">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <p className="font-mono text-sm text-emerald-400">
              00 · intro video
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">
              Meet {profile.name}
            </h2>
            <p className="mt-2 max-w-2xl text-zinc-400">
              A 60-second hello — who I am, how I work, and what I can build
              for you.
            </p>
            <div className="mx-auto mt-8 aspect-video max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-black">
              {profile.introVideoSrc.includes("youtube") ||
              profile.introVideoSrc.includes("youtu.be") ||
              profile.introVideoSrc.includes("vimeo") ? (
                <iframe
                  src={embedUrl(profile.introVideoSrc)}
                  className="h-full w-full"
                  title="Intro video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  src={profile.introVideoSrc}
                  poster={profile.introVideoPoster || undefined}
                >
                  Your browser does not support embedded video. Download it{" "}
                  <a href={profile.introVideoSrc}>here</a> instead.
                </video>
              )}
            </div>
            {profile.introVideoSrc === "/intro.mp4" && (
              <p className="mt-3 text-xs text-zinc-500">
                Tip: add your recording as public/intro.mp4 (or paste a
                YouTube/Vimeo link in lib/data.ts). The player appears here
                automatically.
              </p>
            )}
          </div>
        </section>

        <section id="about" className="border-t border-white/10">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <p className="font-mono text-sm text-emerald-400">01 · about</p>
            <div className="mt-6 grid gap-8 md:grid-cols-[260px_1fr]">
              <aside className="space-y-4 text-sm text-zinc-400">
                <p>{profile.location}</p>
                <div className="flex gap-3">
                  <a href={profile.github} className="text-zinc-300 underline decoration-zinc-600 underline-offset-4 hover:text-white">
                    GitHub
                  </a>
                  <a href={profile.linkedin} className="text-zinc-300 underline decoration-zinc-600 underline-offset-4 hover:text-white">
                    LinkedIn
                  </a>
                </div>
              </aside>
              <div className="space-y-4 leading-7 text-zinc-400">
                {profile.about.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="border-t border-white/10">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <p className="font-mono text-sm text-emerald-400">02 · skills</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {skills.map((skill) => (
                <div key={skill.group} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="font-semibold text-white">{skill.group}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="border-t border-white/10">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <p className="font-mono text-sm text-emerald-400">03 · experience</p>
            <div className="mt-6 space-y-6">
              {experience.map((job) => (
                <article key={job.role} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="font-semibold text-white">{job.role}</h3>
                    <span className="font-mono text-xs text-zinc-500">{job.period}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-emerald-400">{job.company}</p>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{job.summary}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="border-t border-white/10">
          <div className="mx-auto max-w-5xl px-6 py-20">
            <p className="font-mono text-sm text-emerald-400">04 · projects</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.name}
                  className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/25"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-white">{project.name}</h3>
                    <span className="text-zinc-600">↗</span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-4 text-sm">
                    {project.repo && (
                      <a href={project.repo} className="font-medium text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-white">
                        Source
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} className="font-medium text-zinc-300 underline decoration-zinc-700 underline-offset-4 hover:text-white">
                        Live demo
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-white/10">
          <div className="mx-auto max-w-5xl px-6 py-20 text-center">
            <p className="font-mono text-sm text-emerald-400">05 · contact</p>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Let&apos;s build something.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-400">
              I&apos;m open to full-time roles, freelance projects, and
              interesting conversations. My inbox is always open.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-full bg-white px-6 py-3 font-medium text-zinc-900 transition-opacity hover:opacity-80"
              >
                {profile.email}
              </a>
              <a
                href={profile.github}
                className="rounded-full border border-white/20 px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center font-mono text-xs text-zinc-600">
        © {new Date().getFullYear()} {profile.name} · Built with Next.js
      </footer>
    </>
  );
}