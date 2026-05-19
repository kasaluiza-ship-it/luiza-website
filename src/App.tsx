import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Mail, MapPin, Menu, X, ChevronRight, Phone, Mic, GraduationCap, Globe, Heart, Star } from 'lucide-react';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate hero background
  const heroImages = [
    '/images/luiza-hero.jpg',
    '/images/luiza-fur.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Vocal Lessons', href: '#lessons' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    setIsMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-rose-900/50">

      {/* ─── NAVIGATION ─── */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }}
            className="text-xl tracking-[0.3em] uppercase font-light">
            Luiza <span className="font-semibold">Kasa</span>
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                className="text-xs uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-300">
                {link.name}
              </a>
            ))}
            <a href="mailto:kasaluiza@gmail.com"
              className="text-xs uppercase tracking-[0.2em] border border-white/30 px-5 py-2 hover:bg-white hover:text-black transition-all duration-300">
              Book Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg flex items-center justify-center md:hidden"
          >
            <div className="flex flex-col space-y-8 text-center">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className="text-2xl uppercase tracking-[0.3em] font-light text-white/80 hover:text-white">
                  {link.name}
                </a>
              ))}
              <a href="mailto:kasaluiza@gmail.com"
                className="text-sm uppercase tracking-[0.2em] border border-white/30 px-8 py-3 mt-4 hover:bg-white hover:text-black transition-all">
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── HERO ─── */}
      <section id="home" className="relative h-screen flex items-end overflow-hidden">
        {/* Background images with crossfade */}
        {heroImages.map((img, idx) => (
          <div key={idx}
            className={`absolute inset-0 transition-opacity duration-[2000ms] ${idx === activeImage ? 'opacity-100' : 'opacity-0'}`}>
            <img src={img} alt="Luiza Kasa" className="w-full h-full object-cover object-top" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20 md:pb-28 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <div className="flex items-center space-x-3 mb-4">
              <span className="w-8 h-[1px] bg-rose-400" />
              <p className="text-rose-400 text-xs uppercase tracking-[0.4em]">Opera & Pop Singer</p>
            </div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] mb-6">
              Luiza<br />Kasa
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-md mb-8 font-light">
              Expressive voice. Elegant presence.<br />Music beyond genres.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a href="#contact"
                onClick={(e) => { e.preventDefault(); scrollToSection('#contact'); }}
                className="inline-flex items-center space-x-2 bg-white text-black px-8 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-rose-400 hover:text-white transition-all duration-300">
                <span>Get in Touch</span>
                <ChevronRight size={14} />
              </a>
              <div className="flex items-center space-x-2 text-white/40 text-sm">
                <MapPin size={14} />
                <span>Linz, Austria</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 md:py-36 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img src="/images/luiza-closeup.jpg" alt="Luiza Kasa portrait"
                className="w-full aspect-[3/4] object-cover" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-rose-400/30" />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <span className="w-8 h-[1px] bg-rose-400" />
                <p className="text-rose-400 text-xs uppercase tracking-[0.4em]">About</p>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Born in Albania.<br />
                <span className="text-white/40">Shaped by the world.</span>
              </h2>

              <div className="space-y-5 text-white/60 leading-relaxed text-[15px]">
                <p>
                  Luiza Kasa is a classically trained soprano and versatile singer based in Linz, Austria. Born and raised in Albania, she moved to Austria six years ago in pursuit of deeper musical knowledge and artistic growth.
                </p>
                <p>
                  She holds a Master's degree in Classical Singing from the University of Arts in Tirana and is currently studying Elemental Music Pedagogy at the Anton Bruckner Private University in Linz. Her artistic work combines technical precision with emotional depth, creating a strong and captivating stage presence.
                </p>
                <p>
                  Luiza has performed as a soloist in opera productions, concerts, and live events across Austria, Germany, Albania, and Kosovo. Her sound draws from classical training but is deeply influenced by the soulful expressiveness of artists like Amy Winehouse, Adele, Olivia Dean, and Norah Jones.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-white/10">
                <div>
                  <p className="text-3xl font-bold text-white">5+</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Languages</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">4</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Countries</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">MA</p>
                  <p className="text-xs text-white/40 uppercase tracking-widest mt-1">Classical Singing</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── MUSICAL IDENTITY ─── */}
      <section className="py-24 md:py-32 bg-[#111]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

            {/* Text Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <span className="w-8 h-[1px] bg-rose-400" />
                <p className="text-rose-400 text-xs uppercase tracking-[0.4em]">Musical Identity</p>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                Where opera meets<br />
                <span className="text-white/40">soul & pop.</span>
              </h2>

              <p className="text-white/60 leading-relaxed text-[15px] mb-10">
                Luiza's repertoire bridges worlds — from Mozart and Puccini to the raw emotional power of Amy Winehouse and Adele. She performs opera, jazz, pop, and contemporary music in live and studio settings, always bringing a unique depth that transcends genre.
              </p>

              {/* Influences */}
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/30 mb-4">Inspired by</p>
                {['Amy Winehouse', 'Adele', 'Olivia Dean', 'Norah Jones'].map((artist) => (
                  <div key={artist} className="flex items-center space-x-3 text-white/50 hover:text-white transition-colors group">
                    <Heart size={12} className="text-rose-400/50 group-hover:text-rose-400 transition-colors" />
                    <span className="text-sm tracking-wide">{artist}</span>
                  </div>
                ))}
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-3 mt-10">
                {['Opera', 'Classical', 'Pop', 'Jazz', 'Soul'].map((genre) => (
                  <span key={genre}
                    className="text-xs uppercase tracking-[0.2em] border border-white/15 px-4 py-2 text-white/50 hover:border-rose-400/50 hover:text-rose-400 transition-all duration-300 cursor-default">
                    {genre}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Image Right */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img src="/images/luiza-standing.jpg" alt="Luiza Kasa performing"
                className="w-full aspect-[3/4] object-cover" />
              <div className="absolute -top-4 -left-4 w-24 h-24 border border-rose-400/30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── QUOTE ─── */}
      <section className="relative py-32 md:py-44 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/luiza-fur.jpg" alt="" className="w-full h-full object-cover object-top opacity-30" />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Music className="mx-auto mb-8 text-rose-400" size={32} />
            <h3 className="text-2xl md:text-4xl lg:text-5xl font-light italic leading-snug mb-8 text-white/90">
              "Music is the language that transcends all borders — connecting the soul of the performer to the heart of the listener."
            </h3>
            <div className="flex items-center justify-center space-x-3">
              <span className="w-6 h-[1px] bg-rose-400" />
              <p className="text-xs uppercase tracking-[0.4em] text-rose-400">Luiza Kasa</p>
              <span className="w-6 h-[1px] bg-rose-400" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── VOCAL LESSONS ─── */}
      <section id="lessons" className="py-24 md:py-36 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <span className="w-8 h-[1px] bg-rose-400" />
              <p className="text-rose-400 text-xs uppercase tracking-[0.4em]">Vocal Lessons</p>
              <span className="w-8 h-[1px] bg-rose-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Find Your Voice
            </h2>
            <p className="text-white/50 text-[15px] leading-relaxed">
              Alongside her performance career, Luiza is an experienced vocal coach offering singing lessons for beginners and advanced students. Her teaching focuses on vocal technique, confidence, and artistic expression.
            </p>
          </motion.div>

          {/* Lesson Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Mic size={24} />,
                title: 'Classical & Pop',
                desc: 'Training in both classical technique and contemporary pop styles. From opera arias to soulful ballads — expand your vocal range across genres.'
              },
              {
                icon: <GraduationCap size={24} />,
                title: 'All Levels',
                desc: 'Lessons for children, teenagers, and adults at every skill level. Whether you\'re just starting out or refining your craft, there\'s a path for you.'
              },
              {
                icon: <Globe size={24} />,
                title: 'In Person & Online',
                desc: 'Available for in-person sessions in Linz or online via video call. Flexible scheduling to fit your lifestyle wherever you are in the world.'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="group border border-white/10 p-8 hover:border-rose-400/30 transition-all duration-500 bg-white/[0.02]"
              >
                <div className="text-rose-400 mb-6">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-3 tracking-wide">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a href="mailto:kasaluiza@gmail.com"
              className="inline-flex items-center space-x-2 border border-white/20 px-8 py-3.5 text-xs uppercase tracking-[0.2em] hover:bg-rose-400 hover:border-rose-400 hover:text-white transition-all duration-300">
              <span>Book a Trial Lesson</span>
              <ChevronRight size={14} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── LANGUAGES ─── */}
      <section className="py-16 bg-[#111] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <p className="text-xs uppercase tracking-[0.4em] text-white/30">Languages</p>
            {['German', 'English', 'Albanian', 'Italian', 'Spanish'].map((lang, idx) => (
              <div key={lang} className="flex items-center space-x-4">
                <span className="text-sm text-white/60 tracking-wide">{lang}</span>
                {idx < 4 && <span className="hidden md:block w-[1px] h-4 bg-white/15 ml-4" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-24 md:py-36 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 md:gap-20">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <span className="w-8 h-[1px] bg-rose-400" />
                <p className="text-rose-400 text-xs uppercase tracking-[0.4em]">Contact</p>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Let's Create<br />
                <span className="text-white/40">Something Beautiful</span>
              </h2>

              <p className="text-white/50 text-[15px] leading-relaxed mb-12 max-w-md">
                Available for gala performances, private events, opera productions, studio recordings, and vocal lessons. Based in Linz, available for international engagements.
              </p>

              <div className="space-y-6">
                <a href="mailto:kasaluiza@gmail.com" className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-rose-400 group-hover:bg-rose-400 group-hover:text-white group-hover:border-rose-400 transition-all duration-300">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Email</p>
                    <p className="text-white/80 group-hover:text-white transition-colors">kasaluiza@gmail.com</p>
                  </div>
                </a>

                <a href="tel:+4367763488993" className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-rose-400 group-hover:bg-rose-400 group-hover:text-white group-hover:border-rose-400 transition-all duration-300">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Phone</p>
                    <p className="text-white/80 group-hover:text-white transition-colors">+43 677 634 889 93</p>
                  </div>
                </a>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center text-rose-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.3em]">Based In</p>
                    <p className="text-white/80">Linz, Austria</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right — Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2">Name</label>
                    <input type="text"
                      className="w-full bg-white/[0.03] border border-white/10 px-4 py-3.5 text-sm text-white placeholder-white/20 focus:border-rose-400/50 focus:outline-none transition-colors" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2">Email</label>
                    <input type="email"
                      className="w-full bg-white/[0.03] border border-white/10 px-4 py-3.5 text-sm text-white placeholder-white/20 focus:border-rose-400/50 focus:outline-none transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2">Subject</label>
                  <input type="text"
                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-3.5 text-sm text-white placeholder-white/20 focus:border-rose-400/50 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2">Message</label>
                  <textarea rows={5}
                    className="w-full bg-white/[0.03] border border-white/10 px-4 py-3.5 text-sm text-white placeholder-white/20 focus:border-rose-400/50 focus:outline-none transition-colors resize-none" />
                </div>
                <button type="submit"
                  className="w-full bg-white text-black py-4 text-xs uppercase tracking-[0.25em] hover:bg-rose-400 hover:text-white transition-all duration-300 font-medium">
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-10 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs tracking-widest">
            &copy; {new Date().getFullYear()} Luiza Kasa. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-white/20 text-xs">
            <Star size={10} className="text-rose-400/50" />
            <span className="tracking-widest">Expressive voice. Elegant presence. Music beyond genres.</span>
            <Star size={10} className="text-rose-400/50" />
          </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
