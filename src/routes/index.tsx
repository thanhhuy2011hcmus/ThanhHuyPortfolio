import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ContactForm } from '../components/ContactForm'; // Chỉnh lại đường dẫn nếu cần
import {
  ChevronRight,
  Github,
  Code2,
  Terminal,
  Sigma,
  NotebookPen,
  Moon,
  Sun,
  GraduationCap,
  Award,
  BookOpen,
  Atom,
  Cpu,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import portrait from "@/assets/portrait.png";
const GITHUB = "https://github.com/thanhhuy2011hcmus";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Đinh Thanh Huy — Hồ sơ năng lực Khoa học dữ liệu" },
      {
        name: "description",
        content:
          "Hồ sơ năng lực của Đinh Thanh Huy, sinh viên Khoa học dữ liệu - Thống kê, ĐH Khoa học tự nhiên - ĐHQG HCM.",
      },
      { property: "og:title", content: "Đinh Thanh Huy — Hồ sơ năng lực" },
      {
        property: "og:description",
        content: "Thành tích học tập, dự án và kinh nghiệm của Đinh Thanh Huy.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Trang chủ", href: "#trang-chu" },
  { label: "Thành tích", href: "#thanh-tich" },
  { label: "Kinh nghiệm", href: "#kinh-nghiem" },
  { label: "Liên hệ", href: "#lien-he" },
];

const TECH = [
  { name: "Python", icon: Code2 },
  { name: "C", icon: Terminal },
  { name: "LaTeX", icon: Sigma },
  { name: "Google Colab", icon: NotebookPen },
];

type Detail = { label: string; value: string };

const ACHIEVEMENTS: {
  tag: string;
  tagClass: string;
  icon: typeof Award;
  title: string;
  desc: string;
  details: Detail[];
}[] = [
  {
    tag: "THPTQG 2025",
    tagClass: "bg-tag-1/15 text-tag-1",
    icon: Award,
    title: "Điểm thi THPTQG: 28.5",
    desc: "Toán: 9.0 | Vật lí: 10 | Hóa học: 9.5. Đạt học sinh xuất sắc năm lớp 11, 12 với điểm trung bình môn Lí 3 năm đạt 9.8. Giải Nhất (2022) và Giải Nhì (2023) HSG Lí cấp trường.",
    details: [
      { label: "Tổng điểm khối A00", value: "28.5" },
      { label: "Toán", value: "9.0" },
      { label: "Vật lí", value: "10" },
      { label: "Hóa học", value: "9.5" },
      { label: "Học sinh xuất sắc", value: "Lớp 11, 12" },
      { label: "Điểm TB môn Lí 3 năm", value: "9.8" },
      { label: "HSG Lí cấp trường 2022", value: "Giải Nhất" },
      { label: "HSG Lí cấp trường 2023", value: "Giải Nhì" },
    ],
  },
  {
    tag: "ĐGNL 2025",
    tagClass: "bg-tag-2/15 text-tag-2",
    icon: BookOpen,
    title: "Kỳ thi Đánh giá năng lực ĐHQG-HCM",
    desc: "Đợt 2: 989 điểm (TV: 248, TA: 196, Toán: 277, TDKH: 268). Đợt 1: 962 điểm (TV: 226, TA: 225, Toán: 251, TDKH: 260).",
    details: [
      { label: "Đợt 2 — Tổng điểm", value: "989" },
      { label: "Tiếng Việt / Tiếng Anh", value: "248 / 196" },
      { label: "Toán / Tư duy khoa học", value: "277 / 268" },
      { label: "Đợt 1 — Tổng điểm", value: "962" },
      { label: "Tiếng Việt / Tiếng Anh", value: "226 / 225" },
      { label: "Toán / Tư duy khoa học", value: "251 / 260" },
    ],
  },
  {
    tag: "Đại học",
    tagClass: "bg-tag-3/15 text-tag-3",
    icon: GraduationCap,
    title: "Thành tích Đại học",
    desc: "GPA hiện tại: 8.92/10. Điểm nổi bật: Đại số tuyến tính 1A (9.7), Vi tích phân 1A (9.3), Cấu trúc dữ liệu và Giải thuật (9.0).",
    details: [
      { label: "Trường", value: "ĐH Khoa học tự nhiên - ĐHQG HCM" },
      { label: "Chuyên ngành", value: "Khoa học dữ liệu - Thống kê" },
      { label: "GPA hiện tại", value: "8.92 / 10" },
      { label: "Đại số tuyến tính 1A", value: "9.7" },
      { label: "Vi tích phân 1A", value: "9.3" },
      { label: "Cấu trúc dữ liệu và Giải thuật", value: "9.0" },
    ],
  },
];

