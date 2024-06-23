import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import Credentials from "../Models/Credentials";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import usersService from "../Services/Users";
import notify from "../Services/Notify";
import ParticlesBg from "particles-bg";


const resolver: Resolver<Credentials> = async (values) => {
    return {
        values: values.username && values.password ? values : {},
        errors: !values.username && !values.password ? {
            email: {
                type: 'required',
                message: 'אנא מלא שם משתמש  .',
            },
            password: {
                type: 'required',
                message: 'אנא מלא סיסמא .',
            }
        }
            : !values.username ? {
                name: {
                    type: 'required',
                    message: 'אנא מלא שם משתמש  .',
                }
            } : !values.password ? {
                message: {
                    type: 'required',
                    message: 'אנא מלא סיסמא .',
                }
            } : {},
    };

}
function Login(): JSX.Element {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<Credentials>({ resolver, mode: 'onBlur' });
    const submit: SubmitHandler<Credentials> = async data => {
        try {
            const res = await usersService.login(data);
            if (!res) return notify.error("שם או סיסמא שגויים");
            navigate("/manage/lines");

        }
        catch (err: any) {
            notify.error(err);
        }
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: '600px',
        bgcolor: '#fff',
        boxShadow: 24,
        p: 4,
        borderRadius: '7px',
    }
    return (
        <div className="Login">
            <ParticlesBg type="circle" color="#FFD700" bg={true} />
            <Modal
                open
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <span style={{display:"flex",justifyContent:"space-between"}}>
                        <Link to="/" style={{color:'red'}}>X</Link>
                        <Typography id="modal-modal-title" variant="h6" component="span" style={{ margin: "3px", direction: "rtl" }}>
                            התחברות
                        </Typography>
                    </span>


                    <form className="modalForm" id="login-form" noValidate onSubmit={handleSubmit(submit)}>
                        <TextField dir="ltr" fullWidth margin="normal" required type="text" {...register("username")} id="username-input" error={errors.username ? true : false} helperText={errors.username?.message} label="שם משתמש" variant="standard" />
                        <TextField dir="ltr" fullWidth margin="normal" required type="password" {...register("password")} id="password-input" error={errors.password ? true : false} helperText={errors.password?.message} label="סיסמא" variant="standard" />
                        <Button sx={{ margin: "1rem", padding: '0.5rem 2rem 0.5rem 2rem', borderRadius: '20px' }} type="submit" variant="contained" color="success">התחבר</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default Login;
