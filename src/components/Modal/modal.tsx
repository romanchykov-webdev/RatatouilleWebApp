'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { shadowBox } from '@/helpers/shadowBoxStyle';

interface ModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  title?: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  showCloseButton?: boolean;
  maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onCloseAction,
  title,
  children,
  confirmText = 'Подтвердить',
  cancelText = 'Отмена',
  onConfirm,
  showCloseButton = true,
  maxWidth = 'max-w-md',
}) => {
  const { theme } = useTheme();

  // Закрытие по клавише Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCloseAction();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onCloseAction]);

  // Закрытие при клике на фон
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onCloseAction();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 p-4 sm:p-6"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className={`bg-background rounded-lg w-full ${maxWidth} relative p-4 sm:p-6`}
            style={{
              ...shadowBox({ theme: theme === 'dark' ? 'dark' : 'light' }),
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {showCloseButton && (
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={onCloseAction}
                aria-label="Закрыть"
              >
                <X size={24} />
              </button>
            )}

            {title && <h2 className="text-xl font-bold mb-4 text-foreground">{title}</h2>}

            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
