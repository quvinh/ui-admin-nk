import { getData, putData, delData, postData } from '../../components/utils/Api'
import React, { useEffect, useState } from 'react'
import { getAllPermissions, getToken } from '../../components/utils/Common'
import { Link } from 'react-router-dom'

const CouponInventory = () => {

    const [codeInventory, setCodeInventory] = useState([])

    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }
    const handleReload = () => {
        Promise.all([getData('/api/admin/inventory/showCodeInventory?token=' + getToken())])
            .then(function (res) {
                setCodeInventory(res[0].data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleDelete = (code) => {
        Promise.all([delData('/api/admin/inventory/deleteCode/' + code + '?token=' + getToken())])
            .then(function (res) {
                console.log("Deleted", code)
                handleReload()
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        Promise.all([getData('/api/admin/inventory/showCodeInventory?token=' + getToken())])
            .then(function (res) {
                setCodeInventory(res[0].data)
                console.log(res[0].data)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [])

    console.log('table', codeInventory)

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Phiếu kiểm kê</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                                <li className="breadcrumb-item active">Phiếu kiểm kê</li>
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
                                                <th style={{ width: 10 }} className='text-center'>STT</th>
                                                <th className='text-center'>Mã phiếu</th>
                                                <th className='text-center'>Tên kho</th>
                                                <th className='text-center'>Người tạo</th>
                                                <th className='text-center'>Thời gian</th>
                                                <th className='text-center'>Trạng thái</th>
                                                <th style={{ width: 15 }} className='text-center'>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                codeInventory.map((item, index) => (
                                                    <tr>
                                                        <td className='text-center'>{index + 1}</td>
                                                        <td className='text-center'>{item.code}</td>
                                                        <td className='text-center'>{item.warehouse_name}</td>
                                                        <td className='text-center'>{item.fullname}</td>
                                                        <td className='text-center'>{item.created_at}</td>
                                                        <td className='text-center'>{
                                                            <span className={item.status === 1 ? "badge badge-success" :
                                                                 'badge badge-secondary'}>
                                                                {item.status === 1 ? 'Đã xử lý' : 'Chờ xử lý'}
                                                            </span>
                                                        }
                                                        </td>
                                                        <td>
                                                            <div style={{ textAlign: "center" }}>
                                                                <button style={{ border: "none", backgroundColor: "white", borderRadius: "4rem" }} className="btn btn-default" data-toggle="dropdown">
                                                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                                </button>
                                                                <div className="dropdown-menu" size='small'>
                                                                    <Link className="dropdown-item" to={'/detail_inventory/' + item.code} size='small'>Chi tiết</Link>
                                                                    {
                                                                        getAllPermissions().includes("Xoá phiếu kiểm kê") && (
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

export default CouponInventory