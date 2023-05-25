import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const MaleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-gender-male"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
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
      class="bi bi-gender-female"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"
      />
    </svg>
  );
};

function Patients() {
  const [patientsData, setPatientsData] = useState([]);

  useEffect(() => {
    getPatients();
  }, []);

  async function getPatients() {
    const patientsResponse = await fetch(
      "https://ti-patient-service.azurewebsites.net/patients"
    );
    const _patientsData = await patientsResponse.json();

    if (
      _patientsData &&
      Array.isArray(_patientsData) &&
      _patientsData.length > 0
    ) {
      setPatientsData(_patientsData);
    }
  }

  return (
    <main>
      <h1>Patients</h1>
      <Grid container spacing={1}>
        {patientsData.map((_patientData, index) => {
          return (
            <Grid item xs={6} key={index}>
              <Card
                key={index}
                sx={{
                  margin: "2rem",
                  padding: "2rem",
                  cursor: "pointer",
                  minHeight: "350px",
                  display: "flex",
                  flexDirection: "column",
                  // height: "100%",
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
                <p>
                  {" "}
                  <strong> DOB : </strong> {_patientData.dateOfBirth}{" "}
                </p>
                {_patientData.addressLine1 && (
                  <p style={{ marginBottom: "1px", marginTop: "1px" }}>
                    {" "}
                    <strong> Address 1 : </strong> {_patientData.addressLine1}{" "}
                  </p>
                )}

                {_patientData.addressLine2 && (
                  <p style={{ marginBottom: "1px", marginTop: "1px" }}>
                    {" "}
                    <strong> Address 2 : </strong> {_patientData.addressLine2}{" "}
                  </p>
                )}

                {_patientData.city && (
                  <p style={{ marginBottom: "1px", marginTop: "1px" }}>
                    {" "}
                    <strong> city : </strong> {_patientData.city}{" "}
                  </p>
                )}
                {_patientData.state && (
                  <p style={{ marginBottom: "1px", marginTop: "1px" }}>
                    {" "}
                    <strong> state : </strong> {_patientData.state}{" "}
                  </p>
                )}
                {_patientData.postalCode && (
                  <p style={{ marginBottom: "2rem", marginTop: "1px" }}>
                    {" "}
                    <strong> postalCode : </strong> {_patientData.postalCode}{" "}
                  </p>
                )}
                <Button
                  sx={{
                    marginTop: "auto",
                  }}
                  variant="contained"
                >
                  View
                </Button>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </main>
  );
}

export default Patients;
