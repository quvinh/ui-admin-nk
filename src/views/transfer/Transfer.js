import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getData } from '../../components/utils/Api'
import { getToken } from '../../components/utils/Common'

const Transfer = () => {
    const history = useHistory()
    const [item_id, setItemID] = useState('')
    const [batch_code, setBatchCode] = useState('')
    const [fromWarehouse, setFromWarehouse] = useState('')
    const [fromShelf, setFromShelf] = useState('')
    const [supplier_id, setSupplier] = useState()
    const [toWarehouse, setToWarehouse] = useState('')
    const [toShelf, setToShelf] = useState('')
    const [category_id, setCategory] = useState()
    const [name, setName] = useState('')
    const [unit, setUnit] = useState('')
    const [created_by, setCreatedBy] = useState('')
    const [amount, setAmount] = useState('')
    const [amountCurrent, setAmountCurrent] = useState(0)
    const [price, setPrice] = useState(0)
    const [date, setDate] = useState(new Date)
    const [note, setNote] = useState('')
    const [kd, setKD] = useState('')
    const [code, setCode] = useState('')

    const [nameFromShelf, setNameFromShelf] = useState('')
    const [nameFromWarehouse, setNameFromWarehouse] = useState('')
    const [nameToShelf, setNameToShelf] = useState('')
    const [nameToWarehouse, setNameToWarehouse] = useState('')

    const [dataTable, setDataTable] = useState([])
    const [dataItem, setDataItem] = useState([])
    const [dataFromWarehouse, setDataFromWarehouse] = useState([])
    const [dataFromShelf, setDataFromShelf] = useState([])
    const [dataToWarehouse, setDataToWarehouse] = useState([])
    const [dataToShelf, setDataToShelf] = useState([])


    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }

    useEffect(() => {
        script()
    })
    return (

        <div></div>
    )
}

export default Transfer