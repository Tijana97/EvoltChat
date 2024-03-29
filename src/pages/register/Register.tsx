import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Paper,
  CssBaseline,
  Box,
  Typography,
  Container,
  Link,
} from "@mui/material";
import axios from "axios";
import { string } from "yup";
import { useNavigate } from "react-router-dom";
import LogoImage from "../../images/evolt-logo.png";

const Register: React.FC = (): JSX.Element => {
  const emailSchema = string().email().required();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [registerError, setRegisterError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [emptyFieldError, setEmptyFieldError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [presentedError, setPresentedError] = useState<string>("");

  const navigate = useNavigate();

  useEffect(() => {
    const validateEmail = async () => {
      try {
        await emailSchema.validate(email);
        setEmailError("");
      } catch (error: any) {
        setEmailError("Please provide a valid email address.");
      }
    };

    validateEmail();
  }, [emailSchema, email]);

  useEffect(() => {
    const validatePassword = () => {
      const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#%])[A-Za-z0-9!#%]{8,32}$/;
      if (regex.test(password)) {
        setPasswordError("");
      } else {
        setPasswordError(
          "Password must contain one uppercase, one lower case, one number and one special case character and be at least 8 digits long."
        );
      }
    };
    validatePassword();
  }, [password]);

  useEffect(() => {
    const checkForEmptyFields = () => {
      if (password === "" || email === "") {
        setEmptyFieldError("Please fill out all fields.");
      } else {
        setEmptyFieldError("");
      }
    };
    checkForEmptyFields();
  }, [email, password]);

  const handleErrors = () => {
    if (emptyFieldError !== "") {
      setPresentedError(emptyFieldError);
    } else if (emailError !== "") {
      setPresentedError(emailError);
    } else if (passwordError !== "") {
      setPresentedError(passwordError);
    } else {
      setPresentedError("");
    }
  };

  const handleRegister = async () => {
    handleErrors();
    if (
      presentedError === "" &&
      emptyFieldError === "" &&
      emailError === "" &&
      passwordError === ""
    ) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/auth/register",
          {
            email,
            password,
          }
        );
        setRegisterError("");

        const login = await axios.post("http://localhost:8080/api/auth/login", {
          email,
          password,
        });

        const token = login.data.jwt;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", login.data.jwt);
        console.log(login.data.jwt);
        navigate("/home");
        navigate(0);
      } catch (error: any) {
        setRegisterError(
          "Email or username you selected already exist in the database. Log in or use a different email and password for registration."
        );
        handleErrors();
      }
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#009696",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          <Grid container>
            <CssBaseline />
            <Grid
              item
              xs={false}
              sm={4}
              md={7}
              sx={{
                backgroundImage: `url(${LogoImage})`,
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <Grid
              item
              xs={12}
              sm={8}
              md={5}
              component={Paper}
              elevation={6}
              square
            >
              <Box
                sx={{
                  my: 8,
                  mx: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
                <Box component="form" sx={{ mt: 1 }}>
                  <TextField
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <div>
                    <p style={{ color: "#FF0000" }}>
                      {presentedError !== "" ? presentedError : registerError}
                    </p>
                  </div>
                  <Grid item xs={12}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          mt: 3,
                          mb: 2,
                          backgroundColor: "#ABEDD8",
                          color: "#111111",
                          ":hover": { backgroundColor: "#009696" },
                        }}
                        onClick={handleRegister}
                      >
                        Sign Up
                      </Button>

                      <div>
                        <Link
                          href="/login"
                          sx={{
                            color: "#111111",
                            textDecorationColor: "#111111",
                          }}
                        >
                          Alrady a user? Log in.
                        </Link>
                      </div>
                    </div>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
