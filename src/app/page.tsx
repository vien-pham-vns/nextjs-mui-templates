import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import ProTip from '@/components/ProTip';

export default function Home() {
    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Link
                    href="/about"
                    color="secondary"
                    component={NextLink}
                    sx={{
                        color: 'var(--mui-palette-tertiary-main)',
                    }}
                >
                    Go to the about page
                </Link>
                <ProTip />
            </Box>
        </Container>
    );
}
