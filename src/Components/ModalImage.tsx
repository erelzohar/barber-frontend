import { Box, Modal } from "@mui/material";
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    bgcolor: '#fff',
    boxShadow: 24,
    p: 1,
    borderRadius: '7px',
};

interface Props {
    imgSrc: string;
}

export default function ModalImage(props: Props): JSX.Element {
    
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    return <div className="ModalImage">
        <img src={props.imgSrc} alt="" onClick={() => { if (window.innerWidth > 500) setOpen(true) }} />
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <img src={props.imgSrc} alt="" />
            </Box>
        </Modal>
    </div>
}