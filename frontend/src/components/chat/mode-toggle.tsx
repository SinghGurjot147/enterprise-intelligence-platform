import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Database, Brain, Globe } from "lucide-react"
import { motion } from "framer-motion"

export interface ChatModes {
  rag: boolean
  reasoning: boolean
  webSearch: boolean
}

interface ModeToggleProps {
  modes: ChatModes
  onModesChange: (modes: ChatModes) => void
}

const modeConfig = [
  {
    key: "rag" as const,
    icon: Database,
    label: "RAG Mode",
    description: "Use uploaded documents for context",
  },
  {
    key: "reasoning" as const,
    icon: Brain,
    label: "Reasoning",
    description: "Enable step-by-step reasoning",
  },
  {
    key: "webSearch" as const,
    icon: Globe,
    label: "Web Search",
    description: "Search the web for answers",
  },
]

export function ModeToggle({ modes, onModesChange }: ModeToggleProps) {
  const toggleMode = (key: keyof ChatModes) => {
    onModesChange({
      ...modes,
      [key]: !modes[key],
    })
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center gap-1">
        {modeConfig.map(
          ({ key, icon: Icon, label, description }) => {
            const isActive = modes[key]

            return (
              <Tooltip key={key}>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20,
                    }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleMode(key)}
                      className={cn(
                        "relative h-8 px-2.5 gap-1.5 text-xs font-medium transition-all duration-200 overflow-hidden",
                        isActive
                          ? "bg-primary/15 text-primary border border-primary/30 hover:bg-primary/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      )}
                    >
                      {/* Active background animation */}
                      <motion.span
                        className="absolute inset-0 rounded-md bg-primary/10"
                        initial={false}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          scale: isActive ? 1 : 0.8,
                        }}
                        transition={{
                          duration: 0.2,
                        }}
                      />

                      {/* Icon */}
                      <motion.span
                        className="relative z-10 flex items-center"
                        animate={{
                          scale: isActive ? 1.1 : 1,
                          rotate: isActive ? [0, -8, 8, 0] : 0,
                        }}
                        transition={{
                          scale: {
                            duration: 0.2,
                          },
                          rotate: {
                            duration: 0.35,
                          },
                        }}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </motion.span>

                      {/* Label */}
                      <span className="relative z-10 hidden sm:inline">
                        {label}
                      </span>

                      {/* Active indicator */}
                      <motion.span
                        className="relative z-10 h-1.5 w-1.5 rounded-full bg-primary"
                        initial={false}
                        animate={{
                          scale: isActive ? 1 : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 25,
                        }}
                      />
                    </Button>
                  </motion.div>
                </TooltipTrigger>

                <TooltipContent
                  side="top"
                  className="bg-popover border-border"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <p className="font-medium">{label}</p>
                    <p className="text-xs text-muted-foreground">
                      {description}
                    </p>
                  </motion.div>
                </TooltipContent>
              </Tooltip>
            )
          }
        )}
      </div>
    </TooltipProvider>
  )
}