import React, { useEffect, useState } from 'react'
import { getData, putData, delData, postData } from '../../components/utils/Api'
import { useHistory } from 'react-router-dom';
import Validator from '../../components/utils/Validation'
import { getAllPermissions, getDataWarehouseID, getRoleNames, getToken, getUserID } from '../../components/utils/Common'

const Inventory = () => {

    const [dataItem, setDataItem] = useState([])
    const [difference, setDifference] = useState('')
    const handleDifference = (e) => {
        setDifference(e.target.value)
    }
    useEffect (() => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/warehouse/listItem/' + getDataWarehouseID() + '?token=' + getToken())
    ]).then(function (res) {
        setDataItem(res[0].data)
    })
    }, [])
    return (
        <div>
            < div className="content-wrapper" >
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Kho</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                                    <li className="breadcrumb-item active">Inventory</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                            <div className="card card-info card-outline">
                                    <div className="card-header">
                                        <h4 className="card-title">Thành viên tham gia</h4>
                                        <div className="card-tools">
                                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                <i className="fas fa-minus" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        
                                    </div>
                                </div>
                                <div className="card card-info card-outline">
                                    <div className="card-header">
                                        <h4 className="card-title">Kiểm kê</h4>
                                        <div className="card-tools">
                                            <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                                <i className="fas fa-minus" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        
                                        <hr/>
                                        <table id="item" className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">STT</th>
                                                    <th className="text-center">Mã VT</th>
                                                    <th className="text-center">Tên VT</th>
                                                    <th className="text-center">DVT</th>
                                                    <th className="text-center">Số lượng</th>
                                                    <th className="text-center">Chênh lệch</th>
                                                    <th className="text-center">Giá trị</th>
                                                    <th className="text-center">Chênh lệch giá</th>
                                                    <th className="text-center">Thao tác</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center"></td>
                                                    <td className="text-center"></td>
                                                    <td className="text-center"></td>
                                                    <td className="text-center"></td>
                                                    <td className="text-center"></td>
                                                    <td className="text-center"></td>
                                                    <td className="text-center"></td>
                                                    <td className="text-center"></td>
                                                    <td className="text-center"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Inventory;
