import React from 'react'

const AddSales = props => {
    return (
        <div>
            {JSON.stringify(props.order)}
            <button onClick={props.addedSalesHandler}>ad</button>
        </div>
    )
}

export default AddSales