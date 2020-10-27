import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";


import parseKeyToLabel from '../../../Utilities/Parsers/ParseKeyToUpperCaseWithSpacesString'

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





const NewItem = (props) => {

    const [zones, setZones] = useStateIfMounted([{}])
    const [stores, setStores] = useState([])

    const [checked, setChecked] = React.useState([0]);
    const formElementsInit = {
        name: {
            type: "text",
            options: null,
            valid: false,
            touched: false,
            label: "Item Name",
            value: "",
        },
        type: {
            type: "selectType",
            options: { Weight: "Weight", Quantity: "Quantity" },
            valid: false,
            touched: false,
            label: "Purchase Type",
            value: "",
        },
        zone: {
            type: "selectZone",
            options: zones ,
            valid: false,
            touched: false,
            label: "Zone",
            value: "",
        },
        stores: {
            type: "stores",
            options: null ,
            valid: false,
            touched: false,
            label: "stores",
            value: stores,
        },

    };
    const handleToggle = (value) => () => {

        let newStores = clone(stores);
        if(newStores[value].price!='') {
            newStores[value].chosen = !stores[value].chosen
            //setMaySubnit(isSubimitAble)
            //valid items
            setStores(newStores);

            let hasStore = false;
            let newFormInputs = clone(formInputs);

            for (let index = 0; index < stores.length - 1; ++index) {
                if (newStores[index].chosen == true) {
                    hasStore = true;
                }
            }
            newFormInputs["stores"].valid = hasStore;
            newFormInputs["stores"].value = newStores;

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
            .post("/SDM/createItem", formInputs)
            .then((res) => {
                if (res.data.wasAdded === true) {
                    console.log("Item Was Added")
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

        if (newFormInputs[key].type === "selectZone") {
            if (event.target.value !== "") {


                newFormInputs[key].label = newFormInputs[key].label.split(" ")[0]
                newFormInputs[key].valid = true;
                newFormInputs[key].value = event.target.value;
                let data = await loadSpecificZone(event.target.value)
                setStores(data.stores.map(store=> {return {name:store.name, id:store.id, purchaseCategory:store.purchaseCategory, price:"", chosen: false}}))

                console.log(stores)


            } else {
                newFormInputs[key].label = newFormInputs[key].label.split(" ")[0]
                newFormInputs[key].valid = false;
                newFormInputs[key].value = event.target.value;
            }
        }

        if (newFormInputs[key].type === "selectType") {
            if (event.target.value !== "") {


                newFormInputs[key].label = newFormInputs[key].label.split(" ")[0]
                newFormInputs[key].valid = true;
                newFormInputs[key].value = event.target.value;


            } else {
                newFormInputs[key].label = newFormInputs[key].label.split(" ")[0]
                newFormInputs[key].valid = false;
                newFormInputs[key].value = event.target.value;
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
        let newStores = clone(stores);
        const double = /^[0-9,.\b]+$/;


            if (!double.test(event.target.value) && !event.target.value == "") {

            } else {
                newStores[key].price = event.target.value
                newStores[key].price = event.target.value

            }

        //setMaySubnit(isSubimitAble)
        setStores(newStores);

    };

    return (
        <Container component="main" maxWidth="xs" className={classes.paper}>
            <CssBaseline />
            <div>

                <Typography component="h1" variant="h5">
                    New Item
                </Typography>
                <form onSubmit={onSubmitHandler} className={classes.form} noValidate>
                    {Object.keys(formInputs).map((el) => {
                        let input = null;

                        if(formInputs[el].type==="stores") {
                            return
                        }
                        else if(formInputs[el].type==="selectType" ) {
                            input = (
                                <FormControl key={el} className={classes.formControl}>
                                    <InputLabel>{formInputs[el].label}</InputLabel>
                                    <Select
                                        value={formInputs.type.value}
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
                        }
                    else if(formInputs[el].type==="selectZone") {
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
                                    {zones.map((store) => {



                                        return (
                                            <MenuItem
                                                key={store.name}
                                                value={store.name}
                                            >
                                                {store.name}
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
                        Add Store
                    </Button>
                </form>
                {isTaken ? (
                    <Alert severity="info">
                        User Name is already taken, try another one
                    </Alert>
                ) : null}

                <List className={classes.root}>
                    {Object.keys(stores).map((value) => {

                        const labelId = `checkbox-list-label-${value.name}`;

                        return (
                            <ListItem key={stores[value]}  role={undefined} dense button onClick={handleToggle(value)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        disabled={false}
                                        checked={stores[value].chosen}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={stores[value].name} />
                                <ListItemSecondaryAction>

                                        <CommentIcon />
                                        <TextField
                                            id="standard-flexible"
                                            label="Price"
                                            type={value.purchaseCategory==="QUANTITY" ? "PriceWeight" : "PriceWeight"}
                                            value={stores[value].price}
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


export default withRouter(NewItem)