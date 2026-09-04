import React from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  PanelLeft,
  SquarePen,
  Sparkles,
  BookOpen,
  BarChart3,
  FileSpreadsheet,
  Presentation,
  Search,
  Radio,
  Settings,
  Bot,
  Sun,
  Moon,
  User,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export interface WorkspaceModule {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

export const WORKSPACE_MODULES: WorkspaceModule[] = [
  {
    id: "assistant",
    label: "AI Assistant",
    icon: Sparkles,
    description: "Conversational AI with RAG & reasoning",
  },
  {
    id: "knowledge",
    label: "Knowledge Base",
    icon: BookOpen,
    description: "Vector database & document index",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    description: "Model latency & token metrics",
  },
  {
    id: "reports",
    label: "Report Generator",
    icon: FileSpreadsheet,
    description: "Automated synthesis & briefings",
  },
  {
    id: "presentations",
    label: "Presentation Generator",
    icon: Presentation,
    description: "AI structured slide outlines",
  },
  {
    id: "search",
    label: "Semantic Search",
    icon: Search,
    description: "Deep vector embedding query",
  },
  {
    id: "meetings",
    label: "Meeting Intelligence",
    icon: Radio,
    description: "Transcript & action item analysis",
  },
]

interface SidebarProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
  activeModule: string
  onSelectModule: (moduleId: string) => void
  onNewChat: () => void
  theme: "light" | "dark"
  onToggleTheme: () => void
  onOpenSettings?: () => void
  onOpenProfile?: () => void
  className?: string
}

