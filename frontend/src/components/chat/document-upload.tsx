import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Upload,
  X,
  FileText,
  File,
  ImageIcon,
  FileCode,
} from "lucide-react"
import {
  uploadDocument,
  deleteDocument,
  type DocumentInfo,
} from "@/services/api"
import type { UploadProgress } from "@/hooks/useDocuments"

interface DocumentUploadProps {
  documents: DocumentInfo[]
  uploading: UploadProgress | null
  onDocumentsChange: (
    updater: (prev: DocumentInfo[]) => DocumentInfo[]
  ) => void
  onUploadStart: (filename: string) => void
  onUploadProgress: (filename: string, progress: number) => void
  onUploadEnd: () => void
  onError: (message: string) => void
  isExpanded: boolean
  onToggleExpand: () => void
}

export function DocumentUpload({
  documents,
  uploading,
  onDocumentsChange,
  onUploadStart,
  onUploadProgress,
  onUploadEnd,
  onError,
  isExpanded,
  onToggleExpand,
}: DocumentUploadProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    files.forEach((f) => handleUploadFile(f))
  }, [])

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || [])
      files.forEach((f) => handleUploadFile(f))

      // Reset the input so re-selecting the same file triggers onChange
      e.target.value = ""
    },
    []
  )

  const handleUploadFile = async (file: File) => {
    onUploadStart(file.name)

    try {
      const result = await uploadDocument(file, (pct) => {
        onUploadProgress(file.name, pct)
      })

      // Add the new document to the list
      onDocumentsChange((prev) => [
        ...prev,
        {
          document_id: result.document_id,
          filename: result.filename,
          size: file.size,
          content_type: file.type,
        },
      ])
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Upload failed"
      onError(msg)
    } finally {
      onUploadEnd()
    }
  }

  const removeDocument = async (id: string) => {
    try {
      await deleteDocument(id)

      onDocumentsChange((prev) =>
        prev.filter((d) => d.document_id !== id)
      )
    } catch {
      onError("Failed to delete document")
    }
  }

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) {
      return <ImageIcon className="h-4 w-4" />
    }

    if (type.includes("pdf")) {
      return <FileText className="h-4 w-4" />
    }

    if (
      type.includes("code") ||
      type.includes("javascript") ||
      type.includes("typescript")
    ) {
      return <FileCode className="h-4 w-4" />
    }

    return <File className="h-4 w-4" />
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  // Collapsed state with no documents
  if (!isExpanded && documents.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleExpand}
          className="text-muted-foreground hover:text-foreground hover:bg-secondary/50"
        >
          <Upload className="h-4 w-4 mr-2" />
          Upload documents
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Upload Area */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "relative border-2 border-dashed rounded-xl p-6 transition-colors duration-200 overflow-hidden",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border/50 hover:border-border"
            )}
          >
            <input
              type="file"
              multiple
              accept=".md,.txt,.pdf,.html"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <motion.div
              className="flex flex-col items-center gap-2 text-center pointer-events-none"
              animate={{
                scale: isDragging ? 1.03 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              {/* Upload Icon */}
              <motion.div
                className={cn(
                  "p-3 rounded-full transition-colors",
                  isDragging ? "bg-primary/20" : "bg-secondary"
                )}
                animate={{
                  y: isDragging ? -5 : 0,
                  rotate: isDragging ? -5 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
              >
                <Upload
                  className={cn(
                    "h-6 w-6 transition-colors",
                    isDragging
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                />
              </motion.div>

              <div>
                <p className="text-sm font-medium text-foreground">
                  {isDragging
                    ? "Drop your files here"
                    : "Drag & drop files here"}
                </p>

                <p className="text-xs text-muted-foreground mt-1">
                  or click to browse &middot; .md .txt .pdf .html
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploading && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.97,
            }}
            transition={{ duration: 0.25 }}
            className="mt-3 flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/30"
          >
            <motion.div
              className="p-2 rounded-md bg-secondary text-muted-foreground"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <File className="h-4 w-4" />
            </motion.div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {uploading.filename}
              </p>

              <Progress
                value={uploading.progress}
                className="h-1 mt-1.5"
              />

              <motion.p
                key={uploading.progress}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[10px] text-muted-foreground mt-1"
              >
                {uploading.progress}% uploading
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Uploaded Documents */}
      <AnimatePresence>
        {documents.length > 0 && (
          <motion.div
            className="mt-3 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {documents.map((doc) => (
              <motion.div
                key={doc.document_id}
                layout
                initial={{
                  opacity: 0,
                  x: -20,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: 20,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.25,
                }}
                whileHover={{
                  y: -2,
                  scale: 1.01,
                }}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 border border-border/30"
              >
                {/* File Icon */}
                <motion.div
                  className="p-2 rounded-md bg-secondary text-muted-foreground"
                  whileHover={{
                    scale: 1.1,
                    rotate: 3,
                  }}
                >
                  {getFileIcon(doc.content_type)}
                </motion.div>

                {/* File Information */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {doc.filename}
                  </p>

                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {formatFileSize(doc.size)}
                    </span>

                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.15 }}
                      className="text-xs text-primary"
                    >
                      Ready
                    </motion.span>
                  </div>
                </div>

                {/* Delete Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    removeDocument(doc.document_id)
                  }
                  className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-destructive/10"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.15,
                      rotate: 90,
                    }}
                    whileTap={{
                      scale: 0.9,
                    }}
                  >
                    <X className="h-4 w-4" />
                  </motion.div>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapse / Add More */}
      <AnimatePresence>
        {(isExpanded || documents.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpand}
              className="mt-2 text-xs text-muted-foreground hover:text-foreground"
            >
              {isExpanded ? "Collapse" : "Add more"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}