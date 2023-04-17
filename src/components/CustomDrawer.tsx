import { Drawer, Box, Typography, IconButton } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import { useState} from 'react'

// export const MuiDrawer = () => {
//     const[isDrawerOpen, setIsDrawerOpen] = useState(false)
//     return(
//         <>
//         <IconButton 
//         size='large' 
//         edge='start' 
//         color='inherit' 
//         aria-label='logo' 
//         onClick={() => setIsDrawerOpen(true)}
//         >
//             <MenuIcon/>
//         </IconButton>
//         <Drawer 
//         anchor='right' 
//         open={isDrawerOpen} 
//         onClose={() => setIsDrawerOpen(false)}
//         >
//         <Box
//         p={2}
//         width = '250px'
//         textAlign = 'center'
//         role = 'presentation'
//         >
//             {/* chat code goes here */}
//             <Typography variant ='h6' component ='div'>
//                 Chat Window
//             </Typography>
//         </Box>
//         </Drawer>
//         </>

//     )
// }

export const MuiDrawer = () => {
    const[isDrawerOpen, setIsDrawerOpen] = useState(false)
    return(
        <>
        <IconButton 
        size='large' 
        edge='start' 
        color='inherit' 
        aria-label='logo' 
        onClick={() => setIsDrawerOpen(true)}
        >
            <MenuIcon/>
        </IconButton>
        <Drawer 
        anchor='right' 
        open={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        >
        <Box
        p={2}
        width = '250px'
        textAlign = 'center'
        role = 'presentation'
        >
            {/* chat code goes here */}
            <Typography variant ='h6' component ='div'>
                Chat Window
            </Typography>
        </Box>
        </Drawer>
        </>

    )
}