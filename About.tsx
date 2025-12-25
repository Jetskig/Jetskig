import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Star } from 'lucide-react';

const stats = [
  { label: 'İndirme', value: '1M+', Icon: Users },
  { label: 'Puan', value: '4.8', Icon: Star },
  { label: 'Ödül', value: '15+', Icon: Trophy },
];

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-off-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Hakkımızda</h2>
            <p className="text-lg text-gray-400 mb-6 leading-relaxed">
              Jetskig, mobil oyun dünyasında gürültüden uzak, saf oyun deneyimine odaklanan bağımsız bir stüdyodur.
            </p>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Amacımız karmaşık mekanikleri basitleştirerek oyunculara akıcı ve bağımlılık yapıcı deneyimler sunmak. "TaşKağıtMakas" ve "NeKal" ile başladığımız bu yolculukta, her geçen gün büyüyen topluluğumuzla yeni dünyalar keşfediyoruz.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-dark-gray p-6 rounded-2xl text-center border border-white/5 hover:border-white/20 transition-colors"
              >
                <div className="text-white/80 flex justify-center mb-4">
                  <stat.Icon size={32} />
                </div>
                <div className="text-4xl font-black mb-2">{stat.value}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
