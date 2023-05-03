import React from 'react'
import { Box, Stack, Button, Grid, useTheme, ButtonGroup, Paper } from '@mui/material'

export const QuizPage = () => {
    const theme = useTheme();
    return (
        <Stack sx={{
            alignItems: 'center',
            justifyContent: 'center'
        }} >
            <Box sx={{
                bgcolor: theme.palette.secondary.light,
                width: '800px',
                height: '500px',
                p: '16px',
                m: '50px'

            }}>
                <Paper
                    elevation={6}
                    sx={{
                        bgcolor: theme.palette.secondary.main,
                        padding: '20px'
                    }}>
                    <Grid container my={2}>
                        <Grid item xs={9} >Kategorie: Basketball</Grid>
                        <Grid item xs={3} >1000 Punkte</Grid>
                    </Grid>
                </Paper>
                <Box padding='20px'>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </Box>
            </Box>
            <Box sx={{
                bgcolor: theme.palette.secondary.light,
                p: '16px',
                width: '900px',
                m: theme.spacing(2)
            }}>
                <Grid container my={4} rowSpacing={2} columnSpacing={1} m={4}>
                    <Grid item xs={6} ><Button
                        bgcolor={theme.palette.primary.light}
                        variant='contained' >Antwort A</Button></Grid>
                    <Grid item xs={6} ><Button
                        bgcolor={theme.palette.primary.light}
                        variant='contained'>Antwort B</Button></Grid>
                    <Grid item xs={6} ><Button
                        bgcolor={theme.palette.primary.light}
                        variant='contained'>Antwort C</Button></Grid>
                    <Grid item xs={6} ><Button
                        bgcolor={theme.palette.primary.light}
                        variant='contained'>Antwort D</Button></Grid>
                </Grid>
            </Box>

        </Stack>
    )
}
