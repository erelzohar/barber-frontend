import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
export default function AlertMessage(): JSX.Element {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };
    return <div className="AlertMessage">
        <Dialog
            dir='rtl'
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description">
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    לקוחות יקרים בתאריכים 24.1 עד 27.1 אני בחופשה אוהב אותכם!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>קיבלתי</Button>
            </DialogActions>
        </Dialog>
    </div>
}