import React from 'react'
import { Box, Stack, Button, Grid, useTheme, ButtonGroup } from '@mui/material'

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
        padding: '16px',
        margin: '50px'
        
    }}>
        <Box sx={{
            bgcolor: theme.palette.secondary.main,
            padding: '20px'
        }}>
            <Grid container my={2}>
            <Grid item xs={9} >Kategorie: Basketball</Grid>
            <Grid item xs={3} >1000 Punkte</Grid>
            </Grid>
        </Box>
        <Box padding= '20px'
    >
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </Box>
    </Box>
    <Box sx={{
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.palette.secondary.light,
        padding: '16px',
        width: '900px',
        margin: '50px'

    }}>
    <Grid container my={4} rowSpacing={2} columnSpacing={1}>
      <ButtonGroup variant='contained'
      size='large'
      rowSpacing={2}
      columnSpacing={1}
      > 
      <Button item xs={6} bgcolor={theme.palette.primary.light} >Antwort A</Button>
      <Button item xs={6} bgcolor={theme.palette.primary.light} >Antwort B</Button>
      <Button item xs={6} bgcolor={theme.palette.primary.light} >Antwort C</Button>
      <Button item xs={6} bgcolor={theme.palette.primary.light} >Antwort D</Button>
      {/* <Button item xs={6} ><Box bgcolor={theme.palette.primary.light} >Antwort A</Box></Button>
      <Button item xs={6} ><Box bgcolor={theme.palette.primary.light} >Antwort B</Box></Button>
      <Button item xs={6} ><Box bgcolor={theme.palette.primary.light} >Antwort C</Box></Button>
      <Button item xs={6} ><Box bgcolor={theme.palette.primary.light} >Antwort D</Box></Button> */}
      
      </ButtonGroup>
      </Grid>
      </Box>
      
      </Stack>
  )
}
