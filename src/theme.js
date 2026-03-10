// Advanced UI Theme Configuration
export const theme = {
  colors: {
    primary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    accent: {
      50: '#fef7ff',
      100: '#fce7ff',
      200: '#f8d4fe',
      300: '#f0abfc',
      400: '#e879f9',
      500: '#d946ef',
      600: '#c026d3',
      700: '#a21caf',
      800: '#86198f',
      900: '#701a75',
    },
    success: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    warning: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    error: {
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    }
  },
  gradients: {
    primary: 'bg-gradient-to-r from-gray-900 via-black to-gray-900',
    accent: 'bg-gradient-to-r from-purple-600 to-pink-600',
    success: 'bg-gradient-to-r from-green-500 to-emerald-600',
    warning: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    error: 'bg-gradient-to-r from-red-500 to-rose-600',
    glass: 'bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg',
  },
  shadows: {
    glow: '0 0 20px rgba(139, 92, 246, 0.3)',
    glowHover: '0 0 30px rgba(139, 92, 246, 0.5)',
    card: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    cardHover: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  animations: {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    bounce: 'animate-bounce-gentle',
    pulse: 'animate-pulse-soft',
  }
};

export const glassmorphism = {
  light: 'bg-white/10 backdrop-blur-sm border border-white/20',
  dark: 'bg-black/10 backdrop-blur-sm border border-white/10',
  card: 'bg-white/10 backdrop-blur-sm border border-white/20',
};

export const neumorphism = {
  light: 'bg-gray-100 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]',
  dark: 'bg-gray-800 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.1),inset_2px_2px_6px_rgba(0,0,0,0.8)]',
  button: 'shadow-[6px_6px_12px_rgba(0,0,0,0.15),-6px_-6px_12px_rgba(255,255,255,0.7)] hover:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15),inset_-2px_-2px_6px_rgba(255,255,255,0.7)]',
};

export const modernCard = {
  base: 'bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200',
  dark: 'bg-gray-900 border border-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200',
  glass: 'bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200',
};

export const buttonStyles = {
  primary: 'bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-200',
  secondary: 'bg-white text-black font-bold py-3 px-6 rounded-lg border-2 border-black hover:bg-gray-100 transition-colors duration-200',
  accent: 'bg-black text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-200',
  glass: 'bg-white/10 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-lg border border-white/20 hover:bg-white/20 transition-colors duration-200',
};

export const inputStyles = {
  modern: 'w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300',
  glass: 'w-full px-4 py-3 bg-white/10 backdrop-blur-lg border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300',
  neumorphic: 'w-full px-4 py-3 bg-gray-100 border-none rounded-xl shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15),inset_-2px_-2px_6px_rgba(255,255,255,0.7)] focus:outline-none focus:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.15),inset_-4px_-4px_8px_rgba(255,255,255,0.7)] transition-all duration-300',
};

export const cardVariants = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  }
};

export const pageTransitions = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: "easeInOut" }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};