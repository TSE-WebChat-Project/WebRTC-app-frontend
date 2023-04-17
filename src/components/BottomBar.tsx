import { Stack, Box, Divider} from '@mui/material'
export const BottomStack = () => {
    return(
        <Stack 
        mt={3.5}
        direction='row' 
        spacing={2} 
        divider={<Divider orientation='vertical' flexItem/>}
        >
        <Box sx={{
            backgroundColor: 'black',
            color: 'white',
            height: '60px',
            width: '1810px',
            padding: '16px',
            
        }}
        >
            </Box>
        </Stack>
    )
}
