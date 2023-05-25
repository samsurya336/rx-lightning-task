import React from "react";
import { Formik } from "formik";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function Login() {
  const navigate = useNavigate();
  const [showSnackBar, setShowSnackBar] = React.useState(false);

  const handleClick = () => {
    setShowSnackBar(true);
  };

  const handleClose = () => {
    setShowSnackBar(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={showSnackBar}
        onClose={handleClose}
        autoHideDuration={1000}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Logged in Successfully
        </Alert>
      </Snackbar>
      <Container
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card>
          <Container
            sx={{
              padding: "40px",
              minWidth: "310px",
            }}
          >
            <h1 style={{ textAlign: "center", marginTop: "0" }}>LOGIN</h1>
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }

                if (!values.password) {
                  errors.password = "Required";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                handleClick();
                setTimeout(() => {
                  setSubmitting(false);
                  navigate("/patients");
                }, 1000);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={errors.email && touched.email}
                    helperText={errors.email && touched.email && errors.email}
                  />

                  <TextField
                    variant="outlined"
                    label="Password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={errors.password && touched.password}
                    helperText={
                      errors.password && touched.password && errors.password
                    }
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    Login
                  </Button>
                </form>
              )}
            </Formik>
          </Container>
        </Card>
      </Container>
    </>
  );
}

// export default Login;
