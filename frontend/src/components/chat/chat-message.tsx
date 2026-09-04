import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, User } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { motion } from "framer-motion"

export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  isStreaming?: boolean
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
        scale: 0.97,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration: 0.35,
        ease: "easeOut",
      }}
      className={cn(
        "flex gap-4",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          delay: 0.1,
          type: "spring",
          stiffness: 300,
        }}
      >
        <Avatar
          className={cn(
            "h-10 w-10 shrink-0 border-2",
            isUser
              ? "border-primary/30 bg-primary/10"
              : "border-accent/30 bg-accent/10"
          )}
        >
          <AvatarFallback
            className={cn(
              "text-foreground",
              isUser ? "bg-message-user" : "bg-message-ai"
            )}
          >
            {isUser ? (
              <User className="h-5 w-5" />
            ) : (
              <Bot className="h-5 w-5 text-primary" />
            )}
          </AvatarFallback>
        </Avatar>
      </motion.div>

      {/* Message bubble */}
      <motion.div
        whileHover={{
          scale: 1.01,
        }}
        transition={{ duration: 0.15 }}
        className={cn(
          "max-w-[75%] rounded-2xl px-5 py-4",
          isUser
            ? "bg-message-user border border-border/50"
            : "bg-message-ai border border-border/30"
        )}
      >
        {message.isStreaming && !message.content ? (
          <TypingIndicator />
        ) : (
          <div className="prose prose-invert prose-sm max-w-none">
            <ReactMarkdown
              components={{
                p: ({ children }) => (
                  <p className="text-foreground/90 leading-relaxed mb-2 last:mb-0">
                    {children}
                  </p>
                ),

                code: ({ children, className }) => {
                  const isInline = !className

                  return isInline ? (
                    <code className="bg-secondary px-1.5 py-0.5 rounded text-primary font-mono text-sm">
                      {children}
                    </code>
                  ) : (
                    <code className="block bg-secondary p-4 rounded-lg overflow-x-auto font-mono text-sm text-foreground/90">
                      {children}
                    </code>
                  )
                },

                pre: ({ children }) => (
                  <pre className="bg-secondary rounded-lg overflow-hidden my-3">
                    {children}
                  </pre>
                ),

                ul: ({ children }) => (
                  <ul className="list-disc list-inside space-y-1 text-foreground/90 my-2">
                    {children}
                  </ul>
                ),

                ol: ({ children }) => (
                  <ol className="list-decimal list-inside space-y-1 text-foreground/90 my-2">
                    {children}
                  </ol>
                ),

                h1: ({ children }) => (
                  <h1 className="text-xl font-semibold text-foreground mb-3">
                    {children}
                  </h1>
                ),

                h2: ({ children }) => (
                  <h2 className="text-lg font-semibold text-foreground mb-2">
                    {children}
                  </h2>
                ),

                h3: ({ children }) => (
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {children}
                  </h3>
                ),

                a: ({ children, href }) => (
                  <a
                    href={href}
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),

                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-primary/50 pl-4 italic text-muted-foreground my-3">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>

            {/* Streaming cursor */}
            {message.isStreaming && message.content && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                }}
                className="inline-block w-2 h-5 bg-primary ml-1 align-middle"
              />
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 py-1">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 bg-primary/60 rounded-full"
          animate={{
            y: [0, -5, 0],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: i * 0.15,
          }}
          style={{
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  )
}