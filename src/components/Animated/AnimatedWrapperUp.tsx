'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedWrapperUpProps {
  children: React.ReactNode;
  delay?: number;
}

const AnimatedWrapperUp: React.FC<AnimatedWrapperUpProps> = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({
    threshold: 0.3, // Процент видимости блока для срабатывания
    triggerOnce: true, // Анимация срабатывает только один раз
  });

  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }} // Начальное состояние (снизу, прозрачный)
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}} // Анимация только при входе в зону видимости
        transition={{
          duration: 0.45,
          ease: 'easeOut',
          delay,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimatedWrapperUp;
