import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";


import parseKeyToLabel from '../../../Utilities/Modal/ParseKeyToUpperCaseWithSpacesString'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import loadSpecificZone from '../../../Utilities/Services/LoadSpecificZoneService';
import axios from "../../../Utilities/Axios/Axios";
import clone from "clone";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import loadZones from "../../../Utilities/Services/LoadZonesServices";
import {useStateIfMounted} from "use-state-if-mounted";



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





const NewStore = (props) => {

    const [zones, setZones] = useStateIfMounted([{}])
    const [items, setItems] = useState([])

    const [checked, setChecked] = React.useState([0]);
    const formElementsInit = {
        name: {
            type: "text",
            options: null,
            valid: false,
            touched: false,
            label: "Store Name",
            value: "",
        },
        ppk: {
            type: "ppk",
            options: null,
            valid: false,
            touched: false,
            label: "PPK",
            value: "",
        },
        storeId: {
            type: "location",
            options: null,
            valid: false,
            touched: false,
            label: "storeId",
            value: "",
        },
        locationX: {
            type: "location",
            options: null,
            valid: false,
            touched: false,
            label: "Location(X)",
            value: "",
        },
        locationY: {
            type: "location",
            options: null,
            valid: false,
            touched: false,
            label: "Location(Y)",
            value: "",
        },
        zone: {
            type: "select",
            options: zones ,
            valid: false,
            touched: false,
            label: "Zone",
            value: "",
        },
        items: {
            type: "item",
            options: null ,
            valid: false,
            touched: false,
            label: "items",
            value: items,
        },

    };
    const handleToggle = (value) => () => {
        let newItems = clone(items);
        if(newItems[value].price!='') {
            newItems[value].chosen = !items[value].chosen
            //setMaySubnit(isSubimitAble)
            //valid items
            setItems(newItems);

            let hasItem = false;
            let newFormInputs = clone(formInputs);

            for (let index = 0; index < items.length - 1; ++index) {
                if (newItems[index].chosen == true) {
                    hasItem = true;
                }
            }
            newFormInputs["items"].valid = hasItem;
            newFormInputs["items"].value = newItems;

            setFormInputs(newFormInputs);
            let isSubimitAble = true
            Object.keys(newFormInputs).forEach(key => {
                console.log(key + "   " + formInputs[key].valid)
                isSubimitAble &= newFormInputs[key].valid
            })
            setMaySubnit(isSubimitAble)


        }
    }

    const loadData = async () => {
        const zonesData = await loadZones()


        setZones(zonesData)

    }
    useEffect(() => {
        loadData()
        const interval = setInterval(async () => {
            loadData()
        }, 2000);
        return () => {
            clearInterval(interval)
        }
    }, [])


    const [formInputs, setFormInputs] = useState(formElementsInit);
    const [maySubmit, setMaySubnit] = useState(false)
    const [isTaken, setisTaken] = useState(false);
    const classes = useStyles();
    const onSubmitHandler = (event) => {
        event.preventDefault();

        axios
            .post("/SDM/createStore", formInputs)
            .then((res) => {
                if (res.data.wasAdded === true) {
                    console.log("Store Was Added")
                } else {
                    console.log(res.data.map.error);
                }
            })
            .catch((err) => console.log(err));
    };


    const handleChange = async (event, key) => {
        let newFormInputs = clone(formInputs);
        const re = /^[0-9\b]+$/;
        const ppk = /^[0-9,.\b]+$/;

        if (newFormInputs[key].type === "location" && !event.target.value == "") {
            if (!re.test(event.target.value) || parseInt(event.target.value) > 50) {

                newFormInputs[key].label = "Location must be between 1-50"
                newFormInputs[key].valid = false
            } else {
                newFormInputs[key].value = event.target.value;
                newFormInputs[key].valid = true;
            }
        } else if (newFormInputs[key].type === "select") {
            if (event.target.value !== "") {


                newFormInputs[key].label = newFormInputs[key].label.split(" ")[0]
                newFormInputs[key].valid = true;
                newFormInputs[key].value = event.target.value;
                let data = await loadSpecificZone(event.target.value)
                setItems(data.items.map(item=> {return {name:item.name, id:item.id, purchaseCategory:item.purchaseCategory, price:"", chosen: false}}))

                console.log(items)


            } else {
                newFormInputs[key].label = newFormInputs[key].label.split(" ")[0]
                newFormInputs[key].valid = false;
                newFormInputs[key].value = event.target.value;
            }
        } else if (newFormInputs[key].type === "ppk" && !event.target.value == "") {

            if (!ppk.test(event.target.value)) {
                newFormInputs[key].label = "ppk must be a double"
                newFormInputs[key].valid = false
            } else {
                newFormInputs[key].value = event.target.value;
                newFormInputs[key].valid = true;
            }
        } else if (newFormInputs[key].value === '') {
            newFormInputs[key].label = newFormInputs[key].label + ' REQUIRED'
            newFormInputs[key].valid = false
            newFormInputs[key].value = event.target.value;
        } else {
            newFormInputs[key].label = newFormInputs[key].label.split(" ")[0]
            newFormInputs[key].valid = true;
            newFormInputs[key].value = event.target.value;
        }
        let isSubimitAble = true
        Object.keys(newFormInputs).forEach(key => {

            isSubimitAble &= newFormInputs[key].valid
        })
        setMaySubnit(isSubimitAble)
        setFormInputs(newFormInputs);

    };


    const handlePriceChange = async (event, key) => {
        let newItems = clone(items);
        const int = /^[0-9\b]+$/;
        const double = /^[0-9,.\b]+$/;

        if (items[key].purchaseCategory === "QUANTITY") {

            if (!int.test(event.target.value) && !event.target.value == "") {

            } else {
                newItems[key].price = event.target.value
                newItems[key].price = event.target.value

            }
        }
        else if (items[key].purchaseCategory === "WEIGHT") {

            if (!double.test(event.target.value)) {

            } else {
                newItems[key].price = event.target.value
                newItems[key].price = event.target.value

            }
        }
        console.log(newItems[key])

        //setMaySubnit(isSubimitAble)
        setItems(newItems);
        console.log(items)

    };

    return (
        <Container component="main" maxWidth="xs" className={classes.paper}>
            <CssBaseline />
            <div>

                <Typography component="h1" variant="h5">
                    New Store
                </Typography>
                <form onSubmit={onSubmitHandler} className={classes.form} noValidate>
                    {Object.keys(formInputs).map((el) => {
                        let input = null;

                        if(formInputs[el].type==="item") {
                        return
                        }
                    else if(formInputs[el].type==="select") {
                        input = (
                            <FormControl key={el} className={classes.formControl}>
                                <InputLabel>{formInputs[el].label}</InputLabel>
                                <Select
                                    value={formInputs.zone.value}
                                    onChange={(event) => handleChange(event, el)}
                                    renderValue={(value) => value}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {zones.map((item) => {



                                        return (
                                            <MenuItem
                                                key={item.name}
                                                value={item.name}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        );
                    }
                    else {
                        input = (
                            <TextField
                                key={el}
                                onChange={(event) => handleChange(event, el)}
                                margin="normal"
                                fullWidth
                                label={formInputs[el].label}
                                autoFocus
                                value={formInputs[el].value}
                            />
                        );

                    }
                        return input;
                    })}
                    <Button
                        disabled={!maySubmit}
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

                <List className={classes.root}>
                    {Object.keys(items).map((value) => {

                        const labelId = `checkbox-list-label-${value.name}`;

                        return (
                            <ListItem key={items[value]}  role={undefined} dense button onClick={handleToggle(value)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        disabled={false}
                                        checked={items[value].chosen}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={items[value].name} />
                                <ListItemSecondaryAction>

                                        <CommentIcon />
                                        <TextField
                                            id="standard-flexible"
                                            label="Price"
                                            type={value.purchaseCategory==="QUANTITY" ? "PriceQuantity" : "PriceWeight"}
                                            value={items[value].price}
                                            onChange={(event) => handlePriceChange(event, value)}
                                        />

                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            </div>
        </Container>
    );
};


export default withRouter(NewStore)