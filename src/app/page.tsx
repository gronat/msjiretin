import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import LinkButton from "@/components/LinkButton";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import PhilosophySection from "@/components/PhilosophySection";
import PaymentSection from "@/components/PaymentSection";
import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { ensureStaffRoles } from "@/lib/staff";

export const dynamic = "force-dynamic";

export default async function Home() {
  noStore();
  await ensureStaffRoles();
  type StaffRoleData = {
    name: string;
    order: number;
    members: { name: string }[];
  };
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    take: 3,
  });
  const staffRoles = (await (
    prisma as unknown as { staffRole: { findMany: Function } }
  ).staffRole.findMany({
    orderBy: { order: "asc" },
    include: { members: { orderBy: { order: "asc" } } },
  })) as StaffRoleData[];
  const staffRolesDisplay = staffRoles.map((role) => ({
    name: role.name,
    members: role.members.map((member) => member.name),
  }));

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Noticeboard Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="h3" component="h2">
            📰 Aktuality
          </Typography>
          <LinkButton href="/aktuality" variant="outlined">
            Více aktualit
          </LinkButton>
        </Box>
        <Divider sx={{ mb: 4 }} />

        {posts.length === 0 ? (
          <Typography variant="body1" color="text.secondary">
            Zatím zde nejsou žádné aktuality. Přidejte první zprávu v
            administraci.
          </Typography>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
              gap: 3,
            }}
          >
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/aktuality/${post.slug}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    height: "100%",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      transform: "translateY(-4px)",
                    },
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        display: "inline-block",
                        mb: 1.5,
                        backgroundColor: "action.hover",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontWeight: 500,
                      }}
                    >
                      {new Date(
                        post.publishedAt ?? post.createdAt,
                      ).toLocaleDateString("cs-CZ", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </Typography>
                    <Typography
                      variant="h6"
                      gutterBottom
                      color="text.primary"
                      sx={{ fontWeight: 600 }}
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ lineHeight: 1.7 }}
                    >
                      {(post.excerpt ?? post.content).slice(0, 140) + "..."}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </Box>
        )}
      </Container>

      {/* Philosophy Section */}
      <PhilosophySection />

      {/* Features Section */}
      <FeaturesSection staffRoles={staffRolesDisplay} />

      {/* Payment Info Section */}
      <PaymentSection />
    </>
  );
}
