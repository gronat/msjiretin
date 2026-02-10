export type ThemePresetName = 'forest' | 'nordic' | 'candy' | 'sunset'

export interface ThemePreset {
  label: string
  emoji: string
  palette: {
    mode: 'light' | 'dark'
    primary: { main: string; light?: string; dark?: string; contrastText?: string }
    secondary: { main: string; light?: string; dark?: string; contrastText?: string }
    background: { default: string; paper: string }
    text?: { primary?: string; secondary?: string }
    divider?: string
    success?: { main: string }
    warning?: { main: string }
    error?: { main: string }
  }
  typography: {
    fontFamily: string
    headingFontFamily?: string
    h1: { fontSize: string; fontWeight: number; letterSpacing?: string; lineHeight?: number }
    h2: { fontSize: string; fontWeight: number; letterSpacing?: string; lineHeight?: number }
    h3: { fontSize: string; fontWeight: number; letterSpacing?: string; lineHeight?: number }
    h4?: { fontSize: string; fontWeight: number }
    body1: { fontSize: string; lineHeight?: number }
    body2?: { fontSize: string; lineHeight?: number }
    button?: { fontSize: string; fontWeight: number; letterSpacing?: string }
  }
  shape: {
    borderRadius: number
  }
  components: {
    card: {
      borderRadius: number
      boxShadow: string
      border?: string
      backdropFilter?: string
      background?: string
    }
    button: {
      borderRadius: number
      boxShadow?: string
      border?: string
      hoverTransform?: string
    }
    appBar: {
      background: string
      boxShadow?: string
      backdropFilter?: string
      border?: string
    }
    chip?: {
      borderRadius: number
      fontWeight: number
    }
  }
  custom: {
    heroGradient?: string
    accentGradient?: string
    cardHoverShadow?: string
    glassEffect?: boolean
    warmAccent?: string
    coolAccent?: string
  }
}

