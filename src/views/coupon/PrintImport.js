/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { delData, getData, putData } from '../../components/utils/Api'
import { getAllPermissions, getToken } from '../../components/utils/Common'
import CurrencyFormat from 'react-currency-format'

const PrintImport = (props) => {
    const [detailImport, setDetailImport] = useState([])
    console.log('props', props.match.params.code)
    const total = detailImport.length > 0 && detailImport.reduce((a, p) => a + (p.luongNhap * p.price), 0)

    useEffect(() => {
        Promise.all([getData('/api/admin/inventory/showHistoryImport/' + props.match.params.code + '?token=' + getToken())])
            .then(function (res) {
                console.log(res[0].data)
                setDetailImport(res[0].data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (

        <div className="content-wrapper">
            <div className='print-container'>


                <div className="invoice p-3 mb-3">
                    {/* title row */}
                    <div className="row">
                        <div className="col-12">
                            <h4>
                                <i className="fas fa-globe" /> {detailImport.length > 0 && detailImport[0].tenKho}
                                <small className="float-right">Date: {detailImport.length > 0 && detailImport[0].created_at} </small>
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
                            <b>Người tạo: {detailImport.length > 0 && detailImport[0].fullname}</b>
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
                                <th style={{ width: 10 }}>STT</th>
                                <th>Mã vật tư</th>
                                <th>Tên vật tư</th>
                                <th>Mã kệ</th>
                                <th>Giá xuất</th>
                                <th>SL</th>
                                <th>ĐVT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                detailImport.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.item_id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.tenKe}</td>
                                        <td>{item.price}</td>
                                        <td>{item.luongNhap}</td>
                                        <td>{item.unit}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        {/* accepted payments column */}
                        <div className="col-6">
                        </div>
                        {/* /.col */}
                        <div className="col-6">
                            {/* <p className="lead">Amount Due 2/22/2014</p> */}
                            <div className="table-responsive">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <th>{detailImport.length > 0 && <CurrencyFormat className="form-control" type="text" name="total" value={total} thousandSeparator={true} prefix={'Tổng tiền: '} suffix={' VND'} disabled />}</th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* /.col */}
                    </div>

                </div>
            </div>
            {/* </section> */}
            <button className='btn btn-sm btn-primary' onClick={(e) => window.print()}>Print</button>
        </div>
    )
}

export default PrintImport