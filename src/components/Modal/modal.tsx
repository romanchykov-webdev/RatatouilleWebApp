'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from 'next-themes';
import { shadowBox } from '@/helpers/shadowBoxStyle';
import { Button } from '@/components/ui/button'; // Предполагается, что у вас есть компонент Button из Shadcn

interface ModalProps {
  isOpen: boolean; // Флаг для открытия/закрытия модального окна
  onCloseAction: () => void; // Функция для закрытия
  title?: string; // Заголовок (опционально)
  children: React.ReactNode; // Содержимое модального окна
  confirmText?: string; // Текст кнопки подтверждения (опционально)
  cancelText?: string; // Текст кнопки отмены (опционально)
  onConfirm?: () => void; // Действие при подтверждении (опционально)
  showCloseButton?: boolean; // Показывать кнопку закрытия (крест)
  maxWidth?: string; // Максимальная ширина модального окна
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
          className="fixed inset-0  flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className={`bg-background rounded-lg p-6 w-full ${maxWidth} mx-4 relative`}
            style={shadowBox({ theme: theme === 'dark' ? 'dark' : 'light' })}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Кнопка закрытия */}
            {showCloseButton && (
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={onCloseAction}
                aria-label="Закрыть"
              >
                <X size={24} />
              </button>
            )}

            {/* Заголовок */}
            {title && <h2 className="text-xl font-bold mb-4 text-foreground">{title}</h2>}

            {/* Содержимое */}
            <div className="mb-6">{children}</div>

            {/*/!* Кнопки *!/*/}
            {/*<div className="flex justify-end gap-4">*/}
            {/*  {cancelText && (*/}
            {/*    <Button variant="outline" onClick={onCloseAction}>*/}
            {/*      {cancelText}*/}
            {/*    </Button>*/}
            {/*  )}*/}
            {/*  {onConfirm && confirmText && <Button onClick={onConfirm}>{confirmText}</Button>}*/}
            {/*</div>*/}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
