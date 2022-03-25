import { getData, putData, delData, postData } from '../../components/utils/Api'
import React, { useEffect, useState } from 'react'
import { getAllPermissions, getToken } from '../../components/utils/Common'
import { Link } from 'react-router-dom'

const CouponTransfer = () => {
    const [codeTransfer, setCodeTransfer] = useState([])

    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }
    const handleReload = () => {
        Promise.all([getData('/api/admin/inventory/showCodeTransfer?token=' + getToken())])
            .then(function (res) {
                setCodeTransfer(res[0].data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleDelete = (code) => {
        Promise.all([delData('/api/admin/transfer/deleteCode/' + code + '?token=' + getToken())])
            .then(function (res) {
                console.log("Deleted", code)
                handleReload()
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        Promise.all([getData('/api/admin/inventory/showCodeTransfer?token=' + getToken())])
            .then(function (res) {
                setCodeTransfer(res[0].data)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Phiếu Luân Chuyển</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                                <li className="breadcrumb-item active">Phiếu luân chuyển</li>
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
                                <div className="card-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 10 }}>STT</th>
                                                <th>Mã phiếu</th>
                                                <th>Từ kho</th>
                                                <th>Đến kho</th>
                                                <th>Người tạo</th>
                                                <th>Thời gian</th>
                                                <th>Trạng thái</th>
                                                <th style={{ width: 15 }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                codeTransfer.map((item, index) => (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.code}</td>
                                                        <td>{item.name_from_warehouse}</td>
                                                        <td>{item.name_to_warehouse}</td>
                                                        <td>{item.fullname}</td>
                                                        <td>{item.created_at}</td>
                                                        <td>{
                                                            <span className={item.status === '2' ? "badge badge-success" :
                                                                (item.status === '1' ? 'badge badge-primary' : 'badge badge-secondary')}>
                                                                {item.status === '2' ? 'Đã duyệt' : (item.status === '1' ? 'Giao hàng' : 'Chờ duyệt')}
                                                            </span>
                                                        }
                                                        </td>
                                                        <td>
                                                            <div style={{ textAlign: "center" }}>
                                                                <button style={{ border: "none", backgroundColor: "white", borderRadius: "4rem" }} className="btn btn-default" data-toggle="dropdown">
                                                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                </button>
                                                                <div className="dropdown-menu" size='small'>
                                                                    <Link className="dropdown-item" to={'/detail_transfer/' + item.code} size='small'>Chi tiết</Link>
                                                                    {
                                                                        getAllPermissions().includes("Xoá phiếu chuyển") && (
                                                                            <a className="dropdown-item" onClick={(e) => { handleDelete(item.code) }} size='small'>Xóa</a>
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
                </div>
            </section>
        </div>
    )
}

export default CouponTransfer