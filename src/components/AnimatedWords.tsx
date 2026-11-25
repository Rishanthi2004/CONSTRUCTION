import { motion } from 'motion/react';

interface AnimatedWordsProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  immediate?: boolean;
  delay?: number;
  stagger?: number;
  duration?: number;
}

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function AnimatedWords({
  text,
  as = 'h2',
  className = '',
  immediate = false,
  delay = 0,
  stagger = 0.045,
  duration = 0.52,
}: AnimatedWordsProps) {
  const words = text.split(' ');
  const MotionTag = motion[as];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 18,
      filter: 'blur(3px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: EASE_OUT_EXPO,
      },
    },
  };

  if (immediate) {
    return (
      <MotionTag
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={className}
      >
        {words.map((word, index) => (
          <span
            key={`${word}-${index}`}
            className="inline-block overflow-hidden align-bottom mr-[0.25em] last:mr-0 pb-[0.06em]"
          >
            <motion.span variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={className}
    >
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom mr-[0.25em] last:mr-0 pb-[0.06em]"
        >
          <motion.span variants={wordVariants} className="inline-block">
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
