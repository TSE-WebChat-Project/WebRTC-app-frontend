import { Box, Stack, Divider, Grid, Paper } from '@mui/material'

type GreetProps = {
    name: string
}

export const GridJoin = (props: GreetProps) => {
    return(
        <Grid container my ={0.5} rowSpacing={4} columnSpacing={2}>
            {/* Grid Children */}
            <Grid item xs={12} sm={3.8}>
                <Box height='350px' bgcolor='white' color='black' p={2} >{props.name}</Box>
            </Grid>
        </Grid>
    )

}