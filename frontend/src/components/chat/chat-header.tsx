import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Bot, Plus, History, Settings, PanelLeft } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ChatHeaderProps {
  onNewChat: () => void
  disabled?: boolean
  isSidebarCollapsed?: boolean
  onToggleSidebar?: () => void
  activeTitle?: string
}

export function ChatHeader({
  onNewChat,
  disabled,
  isSidebarCollapsed,
  onToggleSidebar,
  activeTitle,
}: ChatHeaderProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="shrink-0 h-16 border-b border-border/60 bg-background/85 backdrop-blur-md"
      >
        <div className="h-full px-6 flex items-center justify-between">
          {/* Left: Sidebar Toggle + Title */}
          <div className="flex items-center gap-4">
            {onToggleSidebar && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggleSidebar}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg"
                    aria-label="Toggle sidebar"
                  >
                    <PanelLeft className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  {isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                </TooltipContent>
              </Tooltip>
            )}

            {/* Title / Module Indicator */}
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 border border-primary/20">
                <Bot className="h-4 w-4 text-primary shrink-0" />
              </div>
              <span className="font-bold text-sm text-foreground tracking-tight">
                {activeTitle || "Autara"}
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <motion.div
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15, duration: 0.3 }}
          >
            {/* History Toggle */}
            {onToggleSidebar && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggleSidebar}
                    className="text-muted-foreground hover:text-foreground h-8 text-xs"
                  >
                    <History className="h-3.5 w-3.5 mr-1.5" />
                    <span className="hidden sm:inline">History</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Toggle chat history</TooltipContent>
              </Tooltip>
            )}

            {/* New Chat */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onNewChat}
                  disabled={disabled}
                  className="text-muted-foreground hover:text-foreground h-8 text-xs"
                >
                  <Plus className="h-3.5 w-3.5 mr-1.5" />
                  <span className="hidden sm:inline">New Chat</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Start a new conversation</TooltipContent>
            </Tooltip>

            {/* Settings */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground h-8 w-8"
                >
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">Settings</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">Settings</TooltipContent>
            </Tooltip>
          </motion.div>
        </div>
      </motion.header>
    </TooltipProvider>
  )
}