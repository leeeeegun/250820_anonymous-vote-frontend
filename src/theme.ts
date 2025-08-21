import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5', // A shade of blue, can be adjusted
    },
    secondary: {
      main: '#f50057', // A shade of pink, can be adjusted
    },
    background: {
      default: '#f4f6f8', // Light grey background
      paper: '#ffffff', // White paper background
    },
    text: {
      primary: '#212121', // Dark grey for primary text
      secondary: '#757575', // Medium grey for secondary text
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif', // Can be changed to a more modern font
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Slightly rounded buttons
          textTransform: 'none', // No uppercase text
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12, // More rounded paper/card corners
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)', // Subtle shadow
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8, // Rounded text field borders
          },
        },
      },
    },
  },
});

export default theme;
