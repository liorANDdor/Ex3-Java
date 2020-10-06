import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Container from "@material-ui/core/Container";
import clone from "clone";
import axios from "../../Utilities/Axios/Axios";

const formElementsInit = {
  role: {
    type: "select",
    options: { ShopOwner: "Shop Owner", Customer: "Customer" },
    valid: false,
    label: "Role",
    value: "",
  },
  name: {
    type: "text",
    options: null,
    valid: false,
    label: "Name",
    value: "",
  },
};

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(20, 30, 2),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  formControl: {
    width: "100%",
  },
}));

const SignUp = (props) => {
  const [formInputs, setFormInputs] = useState(formElementsInit);
  const [isTaken, setisTaken] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const classes = useStyles();
  const onSubmitHandler = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/SDM/register", formInputs)
      .then((res) => {
        console.log("yes");
        if (res.data === true) {
          props.setSignedUpResult(true, formInputs.role.value);
        } else {
          props.setSignedUpResult(false);
          setisTaken(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (event, key) => {
    let newFormInputs = clone(formInputs);
    newFormInputs[key].value = event.target.value;
    setFormInputs(newFormInputs);
  };

  const onFileChange = (file) => {
    setSelectedFile(file.target.files[0]);
  };
  const onFileUpload = () => {
    const formData = new FormData();
    formData.append(selectedFile.name, selectedFile);
    axios.post("http://localhost:8080/SDM/readxml", formData).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <Container component="main" maxWidth="xs" className={classes.paper}>
      <CssBaseline />
      <div>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={onSubmitHandler} className={classes.form} noValidate>
          {Object.keys(formInputs).map((el) => {
            let input = null;
            switch (formInputs[el].type) {
              case "select":
                input = (
                  <FormControl key={el} className={classes.formControl}>
                    <InputLabel>{formInputs[el].label}</InputLabel>
                    <Select
                      value={formInputs.role.value}
                      onChange={(event) => handleChange(event, el)}
                      renderValue={(value) => value}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {Object.keys(formInputs[el].options).map((item) => {
                        return (
                          <MenuItem
                            key={item}
                            value={formInputs[el].options[item]}
                          >
                            {formInputs[el].options[item]}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                );
                break;
              case "text":
                input = (
                  <TextField
                    key={el}
                    onChange={(event) => handleChange(event, el)}
                    margin="normal"
                    fullWidth
                    label={formInputs[el].label}
                    autoFocus
                  />
                );
                break;
              default:
                input = null;
            }
            return input;
          })}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign up
          </Button>
        </form>
        {isTaken ? (
          <Alert severity="info">
            User Name is already taken, try another one
          </Alert>
        ) : null}
        <div>
          <input type="file" onChange={onFileChange} />
          <button onClick={onFileUpload}>Upload!</button>
        </div>
      </div>
    </Container>
  );
};

export default SignUp;
