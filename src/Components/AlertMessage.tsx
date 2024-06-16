import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import store from '../Redux/Store';
import adminService from '../Services/Admin';

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
    const [admin, setAdmin] = React.useState(store.getState().linesState.currentAdmin);

    React.useEffect(() => {
        if (!admin) adminService.getCurrentAdminAsync()
            .then(res => setAdmin(res));
    }, [])

    const handleClose = () => {
        setOpen(false);
    };
    return <div className="AlertMessage">
        {admin && <Dialog
            dir='rtl'
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description">
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {admin.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>קיבלתי</Button>
            </DialogActions>
        </Dialog>}
    </div>
}