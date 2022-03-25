/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { delData, getData, putData } from '../../components/utils/Api'
import { getAllPermissions, getToken } from '../../components/utils/Common'
const DetailInventory = (props) => {

    const [detailInventory, setDetaiInventory] = useState([])
    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }

    const handleUpdateStatus = () => {

        if (detailInventory.length > 0) {
            detailInventory.map((item, index) => {
                console.log(item)
                Promise.all([putData('/api/admin/inventory/handleInventory/' + item.id + '?token=' + getToken())])
                    .then(function (res) {
                        handleReload()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        }
    }

    const handleReload = () => {
        Promise.all([getData('/api/admin/inventory/showHistoryInventory/' + props.match.params.code + '?token=' + getToken())])
            .then(function (res) {
                setDetaiInventory(res[0].data)
            })
    }

    const alert = () => {
        const compile = document.createElement("script")
        compile.src = $(function () {
            var Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000
            });
            $('.toastrDefaultSuccess').click(function () {
                toastr.success('Duyệt thành công')
            });
        })
        compile.async = true
        document.body.appendChild(compile)
    }

    useEffect(() => {
        Promise.all([getData('/api/admin/inventory/showHistoryInventory/' + props.match.params.code + '?token=' + getToken())])
            .then(function (res) {
                console.log(res[0].data)
                setDetaiInventory(res[0].data)
                console.log(res[0].data[0].status)
                script()
            })
            .catch((error) => {
                console.log(error)
            })

        alert()

    }, [])

    

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
                                <li className="breadcrumb-item"><Link to='/coupon_inventory/'>Phiếu kiểm kê</Link></li>
                                <li className="breadcrumb-item active">Chi tiết phiếu kiểm kê</li>
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

                                    {
                                        getAllPermissions().includes("Duyệt phiếu kiểm kê") && (
                                            <div style={{ textAlign: "end" }} >

                                                {detailInventory.length > 0 && (detailInventory[0].status === 0 ? (
                                                    <button className="btn btn-sm btn-primary toastrDefaultSuccess"
                                                        onClick={(e) => handleUpdateStatus()}>Duyệt
                                                    </button>)
                                                    : <></>
                                                )}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="card-body">
                                    <table id="history-inventory" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th className='text-center'>STT</th>
                                                <th className='text-center'>Mã vật tư</th>
                                                <th className='text-center'>Tên vật tư</th>
                                                <th className='text-center'>ĐVT</th>
                                                <th className='text-center'>Giá/Kệ</th>
                                                <th className='text-center'>SL</th>
                                                <th className='text-center'>SL Chênh</th>
                                                {/* <th className='text-center'>Giá trị</th>
                                                <th className='text-center'>Giá trị chênh</th> */}
                                                <th className='text-center'>Thời gian</th>
                                                {/* <th className='text-center'>Trạng thái</th> */}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                detailInventory.map((item, index) => (
                                                    <tr key={index}>
                                                        <td className='text-center'>{index + 1}</td>
                                                        <td className='text-center'>{item.item_id}</td>
                                                        <td className='text-center'>{item.name}</td>
                                                        <td className='text-center'>{item.unit}</td>
                                                        <td className='text-center'>{item.shelf_name}</td>
                                                        <td className='text-center'>{item.amount}</td>
                                                        <td className='text-center'>{item.difference}</td>
                                                        {/* <td className='text-center'>{(item.price * item.amount).toLocaleString()}</td>
                                                        <td className="text-center">
                                                            {(item.difference < 0) ? (
                                                                (item.price * (-item.difference)).toLocaleString()
                                                            ) : (
                                                                (item.price * (item.difference)).toLocaleString()
                                                            )}</td> */}
                                                        <td>{item.created_at}</td>
                                                        {/* <td>{
                                                            <span className={item.status === '1' ? "badge badge-success" :
                                                                 'badge badge-secondary'}>
                                                                {item.status === '1' ? 'Đã duyệt': 'Chờ duyệt'}
                                                            </span>
                                                        }
                                                        </td> */}
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            {/* end card 1 */}
                            {/* <div className='card'> */}
                            <section className="content">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="callout callout-info">
                                                <h5><i className="fas fa-info" /> PHIẾU KIỂM KÊ:</h5>
                                            </div>
                                            {/* Main content */}
                                            <div className="invoice p-3 mb-3">
                                                {/* title row */}
                                                <div className="row">
                                                    <div className="col-12">
                                                        <h4>
                                                            <i className="fas fa-globe" /> {detailInventory.length > 0 && detailInventory[0].tenKho}
                                                            <small className="float-right">Date: {detailInventory.length > 0 && detailInventory[0].created_at} </small>
                                                        </h4>
                                                    </div>
                                                    {/* /.col */}
                                                </div>
                                                {/* info row */}
                                                <div className="row invoice-info">
                                                    <div className="col-sm-4 invoice-col">
                                                        {/* From
                                                            <address>
                                                                <strong>Admin, Inc.</strong><br />
                                                                795 Folsom Ave, Suite 600<br />
                                                                San Francisco, CA 94107<br />
                                                                Phone: (804) 123-5432<br />
                                                                Email: info@almasaeedstudio.com
                                                            </address> */}
                                                    </div>
                                                    {/* /.col */}
                                                    <div className="col-sm-4 invoice-col">
                                                        {/* To
                                                            <address>
                                                                <strong>John Doe</strong><br />
                                                                795 Folsom Ave, Suite 600<br />
                                                                San Francisco, CA 94107<br />
                                                                Phone: (555) 539-1037<br />
                                                                Email: john.doe@example.com
                                                            </address> */}
                                                    </div>
                                                    {/* /.col */}
                                                    <div className="col-sm-4 invoice-col">
                                                        <b>Mã Phiếu: {props.match.params.code}</b><br />
                                                        <b>Người tạo: {detailInventory.length > 0 && detailInventory[0].fullname}</b>
                                                        {/* <br />
                                                            
                                                            <b>Order ID:</b> 4F3S8J<br />
                                                            <b>Payment Due:</b> 2/22/2014<br />
                                                            <b>Account:</b> 968-34567 */}
                                                    </div>
                                                    {/* /.col */}
                                                </div>
                                                {/* /.row */}
                                                <table id="history-inventory" className="table table-bordered table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: 10 }} className='text-center'>STT</th>
                                                            <th className='text-center'>Mã vật tư</th>
                                                            <th className='text-center'>Tên vật tư</th>
                                                            <th className='text-center'>ĐVT</th>
                                                            <th className='text-center'>Giá/Kệ</th>
                                                            <th className='text-center'>SL</th>
                                                            <th className='text-center'>SL Chênh</th>
                                                            {/* <th className='text-center'>Giá trị</th>
                                                            <th className='text-center'>Giá trị chênh</th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            detailInventory.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td className='text-center'>{index + 1}</td>
                                                                    <td className='text-center'>{item.item_id}</td>
                                                                    <td className='text-center'>{item.name}</td>
                                                                    <td className='text-center'>{item.unit}</td>
                                                                    <td className='text-center'>{item.shelf_name}</td>
                                                                    <td className='text-center'>{item.amount}</td>
                                                                    <td className='text-center'>{item.difference}</td>
                                                                    {/* <td className='text-center'>{(item.price * item.amount).toLocaleString()}</td>
                                                                    <td className="text-center">
                                                                        {(item.difference < 0) ? (
                                                                            (item.price * (-item.difference)).toLocaleString()
                                                                        ) : (
                                                                            (item.price * (item.difference)).toLocaleString()
                                                                        )}</td> */}

                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/* <button className='btn btn-sm btn-primary' onClick={(e) => window.print()}>Print</button> */}
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DetailInventory