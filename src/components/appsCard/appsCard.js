import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "10px",
    width: "calc(66.67% - 20px)", // 2/3 of the horizontal space minus the margin
    margin: "10px",
  },
  element: {
    marginBottom: "10px",
  },
});

function AppsCard({ imei }) {
  const classes = useStyles();

 
  return (

      <div>
      <h2 className="text-lg text-blue-800">{imei}</h2>
      </div>

  );
}

export default AppsCard;
