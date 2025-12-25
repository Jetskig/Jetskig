import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, HelpCircle, Download } from 'lucide-react';
import { Project } from '../types';

const games: Project[] = [
  {
    id: 'rps',
    title: 'Taş Kağıt Makas',
    description: 'Klasik oyunun modern, hızlı ve rekabetçi mobil hali. Arkadaşlarına meydan oku veya yapay zekaya karşı reflekslerini test et.',
    icon: 'scissors',
    tags: ['Arcade', 'Casual', 'Multiplayer'],
  },
  {
    id: 'nekal',
    title: 'NeKal',
    description: 'Zihninizi zorlayacak bulmaca deneyimi. Geriye ne kaldığını bulabilir misin? Minimalist tasarım, maksimum odaklanma.',
    icon: 'help',
    tags: ['Puzzle', 'Brain', 'Logic'],
  }
];

const GameCard: React.FC<{ game: Project; index: number }> = ({ game, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="group relative bg-dark-gray border border-white/10 rounded-2xl p-8 hover:bg-white hover:text-black transition-all duration-500 overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-5 transition-opacity">
        {game.icon === 'scissors' ? <Scissors size={120} /> : <HelpCircle size={120} />}
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="w-16 h-16 bg-white group-hover:bg-black rounded-xl flex items-center justify-center text-black group-hover:text-white mb-6 transition-colors shadow-lg">
           {game.icon === 'scissors' ? <Scissors size={32} /> : <HelpCircle size={32} />}
        </div>

        <h3 className="text-3xl font-bold mb-3">{game.title}</h3>
        <p className="text-gray-400 group-hover:text-gray-600 mb-8 flex-grow leading-relaxed">
          {game.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {game.tags.map(tag => (
            <span key={tag} className="text-xs px-3 py-1 rounded-full border border-white/20 group-hover:border-black/20 group-hover:text-black/70">
              {tag}
            </span>
          ))}
        </div>

        <button className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-white/10 group-hover:bg-black/10 group-hover:text-black font-semibold transition-all hover:scale-[1.02]">
          <Download size={18} />
          <span>İndir</span>
        </button>
      </div>
    </motion.div>
  );
};

const Games: React.FC = () => {
  return (
    <section id="games" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Oyunlarımız</h2>
          <div className="w-24 h-1 bg-white mb-8"></div>
          <p className="text-xl text-gray-400 max-w-2xl">
            Sadelik ve eğlenceyi ön planda tutan güncel projelerimiz.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {games.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Games;
