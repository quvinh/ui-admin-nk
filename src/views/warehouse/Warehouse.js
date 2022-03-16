import React, { useEffect, useState } from 'react'
import { getData, putData, delData, postData } from '../../components/utils/Api'
import { useHistory } from 'react-router-dom';
import { getDataWarehouseID, getRoleNames, getToken, getUserID } from '../../components/utils/Common'

const Warehouse = () => {
    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [note, setNote] = useState('');
    const [count, setCount] = useState('')
    const [visibleAlert, setVisibleAlert] = useState(false)
    const [visibleDel, setVisibleDel] = useState(false)

    const history = useHistory()

    const handleReload = () => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse?token=' + getToken())])
            .then(function (res) {
                setDataWarehouse(res[0].data)
            })
    }
    const handleCount = (id) => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/amountShelf/' + id + '?token=' + getToken()),])
            .then(function (res) {
                setCount(res[0].data)
            })
    }
    const handleDelete = (e, id) => {
        console.log(id)
        if (count === 0) {
            Promise.all([delData('http://127.0.0.1:8000/api/admin/warehouse/delete/' + id + '?token=' + getToken())])
                .then(function (response) {
                    handleReload()
                    // eClick.closest('tr').remove();
                })
                .catch(error => {
                    console.log(error)
                })
        }
        else {
            setVisibleAlert(!visibleAlert)
            setVisibleDel(false)
        }

    }
    // const [visible1, setVisible1] = useState(false)
    const [dataWarehouse, setDataWarehouse] = useState([])
    const [dataCountWarehouse, setDataCountWarehouse] = useState([])

    useEffect(() => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse?token=' + getToken()),
        getData('http://127.0.0.1:8000/api/admin/warehouse/warehouseShow?token=' + getToken()),
            // getData('http://127.0.0.1:8000/api/admin/warehouse/countWarehouse')
        ])
            .then(function (res) {
                setDataWarehouse(res[0].data)
                setDataCountWarehouse(res[1].data)
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
                                    <h3 className="card-title"></h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Người điều hành</th>
                                                <th>Tên kho</th>
                                                <th>Mã kho</th>
                                                <th>Địa chỉ</th>
                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataWarehouse.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{String(index + 1)}</td>
                                                        <td></td>
                                                        <td>{item.name}</td>
                                                        <td>{item.id}</td>
                                                        <td>{item.location}</td>
                                                        <td>
                                                            <div className="input-group-prepend">
                                                                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                </button>
                                                                <div className="dropdown-menu">
                                                                    <a className="dropdown-item" href="#">Chi tiết</a>
                                                                    <a className="dropdown-item" href="#">Cập nhật</a>
                                                                </div>
                                                            </div>

                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                        {/* <tfoot>
                                            <tr>
                                                <th>Rendering engine</th>
                                                <th>Browser</th>
                                                <th>Platform(s)</th>
                                                <th>Engine version</th>
                                                <th>CSS grade</th>
                                            </tr>
                                        </tfoot> */}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Warehouse