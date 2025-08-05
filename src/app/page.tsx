import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Link from 'next/link';

const Home: React.FC = async () => {
    const cards = [
        {
            title: 'Dashboard',
            description: 'View analytics and supply chain metrics',
            image: 'https://placehold.co/300x200?text=Dashboard',
            path: '/dashboard',
        },
        {
            title: 'Onboarding',
            description: 'Get started with the system',
            image: 'https://placehold.co/300x200?text=Onboarding',
            path: '/onboarding',
        },
        {
            title: 'Packaging house',
            description: 'System settings',
            image: 'https://placehold.co/300x200?text=PackagingHouse',
            path: '/management',
        },
    ];

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
                Propass Portal
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {cards.map((card, index) => (
                    <Grid key={index}>
                        <Link href={card.path} passHref style={{ textDecoration: 'none' }}>
                            <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <CardActionArea
                                    sx={{
                                        flexGrow: 1,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'stretch',
                                    }}
                                >
                                    <CardMedia component="img" height="200" image={card.image} alt={card.title} />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {card.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {card.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Home;
