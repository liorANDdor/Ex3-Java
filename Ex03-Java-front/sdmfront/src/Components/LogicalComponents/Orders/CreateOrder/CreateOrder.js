import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


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


const CreateOrder = props => {
    const classes = useStyle()
    const [isDynamicOrder, setIsDynamicOrder] = useState(false)
    const [idOfStoreToOrderFrom, setOdOfStoreToOrderFrom] = useState('')
    const handleChangeDynamic = (event) => {
        setIsDynamicOrder(event.target.checked);
    };
    return (
        <div className={classes.container}>
            <FormControlLabel
                control={
                    <Switch
                        checked={isDynamicOrder}
                        onChange={handleChangeDynamic}
                        name="checkedB"
                    />
                }
                label="Is dynamic ?"
            />
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Zone</InputLabel>
                <Select

                    native
                    value={idOfStoreToOrderFrom}
                    inputProps={{
                        name: 'age',
                        id: 'age-native-simple',
                    }}
                    disabled={isDynamicOrder}
                >
                    <option aria-label="None" value="" />
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                </Select>
            </FormControl>
            <Button
                className={classes.formControl}
                variant="contained"
                color="secondary">
                Send order
            </Button>

        </div>

    )

}

export default CreateOrder