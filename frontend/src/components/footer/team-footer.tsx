import { motion } from "framer-motion"
import { Instagram, Linkedin, ArrowUp, Heart, User } from "lucide-react"

export interface TeamMember {
  name: string
  role: string
  instagramUrl: string
  linkedinUrl: string
  avatarGradient: string
  initials: string
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "AYUSH",
    role: "Developer",
    instagramUrl: "https://instagram.com",
    linkedinUrl: "https://linkedin.com",
    avatarGradient: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-600 dark:text-purple-300",
    initials: "AY",
  },
  {
    name: "GURJOT",
    role: "Developer",
    instagramUrl: "https://instagram.com",
    linkedinUrl: "https://linkedin.com",
    avatarGradient: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-600 dark:text-cyan-300",
    initials: "GU",
  },
  {
    name: "ANKIT",
    role: "Developer",
    instagramUrl: "https://instagram.com",
    linkedinUrl: "https://linkedin.com",
    avatarGradient: "from-violet-500/20 to-indigo-500/20 border-violet-500/30 text-violet-600 dark:text-violet-300",
    initials: "AN",
  },
]

interface TeamCardProps {
  member: TeamMember
  index: number
}

export function TeamCard({ member, index }: TeamCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: 0.5,
        delay: 0.1 + index * 0.12,
        ease: "easeOut",
      }}
      style={{ transformStyle: "preserve-3d", perspective: 800 }}
      whileHover={{
        y: -8,
        rotateX: 3,
        rotateY: -2,
        scale: 1.03,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
      className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/80 shadow-md hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 dark:bg-[#12121f] dark:border-white/15 dark:hover:border-primary/50 transition-all duration-300 overflow-hidden"
    >
      {/* Subtle hover gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Avatar / Profile Area */}
      <motion.div
        whileHover={{ scale: 1.12 }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
        className={`relative w-20 h-20 rounded-2xl mb-4 flex items-center justify-center bg-gradient-to-br border-2 ${member.avatarGradient} shadow-sm group-hover:scale-105 transition-transform duration-300`}
      >
        <User className="w-10 h-10 opacity-90" />
      </motion.div>

      {/* Name */}
      <h3 className="text-lg font-bold tracking-wider text-foreground uppercase">
        {member.name}
      </h3>

      {/* Role */}
      <p className="text-xs font-semibold text-muted-foreground mt-0.5 mb-5 uppercase tracking-wide">
        {member.role}
      </p>

      {/* Social Links (Instagram & LinkedIn) */}
      <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/60 dark:border-white/10 w-full justify-center">
        <motion.a
          href={member.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15, rotate: 3 }}
          whileTap={{ scale: 0.92 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-pink-500 hover:bg-pink-500/10 border border-border/60 dark:border-white/10 hover:border-pink-500/40 transition-all cursor-pointer shadow-2xs"
          title={`${member.name} on Instagram`}
        >
          <Instagram className="w-3.5 h-3.5 text-pink-500" />
          <span>Instagram</span>
        </motion.a>

        <motion.a
          href={member.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15, rotate: -3 }}
          whileTap={{ scale: 0.92 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-muted-foreground hover:text-[#0a66c2] hover:bg-[#0a66c2]/10 border border-border/60 dark:border-white/10 hover:border-[#0a66c2]/40 transition-all cursor-pointer shadow-2xs"
          title={`${member.name} on LinkedIn`}
        >
          <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
          <span>LinkedIn</span>
        </motion.a>
      </div>
    </motion.div>
  )
}

interface TeamFooterProps {
  onScrollToTop?: () => void
}

export function TeamFooter({ onScrollToTop }: TeamFooterProps) {
  const handleScrollTop = () => {
    if (onScrollToTop) {
      onScrollToTop()
    }
    try {
      const topEl = document.getElementById("top-anchor")
      if (topEl) {
        topEl.scrollIntoView({ behavior: "smooth", block: "start" })
      }
      const scrollContainers = document.querySelectorAll(".overflow-y-auto")
      scrollContainers.forEach((el) => {
        el.scrollTo({ top: 0, behavior: "smooth" })
      })
      window.scrollTo({ top: 0, behavior: "smooth" })
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" })
    } catch {
      // fallback
    }
  }

  return (
    <footer
      id="meet-the-team-footer"
      className="relative w-full mt-12 pt-16 pb-14 border-t border-border/80 dark:border-white/15 overflow-hidden bg-gradient-to-b from-background/80 via-card/90 to-background dark:from-background dark:via-[#0c0c17] dark:to-background backdrop-blur-xl shrink-0"
    >
      {/* Top glowing aurora edge line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/60 to-transparent shadow-[0_0_20px_rgba(168,85,247,0.5)]" />

      {/* Radiant ambient glow & soft spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(168,85,247,0.18),transparent)] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* =========================================================
            MEET THE TEAM SECTION
            ========================================================= */}
        <div className="text-center mb-10">
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-2xl sm:text-3xl font-extrabold tracking-wider text-foreground uppercase"
          >
            Meet the Team
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="mt-2 text-sm sm:text-base text-muted-foreground font-medium"
          >
            Three minds. One project. 🚀
          </motion.p>
        </div>

        {/* 3 Team Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {TEAM_MEMBERS.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* =========================================================
            FOOTER BOTTOM BAR
            ========================================================= */}
        <div className="mt-16 pt-8 border-t border-border/60 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4 text-center sm:text-left">
          {/* Left: Copyright */}
          <div>
            © 2026 <span className="font-semibold text-foreground">Autara AI</span>. All rights reserved.
          </div>

          {/* Center: Built with love */}
          <div className="flex items-center gap-1.5 font-medium">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
            <span>by our team</span>
          </div>

          {/* Right: Back to top button */}
          <motion.button
            onClick={handleScrollTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/90 hover:bg-secondary hover:text-foreground text-foreground/90 font-medium transition-colors cursor-pointer shadow-2xs border border-border/50 dark:border-white/10"
          >
            <ArrowUp className="w-3.5 h-3.5 text-primary" />
            <span>Back to Top</span>
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
