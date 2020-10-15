import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";

import axios from '../../../../Utilities/Axios/Axios'

import parseKeyToLabel from '../../../../Utilities/Modal/ParseKeyToUpperCaseWithSpacesString'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import ModalItems from './ModalItems/ModalItems'

import MyTable from '../../Table/Table'



const useStyles = makeStyles({
    container: {
        background: 'inherit',
        width: '80%',
        marginLeft: '10%',
        marginTop: '2%',
        height: '360px',
    }

});

// function Location() {

// }

// function Button() {

// }

// function String() {

// }

// const mapTypeToComp = {
//     ['location']: Location
// }

// function createStore(data) {
//     return {
//         name: data.map['Givataim Shivataim'].map.name,
//         items: Object.keys(data.map['Givataim Shivataim'].map.itemsStoreSell.map)
//     }
// }

// function Zone(props) {
//     const [stores, setStores] = useState([])

//     stores: Array<Store>

//     Store{
//         name: string
//         id: string
//         items: Array<Item>
//     }
//     Item{
//         name: string
//     }

//     useEffect(() => {
//         axios.post('SDM/getStores', { zone: props.location.pathname.split('/')[2] })
//             .then(res => {
//                 const storeData = createStore(res.data)
//                 setStores([{
//                     name: 'sotre a',
//                     id: 'some',
//                     items: [{
//                         name: 'item 1',
//                     }, {
//                         name: 'item 2',
//                     }, {
//                         name: 'item 3',
//                     }]
//                 }, {
//                     name: 'sotre b',
//                     id: 'some',
//                     items: [{
//                         name: 'item 6',
//                     }, {
//                         name: 'item 7',
//                     }, {
//                         name: 'item 8',
//                     }]
//                 }])
//             })
//             .catch(err => console.log(err))

//     }, [])
//     const [isOpen, setOpen] = useState({

//     })

//     return <div>

//         {stores.map((store, index) =>
//             <div>
//                 <button
//                     onClick={()=>setOpen({...isOpen, [index]: true})}>{store.name}</button>
//                 <Modal
//                     open={isOpen[index]}
//                     onClose={()=>setOpen({...isOpen, [index]: false})}
//                     aria-labelledby="simple-modal-title"
//                     aria-describedby="simple-modal-description"
//                 >
//                     <ModalItems items={store.items} />
//                 </Modal>
//             </div>)}
//     </div>
// }

const Zone = props => {
    const [isOpen, setIsOpen] = useState(false)
    const classes = useStyles()
    const [items, setItems] = useState([])
    const [stores, setStores] = useState([])

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        axios.post('SDM/getData', { zone: props.location.pathname.split('/')[2] })
            .then(res => {
                setItems(Object.values(res.data.items))
            })
            .catch(err => console.log(err))
        axios.post('SDM/getStores', { zone: props.location.pathname.split('/')[2] })
            .then(res => setStores(Object.values(res.data.map)))
            .catch(err => console.log(err))

    }, [])

    let cols = {}
    if (items.length > 0) {
        Object.keys(items[0]).forEach(key => {
            cols = {
                ...cols,
                [key]: {
                    header: parseKeyToLabel(key),
                    RenderMethod: key === 'storesWhoSellTheItem' ? (el) => el.storesWhoSellTheItem.length : null
                }
            }
        });
    }

    console.log(items)
    return (
        <React.Fragment>

            <MyTable colums={cols} data={items} width='40%' />

            {stores.length > 0 ?
                < TableContainer className={classes.container} component={Paper} >
                    <Table size='small' aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {Object.keys(stores[0].map).map(key => {
                                    let str
                                    str = key.replace(/([A-Z])/g, ' $1').trim()
                                    str = str.charAt(0).toUpperCase() + str.slice(1)

                                    return (<TableCell key={key} align="left" > {str}</TableCell>)
                                })}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stores.map(el => {
                                return (
                                    <TableRow key={el.map.id} >
                                        {Object.keys(el.map).map((key, ind) => {
                                            let toRender;
                                            switch (key) {
                                                case 'location':
                                                    toRender = 'X: ' + el.map[key].x + ' Y: ' + el.map[key].y
                                                    break
                                                case 'itemsStoreSell':
                                                    console.log(el.map[key])
                                                    toRender = (<div style={{ background: 'inherit' }}>
                                                        <button type="button" onClick={handleOpen}>
                                                            View items
                                                        </button>
                                                        <Modal
                                                            open={isOpen}
                                                            onClose={handleClose}
                                                            aria-labelledby="simple-modal-title"
                                                            aria-describedby="simple-modal-description"
                                                        >
                                                            <ModalItems items={el.map[key]} />
                                                        </Modal>
                                                    </div>)
                                                    break
                                                default:
                                                    toRender = el.map[key]
                                            }
                                            return <TableCell key={el.map.id * ind} align="left">{toRender}</TableCell>
                                        })}
                                    </TableRow>)
                            })}
                        </TableBody>
                    </Table>
                </TableContainer > : null}
        </React.Fragment>
    )
}

export default withRouter(Zone)