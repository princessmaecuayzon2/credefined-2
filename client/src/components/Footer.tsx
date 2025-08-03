import { motion } from 'framer-motion';

export const Footer = () => (
   <motion.div
         className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20"
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 2 }}
       >
         <div className="text-slate-400 text-sm text-center">
           © {new Date().getFullYear()} Creative Redefined
         </div>
       </motion.div>
);