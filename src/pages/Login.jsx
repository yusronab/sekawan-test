import { Alert, AlertTitle, CircularProgress, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { auth } from '../constant/data';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [snackbar, setSnackbar] = useState({ isOpen: false, isError: false, message: '' });
    const [credential, setCredential] = useState({ email: '', password: '' });
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('dkAccessToken');

    useEffect(() => {
        if (token !== null) {
          navigate('/');
        }
      }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            if (credential.email !== auth.email || credential.password !== auth.password) {
              setSnackbar({ isOpen: true, isError: true, message: 'Incorrect username or password' });
              setLoading(false);
              setCredential({ email: '', password: '' })
              return
            }
      
            const payload = { role: 'admin', email: credential.email };
            localStorage.setItem('dkAccessToken', JSON.stringify(payload));
            setSnackbar({ isOpen: true, isError: false, message: 'Login successfully' });
            setLoading(false);
            
            setTimeout(() => navigate('/'), 3000);
          }, 3000);
    };

    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });
    };

    return (
        <div className="relative min-h-screen w-full bg-[url(https://e1.pxfuel.com/desktop-wallpaper/460/215/desktop-wallpaper-100-beautiful-website-backgrounds-html.jpg)] bg-cover bg-center flex justify-center items-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="w-[90vw] sm:[70vw] md:w-[50vw] xl:w-[30vw] bg-white rounded-xl p-6 shadow-md relative z-10">
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-0 bg-blue-600 p-4 rounded-lg w-3/4 mx-auto">
                    <div className="text-lg text-white font-bold text-center">Dashboard Kit</div>
                </div>
                <div className="mt-6">
                    <div className="text-xl font-semibold">Login to Dashboard Kit</div>
                    <div className="mt-2 mb-6 text-sm text-[#687176]">Enter email and password below</div>
                </div>
                {snackbar.isOpen && (
                    <Alert severity={snackbar.isError ? 'error' : 'success'} className="mb-6">
                        <AlertTitle>{snackbar.isError ? 'Error' : 'Success'}</AlertTitle>
                        {snackbar.message}
                    </Alert>
                )}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <FormControl sx={{ width: '100%' }} variant="outlined" error={credential.email.length === 0}>
                        <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                        <OutlinedInput
                            type="email"
                            label="Email"
                            name="email"
                            value={credential.email}
                            onChange={handleChange}
                            required
                        />
                        {credential.email.length === 0 && <FormHelperText id="component-error-text">Email is required</FormHelperText>}
                    </FormControl>
                    <FormControl sx={{ width: '100%' }} variant="outlined" error={!(credential.password.length >= 8)}>
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            name="password"
                            value={credential.password}
                            onChange={handleChange}
                            required
                        />
                        {!(credential.password.length >= 8) && <FormHelperText id="component-error-text">Password minimum 8 characters</FormHelperText>}
                    </FormControl>
                    <button
                        className={`text-white py-2 px-3 mt-6 flex justify-center items-center w-full rounded-md font-bold text-base ${isLoading ? 'bg-slate-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading
                            ? <span className="flex items-center gap-2">Loading <CircularProgress color='inherit' size={20} thickness={6} /></span>
                            : 'Login'}
                    </button>
                </form>
            </div>
            <div className="absolute bottom-0 w-full">
                <div className="max-w-[90vw] w-[1280px] mx-auto text-white flex justify-center items-center py-6 z-10">
                    <p className="text-sm font-medium">Copyright &copy; 2024 Yusron. All rights reserved</p>
                </div>
            </div>
        </div>
    )
}

export default Login