import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
const styles = (theme) => createStyles({
    root: {
        flexGrow: 1,
        fontSize: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    link: {
        color: 'white', fontSize: 20,
        textDecoration: 'none', flexGrow: 1, margin: theme.spacing.unit
    }
});
class FooterComp extends React.Component {
    render() {
        return (React.createElement("h3", null));
    }
}
export const Footer = withStyles(styles)(FooterComp);
//# sourceMappingURL=footer.js.map