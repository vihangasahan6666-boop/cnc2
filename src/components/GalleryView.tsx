import { motion } from 'motion/react';

export default function GalleryView() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="min-h-[50vh] flex flex-col justify-center items-center"
    >
      {/* Intentionally left blank for now */}
    </motion.div>
  );
}
