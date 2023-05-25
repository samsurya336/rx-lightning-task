import React, { useEffect, useState, forwardRef } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import useFetch from "../../../../hooks/useFetch";

const MaleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-gender-male"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
      />
    </svg>
  );
};

const FemaleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-gender-female"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"
      />
    </svg>
  );
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Patients() {
  const [patientsData, setPatientsData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({});

  const [isPatientDataLoading, patientApiData, callGetPatientApi] = useFetch(
    "https://ti-patient-service.azurewebsites.net/patients"
  );

  const handleClose = () => {
    setSelectedPatient({});
  };

  useEffect(() => {
    callGetPatientApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      patientApiData &&
      Array.isArray(patientApiData) &&
      patientApiData.length > 0
    ) {
      setPatientsData(patientApiData);
    }
  }, [patientApiData]);

  return (
    <main style={{ width: "100%", height: "100%" }}>
      <Dialog
        open={Object.keys(selectedPatient).length > 1 ? true : false}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {" "}
          <strong>
            {selectedPatient?.firstName} {selectedPatient?.lastName}{" "}
          </strong>{" "}
        </DialogTitle>
        <DialogContent sx={{ width: "300px" }}>
          <p style={{ marginBottom: "1px" }}>
            {selectedPatient?.gender === "Male" ? <MaleIcon /> : <FemaleIcon />}
            {"  "}
            <span>{selectedPatient?.gender}</span>
          </p>
          <p style={{ marginBottom: "1px" }}>
            {" "}
            <strong> DOB : </strong> {selectedPatient?.dateOfBirth}{" "}
          </p>
          {selectedPatient?.addressLine1 && (
            <p style={{ marginBottom: "1px", marginTop: "1px" }}>
              {" "}
              <strong> Address 1 : </strong> {selectedPatient?.addressLine1}{" "}
            </p>
          )}

          {selectedPatient?.addressLine2 && (
            <p style={{ marginBottom: "1px", marginTop: "1px" }}>
              {" "}
              <strong> Address 2 : </strong> {selectedPatient?.addressLine2}{" "}
            </p>
          )}

          {selectedPatient?.city && (
            <p style={{ marginBottom: "1px", marginTop: "1px" }}>
              {" "}
              <strong> city : </strong> {selectedPatient?.city}{" "}
            </p>
          )}
          {selectedPatient?.state && (
            <p style={{ marginBottom: "1px", marginTop: "1px" }}>
              {" "}
              <strong> state : </strong> {selectedPatient?.state}{" "}
            </p>
          )}
          {selectedPatient?.postalCode && (
            <p style={{ marginBottom: "2rem", marginTop: "1px" }}>
              {" "}
              <strong> postalCode : </strong> {selectedPatient?.postalCode}{" "}
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {isPatientDataLoading === true ? (
        <Container
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Container>
      ) : (
        <>
          <h1 style={{ paddingLeft: "2rem" }}>Patients</h1>
          <Grid container spacing={5} sx={{ padding: "2rem" }}>
            {patientsData.map((_patientData, index) => {
              return (
                <Grid item xs={6} key={index}>
                  <Card
                    key={index}
                    sx={{
                      padding: "2rem",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h2 style={{ marginBottom: "1px" }}>
                      {" "}
                      <span>{_patientData.firstName}</span>{" "}
                      <span>{_patientData.lastName}</span>{" "}
                    </h2>
                    <p style={{ marginBottom: "1px" }}>
                      {_patientData.gender === "Male" ? (
                        <MaleIcon />
                      ) : (
                        <FemaleIcon />
                      )}
                      {"  "}
                      <span>{_patientData.gender}</span>
                    </p>
                    <p style={{ marginBottom: "2rem" }}>
                      {" "}
                      <strong> DOB : </strong> {_patientData.dateOfBirth}{" "}
                    </p>

                    <Button
                      sx={{
                        marginTop: "auto",
                      }}
                      variant="contained"
                      onClick={() => setSelectedPatient(_patientData)}
                    >
                      View Full Details
                    </Button>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </main>
  );
}

export default Patients;
