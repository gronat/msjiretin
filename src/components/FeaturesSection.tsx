"use client";

import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  alpha,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { School, People, EmojiEvents, Favorite } from "@mui/icons-material";
import { useThemePreset } from "@/components/ThemeRegistry";
import { applyCzechTypography } from "@/lib/czechTypography";
import { ReactNode } from "react";

type StaffRoleDisplay = {
  name: string;
  members: string[];
};

interface FeatureItem {
  icon: typeof School;
  title: string;
  description: string;
  emoji: string;
  expandedContent: ReactNode;
}

export default function FeaturesSection({
  staffRoles = [],
}: {
  staffRoles?: StaffRoleDisplay[];
}) {
  const theme = useTheme();
  const { currentPreset } = useThemePreset();
  const features: FeatureItem[] = [
    {
      icon: School,
      title: "Moderní výuka",
      description: "Podnětné vzdělávací programy přizpůsobené potřebám dětí",
      emoji: "📚",
      expandedContent: (
        <Typography variant="body2" color="text.secondary">
          {applyCzechTypography(
            "Vzdělávací programy přizpůsobujeme věku, schopnostem i zájmům dětí. Učení probíhá hravou a smysluplnou formou.",
          )}
        </Typography>
      ),
    },
    {
      icon: People,
      title: "Kvalifikovaný tým",
      description: "Zkušení pedagogové\ns láskou k dětem\n\u00A0",
      emoji: "👩‍🏫",
      expandedContent: (
        <Box>
          {staffRoles.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              {applyCzechTypography("Zatím nejsou uvedeni žádní zaměstnanci.")}
            </Typography>
          ) : (
            staffRoles.map((role, index) => (
              <Box
                key={`${role.name}-${index}`}
                sx={{ mb: index === staffRoles.length - 1 ? 0 : 2 }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, color: "primary.main" }}
                >
                  {applyCzechTypography(role.name)}
                </Typography>
                {role.members.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    —
                  </Typography>
                ) : (
                  role.members.map((member) => (
                    <Typography
                      key={member}
                      variant="body2"
                      color="text.secondary"
                    >
                      {applyCzechTypography(member)}
                    </Typography>
                  ))
                )}
              </Box>
            ))
          )}
        </Box>
      ),
    },
    {
      icon: EmojiEvents,
      title: "Rozvoj osobnosti",
      description: "Podpora samostatnosti\na sebevědomí dětí\n\u00A0",
      emoji: "🌟",
      expandedContent: (
        <Typography variant="body2" color="text.secondary">
          {applyCzechTypography(
            "Respektujeme individualitu každého dítěte a pomáháme mu rozvíjet jeho silné stránky.",
          )}
        </Typography>
      ),
    },
    {
      icon: Favorite,
      title: "Rodinné prostředí",
      description: "Bezpečné a laskavé zázemí\npro vaše děti\n\u00A0",
      emoji: "❤️",
      expandedContent: (
        <Typography variant="body2" color="text.secondary">
          {applyCzechTypography(
            "U nás je školka místem, kde se děti cítí jako doma – s respektem a pochopením.",
          )}
        </Typography>
      ),
    },
  ];

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${alpha(theme.palette.primary.main, 0.03)} 50%, ${theme.palette.background.default} 100%)`,
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            component="h2"
            sx={{
              mb: 2,
              fontFamily: currentPreset.typography.headingFontFamily,
            }}
          >
            Proč si vybrat naši školku?
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Nabízíme dětem bezpečné prostředí, kde mohou růst, učit se a
            objevovat svět kolem sebe.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 4,
            alignItems: "start",
          }}
        >
          {features.map((feature) => (
            <Box
              key={feature.title}
              sx={{
                position: "relative",
                // Reserve space for expanded content
                minHeight: { xs: "auto", lg: 280 },
              }}
            >
              <Card
                sx={{
                  textAlign: "center",
                  p: 1,
                  height: "100%",
                  cursor: "default",
                  position: "relative",
                  zIndex: 1,
                  transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  // Expanded content - hidden by default
                  "& .expanded-content": {
                    maxHeight: 0,
                    opacity: 0,
                    overflow: "hidden",
                    transition: "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                  },
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: currentPreset.custom.cardHoverShadow,
                    zIndex: 10,
                    // Show expanded content on hover
                    "& .expanded-content": {
                      maxHeight: 420,
                      opacity: 1,
                    },
                  },
                }}
              >
                <CardContent
                  sx={{
                    py: 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      mx: "auto",
                      mb: 3,
                      borderRadius:
                        currentPreset.components.card.borderRadius / 8,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        currentPreset.custom.accentGradient ||
                        `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                      fontSize: "2.5rem",
                    }}
                  >
                    {feature.emoji}
                  </Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      fontFamily: currentPreset.typography.headingFontFamily,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.7,
                      minHeight: 56,
                      whiteSpace: "pre-line",
                    }}
                  >
                    {applyCzechTypography(feature.description)}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />

                  {/* Expanded content - "toaster" that slides out */}
                  <Box className="expanded-content">
                    <Divider sx={{ my: 2 }} />
                    {feature.expandedContent}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
