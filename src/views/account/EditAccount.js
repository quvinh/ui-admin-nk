import React, { useState, useEffect, createRef, useRef } from 'react'
import { getData, postData } from '../../components/utils/Api'
import { useHistory, Link } from 'react-router-dom'
import Validator from '../../components/utils/Validation'
import { getToken, getUserID } from '../../components/utils/Common'
import { Box, Radio, FormControl, RadioGroup, FormLabel, FormControlLabel, Select, TextField, Stack } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import { styled } from '@mui/material/styles';

const EditAccount = (props) => {
    const [dataUser, setDataUser] = useState([])
    const [dataRoles, setRoles] = useState([])
    const [dataWarehouse, setDataWarehouse] = useState([])
    const [roleID, setRoleID] = useState()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [fullName, setFullName] = useState()
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState()
    const [birthday, setBirthday] = useState()
    const [gender, setGender] = useState()
    const [isBirthdaySelected, setIsBirthdaySelected] = useState(false)

    const [isCheckedWarehouse, setIsCheckedWarehouse] = useState([])
    const [isCheckedWarehouseAll, setIsCheckedWarehouseAll] = useState(false)

    const [isSelected, setIsSelected] = useState(false)
    const history = useHistory()
    // console.log(props)

    const handleCheckWarehouseAll = (e) => {
        setIsCheckedWarehouseAll(!isCheckedWarehouseAll)
        setIsCheckedWarehouse(dataWarehouse.map(item => parseInt(item.id)))
        isCheckedWarehouseAll && setIsCheckedWarehouse([])
        setIsSelected(true)
    }

    const handleCheckWarehouse = (e) => {
        const { id, checked } = e.target
        console.log(id)
        setIsCheckedWarehouse([...isCheckedWarehouse, parseInt(id)])
        !checked && setIsCheckedWarehouse(isCheckedWarehouse.filter(item => parseInt(item) !== parseInt(id)))
        setIsSelected(true)
    }

    const handelSave = () => {
        console.log("......")
        if (roleID !== 0) {
            Promise.all([postData('http://127.0.0.1:8000/api/admin/auth_model/user_roles?token=' + getToken(), {
                user_id: dataUser[0].id,
                roles_id: roleID,
                warehouse_id: isCheckedWarehouse
            })])
                .then(function (res) {
                    console.log('SAVED roles')
                    history.push('/account')
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            console.log("NO")
        }
    }

    const onSave = (e) => {
        const data = {
            username: username,
            email: email,
            phone: phone,
            fullname: fullName,
            address: address,
            birthday: birthday,
            gender: gender
        }
        console.log(data)
        Promise.all([postData('http://127.0.0.1:8000/api/auth/update-user/' + getUserID() + '?token=' + getToken(), data)])
            .then(function (res) {
                console.log('UPDATED')
            })
            .catch(error => {
                console.log(error)
                if (error.response.status === 403) {
                    history.push('/404')
                } else if (error.response.status === 401) {
                    history.push('/login')
                }
            })
    }

    useEffect(() => {
        Promise.all([
            getData('http://127.0.0.1:8000/api/auth/get-user/' + props.match.params.id + '?token=' + getToken()),
            getData('http://127.0.0.1:8000/api/admin/auth_model/roles?token=' + getToken()),
            getData('http://127.0.0.1:8000/api/admin/warehouse?token=' + getToken()),
            getData('http://127.0.0.1:8000/api/auth/get-user/' + getUserID() + '?token=' + getToken())
        ])
            .then(function (res) {
                // console.log(res)
                setDataUser(res[0].data)
                setRoleID(res[0].role_id)
                setRoles(res[1].data)
                setDataWarehouse(res[2].data)
                setIsCheckedWarehouse(res[2].data.map(item => item.id))
                setUsername(res[3].data[0].username)
                setFullName(res[3].data[0].fullname)
                setEmail(res[3].data[0].email)
                setPhone(res[3].data[0].phone)
                setAddress(res[3].data[0].address === null ? "" : res[0].data[0].address)
                setGender(res[3].data[0].gender)
                console.log('gt',res[3].data[0].gender)
                setBirthday(res[3].data[0].birthday === null ? new Date('1990/01/01') : res[0].data[0].birthday)
            })
            .catch(error => {

            })
    }, [])
    console.log(isCheckedWarehouse)
    console.log(roleID)
    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Cập nhật người dùng <i style={{ color: "#007bff", fontSize: 18 }}>{dataUser.length === 1 && dataUser[0].fullname}</i></h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/"}>Trang chủ</Link></li>
                                <li className="breadcrumb-item"><Link to={"/account"}>Người dùng</Link></li>
                                <li className="breadcrumb-item active">Cập nhật người dùng</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <i style={{ fontSize: 18 }}>{dataUser.length === 1 && ('Tên đăng nhập: ' + dataUser[0].username)}</i>
                        </div>
                        <div className="col">
                            <div style={{ textAlign: "end" }}>
                                <button type="button" className="btn btn-sm btn-success" onClick={handelSave}>
                                    <i className="fas fa-save " /> Lưu
                                </button>
                                <Link to={"/account"} className="btn btn-sm btn-secondary" style={{ marginLeft: 5 }}>
                                    <i className="fas fa-times"></i> Huỷ
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="card card-secondary">
                    <div className="card-header">
                        <h3 className="card-title">Phân quyền</h3>
                        <div className="card-tools">
                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                <i className="fas fa-minus" />
                            </button>
                        </div>
                    </div>
                    {/* /.card-header */}
                    <div className="card-body">
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Chức vụ</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            {
                                                dataRoles && dataRoles.map((item, index) => (
                                                    <div className="form-group" key={index}>
                                                        <div className="form-check">
                                                            <input className="form-check-input" name="role" type="radio"
                                                                value={item.id} checked={parseInt(item.id) === parseInt(roleID)}
                                                                onClick={() => {
                                                                    // permissionChecked(item.id)
                                                                    // setRoleName(item.name)
                                                                    setRoleID(item.id)
                                                                    setIsSelected(true)
                                                                }} />
                                                            <label className="form-check-label">{item.name}</label>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Hoạt động</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" onChange={() => handleCheckWarehouseAll()} checked={isCheckedWarehouseAll} />
                                                <label className="form-check-label">Chọn tất cả</label>
                                            </div>
                                            {
                                                dataWarehouse && dataWarehouse.map((item, index) => (
                                                    <div className="form-check" key={index}>
                                                        <input className="form-check-input" type="checkbox"
                                                            id={item.id} checked={isCheckedWarehouse.includes(parseInt(item.id))} onChange={(e) => handleCheckWarehouse(e)} />
                                                        <label className="form-check-label">{item.name}</label>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer p-0">

                        </div>
                    </div>
                </div>
                <div className="card card-secondary">
                    <div className="card-header">
                        <h3 className="card-title">Thông tin người dùng</h3>
                        <div className="card-tools">
                            <div style={{ textAlign: "end" }}>
                                <button type="button" className="btn btn-sm btn-success" onClick={(e) => onSave(e)}>
                                    <i className="fas fa-save " /> Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='card-body'>
                        <Box>
                            <Stack spacing={2}>
                                <TextField size="small" label="(*) Tên đăng nhập" variant="outlined"
                            value={String(username)} color="warning" aria-readonly
                        />
                        <TextField fullWidth size="small" label="(*) Email" variant="outlined"
                            value={String(email)} color="warning" aria-readonly
                        />
                        <TextField fullWidth size="small" label="(*) Họ và tên" variant="outlined"
                            value={String(fullName)} color="warning"
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <TextField fullWidth size="small" label="(*) Số điện thoại" variant="outlined"
                            value={String(phone)} color="warning"
                            inputProps={{ type: 'number' }}
                            onChange={(e) => setPhone(e.target.value.length > 10 ? phone : e.target.value)}
                        />
                        <TextField fullWidth size="small" label="Địa chỉ" variant="outlined"
                            value={String(address)} color="warning"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Ngày sinh"
                                value={birthday}
                                onChange={(newValue) => {
                                    // setIsBirthdaySelected(true)
                                    setBirthday(newValue.getFullYear() + "/" + (newValue.getMonth() + 1) + "/" + newValue.getDate())
                                    console.log(birthday)
                                }}
                                inputFormat={"dd/MM/yyyy"}
                                renderInput={(params) => <TextField color="warning" size="small" {...params} />}
                            />
                        </LocalizationProvider>
                        <Box gridColumn="span 4">
                            <FormControl color="warning">
                                <FormLabel>Giới tính</FormLabel>
                                <RadioGroup
                                    value={gender === null ? null : (gender === 0 ? "Nữ" : "Nam") }
                                    color="warning"
                                    row
                                    name="controlled-radio-buttons-group"
                                >
                                    <FormControlLabel value="Nữ" control={<Radio color="warning" onClick={(e) => setGender(0)}/>}  label="Nữ" />
                                    <FormControlLabel value="Nam" control={<Radio color="warning" onClick={(e) => setGender(1)}/>} label="Nam" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                            </Stack>
                        </Box>
                        
                    </div>
                </div>
            </section >
        </div >
    )
}

export default EditAccount