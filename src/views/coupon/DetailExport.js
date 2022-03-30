/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { delData, getData, putData } from '../../components/utils/Api'
import { getAllPermissions, getToken } from '../../components/utils/Common'

const DetailExport = (props) => {

    const [detailExport, setDetailExport] = useState([])
    const code = props.match.params.code


    const handleDStatus = () => {
        if (detailExport.length > 0) {
            detailExport.map((item, index) => {
                console.log(item)
                Promise.all([putData('/api/admin/export/dStatus/' + item.id)])
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
        if (detailExport.length > 0) {
            detailExport.map((item, index) => {
                console.log(item)
                Promise.all([putData('/api/admin/export/updateStatus/' + item.id)])
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
        Promise.all([getData('/api/admin/inventory/showHistoryExport/' + props.match.params.code)])
            .then(function (res) {
                setDetailExport(res[0].data)
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
        Promise.all([getData('/api/admin/inventory/showHistoryExport/' + props.match.params.code)])
            .then(function (res) {
                console.log(res[0].data)
                setDetailExport(res[0].data)
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
                                <li className="breadcrumb-item"><Link to='/coupon_export/'>Phiếu xuất</Link></li>
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
                                    <div className="row">
                                        <div className="col">
                                            <Link className='btn btn-sm btn-primary' to={'/print_export/' + code}>Xem phiếu</Link>
                                        </div>
                                        <div className="col">
                                            <div style={{ textAlign: "end" }}>
                                                {
                                                    getAllPermissions().includes("Duyệt phiếu xuất") && (
                                                        <div style={{ textAlign: "end" }} >
                                                            {detailExport.length > 0 && (detailExport[0].status === '0' ? (<button className="btn btn-sm btn-primary toastrDefaultSuccess" onClick={(e) => handleDStatus()}>Xác nhận</button>)
                                                                : (detailExport[0].status === '1' ? (<button className="btn btn-sm btn-success toastrDefaultSuccess" onClick={(e) => handleUpdateStatus()}>Hoàn thành</button>)
                                                                    : <></>
                                                                ))}
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Mã vật tư</th>
                                                <th>Tên vật tư</th>
                                                <th>Mã kệ</th>
                                                <th>Giá xuất</th>
                                                <th>SL</th>
                                                <th>ĐVT</th>
                                                <th>Thời gian</th>
                                                <th>Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                detailExport.map((item, index) => (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.item_id}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.tenKe}</td>
                                                        <td>{item.price}</td>
                                                        <td>{item.luongXuat}</td>
                                                        <td>{item.unit}</td>
                                                        <td>{item.created_at}</td>
                                                        <td>{
                                                            <span className={item.status === '2' ? "badge badge-success" :
                                                                (item.status === '1' ? 'badge badge-primary' : 'badge badge-secondary')}>
                                                                {item.status === '2' ? 'Hoàn thành' : (item.status === '1' ? 'Đang xuất kho' : 'Chờ duyệt')}
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
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DetailExport