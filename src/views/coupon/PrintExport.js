/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { delData, getData, putData } from '../../components/utils/Api'
import { getAllPermissions, getToken } from '../../components/utils/Common'

const PrintExport = (props) => {
    const [detailExport, setDetailExport] = useState([])

    useEffect(() => {
        Promise.all([getData('/api/admin/inventory/showHistoryExport/' + props.match.params.code)])
            .then(function (res) {
                console.log(res[0].data)
                setDetailExport(res[0].data)
            })
            .catch((error) => {
                console.log(error)
            })
        
    }, [])

    return (
        <div className="content-wrapper">
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="invoice p-3 mb-3">
                                {/* title row */}
                                <div className="row">
                                    <div className="col-12">
                                        <h4>
                                            <i className="fas fa-globe" /> {detailExport.length > 0 && detailExport[0].tenKho}
                                            <small className="float-right">Date: {detailExport.length > 0 && detailExport[0].created_at} </small>
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
                                        <b>M?? Phi???u: {props.match.params.code}</b><br />
                                        <b>Ng?????i t???o: {detailExport.length > 0 && detailExport[0].fullname}</b>
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
                                            <th>M?? v???t t??</th>
                                            <th>T??n v???t t??</th>
                                            <th>M?? k???</th>
                                            <th>Gi?? xu???t</th>
                                            <th>SL</th>
                                            <th>??VT</th>
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
            <button className='btn btn-sm btn-primary' onClick={(e) => window.print()}>Print</button>
        </div>
    )
}

export default PrintExport