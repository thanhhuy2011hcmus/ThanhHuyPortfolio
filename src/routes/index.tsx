import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ChevronRight, Github, Linkedin, Quote, User, Code2, Terminal, Sigma, NotebookPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import achThpt from "@/assets/ach-thpt.jpg";
import achDgnl from "@/assets/ach-dgnl.jpg";
import achUni from "@/assets/ach-uni.jpg";
import workTutor from "@/assets/work-tutor.jpg";
import codeSnippet from "@/assets/code-snippet.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Đinh Thanh Huy — Portfolio Khoa học dữ liệu" },
      {
        name: "description",
        content:
          "Portfolio của Đinh Thanh Huy, sinh viên Khoa học dữ liệu - Thống kê, ĐH Khoa học tự nhiên - ĐHQG HCM.",
      },
      { property: "og:title", content: "Đinh Thanh Huy — Portfolio" },
      {
        property: "og:description",
        content: "Thành tích học tập, dự án và kinh nghiệm của Đinh Thanh Huy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Achievements", href: "#achievements" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const TECH = [
  { name: "Python", icon: Code2 },
  { name: "C", icon: Terminal },
  { name: "LaTeX", icon: Sigma },
  { name: "Google Colab", icon: NotebookPen },
];

const ACHIEVEMENTS = [
  {
    tag: "THPTQG 2025",
    tagClass: "bg-tag-1/15 text-tag-1",
    title: "Điểm thi THPTQG: 28.5",
    desc: "Toán: 9.0 | Vật lí: 10 | Hóa học: 9.5. Đạt học sinh xuất sắc năm lớp 11, 12 với điểm trung bình môn Lí 3 năm đạt 9.8. Giải Nhất (2022) và Giải Nhì (2023) HSG Lí cấp trường.",
    img: achThpt,
  },
  {
    tag: "ĐGNL 2025",
    tagClass: "bg-tag-2/15 text-tag-2",
    title: "Kỳ thi Đánh giá năng lực ĐHQG-HCM",
    desc: "Đợt 2: 989 điểm (TV: 248, TA: 196, Toán: 277, TDKH: 268). Đợt 1: 962 điểm (TV: 226, TA: 225, Toán: 251, TDKH: 260).",
    img: achDgnl,
  },
  {
    tag: "University",
    tagClass: "bg-tag-3/15 text-tag-3",
    title: "Thành tích Đại học",
    desc: "GPA hiện tại: 8.92/10. Điểm nổi bật: Đại số tuyến tính 1A (9.7), Vi tích phân 1A (9.3), Cấu trúc dữ liệu và Giải thuật (9.0).",
    img: achUni,
  },
];

const WORK = [
  {
    title: "Gia sư Vật Lý Luyện thi Đại học",
    desc: "Chuyên giảng dạy Vật lý cấp 3 (Lớp 10-12) và luyện thi đại học, hệ thống hóa kiến thức toàn diện cho học sinh.",
    img: workTutor,
  },
  {
    title: "Lập trình Thuật toán Python & C",
    desc: "Ứng dụng các cấu trúc dữ liệu (Linked Lists, Min-Heaps, Hash Tables) vào giải quyết bài toán tối ưu.",
    img: codeSnippet.url,
  },
];

const TESTIMONIALS = [
  { name: "Tên người nhận xét", role: "Học sinh lớp 12 — Luyện thi Vật lý" },
  { name: "Tên người nhận xét", role: "Học sinh lớp 11 — Gia sư Vật lý" },
  { name: "Tên người nhận xét", role: "Bạn cùng lớp — KHDL, ĐH KHTN" },
  { name: "Tên người nhận xét", role: "Thành viên nhóm đồ án — CTDL & GT" },
];

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.";

function Index() {
  return (
    <main className="bg-ink text-ink-foreground">
      <Hero />
      <Achievements />
      <Work />
      <Testimonials />
      <Contact />
      <footer className="border-t border-ink-border py-8 text-center font-mono text-xs text-ink-muted">
        © 2026 Đinh Thanh Huy
      </footer>
    </main>
  );
}

function Hero() {
  return (
    <section id="home" className="bg-ink px-4 pb-20 pt-6">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-xl border border-ink-border bg-ink-card px-5 py-4">
        <ul className="flex min-w-0 flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-ink-muted">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="transition-colors hover:text-primary">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 gap-4 text-ink-muted">
          <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-primary">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-primary">
            <Github className="h-5 w-5" />
          </a>
        </div>
      </nav>

      <div className="mx-auto mt-16 grid max-w-6xl items-center gap-12 md:grid-cols-[1.2fr_1fr]">
        <div className="min-w-0">
          <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">Đinh Thanh Huy</h1>
          <p className="mt-5 max-w-xl font-mono text-sm leading-relaxed text-ink-muted sm:text-base">
            Sinh viên chuyên ngành Khoa học dữ liệu - Thống kê | Đại học Khoa học tự nhiên - ĐHQG HCM.
          </p>
          <Button asChild variant="glow" size="lg" className="mt-8 h-12 px-10">
            <a href="#achievements">
              Let's get started <ChevronRight />
            </a>
          </Button>
        </div>
        <div className="flex justify-center md:justify-end">
          <div
            role="img"
            aria-label="Ảnh chân dung (placeholder)"
            className="grid aspect-square w-64 place-items-center rounded-full border-4 border-primary/40 bg-ink-card shadow-glow sm:w-80"
          >
            <div className="flex flex-col items-center text-ink-muted">
              <User className="h-24 w-24" strokeWidth={1.2} />
              <span className="mt-2 font-mono text-xs">Portrait</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-6xl">
        <p className="font-mono text-sm text-ink-foreground">Tech Stack</p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TECH.map(({ name, icon: Icon }) => (
            <div
              key={name}
              className="flex items-center justify-center gap-2 rounded-lg border border-ink-border bg-ink-card py-4 text-ink-muted transition-colors hover:text-ink-foreground"
            >
              <Icon className="h-5 w-5" />
              <span className="font-semibold">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-12 text-center">
      <p className="font-mono text-sm uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
    </div>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="bg-background px-4 py-24 text-foreground">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Case Studies" title="Academic Achievements" />
        <div className="flex flex-col gap-10">
          {ACHIEVEMENTS.map((a, i) => (
            <article
              key={a.tag}
              className="grid items-center gap-8 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm md:grid-cols-2 md:p-10"
            >
              <img
                src={a.img}
                alt={a.title}
                loading="lazy"
                width={1024}
                height={768}
                className={`aspect-[4/3] w-full rounded-xl object-cover ${i % 2 ? "md:order-2" : ""}`}
              />
              <div className="min-w-0">
                <span className={`inline-block rounded-full px-3 py-1 font-mono text-xs font-semibold ${a.tagClass}`}>
                  {a.tag}
                </span>
                <h3 className="mt-4 text-2xl font-bold">{a.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{a.desc}</p>
                <Button variant="gradient" className="mt-6">
                  Xem chi tiết <ChevronRight />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="projects" className="bg-background px-4 pb-24 text-foreground">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Projects" title="Recent Work & Experience" />
        <Carousel opts={{ align: "start" }} className="mx-auto max-w-5xl">
          <CarouselContent>
            {WORK.map((w) => (
              <CarouselItem key={w.title} className="md:basis-1/2">
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
                  <img
                    src={w.img}
                    alt={w.title}
                    loading="lazy"
                    className="aspect-[16/10] w-full bg-ink object-cover object-left"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-bold">{w.title}</h3>
                    <p className="mt-2 flex-1 text-muted-foreground">{w.desc}</p>
                    <Button className="mt-6 self-start">
                      Know more <ChevronRight />
                    </Button>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-ink px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Testimonials" title="Nhận xét" />
        <div className="grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <figure key={i} className="rounded-2xl border border-ink-border bg-ink-card p-8">
              <Quote className="h-10 w-10 fill-ink-foreground text-ink-foreground" />
              <blockquote className="mt-4 font-mono text-sm leading-relaxed text-ink-muted">{LOREM}</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/20 text-primary">
                  <User className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold">{t.name}</p>
                  <p className="font-mono text-xs text-ink-muted">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };
  const field =
    "w-full rounded-lg border border-ink-border bg-ink-card px-4 py-3 text-ink-foreground placeholder:text-ink-muted focus:border-primary focus:outline-none";
  return (
    <section id="contact" className="border-t border-ink-border bg-ink px-4 py-24">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">Get In Touch</h2>
        <p className="mt-4 font-mono text-sm leading-relaxed text-ink-muted">
          Ngày sinh: 20/11/2007. Hãy liên hệ với tôi để cùng trao đổi về dữ liệu và công nghệ.
        </p>
        <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-4 text-left">
          <input required name="name" placeholder="Họ và tên" aria-label="Họ và tên" className={field} />
          <input required type="email" name="email" placeholder="Email" aria-label="Email" className={field} />
          <textarea required name="message" rows={5} placeholder="Lời nhắn" aria-label="Lời nhắn" className={field} />
          <Button type="submit" variant="glow" size="lg" className="h-12">
            Gửi tin nhắn <ChevronRight />
          </Button>
          {sent && (
            <p role="status" className="text-center font-mono text-sm text-primary">
              Cảm ơn bạn! Tin nhắn đã được ghi nhận.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
