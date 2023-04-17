import { Box, Stack, Divider, Grid, Paper } from '@mui/material'
import MicIcon from '@mui/icons-material/Mic';

type GreetProps = {
    name: string
}
// export const Layout = (props: GreetProps) => {
//     return(
//         <Paper sx={{
//             backgroundColor: 'grey'
//         }}>
//         <Stack 
//         direction='row' 
//         spacing={2} 
//         divider={<Divider orientation='vertical' flexItem/>}
//         >
//         <Box  sx={{
//             backgroundColor: 'black',
//             color: 'white',
//             height: '60px',
//             width: '1810px',
//             padding: '16px',
//             '&:hover': {
//                 backgroundColor: 'red'
//             },
//         }}
//         ><h1 className="subtitle">{props.name}</h1>
//             </Box>
//         </Stack>
//         {/* Grid Parent */}
//         <Grid container my ={0.5} rowSpacing={4} columnSpacing={2}>
//             {/* Grid Children */}
//             <Grid item xs={12} sm={3.8}>
//                 <Box height='350px' bgcolor='white' color='black' p={2} >Video Feed 1</Box>
//             </Grid>
//             <Grid item xs={12} sm={3.8}>
//                 <Box height='350px' bgcolor='white' color='black' p={2}>Video Feed 2</Box>
//             </Grid>
//             <Grid item xs={12} sm={3.8}>
//                 <Box height='350px' bgcolor='white' color='black' p={2}>Video Feed 3</Box>
//             </Grid>
//             <Grid item xs={12} sm={3.8}>
//                 <Box height='350px' bgcolor='white' color='black' p={2}>Video Feed 4</Box>
//             </Grid>
//             <Grid item xs={12} sm={3.8}>
//                 <Box height='350px' bgcolor='white' color='black' p={2}>Video Feed 5</Box>
//             </Grid>
//             <Grid item xs={12} sm={3.8}>
//                 <Box height='350px' bgcolor='white' color='black' p={2}>Video Feed 6</Box>
//             </Grid>
//         </Grid>
//         <Stack 
//         mt={3.5}
//         direction='row' 
//         spacing={2} 
//         divider={<Divider orientation='vertical' flexItem/>}
//         >
//         <Box sx={{
//             backgroundColor: 'black',
//             color: 'white',
//             height: '60px',
//             width: '1810px',
//             padding: '16px',
            
//         }}
//         >
//             </Box>
//         </Stack>
//         </Paper>
//     )
// }
export const Layout = (props: GreetProps) => {
    return(
        <Paper sx={{
            backgroundColor: 'grey'
        }}>
        <Stack 
        direction='row' 
        spacing={2} 
        divider={<Divider orientation='vertical' flexItem/>}
        >
        <Box  sx={{
            backgroundColor: 'black',
            color: 'white',
            height: '60px',
            width: '1810px',
            padding: '16px',
            '&:hover': {
                backgroundColor: 'red'
            },
        }}
        ><h1 className="subtitle">{props.name}</h1>
            </Box>
        </Stack>
        </Paper>
    )
}