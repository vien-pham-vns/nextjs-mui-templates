import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NextLink from 'next/link';
import ProTip from '@/components/ProTip';
import Copyright from '@/components/Copyright';

export default function About() {
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
                <Box sx={{ maxWidth: 'sm' }}>
                    <Button variant="contained" component={NextLink} href="/">
                        Go to the home page
                    </Button>
                </Box>
                <ProTip />
                <Copyright />
            </Box>
        </Container>
    );
}