export const themePresets: Record<ThemePresetName, ThemePreset> = {
  // ═══════════════════════════════════════════════════════════════════════════
  // 🌲 FOREST — Přírodní, uklidňující, profesionální
  // ═══════════════════════════════════════════════════════════════════════════
  forest: {
    label: 'Lesní',
    emoji: '🌲',
    palette: {
      mode: 'light',
      primary: { 
        main: '#1b4332', 
        light: '#2d6a4f',
        dark: '#081c15',
        contrastText: '#ffffff'
      },
      secondary: { 
        main: '#d4a373', 
        light: '#e9c46a',
        dark: '#bc6c25',
        contrastText: '#1b4332'
      },
      background: { 
        default: '#fefae0', 
        paper: '#ffffff' 
      },
      text: {
        primary: '#1b4332',
        secondary: '#40916c'
      },
      divider: 'rgba(27, 67, 50, 0.12)',
      success: { main: '#52b788' },
      warning: { main: '#e9c46a' },
      error: { main: '#bc4749' }
    },
    typography: {
      fontFamily: '"DM Sans", "Helvetica", "Arial", sans-serif',
      headingFontFamily: '"Outfit", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1 },
      h2: { fontSize: '2.25rem', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.2 },
      h3: { fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.3 },
      h4: { fontSize: '1.25rem', fontWeight: 600 },
      body1: { fontSize: '1.0625rem', lineHeight: 1.7 },
      body2: { fontSize: '0.9375rem', lineHeight: 1.6 },
      button: { fontSize: '0.9375rem', fontWeight: 600, letterSpacing: '0.02em' }
    },
    shape: { borderRadius: 12 },
    components: {
      card: {
        borderRadius: 16,
        boxShadow: '0 4px 20px rgba(27, 67, 50, 0.08), 0 1px 3px rgba(27, 67, 50, 0.06)',
        border: '1px solid rgba(27, 67, 50, 0.06)',
      },
      button: {
        borderRadius: 10,
        boxShadow: '0 2px 8px rgba(27, 67, 50, 0.15)',
        hoverTransform: 'translateY(-1px)',
      },
      appBar: {
        background: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%)',
        boxShadow: '0 4px 20px rgba(27, 67, 50, 0.2)',
      },
      chip: { borderRadius: 8, fontWeight: 600 }
    },
    custom: {
      heroGradient: 'linear-gradient(165deg, #fefae0 0%, #e9edc9 50%, #ccd5ae 100%)',
      accentGradient: 'linear-gradient(135deg, #52b788 0%, #40916c 100%)',
      cardHoverShadow: '0 12px 40px rgba(27, 67, 50, 0.15)',
      warmAccent: '#d4a373',
      coolAccent: '#52b788'
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // ❄️ NORDIC — Minimalistický, čistý, moderní
  // ═══════════════════════════════════════════════════════════════════════════
  nordic: {
    label: 'Severský',
    emoji: '❄️',
    palette: {
      mode: 'light',
      primary: { 
        main: '#2e4057', 
        light: '#4a6fa5',
        dark: '#1a2639',
        contrastText: '#ffffff'
      },
      secondary: { 
        main: '#5c8eb5', 
        light: '#a8d5e2',
        dark: '#3d6b8f',
        contrastText: '#ffffff'
      },
      background: { 
        default: '#d5dde6', 
        paper: '#e8ecf1' 
      },
      text: {
        primary: '#1e293b',
        secondary: '#4a5568'
      },
      divider: 'rgba(100, 116, 139, 0.18)',
      success: { main: '#10b981' },
      warning: { main: '#f59e0b' },
      error: { main: '#ef4444' }
    },
    typography: {
      fontFamily: '"Lexend", "Helvetica", "Arial", sans-serif',
      headingFontFamily: '"Lexend", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: '2.75rem', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.15 },
      h2: { fontSize: '2rem', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.25 },
      h3: { fontSize: '1.5rem', fontWeight: 500, lineHeight: 1.35 },
      h4: { fontSize: '1.125rem', fontWeight: 500 },
      body1: { fontSize: '1rem', lineHeight: 1.75 },
      body2: { fontSize: '0.875rem', lineHeight: 1.65 },
      button: { fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.01em' }
    },
    shape: { borderRadius: 8 },
    components: {
      card: {
        borderRadius: 12,
        boxShadow: '0 1px 3px rgba(30, 41, 59, 0.06), 0 4px 16px rgba(30, 41, 59, 0.06)',
        border: '1px solid rgba(148, 163, 184, 0.25)',
      },
      button: {
        borderRadius: 8,
        boxShadow: 'none',
        border: '1px solid transparent',
        hoverTransform: 'none',
      },
      appBar: {
        background: 'rgba(232, 236, 241, 0.9)',
        backdropFilter: 'blur(12px) saturate(180%)',
        boxShadow: '0 1px 0 rgba(148, 163, 184, 0.3)',
        border: 'none',
      },
      chip: { borderRadius: 6, fontWeight: 500 }
    },
    custom: {
      heroGradient: 'linear-gradient(180deg, #cdd6e0 0%, #b8c4d1 100%)',
      accentGradient: 'linear-gradient(135deg, #5c8eb5 0%, #4a6fa5 100%)',
      cardHoverShadow: '0 4px 24px rgba(30, 41, 59, 0.12)',
      glassEffect: true,
      warmAccent: '#f59e0b',
      coolAccent: '#5c8eb5'
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🍬 CANDY — Hravý, pastelový, pro děti
  // ═══════════════════════════════════════════════════════════════════════════
  candy: {
    label: 'Bonbónový',
    emoji: '🍬',
    palette: {
      mode: 'light',
      primary: { 
        main: '#e879a9', 
        light: '#f8b4d0',
        dark: '#c85a8a',
        contrastText: '#ffffff'
      },
      secondary: { 
        main: '#7dd3c0', 
        light: '#a8e6cf',
        dark: '#5ab9a5',
        contrastText: '#2d3748'
      },
      background: { 
        default: '#fff5f8', 
        paper: '#ffffff' 
      },
      text: {
        primary: '#4a3f55',
        secondary: '#7c6f87'
      },
      divider: 'rgba(232, 121, 169, 0.15)',
      success: { main: '#7dd3c0' },
      warning: { main: '#ffc75f' },
      error: { main: '#ff6b6b' }
    },
    typography: {
      fontFamily: '"Quicksand", "Helvetica", "Arial", sans-serif',
      headingFontFamily: '"Fredoka", "Quicksand", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: '3.25rem', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.1 },
      h2: { fontSize: '2.5rem', fontWeight: 600, letterSpacing: '0', lineHeight: 1.2 },
      h3: { fontSize: '1.875rem', fontWeight: 500, lineHeight: 1.3 },
      h4: { fontSize: '1.375rem', fontWeight: 500 },
      body1: { fontSize: '1.0625rem', lineHeight: 1.7 },
      body2: { fontSize: '0.9375rem', lineHeight: 1.65 },
      button: { fontSize: '0.9375rem', fontWeight: 600, letterSpacing: '0.02em' }
    },
    shape: { borderRadius: 12 },
    components: {
      card: {
        borderRadius: 16,
        boxShadow: '0 8px 32px rgba(232, 121, 169, 0.12), 0 2px 8px rgba(232, 121, 169, 0.08)',
        border: '2px solid rgba(232, 121, 169, 0.1)',
      },
      button: {
        borderRadius: 24,
        boxShadow: '0 4px 16px rgba(232, 121, 169, 0.25)',
        hoverTransform: 'translateY(-2px) scale(1.02)',
      },
      appBar: {
        background: 'linear-gradient(90deg, #e879a9 0%, #f8b4d0 40%, #a8e6cf 80%, #7dd3c0 100%)',
        boxShadow: '0 4px 24px rgba(232, 121, 169, 0.3)',
      },
      chip: { borderRadius: 50, fontWeight: 600 }
    },
    custom: {
      heroGradient: 'linear-gradient(135deg, #fff5f8 0%, #fce4ec 30%, #e8f5e9 70%, #f3e5f5 100%)',
      accentGradient: 'linear-gradient(135deg, #e879a9 0%, #f8b4d0 50%, #7dd3c0 100%)',
      cardHoverShadow: '0 16px 48px rgba(232, 121, 169, 0.2)',
      warmAccent: '#ffc75f',
      coolAccent: '#7dd3c0'
    }
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 🌅 SUNSET — Teplý, energický, inspirativní
  // ═══════════════════════════════════════════════════════════════════════════
  sunset: {
    label: 'Západ slunce',
    emoji: '🌅',
    palette: {
      mode: 'light',
      primary: { 
        main: '#e85d04', 
        light: '#f48c06',
        dark: '#dc2f02',
        contrastText: '#ffffff'
      },
      secondary: { 
        main: '#9d4edd', 
        light: '#c77dff',
        dark: '#7b2cbf',
        contrastText: '#ffffff'
      },
      background: { 
        default: '#fef7f0', 
        paper: '#ffffff' 
      },
      text: {
        primary: '#370617',
        secondary: '#6a040f'
      },
      divider: 'rgba(232, 93, 4, 0.12)',
      success: { main: '#06d6a0' },
      warning: { main: '#ffbe0b' },
      error: { main: '#dc2f02' }
    },
    typography: {
      fontFamily: '"Poppins", "Helvetica", "Arial", sans-serif',
      headingFontFamily: '"Archivo", "Poppins", "Helvetica", "Arial", sans-serif',
      h1: { fontSize: '3rem', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.05 },
      h2: { fontSize: '2.25rem', fontWeight: 700, letterSpacing: '-0.01em', lineHeight: 1.15 },
      h3: { fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.25 },
      h4: { fontSize: '1.25rem', fontWeight: 600 },
      body1: { fontSize: '1.0625rem', lineHeight: 1.7 },
      body2: { fontSize: '0.9375rem', lineHeight: 1.65 },
      button: { fontSize: '0.9375rem', fontWeight: 600, letterSpacing: '0.03em' }
    },
    shape: { borderRadius: 12 },
    components: {
      card: {
        borderRadius: 16,
        boxShadow: '0 6px 24px rgba(232, 93, 4, 0.1), 0 2px 6px rgba(232, 93, 4, 0.06)',
        border: 'none',
        background: 'linear-gradient(135deg, #ffffff 0%, #fff8f5 100%)',
      },
      button: {
        borderRadius: 10,
        boxShadow: '0 4px 14px rgba(232, 93, 4, 0.3)',
        hoverTransform: 'translateY(-2px)',
      },
      appBar: {
        background: 'linear-gradient(135deg, #dc2f02 0%, #e85d04 30%, #f48c06 60%, #ffbe0b 100%)',
        boxShadow: '0 4px 24px rgba(232, 93, 4, 0.35)',
      },
      chip: { borderRadius: 10, fontWeight: 600 }
    },
    custom: {
      heroGradient: 'linear-gradient(135deg, #fef7f0 0%, #ffedd8 30%, #ffdab9 60%, #ffe8d6 100%)',
      accentGradient: 'linear-gradient(135deg, #dc2f02 0%, #e85d04 40%, #f48c06 70%, #ffbe0b 100%)',
      cardHoverShadow: '0 16px 48px rgba(232, 93, 4, 0.18)',
      warmAccent: '#f48c06',
      coolAccent: '#9d4edd'
    }
  }
}
