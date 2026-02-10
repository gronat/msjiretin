import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material'
import { Article, Photo, Description, People } from '@mui/icons-material'
import { prisma } from '@/lib/prisma'

export default async function AdminDashboard() {
  const [postsCount, photosCount, documentsCount, usersCount] = await Promise.all([
    prisma.post.count(),
    prisma.photo.count(),
    prisma.document.count(),
    prisma.user.count(),
  ])

  const stats = [
    { label: 'Příspěvky', count: postsCount, icon: <Article />, color: '#2e7d32' },
    { label: 'Fotografie', count: photosCount, icon: <Photo />, color: '#1976d2' },
    { label: 'Dokumenty', count: documentsCount, icon: <Description />, color: '#ed6c02' },
    { label: 'Uživatelé', count: usersCount, icon: <People />, color: '#9c27b0' },
  ]

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ mb: 4 }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: stat.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      mr: 2,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {stat.count}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Card sx={{ mt: 4, p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Vítejte v administraci
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Zde můžete spravovat obsah webových stránek mateřské školy. Použijte menu nahoře pro navigaci 
          mezi jednotlivými sekcemi.
        </Typography>
      </Card>
    </Container>
  )
}

