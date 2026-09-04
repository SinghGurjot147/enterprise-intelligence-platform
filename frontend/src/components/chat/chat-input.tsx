import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Paperclip } from "lucide-react"
import { ModeToggle, type ChatModes } from "./mode-toggle"
import { DocumentUpload } from "./document-upload"
import type { DocumentInfo } from "@/services/api"
import type { UploadProgress } from "@/hooks/useDocuments"

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading: boolean
  modes: ChatModes
  onModesChange: (modes: ChatModes) => void
  documents: DocumentInfo[]
  uploading: UploadProgress | null
  onDocumentsChange: (
    updater: (prev: DocumentInfo[]) => DocumentInfo[]
  ) => void
  onUploadStart: (filename: string) => void
  onUploadProgress: (filename: string, progress: number) => void
  onUploadEnd: () => void
  onError: (message: string) => void
}

export function ChatInput({
  onSend,
  isLoading,
  modes,
  onModesChange,
  documents = [],
  uploading,
  onDocumentsChange,
  onUploadStart,
  onUploadProgress,
  onUploadEnd,
  onError,
}: ChatInputProps) {
  const [input, setInput] = useState("")
  const [isDocUploadExpanded, setIsDocUploadExpanded] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!input.trim() || isLoading) return

    onSend(input.trim())
    setInput("")

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        200
      )}px`
    }
  }, [input])

  const hasActiveMode =
    modes.rag || modes.reasoning || modes.webSearch

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto px-4 pb-6 pt-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
    >
      {/* Document Upload Area */}
      <AnimatePresence>
        {(isDocUploadExpanded || documents.length > 0) && (
          <motion.div
            className="mb-3"
            initial={{ opacity: 0, height: 0, y: 10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: 10 }}
            transition={{ duration: 0.25 }}
          >
            <DocumentUpload
              documents={documents}
              uploading={uploading}
              onDocumentsChange={onDocumentsChange}
              onUploadStart={onUploadStart}
              onUploadProgress={onUploadProgress}
              onUploadEnd={onUploadEnd}
              onError={onError}
              isExpanded={isDocUploadExpanded}
              onToggleExpand={() =>
                setIsDocUploadExpanded(!isDocUploadExpanded)
              }
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Input Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="relative"
        animate={{
          y: hasActiveMode ? -1 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        {/* Glassmorphism Input Container */}
        <motion.div
          className={cn(
            "glass rounded-2xl p-1.5 transition-all duration-300",
            hasActiveMode && "ring-1 ring-primary/20"
          )}
          animate={{
            scale: hasActiveMode ? 1.005 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        >
          <div className="flex flex-col">
            {/* Mode Toggles Row */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-border/30">
              <ModeToggle
                modes={modes}
                onModesChange={onModesChange}
              />

              {/* Attachment Button */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setIsDocUploadExpanded(
                      !isDocUploadExpanded
                    )
                  }
                  className={cn(
                    "relative h-8 w-8 transition-colors",
                    documents.length > 0
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <motion.div
                    animate={{
                      rotate: isDocUploadExpanded ? 45 : 0,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  >
                    <Paperclip className="h-4 w-4" />
                  </motion.div>

                  {/* Document Count */}
                  <AnimatePresence>
                    {documents.length > 0 && (
                      <motion.span
                        initial={{
                          opacity: 0,
                          scale: 0,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 25,
                        }}
                        className="absolute -top-1 -right-1 h-4 w-4 text-[10px] font-medium bg-primary text-primary-foreground rounded-full flex items-center justify-center"
                      >
                        {documents.length}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>

            {/* Input Row */}
            <div className="flex items-end gap-2 p-2">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Ask anything..."
                disabled={isLoading}
                rows={1}
                className={cn(
                  "flex-1 min-h-[48px] max-h-[200px] resize-none",
                  "bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0",
                  "text-foreground placeholder:text-muted-foreground/60",
                  "py-3 px-2 text-base leading-relaxed"
                )}
              />

              {/* Send Button */}
              <motion.div
                whileHover={
                  input.trim() && !isLoading
                    ? { scale: 1.06 }
                    : {}
                }
                whileTap={
                  input.trim() && !isLoading
                    ? { scale: 0.9 }
                    : {}
                }
              >
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    "h-12 w-12 rounded-xl shrink-0 transition-all duration-200",
                    "bg-primary hover:bg-primary/90",
                    "disabled:opacity-40 disabled:cursor-not-allowed"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                      >
                        <motion.div
                          className="h-5 w-5 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="send"
                        initial={{
                          opacity: 0,
                          scale: 0.5,
                          x: -4,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          x: 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 20,
                        }}
                      >
                        <Send className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <span className="sr-only">
                    Send message
                  </span>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Input Hint */}
        <motion.p
          className="text-center text-xs text-muted-foreground/60 mt-2"
          animate={{
            opacity: input.length > 0 ? 0.8 : 0.6,
          }}
        >
          Press Enter to send, Shift + Enter for new line
        </motion.p>
      </motion.form>
    </motion.div>
  )
}