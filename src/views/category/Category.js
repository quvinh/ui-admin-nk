import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { delData, getData } from '../../components/utils/Api'
import { getToken } from '../../components/utils/Common'

const Category = () => {
    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/DataTable.js`
        compile.async = true
        document.body.appendChild(compile)
    }

    const [dataTable, setDataTable] = useState([])
    const history = useHistory()
    const handleDelete = (e, id) => {
        const eClick = e.currentTarget;
        Promise.all([delData('http://127.0.0.1:8000/api/admin/category/delete/' + id + '?token=' + getToken())])
            .then(function (res) {
                eClick.closest('tr').remove()
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        Promise.all([getData('http://127.0.0.1:8000/api/admin/category?token=' + getToken())])
            .then(function (res) {
                console.log(res[0].data)
                setDataTable(res[0].data)
                script()
            })
            .catch(error => {
                console.log(error.response.status)
            })
    }, [])
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Loại vật tư</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Trang chủ</a></li>
                                <li className="breadcrumb-item active">Loại vật tư</li>
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
                                    <h3 className="card-title">Bảng</h3>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body">
                                    <table id="example1" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>Loại vật tư</th>
                                                <th>Ghi chú</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dataTable.map((item, index) => (
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>{item.note}</td>
                                                        <td>Button</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                        <tfoot>
                                        </tfoot>
                                    </table>
                                </div>
                                {/* /.card-body */}
                            </div>
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </section>
        </div>


    )
}

export default Category