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
        width: '90%',
        maxWidth: '400px',
        bgcolor: '#ffffffa8',
        boxShadow: 24,
        p: 4,
        borderRadius: '7px',
    }

    return (
        <div className="Login">
            <ParticlesBg type="circle" bg={true} color="random" />
            <Modal
                open
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <span style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <Link title="דף הבית" to="/"><i style={{color:"#1976d2"}} className="fa fa-home" aria-hidden="true"></i></Link>
                        <Typography id="modal-modal-title" variant="h6" component="span" style={{ margin: "3px", direction: "rtl" }}>
                            התחברות
                        </Typography>
                    </span>


                    <form className="modalForm" id="login-form" noValidate onSubmit={handleSubmit(submit)}>
                        <TextField autoFocus dir="ltr" size="small" fullWidth margin="normal" required type="text" {...register("username")} id="username-input" error={errors.username ? true : false} helperText={errors.username?.message} label="שם משתמש"  />
                        <TextField dir="ltr" size="small" fullWidth margin="normal" required type="password" {...register("password")} id="password-input" error={errors.password ? true : false} helperText={errors.password?.message} label="סיסמא" />
                        <Button fullWidth sx={{ margin: "1rem auto", borderRadius: '20px' }} type="submit" variant="contained" >התחבר</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default Login;
