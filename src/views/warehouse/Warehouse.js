/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { getData, putData, delData, postData } from '../../components/utils/Api'
import { useHistory } from 'react-router-dom';
import Validator from '../../components/utils/Validation'
import { getAllPermissions, getDataWarehouseID, getRoleNames, getToken, getUserID } from '../../components/utils/Common'
import { set } from 'date-fns';
// import Box from '@mui/material/Box';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import { Link } from '@mui/material';

// function LinkTab(props) {
//     return (
//       <Tab
//         component="a"
//         onClick={(event) => {
//           event.preventDefault();
//         }}
//         {...props}
//       />
//     );
//   }

const Warehouse = () => {
    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }

    const alert = () => {
        const compile = document.createElement("script")
        compile.src = $(function () {
            $('.add').click(function () {
                toastr.success('Thêm thành công')
            });
            $('.update').click(function () {
                toastr.success('Cập nhật thành công')
            });
            $('.close').click(function () {
                toastr.success('Cập nhật thành công')
            });
        })
        compile.async = true
        document.body.appendChild(compile)
    }
    const [validator, showValidationMessage] = Validator()
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [note, setNote] = useState('');
    const [count, setCount] = useState('')
    const [status, setStatus] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    // const [statusWarehouse, setStatusWarehouse] = useState(false)

    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleLocation = (e) => {
        setLocation(e.target.value);
    }
    const handleNote = (e) => {
        setNote(e.target.value);
    }

    const setNullWarehouse = () => {
        setName('')
        setLocation('')
        setNote('')
        setStatus(false)
    }

    const handleAddWarehouse = () => {
        const data = {
            name: name,
            location: location,
            note: note,
            status: status,
        }
        console.log(data);
        Promise.all([postData('/api/admin/warehouse/store', data)])
            .then(res => {
                console.log('Added successfully', res)
                handleReload()
                // setDataWarehouse([...dataWarehouse, data])
                setIsSelected(false)
                setNullWarehouse()
                // history.push('/warehouses')
                // history.goBack()
            }).catch(error => {
                // validatorAll()
                console.log(':(((')
                console.log(error)
                showValidationMessage(true)
            })
        // window.location.reload(false);
    }
    const handleUpdate = (e) => {
        const warehouse = {
            name: name,
            location: location,
            note: note
        }
        console.log(warehouse)
        Promise.all([putData('/api/admin/warehouse/update/' + id, warehouse)])
            .then(response => {
                // console.log(data)
                console.log('Edited successfully ^^')
                setNullWarehouse()
                setIsSelected(false)
                handleReload()
                // history.push('/warehouses')
                // history.goBack()
            }).catch((err) => {
                console.log(err)
                showValidationMessage(true)
            })
    }

    const handleUpdateStatusWarehouse = (e) => {
        const warehouse = {
            status: status,
        }
        console.log(id)
        console.log(warehouse)
        Promise.all([putData('/api/admin/warehouse/statusWarehouse/' + id, warehouse)])
            .then(response => {
                // console.log(data)
                console.log('Edited successfully ^^')
                setNullWarehouse()
                // setIsSelected(false)
                handleReload()
                // history.push('/warehouses')
                // history.goBack()
            }).catch((err) => {
                console.log(err)
                showValidationMessage(true)
            })

    }



    const history = useHistory()

    const handleReload = () => {
        Promise.all([getData('/api/admin/warehouse')])
            .then(function (res) {
                setDataWarehouse(res[0].data)
            })
    }

    // const [value, setValue] = React.useState(0);

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    const handleCount = (id) => {
        Promise.all([getData('/api/admin/warehouse/amountShelf/' + id),])
            .then(function (res) {
                setCount(res[0].data)
            })
    }
    const handleDelete = (e, id) => {
        // console.log(id)
        // if (count === 0) {
        Promise.all([delData('/api/admin/warehouse/delete/' + id)])
            .then(function (response) {
                handleReload()
                console.log(response)
                // eClick.closest('tr').remove();
            })
            .catch(error => {
                console.log(error)
            })
        // }
        // else {
        //     setVisibleAlert(!visibleAlert)
        //     setVisibleDel(false)
        // }

    }

    // const [visible1, setVisible1] = useState(false)
    const [dataWarehouse, setDataWarehouse] = useState([])
    const [dataCountWarehouse, setDataCountWarehouse] = useState([])

    useEffect(() => {
        Promise.all([
            getData(getRoleNames() === 'admin' ? (
                '/api/admin/warehouse'
            ) : getDataWarehouseID().length > 0 && (
                '/api/admin/warehouse/'+ getUserID()
            )),

            // getData('/api/admin/warehouse/warehouseShow),
            // getData('/api/admin/warehouse/countWarehouse')
        ])
            .then(function (res) {
                console.log(res)
                setDataWarehouse(res[0].data)
                // setDataCountWarehouse(res[1].data)
                script()
            })
            .catch((error) => {
                console.log(error.response.status)
                // if (error.response.status === 403) {
                //   history.push('/404')
                // }
            })
    }, [])

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Quản lý kho</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                                <li className="breadcrumb-item active">Kho</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    {/* <Box sx={{ width: '100%' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="nav tabs example">
                                            <LinkTab label="Kho" href="/drafts" />
                                            <LinkTab label="Thông tin kho" href="/trash" />
                                        </Tabs>
                                    </Box> */}

                                    <h3 className="card-title"></h3>
                                    {/* {
                                        getAllPermissions().includes("Thêm kho") && (
                                            <div className='modal-footer justify-content-end'>
                                                <button type="button" className="btn btn-sm btn-success" data-toggle="modal" data-target="#modal-lg">
                                                    <i class="fa fa-plus" aria-hidden="true"></i> tạo mới
                                                </button>
                                            </div>
                                        )
                                    } */}
                                    {
                                        getRoleNames() === "admin" ? (
                                            <>
                                                <div className='modal-footer justify-content-end'>
                                                    <button type="button" className="btn btn-sm btn-success" data-toggle="modal" data-target="#modal-lg">
                                                        <i class="fa fa-plus" aria-hidden="true"></i> tạo mới
                                                    </button>
                                                </div>
                                            </>
                                        ) : (<></>)
                                    }
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <table id="item" className="table table-hover ">
                                        <thead>
                                            <tr>
                                                <th className='text-center'>STT</th>
                                                {/* <th className='text-center'>Người điều hành</th> */}
                                                <th className='text-center'>Tên kho</th>
                                                <th className='text-center'>Mã kho</th>
                                                <th className='text-center'>Địa chỉ</th>
                                                <th className='text-center'>Trạng thái</th>
                                                <th className='text-center'>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataWarehouse.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className='text-center'>{String(index + 1)}</td>
                                                        {/* <td className='text-center'>{item.fullname}</td> */}
                                                        <td className='text-center'>{item.name}</td>
                                                        <td className='text-center'>{item.id}</td>
                                                        <td className='text-center'>{item.location}</td>
                                                        <td className='text-center'>
                                                            {
                                                                (item.status) ? (
                                                                    <>
                                                                        <span className="badge badge-success">Đang mở</span>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <span className="badge badge-danger">Đang đóng</span>
                                                                    </>
                                                                )
                                                            }
                                                        </td>
                                                        <td className='text-center'>
                                                            <div >
                                                                <button type="button" className="btn btn-default" style={{ border: "none", backgroundColor: "white", borderRadius: "4rem" }} data-toggle="dropdown">
                                                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                </button>
                                                                <div className="dropdown-menu">

                                                                    {
                                                                        (item.status) ? (
                                                                            <>
                                                                                <a className="dropdown-item" href={'#/warehouse-show/' + item.id}>Chi tiết</a>
                                                                                {
                                                                                    getAllPermissions().includes("Sửa kho") && (
                                                                                        <a className="dropdown-item" data-toggle="modal" data-target="#modal-lg" onClick={(e) => {
                                                                                            setId(item.id)
                                                                                            setName(item.name)
                                                                                            setLocation(item.location)
                                                                                            setNote(item.note)
                                                                                            setIsSelected(true)
                                                                                        }}>Cập nhật</a>
                                                                                    )
                                                                                }
                                                                                {
                                                                                    getRoleNames() === "admin" ? (
                                                                                        <>
                                                                                            <a className="dropdown-item" data-toggle="modal" data-target="#modal-sm" onClick={(e) => {
                                                                                                setStatus(false)
                                                                                                setId(item.id)
                                                                                            }}>Đóng Kho</a>
                                                                                        </>
                                                                                    ) : (<></>)
                                                                                }
                                                                                {/* {
                                                                                    getAllPermissions().includes("Xóa kho") && (
                                                                                        <a className="dropdown-item" data-toggle="modal" data-target="#modal-sm" onClick={(e) => {
                                                                                            setStatus(false)
                                                                                            setId(item.id)
                                                                                        }}>Đóng Kho</a>
                                                                                    )
                                                                                } */}
                                                                            </>

                                                                        ) : (
                                                                            <>
                                                                                {
                                                                                    getRoleNames() === "admin" ? (
                                                                                        <>
                                                                                            <a className="dropdown-item" data-toggle="modal" data-target="#modal-sm" onClick={(e) => {
                                                                                                setStatus(true)
                                                                                                setId(item.id)
                                                                                            }}>Mở Kho</a>
                                                                                        </>
                                                                                    ) : (<></>)
                                                                                }
                                                                                {/* {
                                                                                    getAllPermissions().includes("Xóa kho") && (
                                                                                        <a className="dropdown-item" data-toggle="modal" data-target="#modal-sm" onClick={(e) => {
                                                                                            setStatus(true)
                                                                                            setId(item.id)
                                                                                        }}>Mở Kho</a>
                                                                                    )
                                                                                } */}
                                                                            </>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal fade" id="modal-lg">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    {
                                        (isSelected) ? (
                                            <>
                                                <h4 className="modal-title">Cập nhật kho</h4>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true" onClick={(e) => { setNullWarehouse() }}>×</span>
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <h4 className="modal-title">Thêm kho mới</h4>
                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true" onClick={(e) => { setNullWarehouse() }}>×</span>
                                                </button>
                                            </>
                                        )
                                    }
                                </div>
                                <div className="modal-body">
                                    <form className="form-horizontal">
                                        <hr />
                                        <div className="card-body">
                                            <div className="form-group row">
                                                <label htmlFor="shelf_name" className="col-sm-2 col-form-label">Tên kho:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={(e) => { handleName(e) }} id="name" placeholder="Trống" value={name} />
                                                </div>
                                            </div>
                                            <div style={{ color: "red", fontStyle: "italic" }}>
                                                {validator.message("name", name, "required", {
                                                    messages: {
                                                        required: "(*) Nhập tên kho"
                                                    }
                                                })}
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="position" className="col-sm-2 col-form-label">Địa chỉ:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={(e) => { handleLocation(e) }} id="location" placeholder="Trống" value={location} />
                                                </div>
                                            </div>
                                            <div style={{ color: "red", fontStyle: "italic" }}>
                                                {validator.message("location", location, "required", {
                                                    messages: {
                                                        required: "(*) Nhập địa chỉ"
                                                    }
                                                })}
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="position" className="col-sm-2 col-form-label">Ghi chú:</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" onChange={(e) => { handleNote(e) }} id="note" placeholder="Trống" value={note} />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                {
                                    (isSelected) ? (
                                        <div className="modal-footer justify-content-end">
                                            <button type="button" className="btn btn-success" onClick={(e) => { handleUpdate(e) }}>Lưu</button>
                                        </div>
                                    ) : (
                                        <div className="modal-footer justify-content-end">
                                            <button type="button" className="btn btn-success" onClick={(e) => { handleAddWarehouse(e) }}>Lưu</button>
                                        </div>
                                    )
                                }

                            </div>
                            {/* /.modal-content */}
                        </div>
                        {/* /.modal-dialog */}
                    </div>
                    {/* /.modal */}
                    <div className="modal fade" id="modal-sm">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="modal-title">Small Modal</h4>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {
                                        (status) ? (
                                            <p>Bạn có chắc muốn <strong>Mở</strong> Garage</p>
                                        ) : (
                                            <p>Bạn có chắc muốn <strong>Đóng</strong> Garage</p>
                                        )
                                    }

                                </div>
                                <div className="modal-footer justify-content-end">
                                    <button className="btn btn-success" onClick={(e) => { handleUpdateStatusWarehouse(e) }} data-dismiss="modal">Đông ý</button>
                                </div>
                            </div>
                            {/* /.modal-content */}
                        </div>
                        {/* /.modal-dialog */}
                    </div>
                    {/* /.modal */}
                </div>
            </section >
        </div >
    )
}

export default Warehouse