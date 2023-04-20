import Cookies from "universal-cookie";
import jwt from "jwt-decode";
import { useState } from "react";
import { loginAction } from "../../actions/login/loginAction";
import { useNavigate } from "react-router-dom";
import SnackbarAlert from "../../components/utils/snackbar";
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Hidden from '@material-ui/core/Hidden';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(9),
  margin: theme.spacing(9),
  maxWidth: 800,
  color: theme.palette.text.primary,
}));

const Login = () => {
  const navigate = useNavigate();
  // Init cookies
  const cookies = new Cookies();
  // const classes = styles();
  const [isSnackBarAlertOpen, setIsSnackBarAlertOpen] = useState(false);
  const [eventType, setEventType] = useState("");
  const [eventMessage, setEventMessage] = useState("");
  const [eventTitle, setEventTitle] = useState("");

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const cover =
    'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80';
  const backDropBG = 'rgba(0,0,0,0.7)';
  const greenButton = {
    backgroundColor: "green",
    color: "white",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const formValues = {
      mobile_no: username,
      pin: password,
    };
    loginAction(formValues)
      .then((res) => {
        if (res.errors) {
          setEventType("fail");
          setEventMessage("Login Failed");
          setEventTitle("LOGIN");
          setIsSnackBarAlertOpen(true);
        } else {
          setEventType("success");
          setEventMessage("Logged In Successfully!");
          setEventTitle("LOGIN");
          setIsSnackBarAlertOpen(true);
          setTimeout(() => {
            const priviledge = localStorage.getItem("type");
            if (priviledge === '"ADMIN"') {
              console.log("THEY ARE EQUAL!!!!!!");
              navigate("/devices");
            } else {
              navigate("/my-devices");
            }
            // props.history.push('/sidebar');
          }, 1000);
        }
      })
      .catch((err) => { });
  };

  const login = (jwt_token) => {
    // Decode Token
    const decoded = jwt(jwt_token);
    // Set user state
    cookies.set("jwt_authorization", jwt_token, {
      expires: new Date(decoded.exp * 1000),
    });
  };
  const logoUrl = `${process.env.PUBLIC_URL}/images/irri.jpeg`;

  return (
    <>
      <SnackbarAlert
        open={isSnackBarAlertOpen}
        type={eventType}
        message={eventMessage}
        handleClose={() => setIsSnackBarAlertOpen(false)}
        title={eventTitle}
      />
      {/* <section class="bg-gray-50 dark:bg-gray-900 flex justify-center items-center h-screen"> */}
      {/* <div style={{
        width: '100%',
        textAlign: 'left',
        height: "100vh", // todo change to "100vh" or use react-div-100vh
        position: 'relative',
        // background: `url(${cover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        '@media screen and (max-width: 520px)': {
          position: 'relative',
          height: '566px',
        },
      }}> */}
        {/* <div style={{
          position: 'absolute',
          top: 20,
          left: 0,
          right: 0,
          bottom: 0,
          // background: backDropBG,
        }} /> */}
        <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 ,position:'relative',}}>
          <StyledPaper
            sx={{
              my: 1,
              mx: 'auto',
              p: 2,
            }}
          >
        <Grid container wrap="nowrap" spacing={2}>
      
          {/* <div class="  px-6 py-8 mx-auto w-3/6 lg:w-2/6 sm:w-full xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8 w-full">
            <div class="flex items-center justify-center mb-4">
              <img src={logoUrl} alt="Logo" />
            </div>

            <form class="space-y-4" action="#" style={{ touchAction: 'manipulation' }}>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-lg font-light text-black dark:text-white text-center"
                >
                  Mobile Number
                </label>
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  name="email"
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-center"
                  placeholder="254711438911"
                  required=""
                  style={{ touchAction: 'manipulation' }}
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-lg font-light text-gray-900 dark:text-white text-center"
                >
                  Pin
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  id="password"
                  placeholder="••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  style={{ touchAction: 'manipulation' }}
                />
              </div>
              <div class="flex items-center justify-between flex-wrap">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-800 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  class="text-sm font-thin hover:underline dark:text-primary-500 mt-2 sm:mt-0"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                class="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                style={{
                  marginTop: "2rem",
                  alignSelf: "center",
                  ...(isButtonClicked ? greenButton : {}),
                }}
                onClick={(e) => {
                  handleLogin(e);
                  setIsButtonClicked(true);
                }}
              >
                {isButtonClicked ? "Loading..." : "Sign In"}
              </button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div> */}
          {/* <Grid
            className={{ padding: 16, }}
            item
            xs={12}
            sm={6}
            md={5}
            lg={4}
            
            alignItems={'center'}
          > */}
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <form>
              <img
                alt={'logo'}
                className={{
                  width: 180,
                  height: 60,
                  borderRadius:4,
                  marginLeft: 'auto',
                  // [breakpoints.up('sm')]: {
                  //   marginRight: 'auto',
                  // },
                  '@media screen and (max-width: 520px)': {
                    marginRight: 'auto',
                  },
                }}
                src={`${process.env.PUBLIC_URL}/images/irri.jpeg`}
              />
              <label
                for="email"
                class="block mb-2 text-lg font-light text-black dark:text-white text-center"
              >
                Mobile Number
              </label>
              <TextField
                fullWidth
                label={'Mobile'}
                margin={'normal'}
                value={username}
                variant="filled"
                onChange={(e) => setUsername(e.target.value)}
                classes={{}}
                InputLabelProps={{
                  classes: {
                    root: {
                      color: '#ffffff',
                      opacity: 0.8,
                      '&$focused': {
                        opacity: 1,
                        color: '#ffffff',
                      },
                    },
                    focused: {},
                  },
                }}
                InputProps={{
                  classes: {
                    root: {
                      background: 'rgba(255,255,255,0.16)',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.24)',
                      },
                      '&$focused': {
                        background: 'rgba(255,255,255,0.24)',
                      },
                    },
                    // focused: classes.focused,
                    // underline: classes.underline,
                    // input: classes.inputInput
                  },
                }}
              />
              <label
                for="password"
                class="block mb-0 text-lg font-light text-gray-900 dark:text-white text-center"
              >
                Pin
              </label>
              <TextField
                fullWidth
                label={'Pin'}
                margin={'normal'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="filled"
                type={'password'}
                InputLabelProps={{
                  classes: {
                    root: {
                      color: '#ffffff',
                      opacity: 0.8,
                      '&$focused': {
                        opacity: 1,
                        color: '#ffffff',
                      },
                    },
                    // focused: classes.focused,
                  },
                }}
                InputProps={{
                  classes: {
                    root: {
                      background: 'rgba(255,255,255,0.16)',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.24)',
                      },
                      '&$focused': {
                        background: 'rgba(255,255,255,0.24)',
                      },
                    },
                    // focused: classes.focused,
                    // underline: classes.underline,
                    // input: classes.inputInput
                  },
                }}
              />
              {/* <FormControl fullWidth>
              <FormControlLabel
                control={
                    <Checkbox value="checkedC" className={{ color: 'rgba(255,255,255,0.87)' }} />
                }
                label="Remember Me"
                classes={{
                  label: { color: 'black', },
                }}
              />
            </FormControl> */}
              <div class="flex items-center justify-between flex-wrap">
                <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-800 dark:ring-offset-gray-800"
                      required=""
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="remember"
                      class="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  class="text-sm font-thin hover:underline dark:text-primary-500 mt-2 sm:mt-0"
                >
                  Forgot password?
                </a>
              </div>
              <FormControl margin={'normal'} fullWidth>
                <button
                  type="submit"
                  class="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  style={{
                    marginTop: "2rem",
                    alignSelf: "center",
                    ...(isButtonClicked ? greenButton : {}),
                  }}
                  onClick={(e) => {
                    handleLogin(e);
                    setIsButtonClicked(true);
                  }}
                >
                  {isButtonClicked ? "Loading..." : "Sign In"}
                </button>
              </FormControl>
              <Hidden smUp>
                <div className={{
                  textAlign: 'center',
                  marginTop: 24,
                  marginBottom: 16,
                }}>
                  <Typography className={{ color: '#c5c5c5', }}>
                    Not a member ?
                    <Link color={'secondary'} className={{ marginLeft: 16, }}>
                      Sign Up Now
                    </Link>
                  </Typography>
                </div>
              </Hidden>
              {/* <div className={classes.forgetPassword}>
              <Typography color={'inherit'}>
                <Link color={'inherit'}>Forget your password ?</Link>
              </Typography>
            </div> */}
            
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <a
                  href="#"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </a>
              </p>
            </form>
          </Grid>
            </Grid>
          </StyledPaper>
        </Box>
      {/* </div> */}
      {/* </div > */}
      {/* </section> */}
    </>
  );
};

export default Login;