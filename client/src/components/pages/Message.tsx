import { Theme, withStyles } from '@material-ui/core';
import { Styles } from '@material-ui/core/styles/withStyles';
import '../../App.css';

const styles: Styles<Theme, any> = (theme: any) => ({
    message: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'right',
      color: '#FFFAF0',
      width:'100%',
      backgroundColor:"#00BFFF"
    },
});

export const Message = withStyles(styles)(({ classes }: any) => {
    return (
        <div className={classes.message}>
            <h1> Please scan a patient QR code to begin!</h1>
        </div>
    );
});