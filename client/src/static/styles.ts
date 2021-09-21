import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(
    (theme) => ({
        root: {
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            position: 'relative',
            margin: '80px 0',
            minHeight: '100vh',
        },
        footer: {
            padding: theme.spacing(1),
            background: theme.palette.primary.main,
            position: 'fixed',
            bottom: 0,
            width: '100%',
        },
        appBar: {
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.palette.primary.main,
        },
        appBarLeft: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: theme.spacing(3),
            gap: theme.spacing(2),
        },
        appBarRight: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing(3),
            marginRight: theme.spacing(3),
        },
        tallIndicator: {
            backgroundColor: theme.palette.secondary.main,
            height: '5px',
        },
        filter: {
            padding: theme.spacing(1.5),
        },
        cardHeader: {
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: theme.spacing(1),
            },
        },
        button: {
            marginLeft: theme.spacing(2.5),
            marginRight: theme.spacing(2.5),
        },
        projectFormContainer: {
            marginBottom: theme.spacing(1),
            padding: theme.spacing(0.5),
        },
        projectForm: {
            // flexGrow: 1,
        },
        projectFormRow: {
            alignItems: 'center',
        },
        projectFormEditFields: {
            marginBottom: theme.spacing(1.45),
            width: '100%',
        },
        titleGridItem: {
            marginRight: theme.spacing(3),
        },
        projectFormCheckFields: {
            paddingBottom: theme.spacing(1.5),
        },
        formSubmitRow: {
            justifyContent: 'center',
            marginTop: theme.spacing(2.5),
        },
        ownerDeleteConfirmationButton: {
            color: theme.palette.error.main,
            borderColor: theme.palette.error.main,
        },
        ownerDeleteButton: {
            color: theme.palette.error.main,
            borderColor: theme.palette.error.main,
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(2),
        },
        staticProject: {
            margin: theme.spacing(1),
            marginBottom: theme.spacing(2),
            padding: theme.spacing(0.5),
            paddingTop: theme.spacing(1.5),
        },
        projectPhoto: {
            boxShadow: '.05rem .05rem .2rem gray',
            marginRight: theme.spacing(0.75),
        },
        marginBottom: {
            marginBottom: theme.spacing(0.5),
        },
        chip: {
            margin: theme.spacing(0.25),
            '& > svg': {
                paddingLeft: theme.spacing(0.5),
            },
        },
        bigGridGap: {
            gap: theme.spacing(1.5),
        },
        cursorPointer: {
            cursor: 'pointer',
        },
        staticProjectDetails: {
            paddingLeft: theme.spacing(8),
            [theme.breakpoints.down('xs')]: {
                paddingLeft: 0,
            },
        },
        staticProjectDivider: {
            marginTop: theme.spacing(-3),
            marginBottom: theme.spacing(1.5),
        },
        auth: {
            width: 'unset',
            border: 'solid',
            borderWidth: theme.spacing(2),
            borderColor: theme.palette.primary.dark,
            backgroundColor: theme.palette.primary.light,
            marginTop: theme.spacing(10),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: theme.spacing(3),
            gap: theme.spacing(4),
            [theme.breakpoints.down('xs')]: {
                marginTop: theme.spacing(8),
                margin: theme.spacing(5),
            },
        },
        navButton: {
            margin: theme.spacing(0.75),
        },
        notFound: {
            alignSelf: 'center',
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: theme.spacing(2),
            marginTop: theme.spacing(8),
        },
        notFoundButton: {
            width: theme.spacing(24),
        },
        noProjects: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: theme.spacing(8),
        },
        selectTitles: {
            color: 'rgba(0, 0, 0, 0.54)',
            fontSize: '12px',
            fontWeight: 400,
            marginBottom: theme.spacing(0.5),
        },
    }),
    { index: 1 },
);