const WORK: {
  icon: typeof Atom;
  title: string;
  desc: string;
  points: string[];
  link?: { href: string; label: string };
}[] = [
  {
    icon: Atom,
    title: "Gia sư Vật Lý Luyện thi Đại học",
    desc: "Chuyên giảng dạy Vật lý cấp 3 (Lớp 10-12) và luyện thi đại học, hệ thống hóa kiến thức toàn diện cho học sinh.",
    points: [
      "Giảng dạy chương trình Vật lý lớp 10, 11, 12.",
      "Luyện thi THPTQG, hệ thống hóa kiến thức theo chuyên đề.",
      "Dựa trên nền tảng: 10 điểm Vật lí THPTQG 2025, Giải Nhất/Nhì HSG Lí cấp trường.",
    ],
    link: { href: "#lien-he", label: "Liên hệ đăng ký học" },
  },
  {
    icon: Cpu,
    title: "Lập trình Thuật toán Python & C",
    desc: "Ứng dụng các cấu trúc dữ liệu (Linked Lists, Min-Heaps, Hash Tables) vào giải quyết bài toán tối ưu.",
    points: [
      "Cài đặt danh sách liên kết, min-heap, bảng băm bằng Python và C.",
      "Áp dụng vào các bài toán tìm kiếm, sắp xếp và tối ưu.",
      "Kết quả học phần Cấu trúc dữ liệu và Giải thuật: 9.0.",
    ],
    link: { href: GITHUB, label: "Xem mã nguồn trên GitHub" },
  },
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };
  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
      className="grid h-9 w-9 place-items-center rounded-full border border-ink-border text-ink-muted transition-all hover:rotate-12 hover:text-primary"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

function Index() {
  return (
    <main className="bg-ink text-ink-foreground transition-colors duration-500">
      <Hero />
      <Achievements />
      <Work />
      <Contact />
      <footer className="border-t border-ink-border py-8 text-center font-mono text-xs text-ink-muted">
        © 2026 Đinh Thanh Huy ·{" "}
        <a href={GITHUB} target="_blank" rel="noreferrer" className="hover:text-primary">
          GitHub
        </a>
      </footer>
    </main>
  );
}

