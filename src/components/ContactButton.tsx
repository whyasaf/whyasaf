import { Mail } from "lucide-react";

export default function ContactButton() {
  return (
    <a
      href="mailto:whyasaf.wa@gmail.com"
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-100 text-zinc-950 font-medium text-sm rounded-full hover:bg-zinc-200 transition-colors shadow-lg hover:shadow-zinc-500/5 select-none"
    >
      <Mail size={16} />
      <span>Contact Me</span>
    </a>
  );
}
