/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import AppHeader from '../../components/AppHeader'
import { getData, postData } from '../../components/utils/Api'
import { getDataWarehouseID, getToken, getUserID } from '../../components/utils/Common'
import Notification from './Notification'
import Select, { components } from 'react-select'
import SelectSearch, { fuzzySearch } from 'react-select-search'
const AddNotification = () => {
    const [title, setTitle] = useState()
    const [content, setContent] = useState('Nội dung')
    const [dataWarehouse, setDataWarehouse] = useState([])
    const [dataNotification, setDataNotification] = useState([])
    const [person, setPerson] = useState([])
    const [valueDefault, setValueDefault] = useState()
    const [personChecked, setPersonChecked] = useState([])
    const [isCheckedWarehouse, setIsCheckedWarehouse] = useState([])
    const [isSelected, setIsSelected] = useState(false)
    const [test, setTest] = useState('')
    const history = useHistory()

    const handleChangeData = () => {

    }

    const handleCheckWarehouse = (e) => {
        const { id, checked } = e.target
        console.log(id)
        setIsCheckedWarehouse([...isCheckedWarehouse, parseInt(id)])
        !checked && setIsCheckedWarehouse(isCheckedWarehouse.filter(item => parseInt(item) !== parseInt(id)))
        // setIsSelected(true)
    }

    const handleSave = () => {
        // isCheckedWarehouse.map(item => {
        //     console.log(title)
        //     console.log(item)
        //     console.log(content)
        //     const data = {
        //         title: title,
        //         content: content,
        //         status: 0,
        //         created_by: getUserID(),
        //         warehouse_id: item
        //     }
        //     console.log(data)
        //     Promise.all([
        //         postData('/api/admin/notification/store', data),
        //     ])
        //         .then(function (res) {
        //             setTest('test')
        //             // history.push('/notification')
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })
        // })
        // console.log(dataNotification)
        // history.push('/notification')
        console.log(title)
        console.log(content)
        Promise.all([
            postData('/api/admin/notification/store', {
                title: title,
                content: content,
                created_by: getUserID(),
                status: 0,
                send_to: personChecked.map(item => item.value)
            }),
        ])
            .then(function (res) {
                setTest('test')
                history.push('/notification')
            })
            .catch(error => {
                console.log(error)
            })
    }

    console.log(personChecked)

    useEffect(() => {
        // const header = `Authorization: Bearer ${getToken()}`
        Promise.all([
            getData('/api/auth/get-user/' + getUserID()),
            getData('/api/admin/notification/get-person/' + getUserID()),
        ])
            .then(function (res) {
                setDataWarehouse(res[0].warehouse_id)
                setIsCheckedWarehouse(res[0].warehouse_id.map(item => item.id))
                setPerson(res[1].data.map((item, index) => ({
                    label: item.fullname + " - " + item.role + " - " + item.warehouse,
                    value: item.id
                })))
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Tạo thông báo</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                                <li className="breadcrumb-item active">Thông báo</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <Link to={"/notification"} className="btn btn-primary btn-block mb-3">Các thông báo</Link>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Mục</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body p-0">
                                    <ul className="nav nav-pills flex-column">
                                        <li className="nav-item active">
                                            <a href="#" className="nav-link">
                                                <i className="fas fa-inbox" /> Inbox
                                                <span className="badge bg-primary float-right">12</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-envelope" /> Sent
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-file-alt" /> Drafts
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="fas fa-filter" /> Junk
                                                <span className="badge bg-warning float-right">65</span>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                                <i className="far fa-trash-alt" /> Trash
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Labels</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body p-0">
                                    <ul className="nav nav-pills flex-column">
                                        <li className="nav-item">
                                            <a className="nav-link" href="#"><i className="far fa-circle text-danger" /> Important</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#"><i className="far fa-circle text-warning" /> Promotions</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="#"><i className="far fa-circle text-primary" /> Social</a>
                                        </li>
                                    </ul>
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                        </div>
                        {/* /.col */}
                        <div className="col-md-9">
                            <div className="card card-primary card-outline">
                                <div className="card-header">
                                    <h3 className="card-title">Tạo mới</h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <div className="form-group">
                                        {/* <input className="form-control" placeholder="Tới:" /> */}
                                        <div className="card">
                                            <div className="card-header">
                                                <h3 className="card-title"><b>Gửi tới:</b></h3>
                                                <div className="card-tools">
                                                    <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                        <i className="fas fa-minus" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                {/* {
                                                    dataWarehouse && dataWarehouse.map((item, index) => (
                                                        <div className="form-check" key={index}>
                                                            <input className="form-check-input" type="checkbox"
                                                                id={item.id} checked={isCheckedWarehouse.includes(parseInt(item.id))} onChange={(e) => handleCheckWarehouse(e)} />
                                                            <label className="form-check-label">{item.name}</label>
                                                        </div>
                                                    ))
                                                } */}
                                                {/* <div className="col">
                                                    <SelectSearch
                                                        options={person}
                                                        isMu
                                                        onChange={(name, value) => {
                                                            !personChecked.includes(value.send) ? setPersonChecked([...personChecked, value.send]) : setPersonChecked([...personChecked.filter(item => item !== value.send)])
                                                        }}
                                                        search
                                                        filterOptions={fuzzySearch}
                                                        placeholder="Gửi tới ..."
                                                        // renderValue={(valueProps) => <input className="select-search__input" {...valueProps} />}
                                                    />
                                                </div> */}
                                                <Select
                                                    isMulti
                                                    // value={personChecked}
                                                    onChange={(name, value) => {
                                                        // !personChecked.includes(name.send) ? setPersonChecked([...personChecked, name.send]) : setPersonChecked([...personChecked.filter(item => item !== name.send)])
                                                        // console.log(name, value)
                                                        setPersonChecked(name)
                                                    }}
                                                    options={person}
                                                />
                                                <div className="col">

                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="form-group">
                                        <input className="form-control" placeholder="Tiêu đề:" onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <textarea className="form-control" style={{ height: 300 }} onChange={(e) => setContent(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        {/* <div className="btn btn-default btn-file">
                                            <i className="fas fa-paperclip" /> Attachment
                                            <input type="file" name="attachment" />
                                        </div>
                                        <p className="help-block">Max. 32MB</p> */}
                                    </div>
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer">
                                    <div className="float-right">
                                        {/* <button type="button" className="btn btn-default"><i className="fas fa-pencil-alt" /> Draft</button> */}
                                        <button type="submit" className="btn btn-primary" onClick={handleSave}><i className="far fa-envelope" /> Tạo</button>
                                    </div>
                                    {/* <button type="reset" className="btn btn-default"><i className="fas fa-times" /> Discard</button> */}
                                </div>
                                {/* /.card-footer */}
                            </div>
                            {/* /.card */}
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </div>{/* /.container-fluid */}
            </section>
            {/* /.content */}
        </div>
    )
}

export default AddNotification