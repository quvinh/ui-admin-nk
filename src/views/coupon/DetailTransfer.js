/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { delData, getData, putData } from '../../components/utils/Api'
import { getAllPermissions, getToken } from '../../components/utils/Common'

const DetailTransfer = (props) => {
    const [detailTransfer, setDetailTransfer] = useState([])

    const handleDStatus = () => {
        if (detailTransfer.length > 0) {
            detailTransfer.map((item, index) => {
                console.log(item)
                Promise.all([putData('http://127.0.0.1:8000/api/admin/transfer/dStatus/' + item.id + '?token=' + getToken())])
                    .then(function (res) {
                        console.log("Changed 0->1")
                        handleReload()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        }
    }
    const handleUpdateStatus = () => {
        if (detailTransfer.length > 0) {
            detailTransfer.map((item, index) => {
                console.log(item)
                Promise.all([putData('http://127.0.0.1:8000/api/admin/transfer/updateStatus/' + item.id + '?token=' + getToken())])
                    .then(function (res) {
                        console.log("Changed 1->2")
                        handleReload()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
        }
    }

    const handleReload = () => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/inventory/showHistoryTransfer/' + props.match.params.code + '?token=' + getToken())])
            .then(function (res) {
                setDetailTransfer(res[0].data)
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
        Promise.all([getData('http://127.0.0.1:8000/api/admin/inventory/showHistoryTransfer/' + props.match.params.code + '?token=' + getToken())])
            .then(function (res) {
                console.log(res[0].data)
                setDetailTransfer(res[0].data)
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
                            <h1>Phiếu Xuất</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                                <li className="breadcrumb-item"><Link to='/coupon_transfer/'>Phiếu xuất</Link></li>
                                <li className="breadcrumb-item active">Chi tiết phiếu xuất</li>
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
                                        getAllPermissions().includes("Duyệt phiếu chuyển") && (
                                            <div style={{ textAlign: "end" }} >
                                                {detailTransfer.length > 0 && (detailTransfer[0].status === '0' ? (<button className="btn btn-sm btn-primary toastrDefaultSuccess" onClick={(e) => handleDStatus()}>Duyệt</button>)
                                                    : (detailTransfer[0].status === '1' ? (<button className="btn btn-sm btn-success toastrDefaultSuccess" onClick={(e) => handleUpdateStatus()}>Duyệt</button>)
                                                        : <></>
                                                    ))}
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="card-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Mã vật tư</th>
                                                <th>Tên vật tư</th>
                                                <th>SL</th>
                                                <th>ĐVT</th>
                                                <th>Từ kho</th>
                                                <th>Từ kệ</th>
                                                <th>Đến kho</th>
                                                <th>Đến kệ</th>
                                                <th>Thời gian</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                detailTransfer.map((item, index) => (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.item_id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.amount}</td>
                                                        <td>{item.unit}</td>
                                                        <td>{item.name_from_warehouse}</td>
                                                        <td>{item.name_from_shelf}</td>
                                                        <td>{item.name_to_warehouse}</td>
                                                        <td>{item.name_to_shelf}</td>
                                                        <td>{item.created_at}</td>
                                                        <td>{
                                                            <span className={item.status === '2' ? "badge badge-success" :
                                                                (item.status === '1' ? 'badge badge-primary' : 'badge badge-secondary')}>
                                                                {item.status === '2' ? 'Đã duyệt' : (item.status === '1' ? 'Giao hàng' : 'Chờ duyệt')}
                                                            </span>
                                                        }
                                                        </td>
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
                                                <h5><i className="fas fa-info" /> PHIẾU LUÂN CHUYỂN:</h5>
                                            </div>
                                            {/* Main content */}
                                            <div className="invoice p-3 mb-3">
                                                {/* title row */}
                                                <div className="row">
                                                    <div className="col-12">
                                                        <h4>
                                                            <i className="fas fa-globe" /> {detailTransfer.length > 0 && detailTransfer[0].name_from_warehouse}
                                                            <small className="float-right">Date: {detailTransfer.length > 0 && detailTransfer[0].created_at} </small>
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
                                                        <b>Người tạo: {detailTransfer.length > 0 && detailTransfer[0].fullname}</b>
                                                        {/* <br />
                                                            
                                                            <b>Order ID:</b> 4F3S8J<br />
                                                            <b>Payment Due:</b> 2/22/2014<br />
                                                            <b>Account:</b> 968-34567 */}
                                                    </div>
                                                    {/* /.col */}
                                                </div>
                                                {/* /.row */}
                                                <table id="example1" className="table table-bordered table-striped">
                                                    <thead>
                                                        <tr>
                                                            <th>STT</th>
                                                            <th>Mã vật tư</th>
                                                            <th>Tên vật tư</th>
                                                            <th>SL</th>
                                                            <th>ĐVT</th>
                                                            <th>Từ kho</th>
                                                            <th>Từ kệ</th>
                                                            <th>Đến kho</th>
                                                            <th>Đến kệ</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            detailTransfer.map((item, index) => (
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                    <td>{item.item_id}</td>
                                                                    <td>{item.name}</td>
                                                                    <td>{item.amount}</td>
                                                                    <td>{item.unit}</td>
                                                                    <td>{item.name_from_warehouse}</td>
                                                                    <td>{item.name_from_shelf}</td>
                                                                    <td>{item.name_to_warehouse}</td>
                                                                    <td>{item.name_to_shelf}</td>
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

export default DetailTransfer