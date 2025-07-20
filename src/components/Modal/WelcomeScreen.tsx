'use client';

import { JSX, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useSpring, useCycle } from 'framer-motion';
import { Loader2 } from 'lucide-react';

import logo from '../../../public/assets/images/logoSmall2.webp';
import { shadowText } from '@/helpers/ShadowTextStyle';

export default function WelcomeScreen(): JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ring1Padding = useSpring(0, { stiffness: 100, damping: 20 });
  const ring2Padding = useSpring(0, { stiffness: 100, damping: 20 });
  // Цикл для пульсации: переключение между значениями padding
  const [ring1Cycle, cycleRing1] = useCycle(50, 30);
  const [ring2Cycle, cycleRing2] = useCycle(55, 35);

  useEffect(() => {
    // Задержка для показа основного контента
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    // Начальная анимация колец
    ring1Padding.set(0);
    ring2Padding.set(0);
    const timer1 = setTimeout(() => ring1Padding.set(ring1Cycle), 600);
    const timer2 = setTimeout(() => ring2Padding.set(ring2Cycle), 800);

    // Пульсация колец с интервалом
    const pulseInterval = setInterval(() => {
      cycleRing1();
      cycleRing2();
      ring1Padding.set(ring1Cycle);
      ring2Padding.set(ring2Cycle);
    }, 1500); // Пульсация каждые 1.5 секунды

    return () => {
      clearTimeout(timeout);
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(pulseInterval);
    };
  }, [ring1Padding, ring2Padding, ring1Cycle, ring2Cycle, cycleRing1, cycleRing2]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-amber-500 z-50">
        {/* Логотип с пульсирующими кольцами */}
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white/20 rounded-full absolute "
          style={{ padding: ring2Padding }}
        >
          <motion.div className="  bg-white/20 rounded-full" style={{ padding: ring1Padding }}>
            <Image
              src={logo}
              alt="Логотип"
              width={200}
              height={200}
              style={{ objectFit: 'cover' }}
              className="rotate-[-90deg]"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed  inset-0 flex flex-col items-center justify-center bg-amber-500 z-50 space-y-10">
      {/* Логотип с пульсирующими кольцами */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white/20 rounded-full absolute "
        style={{ padding: ring2Padding }}
      >
        <motion.div className="  bg-white/20 rounded-full" style={{ padding: ring1Padding }}>
          <Image
            src={logo}
            alt="Логотип"
            width={200}
            height={200}
            style={{ objectFit: 'cover' }}
            className="rotate-[-90deg]"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Заголовок и слоган */}
      <div className="flex flex-col pt-100 items-center justify-center space-y-2">
        <motion.h1
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.3, type: 'spring' }}
          style={{ fontSize: 70, ...shadowText({ theme: 'dark' }) }}
          className="font-bold text-white tracking-widest"
        >
          Food
        </motion.h1>
        <motion.p
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.3, type: 'spring' }}
          style={{ fontSize: 20, ...shadowText({ theme: 'dark' }) }}
          className="font-bold text-white tracking-widest mb-10"
        >
          Food is always right
        </motion.p>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, type: 'spring' }}
        >
          <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
        </motion.div>
      </div>
    </div>
  );
}
