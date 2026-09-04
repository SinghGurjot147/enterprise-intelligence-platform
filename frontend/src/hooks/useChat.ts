import { useCallback, useState } from 'react';
import { queryRag } from '../services/api';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isStreaming?: boolean;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [idCounter, setIdCounter] = useState(0);

  const sendMessage = useCallback(
    async (text: string, _rag: boolean) => {
      if (!text.trim() || isStreaming) return;

      const userMessageId = idCounter + 1;
      const botMessageId = idCounter + 2;

      setIdCounter(botMessageId);

      const userMsg: Message = {
        id: userMessageId,
        text: text.trim(),
        sender: 'user',
        timestamp: new Date(),
      };

      const botPlaceholder: Message = {
        id: botMessageId,
        text: '',
        sender: 'bot',
        timestamp: new Date(),
        isStreaming: true,
      };

      setMessages((prev) => [
        ...prev,
        userMsg,
        botPlaceholder,
      ]);

      setIsStreaming(true);

      try {
        const result = await queryRag(text.trim());

        setMessages((prev) =>
          prev.map((message) =>
            message.id === botMessageId
              ? {
                  ...message,
                  text: result.answer,
                  isStreaming: false,
                }
              : message
          )
        );
      } catch (error) {
        console.error('RAG query failed:', error);

        const errorMessage =
          error instanceof Error
            ? error.message
            : 'Failed to get a response from the backend.';

        setMessages((prev) =>
          prev.map((message) =>
            message.id === botMessageId
              ? {
                  ...message,
                  text: `Error: ${errorMessage}`,
                  isStreaming: false,
                }
              : message
          )
        );
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming, idCounter]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setIdCounter(0);
  }, []);

  return {
    messages,
    isStreaming,
    sendMessage,
    clearMessages,
  };
}