function Hero() {
  return (
    <section id="trang-chu" className="relative overflow-hidden bg-ink px-4 pb-20 pt-6">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-3xl animate-float" />
      <nav className="sticky top-4 z-20 mx-auto flex max-w-6xl animate-fade-up items-center justify-between gap-4 rounded-xl border border-ink-border bg-ink-card/80 px-5 py-3 backdrop-blur">
        <ul className="flex min-w-0 flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-ink-muted">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="relative transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all hover:text-primary hover:after:w-full">
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 items-center gap-3 text-ink-muted">
          <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub" className="transition-transform hover:-translate-y-0.5 hover:text-primary">
            <Github className="h-5 w-5" />
          </a>
          <ThemeToggle />
        </div>
      </nav>

      <div className="relative mx-auto mt-16 grid max-w-6xl items-center gap-12 md:grid-cols-[1.2fr_1fr]">
        <div className="min-w-0">
          <p className="animate-fade-up font-mono text-sm text-primary" style={{ animationDelay: "100ms" }}>
            Xin chào, tôi là
          </p>
          <h1 className="mt-2 animate-fade-up text-4xl font-extrabold leading-tight sm:text-6xl" style={{ animationDelay: "200ms" }}>
            Đinh Thanh Huy
          </h1>
          <p className="mt-5 max-w-xl animate-fade-up font-mono text-sm leading-relaxed text-ink-muted sm:text-base" style={{ animationDelay: "350ms" }}>
            Sinh viên chuyên ngành Khoa học dữ liệu - Thống kê | Đại học Khoa học tự nhiên - ĐHQG HCM.
          </p>
          <div className="mt-8 flex animate-fade-up flex-wrap gap-3" style={{ animationDelay: "500ms" }}>
            <Button asChild variant="glow" size="lg" className="group h-12 px-8">
              <a href="#thanh-tich">
                Bắt đầu tìm hiểu <ChevronRight className="transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 border-ink-border bg-transparent px-8 text-ink-foreground">
              <a href="#lien-he">Liên hệ</a>
            </Button>
          </div>
        </div>
        <div className="flex animate-fade-up justify-center md:justify-end" style={{ animationDelay: "300ms" }}>
          <div className="relative">
            <div aria-hidden className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/40 animate-spin-slow" />
            <img
  src={portrait} 
  alt="Ảnh chân dung Đinh Thanh Huy"
  width={1086}
  height={1448}
  className="relative aspect-square w-64 rounded-full border-4 border-primary/50 bg-ink-card object-cover object-top shadow-glow animate-float sm:w-80"
/>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-20 max-w-6xl">
        <p className="font-mono text-sm">Công nghệ sử dụng</p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TECH.map(({ name, icon: Icon }, i) => (
            <Reveal key={name} delay={i * 100}>
              <div className="flex items-center justify-center gap-2 rounded-lg border border-ink-border bg-ink-card py-4 text-ink-muted transition-all hover:-translate-y-1 hover:border-primary/60 hover:text-ink-foreground">
                <Icon className="h-5 w-5" />
                <span className="font-semibold">{name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="font-mono text-sm uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{title}</h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-brand" />
    </Reveal>
  );
}

function DetailList({ items }: { items: Detail[] }) {
  return (
    <dl className="divide-y divide-border">
      {items.map((d, i) => (
        <div key={i} className="flex justify-between gap-4 py-2.5 text-sm">
          <dt className="text-muted-foreground">{d.label}</dt>
          <dd className="text-right font-mono font-semibold">{d.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Achievements() {
  return (
    <section id="thanh-tich" className="bg-background px-4 py-24 text-foreground transition-colors duration-500">
      <div className="mx-auto max-w-5xl">
        <SectionTitle eyebrow="Học tập" title="Thành tích học tập" />
        <div className="flex flex-col gap-8">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.tag} delay={i * 80}>
              <article className="group grid gap-6 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg md:grid-cols-[auto_1fr] md:p-10">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110">
                  <a.icon className="h-8 w-8" />
                </div>
                <div className="min-w-0">
                  <span className={`inline-block rounded-full px-3 py-1 font-mono text-xs font-semibold ${a.tagClass}`}>{a.tag}</span>
                  <h3 className="mt-4 text-2xl font-bold">{a.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{a.desc}</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="gradient" className="mt-6">
                        Xem chi tiết <ChevronRight />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{a.title}</DialogTitle>
                        <DialogDescription>{a.tag}</DialogDescription>
                      </DialogHeader>
                      <DetailList items={a.details} />
                    </DialogContent>
                  </Dialog>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="kinh-nghiem" className="bg-background px-4 pb-24 text-foreground transition-colors duration-500">
      <div className="mx-auto max-w-6xl">
        <SectionTitle eyebrow="Dự án" title="Kinh nghiệm & Dự án" />
        <Reveal>
          <Carousel opts={{ align: "start" }} className="mx-auto max-w-5xl">
            <CarouselContent>
              {WORK.map((w) => (
                <CarouselItem key={w.title} className="md:basis-1/2">
                  <article className="group flex h-full flex-col rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg">
                    <div className="grid h-14 w-14 place-items-center rounded-xl bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
                      <w.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold">{w.title}</h3>
                    <p className="mt-2 flex-1 text-muted-foreground">{w.desc}</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="group/btn mt-6 self-start">
                          Tìm hiểu thêm <ChevronRight className="transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{w.title}</DialogTitle>
                          <DialogDescription>{w.desc}</DialogDescription>
                        </DialogHeader>
                        <ul className="list-disc space-y-2 pl-5 text-sm">
                          {w.points.map((p) => (
                            <li key={p}>{p}</li>
                          ))}
                        </ul>
                        {w.link && (
                          <Button asChild variant="gradient" className="mt-2 self-start">
                            <a href={w.link.href} target={w.link.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                              {w.link.label} <ChevronRight />
                            </a>
                          </Button>
                        )}
                      </DialogContent>
                    </Dialog>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious aria-label="Thẻ trước" className="hidden sm:flex" />
            <CarouselNext aria-label="Thẻ tiếp theo" className="hidden sm:flex" />
          </Carousel>
          <section id="contact" className="py-16 mt-12 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-3xl">
          <ContactForm />
        </div>
      </section>
        </Reveal>
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
    "w-full rounded-lg border border-ink-border bg-ink-card px-4 py-3 text-ink-foreground transition-all placeholder:text-ink-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30";
  return (
    <section id="lien-he" className="border-t border-ink-border bg-ink px-4 py-24">
      <Reveal className="mx-auto max-w-xl text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/15 text-primary animate-pulse-ring">
          <Mail className="h-6 w-6" />
        </div>
        <h2 className="mt-6 text-3xl font-bold sm:text-4xl">Liên hệ</h2>
        <p className="mt-4 font-mono text-sm leading-relaxed text-ink-muted">
          Ngày sinh: 20/11/2007. Hãy liên hệ với tôi để cùng trao đổi về dữ liệu và công nghệ.
        </p>
        <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-4 text-left">
          <input required name="name" placeholder="Họ và tên" aria-label="Họ và tên" className={field} />
          <input required type="email" name="email" placeholder="Email" aria-label="Email" className={field} />
          <textarea required name="message" rows={5} placeholder="Lời nhắn" aria-label="Lời nhắn" className={field} />
          <Button type="submit" variant="glow" size="lg" className="h-12">
            Gửi lời nhắn <ChevronRight />
          </Button>
          {sent && (
            <p role="status" className="animate-fade-up text-center font-mono text-sm text-primary">
              Cảm ơn bạn! Lời nhắn đã được ghi nhận.
            </p>
          )}
        </form>
        <a href={GITHUB} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-ink-muted hover:text-primary">
          <Github className="h-4 w-4" /> github.com/thanhhuy2011hcmus
        </a>
      </Reveal>
    </section>
  );
}
