import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";


import parseKeyToLabel from '../../../Utilities/Parsers/ParseKeyToUpperCaseWithSpacesString'

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import Button from '@material-ui/core/Button';
import ModalItems from '../../UIComponents/ModalItems/ModalItems'

import MyTable from '../../UIComponents/Table/Table'
import loadSpecificZone from '../../../Utilities/Services/LoadSpecificZoneService';



const useStyles = makeStyles({
    container: {
        background: 'inherit',
        width: '80%',
        marginLeft: '10%',
        marginTop: '2%',
        height: '360px',
    }

});

const Zone = props => {
    const classes = useStyles()
    const [isOpen, setIsOpen] = useState({})
    const [items, setItems] = useState([])
    const [stores, setStores] = useState([])

    const handleOpen = (index) => {
        setIsOpen({ ...isOpen, [index]: true })
    };

    const handleClose = (index) => {
        setIsOpen({ ...isOpen, [index]: false })
    };

    useEffect(() => {
        const loadData = async () => {
            let data = await loadSpecificZone(props.location.pathname.split('/')[2])
            setItems(data.items)
            setStores(data.stores)
        }
        loadData()

    }, [props.location.pathname])

    let itemsCols = {}

    if (items.length > 0) {
        Object.keys(items[0]).forEach(key => {
            itemsCols = {
                ...itemsCols,
                [key]: {
                    header: parseKeyToLabel(key),
                    RenderMethod: key === 'storesWhoSellTheItem' ? (el) => el.storesWhoSellTheItem.length : null
                }
            }
        });
    }

    const getRenderMethod = (key) => {
        let method
        switch (key) {
            case 'location':
                method = (el) => 'X: ' + el[key].x + ' Y: ' + el[key].y
                break
            case 'itemsStoreSell':
                method = (el, index) => (<div style={{ background: 'inherit' }}>
                    <Button type="button"
                        variant="contained"
                        color="secondary"
                        onClick={() => handleOpen(index)}>
                        View items
                    </Button>
                    <Modal
                        open={isOpen[index]}
                        onClose={() => handleClose(index)}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <ModalItems items={el[key]} />
                    </Modal>
                </div>)
                break
            default:
                method = null
        }
        return method

    }

    let storesCols = {}
    if (stores.length > 0) {
        Object.keys(stores[0]).forEach(key => {
            storesCols = {
                ...storesCols,
                [key]: {
                    header: parseKeyToLabel(key),
                    RenderMethod: getRenderMethod(key)
                }
            }
        });
    }

    console.log(items)
    return (
        <React.Fragment>
            <MyTable
                columns={itemsCols}
                data={items}
                container={classes.container} />
            <MyTable
                columns={storesCols}
                data={stores}
                container={classes.container} />
        </React.Fragment>
    )
}

export default withRouter(Zone)