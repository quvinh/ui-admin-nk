/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { delData, getData, putData } from '../../components/utils/Api'
import { getAllPermissions, getToken } from '../../components/utils/Common'
const DetailInventory = (props) => {

    const [detailInventory, setDetaiInventory] = useState([])
    const code = props.match.params.code
    
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
                Promise.all([putData('/api/admin/inventory/handleInventory/' + item.id)])
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
        Promise.all([getData('/api/admin/inventory/showHistoryInventory/' + props.match.params.code)])
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
        Promise.all([getData('/api/admin/inventory/showHistoryInventory/' + props.match.params.code)])
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
                                    <Link className='btn btn-sm btn-primary' to={'/print_inventory/' + code}>Xem phiếu</Link>
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

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default DetailInventory