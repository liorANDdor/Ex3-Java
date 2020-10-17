import React, { useEffect, useState } from 'react';
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


const useStyle = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    formControl: {
        margin: theme.spacing(2, 'auto'),
        minWidth: '25%'
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




const CreateOrder = props => {
    const classesTable = useStylesTable()
    const classes = useStyle()
    const [isDynamicOrder, setIsDynamicOrder] = useState(false)
    const [zoneToOrder, setZoneToOrder] = useState('');
    const [storeToOrderFrom, setStoreToOrderFrom] = useState('')

    const [zoneOptions, setZoneOptions] = useState([])
    const [specificZoneData, setSpecificZoneData] = useState(null)
    const [itemOptions, setItemOptions] = useState([])

    const [itemsToOrder, setItemsToOrder] = useState([])

    useEffect(() => {
        LoadZonesService().then(res => {
            setZoneOptions(res)
        })
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
            quantity: 0,
            add: null
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
        quantity: {
            header: 'Quantity',
            RenderMethod: (el) => <Input
                style={{ width: '48px' }}
                type='number'
                onChange={event => setItemOptions(itemOptions.map(item => item.id === el.id ? { ...el, quantity: event.target.value } : item))}
                value={el.quantity}
            />
        },
        add: {
            header: 'Add to order',
            RenderMethod: el => <Button
                variant="contained"
                color="secondary"
                disabled={el.quantity == 0&& el.purchaseCategory == 'QUANTITY' ? Number.isInteger(el.quantity) : false}
                onClick={() => addItemToOrder(el)}>add</Button>
        }
    }

    const addItemToOrder = (el) => {
        const found = itemsToOrder.some(item => el.id === item.id);
        if (!found) {
            setItemsToOrder([...itemsToOrder, { ...el, quantity: Number(el.quantity) }])
        }
        else {
            setItemsToOrder(itemsToOrder.map(item => el.id === item.id ? { ...item, quantity: Number(item.quantity) + Number(el.quantity) } : item))
        }
        console.log(itemsToOrder)
    }


    return (
        <div className={classes.container}>
            <FormControlLabel
                control={
                    <Switch
                        checked={isDynamicOrder}
                        onChange={isDynamicChangeHandler}
                    />
                }
                label="Is dynamic ?"
            />
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
            <div>
                <Table
                    columns={cols}
                    data={itemOptions}
                    container={classesTable.container}
                />

                {/* {itemOptions.map(item => {
                    return <div>
                        {(item.price ? item.price : 'no price') + ' ' + item.purchaseCategory + ' ' + item.name}
                    </div>
                })} */

                }
            </div>
            <Button
                disabled={itemsToOrder.length === 0}
                className={classes.formControl}
                variant="contained"
                color="secondary">
                Send order
            </Button>

        </div>

    )

}

export default CreateOrder