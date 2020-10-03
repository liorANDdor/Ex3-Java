import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
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
  const classes = useStyles();
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(event);
    await axios.post("/SDM/register", formInputs).then((res) => {
      console.log(res.data);
      console.log(res.data);
      console.log(res.data);
    });
    //    .catch(err => console.log(err))
    props.setSignedUpResult(true, formInputs.role.value);
  };

  const handleChange = (event, key) => {
    console.log(event.target.value);
    console.log(formInputs[key]);
    let newFormInputs = clone(formInputs);
    newFormInputs[key].value = event.target.value;
    setFormInputs(newFormInputs);
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
            console.log(el);
            switch (formInputs[el].type) {
              case "select":
                input = (
                  <FormControl className={classes.formControl}>
                    <InputLabel>{formInputs[el].label}</InputLabel>
                    <Select
                      onChange={(event) => handleChange(event, el)}
                      renderValue={(value) => value}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {Object.keys(formInputs[el].options).map((item) => {
                        return (
                          <MenuItem value={formInputs[el].options[item]}>
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
      </div>
    </Container>
  );
};

export default SignUp;
