'use client'

import { createTheme, ThemeProvider, alpha } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { ReactNode, useEffect, useMemo, useState, createContext, useContext } from 'react'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter'
import { themePresets, ThemePresetName, ThemePreset } from '@/components/theme/themePresets'

type ThemeContextValue = {
  themeName: ThemePresetName
  setThemeName: (name: ThemePresetName) => void
  currentPreset: ThemePreset
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function useThemePreset() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useThemePreset must be used within ThemeRegistry')
  }
  return ctx
}

export default function ThemeRegistry({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemePresetName>('forest')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('msjiretin-theme') as ThemePresetName | null
    if (stored && themePresets[stored]) {
      setThemeName(stored)
    }
  }, [])

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('msjiretin-theme', themeName)
    }
  }, [themeName, mounted])

  const currentPreset = themePresets[themeName]

  const theme = useMemo(() => {
    const preset = themePresets[themeName]
    
    return createTheme({
      palette: {
        mode: preset.palette.mode,
        primary: preset.palette.primary,
        secondary: preset.palette.secondary,
        background: preset.palette.background,
        text: preset.palette.text,
        divider: preset.palette.divider,
        success: preset.palette.success,
        warning: preset.palette.warning,
        error: preset.palette.error,
      },
      typography: {
        fontFamily: preset.typography.fontFamily,
        h1: {
          fontFamily: preset.typography.headingFontFamily || preset.typography.fontFamily,
          ...preset.typography.h1,
        },
        h2: {
          fontFamily: preset.typography.headingFontFamily || preset.typography.fontFamily,
          ...preset.typography.h2,
        },
        h3: {
          fontFamily: preset.typography.headingFontFamily || preset.typography.fontFamily,
          ...preset.typography.h3,
        },
        h4: preset.typography.h4 ? {
          fontFamily: preset.typography.headingFontFamily || preset.typography.fontFamily,
          ...preset.typography.h4,
        } : undefined,
        body1: preset.typography.body1,
        body2: preset.typography.body2,
        button: preset.typography.button,
      },
      shape: {
        borderRadius: preset.shape.borderRadius,
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              scrollBehavior: 'smooth',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: preset.components.button.borderRadius,
              textTransform: 'none',
              fontWeight: preset.typography.button?.fontWeight || 600,
              letterSpacing: preset.typography.button?.letterSpacing || '0.02em',
              boxShadow: preset.components.button.boxShadow || 'none',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: preset.components.button.hoverTransform || 'none',
              },
            },
            contained: {
              boxShadow: preset.components.button.boxShadow || 'none',
              '&:hover': {
                boxShadow: preset.components.button.boxShadow 
                  ? preset.components.button.boxShadow.replace(/[\d.]+(?=\))/, (m) => String(Number(m) * 1.5))
                  : 'none',
              },
            },
            outlined: {
              borderWidth: '1.5px',
              '&:hover': {
                borderWidth: '1.5px',
              },
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: preset.components.card.borderRadius,
              boxShadow: preset.components.card.boxShadow,
              border: preset.components.card.border || 'none',
              backdropFilter: preset.components.card.backdropFilter,
              background: preset.components.card.background || preset.palette.background.paper,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              overflow: 'hidden',
              '&:hover': {
                boxShadow: preset.custom.cardHoverShadow || preset.components.card.boxShadow,
              },
            },
          },
        },
        MuiCardContent: {
          styleOverrides: {
            root: {
              padding: '24px',
              '&:last-child': {
                paddingBottom: '24px',
              },
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              background: preset.components.appBar.background,
              boxShadow: preset.components.appBar.boxShadow || 'none',
              backdropFilter: preset.components.appBar.backdropFilter,
              borderBottom: preset.components.appBar.border,
              // Fix text color for glass effect navbars
              ...(preset.custom.glassEffect && {
                color: preset.palette.text?.primary || '#1e293b',
              }),
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              borderRadius: preset.components.card.borderRadius,
              backgroundImage: 'none',
              overflow: 'hidden',
            },
            elevation1: {
              boxShadow: preset.components.card.boxShadow,
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: {
              borderRadius: preset.components.chip?.borderRadius || 8,
              fontWeight: preset.components.chip?.fontWeight || 500,
            },
          },
        },
        MuiTextField: {
          styleOverrides: {
            root: {
              '& .MuiOutlinedInput-root': {
                borderRadius: preset.components.button.borderRadius,
                transition: 'all 0.2s ease',
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: preset.palette.primary.main,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderWidth: '2px',
                },
              },
            },
          },
        },
        MuiLink: {
          styleOverrides: {
            root: {
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
          },
        },
        MuiIconButton: {
          styleOverrides: {
            root: {
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: alpha(preset.palette.primary.main, 0.08),
              },
            },
          },
        },
        MuiTooltip: {
          styleOverrides: {
            tooltip: {
              borderRadius: preset.components.button.borderRadius,
              fontSize: '0.8125rem',
              fontWeight: 500,
            },
          },
        },
        MuiDialog: {
          styleOverrides: {
            paper: {
              borderRadius: preset.components.card.borderRadius,
            },
          },
        },
        MuiMenu: {
          styleOverrides: {
            paper: {
              borderRadius: preset.components.button.borderRadius + 4,
              boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
              border: preset.components.card.border || `1px solid ${alpha(preset.palette.divider || '#000', 0.08)}`,
            },
          },
        },
        MuiMenuItem: {
          styleOverrides: {
            root: {
              borderRadius: preset.components.button.borderRadius - 2,
              margin: '2px 6px',
              padding: '10px 14px',
              transition: 'all 0.15s ease',
            },
          },
        },
        MuiDivider: {
          styleOverrides: {
            root: {
              borderColor: preset.palette.divider,
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            head: {
              fontWeight: 600,
              backgroundColor: alpha(preset.palette.primary.main, 0.04),
            },
          },
        },
      },
    })
  }, [themeName])

  return (
    <AppRouterCacheProvider>
      <ThemeContext.Provider value={{ themeName, setThemeName, currentPreset }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <style jsx global>{`
            ::selection {
              background: ${alpha(currentPreset.palette.primary.main, 0.25)};
              color: ${currentPreset.palette.text?.primary || '#000'};
            }
            ::-webkit-scrollbar {
              width: 10px;
            }
            ::-webkit-scrollbar-track {
              background: ${currentPreset.palette.background.default};
            }
            ::-webkit-scrollbar-thumb {
              background: ${alpha(currentPreset.palette.primary.main, 0.3)};
              border-radius: 5px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: ${alpha(currentPreset.palette.primary.main, 0.5)};
            }
          `}</style>
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    </AppRouterCacheProvider>
  )
}