export function Sidebar({
  isCollapsed,
  onToggleCollapse,
  activeModule,
  onSelectModule,
  onNewChat,
  theme,
  onToggleTheme,
  onOpenSettings,
  onOpenProfile,
  className,
}: SidebarProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 68 : 288,
        }}
        transition={{
          duration: 0.25,
          ease: [0.2, 0, 0, 1],
        }}
        className={cn(
          "relative flex flex-col h-full bg-sidebar border-r border-sidebar-border text-sidebar-foreground shrink-0 z-30 select-none overflow-hidden transition-colors duration-200",
          className
        )}
      >
        {/* =========================================================
            HEADER: Brand + Theme Toggle + ONE Sidebar Toggle
            ========================================================= */}
        <div className="h-16 px-4 flex items-center justify-between border-b border-sidebar-border/60 shrink-0">
          <div
            onClick={() => onSelectModule("assistant")}
            className={cn(
              "flex items-center gap-3.5 cursor-pointer overflow-hidden transition-all",
              isCollapsed ? "justify-center w-full" : "flex-1 min-w-0"
            )}
          >
            {/* Logo Box */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/30 shrink-0 shadow-xs">
              <Bot className="h-5 w-5 text-primary" />
            </div>

            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-col min-w-0 pl-0.5 leading-tight"
                >
                  <span className="font-bold text-sm tracking-wide text-foreground flex items-center gap-1.5 truncate">
                    Autara
                  </span>
                  <span className="text-[11px] text-muted-foreground font-medium mt-0.5 tracking-normal truncate">
                    Intelligent Workspace
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Action buttons (Theme toggle + ONE sidebar collapse toggle) */}
          <div className={cn("flex items-center gap-1.5 shrink-0 ml-3", isCollapsed && "hidden")}>
            {/* Light / Dark Mode Toggle */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleTheme}
                  className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  aria-label={theme === "light" ? "Switch to Dark mode" : "Switch to Light mode"}
                >
                  {theme === "light" ? (
                    <Sun className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Moon className="h-4 w-4 text-primary" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {theme === "light" ? "Switch to Dark mode" : "Switch to Light mode"}
              </TooltipContent>
            </Tooltip>

            {/* The ONE Sidebar Collapse Toggle ([|]) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleCollapse}
                  className="h-8 w-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  aria-label="Collapse sidebar"
                >
                  <PanelLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Collapse sidebar</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* =========================================================
            COLLAPSED CONTROLS (Expand toggle + Theme toggle)
            ========================================================= */}
        {isCollapsed && (
          <div className="px-2 pt-2.5 shrink-0 flex flex-col items-center gap-1">
            {/* The ONE Sidebar Toggle (Expand) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleCollapse}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg"
                  aria-label="Expand sidebar"
                >
                  <PanelLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Expand sidebar</TooltipContent>
            </Tooltip>

            {/* Theme Toggle when collapsed */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggleTheme}
                  className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg"
                  aria-label={theme === "light" ? "Switch to Dark mode" : "Switch to Light mode"}
                >
                  {theme === "light" ? (
                    <Sun className="h-4 w-4 text-amber-500" />
                  ) : (
                    <Moon className="h-4 w-4 text-primary" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                {theme === "light" ? "Switch to Dark mode" : "Switch to Light mode"}
              </TooltipContent>
            </Tooltip>
          </div>
        )}

        {/* =========================================================
            NEW CHAT ACTION BUTTON
            ========================================================= */}
        <div className="p-2.5 shrink-0">
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={onNewChat}
                  variant="default"
                  size="icon"
                  className="w-10 h-10 mx-auto flex items-center justify-center rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs cursor-pointer"
                  aria-label="New chat"
                >
                  <SquarePen className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">New chat</TooltipContent>
            </Tooltip>
          ) : (
            <Button
              onClick={onNewChat}
              className="w-full h-9 flex items-center justify-between px-3 rounded-xl bg-primary/10 border border-primary/25 text-foreground hover:bg-primary/20 hover:border-primary/40 transition-all shadow-xs group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <SquarePen className="h-4 w-4 text-primary group-hover:rotate-6 transition-transform" />
                <span className="text-xs font-semibold">New chat</span>
              </div>
              <span className="text-[10px] text-muted-foreground font-mono px-1.5 py-0.5 rounded bg-background border border-border">
                Alt+N
              </span>
            </Button>
          )}
        </div>

        {/* =========================================================
            WORKSPACE NAVIGATION ITEMS (No Dashboard, No Recents)
            ========================================================= */}
        <ScrollArea className="flex-1 px-2.5">
          <div className="py-2 space-y-1">
            {!isCollapsed && (
              <div className="px-2 pb-1.5 flex items-center justify-between">
                <span className="text-[10.5px] font-bold tracking-wider text-muted-foreground/70 uppercase">
                  Workspace
                </span>
              </div>
            )}

            {WORKSPACE_MODULES.map((module) => {
              const Icon = module.icon
              const isActive = activeModule === module.id

              if (isCollapsed) {
                return (
                  <Tooltip key={module.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onSelectModule(module.id)}
                        className={cn(
                          "w-10 h-10 mx-auto flex items-center justify-center rounded-xl transition-all cursor-pointer",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25"
                            : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        )}
                        aria-label={module.label}
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p className="font-semibold text-xs">{module.label}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {module.description}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                )
              }

              return (
                <button
                  key={module.id}
                  onClick={() => onSelectModule(module.id)}
                  className={cn(
                    "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left group cursor-pointer",
                    isActive
                      ? "bg-primary/10 text-primary border border-primary/25 font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/70"
                  )}
                >
                  <span
                    className={cn(
                      "transition-colors",
                      isActive
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                  </span>
                  <span className="truncate flex-1">{module.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active-indicator"
                      className="h-1.5 w-1.5 rounded-full bg-primary shrink-0"
                    />
                  )}
                </button>
              )
            })}
          </div>
        </ScrollArea>

        {/* =========================================================
            BOTTOM SECTION (Profile & Settings Left-Aligned)
            ========================================================= */}
        <div className="p-2 border-t border-sidebar-border/60 bg-sidebar shrink-0 flex flex-col items-start gap-1">
          {/* User Profile (Left aligned) */}
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onOpenProfile}
                  className="w-10 h-10 mx-auto flex items-center justify-center rounded-xl bg-secondary/80 hover:bg-secondary border border-border/60 text-foreground transition-all cursor-pointer shadow-2xs"
                  aria-label="User Profile"
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="font-semibold text-xs">User Profile</p>
                <p className="text-[10px] text-muted-foreground">Workspace Admin</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={onOpenProfile}
              className="w-full flex items-center justify-start gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-sidebar-foreground hover:bg-secondary/80 transition-all text-left cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center border border-border/60 shrink-0 group-hover:border-primary/40 transition-colors">
                <User className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="flex flex-col min-w-0 leading-tight text-left items-start">
                <span className="font-semibold text-xs text-foreground truncate">User Profile</span>
                <span className="text-[10px] text-muted-foreground truncate">Workspace Admin</span>
              </div>
            </button>
          )}

          {/* Settings (Left aligned) */}
          {isCollapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onOpenSettings}
                  className="w-10 h-10 mx-auto flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary rounded-xl cursor-pointer"
                  aria-label="Settings"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={onOpenSettings}
              className="w-full flex items-center justify-start gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-all text-left cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                <Settings className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <span className="text-left font-medium">Settings</span>
            </button>
          )}
        </div>
      </motion.aside>
    </TooltipProvider>
  )
}
