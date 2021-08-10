import { createTheme } from '@material-ui/core/styles';

export const rcColors = {
    pink: '#BD5179',
    green: '#23A050',
    backgroundGreen: '#eef7f1',
    borderGreen: '#3dc06c',
    orange: '#D28E56',
    blue: '#3C89C3',
    backgroundBlue: '#d9efff',
    borderBlue: '@4d9bd8',
    purple: '#815FA5',
    red: 'rgb(217, 90, 136)',
    backgroundRed: '#fedce9',
    borderRed: '#d95a88',
};
import { green, purple } from '@material-ui/core/colors';

export const theme = createTheme({
    palette: {
        primary: {
            main: green[300],
        },
        secondary: {
            main: purple[300],
        },
    },
});
