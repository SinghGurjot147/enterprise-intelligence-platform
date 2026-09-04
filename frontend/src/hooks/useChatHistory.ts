import { useState, useEffect, useCallback } from 'react';

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  module?: string;
  preview?: string;
}

const STORAGE_KEY = 'autara_chat_history_v1';
const ACTIVE_CHAT_KEY = 'autara_active_chat_id_v1';

const DEFAULT_CHATS: ChatSession[] = [
  {
    id: 'chat-1',
    title: 'Framer Motion Enhancement',
    createdAt: 'Today',
    preview: 'Smooth spring animations and micro-interactions',
  },
  {
    id: 'chat-2',
    title: 'Friendly greeting',
    createdAt: 'Today',
    preview: 'Welcome to Autara workspace',
  },
  {
    id: 'chat-3',
    title: 'Windows Setup Steps',
    createdAt: 'Yesterday',
    preview: 'PowerShell and environment variables',
  },
  {
    id: 'chat-4',
    title: 'RAG Samjhaao',
    createdAt: 'Yesterday',
    preview: 'Retrieval Augmented Generation with Chroma',
  },
  {
    id: 'chat-5',
    title: 'ChatGPT Plus Trial Availability',
    createdAt: 'Previous 7 days',
    preview: 'Feature comparison and capabilities',
  },
  {
    id: 'chat-6',
    title: 'Start frontend setup',
    createdAt: 'Previous 7 days',
    preview: 'Tailwind CSS and Vite scaffolding',
  },
  {
    id: 'chat-7',
    title: 'Explain Python Questions',
    createdAt: 'Previous 7 days',
    preview: 'Asyncio event loops and generators',
  },
];

export function useChatHistory() {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load chat history', e);
    }
    return DEFAULT_CHATS;
  });

  const [activeChatId, setActiveChatId] = useState<string>(() => {
    try {
      const savedActive = localStorage.getItem(ACTIVE_CHAT_KEY);
      if (savedActive) return savedActive;
    } catch (e) {
      console.error('Failed to load active chat id', e);
    }
    return DEFAULT_CHATS[1]?.id || 'chat-2'; // Default to "Friendly greeting" matching Photo 2
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to persist chat sessions', e);
    }
  }, [sessions]);

  useEffect(() => {
    try {
      localStorage.setItem(ACTIVE_CHAT_KEY, activeChatId);
    } catch (e) {
      console.error('Failed to persist active chat id', e);
    }
  }, [activeChatId]);

  const createNewChat = useCallback((initialTitle = 'New Chat') => {
    const newChat: ChatSession = {
      id: `chat-${Date.now()}`,
      title: initialTitle,
      createdAt: 'Today',
      preview: '',
    };
    setSessions((prev) => [newChat, ...prev]);
    setActiveChatId(newChat.id);
    return newChat.id;
  }, []);

  const deleteChat = useCallback(
    (id: string) => {
      setSessions((prev) => {
        const filtered = prev.filter((chat) => chat.id !== id);
        if (activeChatId === id) {
          const nextChat = filtered[0];
          setActiveChatId(nextChat ? nextChat.id : '');
        }
        return filtered;
      });
    },
    [activeChatId],
  );

  const updateChatTitle = useCallback((id: string, title: string) => {
    setSessions((prev) =>
      prev.map((chat) => (chat.id === id ? { ...chat, title } : chat)),
    );
  }, []);

  return {
    sessions,
    activeChatId,
    setActiveChatId,
    createNewChat,
    deleteChat,
    updateChatTitle,
  };
}
