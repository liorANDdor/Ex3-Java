import React, { useEffect, useState } from 'react';
import 'date-fns';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LoadZonesService from "../../../../Utilities/Services/LoadZonesServices";
import LoadSpecificZoneService from "../../../../Utilities/Services/LoadSpecificZoneService";
import Table from "../../../UIComponents/Table/Table";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import Typography from "@material-ui/core/Typography";


const useStyle = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formControl: {
        margin: theme.spacing(2, 'auto'),
        minWidth: '25%'
    },
    locationInput: {
        width: '25%',
        margin: theme.spacing(2, 2, 4, 2),
    },
    LocationContainer: {
        justifyContent: 'space-between'
    }
}))


const useStylesTable = makeStyles({
    container: {
        background: 'inherit',
        width: '100%',
        marginTop: '2%',
        height: '240px',
    }

});




const CreateOrder = (props) => {
    const classesTable = useStylesTable()
    const classes = useStyle()
    const [isDynamicOrder, setIsDynamicOrder] = useState(false)
    const [zoneToOrder, setZoneToOrder] = useState('');
    const [storeToOrderFrom, setStoreToOrderFrom] = useState('')

    const [zoneOptions, setZoneOptions] = useState([])
    const [specificZoneData, setSpecificZoneData] = useState(null)
    const [itemOptions, setItemOptions] = useState([])

    const [itemsToOrder, setItemsToOrder] = useState([])

    const [x, setX] = useState('')
    const [y, setY] = useState('')

    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        LoadZonesService().then(res => {
            setZoneOptions(res)

        })

        return()=>console.log(itemsToOrder);
    }, [])

    const zoneToOrderChangeHandler = (event) => {
        setZoneToOrder(event.target.value)
        setStoreToOrderFrom('')
        setItemOptions([])
        setItemsToOrder([])
        console.log(zoneToOrder)
        LoadSpecificZoneService(event.target.value).then(res => {
            setSpecificZoneData(res)
            if (isDynamicOrder) {
                console.log(res.items)
                handleItemsOption(res.items)
            }
        })
    }

    const handleItemsOption = (items) => {
        const itemsDataTable = items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price ? item.price : 'dynamic price',
            purchaseCategory: item.purchaseCategory,
            total:0,
            quantity: 0,
            add: null,
            remove: null
        }))

        setItemOptions(itemsDataTable)

    }


    const storeToOrderChngeandler = event => {
        setStoreToOrderFrom(event.target.value)
        setItemsToOrder([])
        event.target.value !== ''
            ? handleItemsOption(specificZoneData
                .stores
                .find(store => store.id == event.target.value)
                .itemsStoreSell)
            : handleItemsOption([])
    }

    const isDynamicChangeHandler = event => {
        setIsDynamicOrder(event.target.checked)
        setStoreToOrderFrom('')
        setItemOptions([])
        setZoneToOrder('')
        setItemsToOrder([])

    }
    const cols = {
        id: {
            header: 'ID'
        },
        name: {
            header: 'Name'
        },
        price: {
            header: 'Price'
        },
        purchaseCategory: {
            header: 'Purchase category'
        },
        total:{
          header:'total',
            RenderMethod:el=>{
              const ind = itemsToOrder.findIndex(item=>item.id==el.id)
              return ind >= 0 ? itemsToOrder[ind].quantity : 0
          }
        },
        quantity: {
            header: 'Quantity',
            RenderMethod: (el) => <Input
                style={{ width: '48px' }}
                type='number'
                onChange={event => setItemOptions(itemOptions.map(item => item.id === el.id ? { ...item, quantity: event.target.value } : item))}
                value={el.quantity}
            />
        },
        add: {
            header: 'Add to order',
            RenderMethod: el => <Button
                variant="contained"
                color="secondary"
                disabled={el.quantity <= 0 || (el.purchaseCategory === 'QUANTITY' ? !Number.isInteger(Number(el.quantity)) : false)}
                onClick={() => addItemToOrder(el)}>add</Button>
        },
        remove: {
            header: 'Remove from order',
            RenderMethod: el => <Button
                variant="contained"
                color="secondary"
                disabled={el.quantity <= 0 || (el.purchaseCategory === 'QUANTITY' ? !Number.isInteger(Number(el.quantity)) : false)}
                onClick={() => removeItemToOrder(el)}>remove</Button>
        }
    }
    console.log(itemsToOrder)
    const addItemToOrder = (el) => {
        const found = itemsToOrder.some(item => el.id === item.id);
        if (!found) {
            setItemsToOrder([...itemsToOrder, { ...el, quantity: Number(el.quantity) }])
        }
        else {
            setItemsToOrder( itemsToOrder.map(item => el.id === item.id ? { ...item, quantity: Number(item.quantity) + Number(el.quantity) } : item))
        }
        console.log(itemsToOrder)
    }
    const removeItemToOrder = (el) => {
        const found = itemsToOrder.some(item => el.id === item.id);
        if (found) {
            let newItems =[...itemsToOrder]
            newItems = itemsToOrder.map(item => el.id === item.id ? { ...item, quantity: Number(item.quantity) - Number(el.quantity) } : item)
            newItems= newItems.filter(item=>item.quantity>0)
            setItemsToOrder((newItems))
        }
        else {
            //setItemsToOrder([...itemsToOrder, itemsToOrder.map(item => el.id === item.id ? { ...item, quantity: Number(item.quantity) + Number(el.quantity) } : item)])
        }

        console.log(itemsToOrder)
    }

    const createNewOrderObj = () => {
        let itemsAsObject = {}
        console.log(itemsToOrder)
        itemsToOrder.forEach(item => {
            itemsAsObject = {
                ...itemsAsObject,
                [item.id]: item.quantity
            }
        })
        const order = {
            isDynamic: isDynamicOrder,
            zone: zoneToOrder,
            storeId: isDynamicOrder ? null : storeToOrderFrom,
            items: itemsAsObject,
            date: selectedDate,
            customerLocationX: x,
            customerLocationY: y
        }

        return order
    }

    const changeLocationX = (e) =>{

        if (parseInt(e.target.value) > 50 || parseInt(e.target.value) <1   ) {
            console.log(e.target.value)
            console.log("over")
        }
        else{
            console.log(e.target.value)
            console.log("below")
            setX(e.target.value)}
    }
    const changeLocationY = (e) =>{

        if (parseInt(e.target.value) > 50 || parseInt(e.target.value) <1   ) {
            console.log(e.target.value)
            console.log("over")
        }
        else{
            console.log(e.target.value)
            console.log("below")
            setY(e.target.value)}
    }


    console.log(props.submitOrder)
    return (


        <div className={classes.container}>
            {<Typography component="h1" variant="h5">
                 {props.error}
            </Typography>}

                <FormControlLabel
                control={
                    <Switch
                        checked={isDynamicOrder}
                        onChange={isDynamicChangeHandler}
                    />
                }
                label="Is dynamic ?"
            />
            <div className={classes.LocationContainer}>
                <Input
                    type='number'
                    onChange={e=>changeLocationX(e)}
                    className={classes.locationInput}
                    value={x}
                    placeholder='Location: X' />
                <Input
                    type='number'
                    onChange={e=>changeLocationY(e)}
                    className={classes.locationInput}
                    value={y}
                    placeholder='Location: Y' />
            </div>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="zone-native-simple">Zone</InputLabel>
                <Select
                    onChange={zoneToOrderChangeHandler}
                    native
                    value={zoneToOrder}
                    inputProps={{
                        name: 'zone',
                        id: 'zone-native-simple',
                    }}
                >
                    <option aria-label="None" value="" />
                    {zoneOptions.map(zone => {
                        return <option value={zone.name}>{zone.name}</option>
                    })}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="store-native-simple">Store</InputLabel>
                <Select
                    native
                    value={storeToOrderFrom}
                    onChange={storeToOrderChngeandler}
                    inputProps={{
                        name: 'store',
                        id: 'store-native-simple',
                    }}
                    disabled={isDynamicOrder}
                >
                    <option aria-label="None" value="" />
                    {specificZoneData ? specificZoneData.stores.map(store => {
                        return <option value={store.id}>{store.name}</option>
                    }) : null}
                </Select>
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    className={classes.formControl}
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>

            <div>
                <Table
                    columns={cols}
                    data={itemOptions}
                    container={classesTable.container}
                />
            </div>

            <Button
                onClick={() => props.submitOrder(createNewOrderObj())}
                disabled={itemsToOrder.length === 0 || x == '' || y == ''}
                className={classes.formControl}
                variant="contained"
                color="secondary">
                Send order

            </Button>
        </div>

    )

}

export default CreateOrder