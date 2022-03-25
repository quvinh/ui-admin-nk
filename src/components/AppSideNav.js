/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getData } from './utils/Api'
import { getAllPermissions, getToken, getUserID } from './utils/Common'
import { Link } from 'react-router-dom'

const AppSideNav = () => {
    const [dataUserDetail, setUserDetail] = useState([])

    useEffect(() => {
        Promise.all([
            getData('/api/auth/get-user/' + getUserID())
        ])
            .then(function (res) {
                setUserDetail(res[0].data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link to={"/dashboard"} className="brand-link" style={{ textAlign: "center", backgroundColor: "#d2d6de" }}>
                <img src="../../dist/img/NamKhanh.png" width={"100%"} />
            </Link>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="../../dist/img/user.png" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">{dataUserDetail[0] && dataUserDetail[0].fullname}</a>
                    </div>
                </div>
                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                        <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                        <div className="input-group-append">
                            <button className="btn btn-sidebar">
                                <i className="fas fa-search fa-fw" />
                            </button>
                        </div>
                    </div>
                </div>
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-item menu-open">
                            <Link to="/dashboard" className="nav-link active">
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>
                                    Bản tin
                                    <span className="right badge badge-danger">New</span>
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">
                                <i className="nav-icon fas fa-list" />
                                <p>
                                    Danh mục
                                    <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            {
                                getAllPermissions().includes("Thêm loại vật tư", "Sửa loại vật tư", "Xóa loại vật tư", "Xem loại vật tư") && (
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/category" className="nav-link">
                                                <i className="fas fa-minus nav-icon" />
                                                <p>Loại vật tư</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/supplier" className="nav-link">
                                                <i className="fas fa-minus nav-icon" />
                                                <p>Nhà cung cấp</p>
                                            </Link>
                                        </li>
                                    </ul>
                                )
                            }
                        </li>
                        {
                            getAllPermissions().includes("Thêm phiếu nhập", "Thêm phiếu xuất", "Thêm phiếu chuyển", "Thêm phiếu kiểm kê") && (
                                <li className="nav-item">
                                    <a className="nav-link">
                                        <i className="nav-icon fas fa-edit" />
                                        <p>
                                            Chức năng
                                            <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        {
                                            getAllPermissions().includes("Thêm phiếu nhập") && (
                                                <li className="nav-item">
                                                    <Link to="/import" className="nav-link">
                                                        <i className="fas fa-minus nav-icon" />
                                                        <p>Nhập kho</p>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                        {
                                            getAllPermissions().includes("Thêm phiếu xuất") && (
                                                <li className="nav-item">
                                                    <Link to="/export" className="nav-link">
                                                        <i className="fas fa-minus nav-icon" />
                                                        <p>Xuất kho</p>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                        {
                                            getAllPermissions().includes("Thêm phiếu chuyển") && (
                                                <li className="nav-item">
                                                    <Link to="/transfer" className="nav-link">
                                                        <i className="fas fa-minus nav-icon" />
                                                        <p>Luân chuyển</p>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                        {
                                            getAllPermissions().includes("Thống kê") && (
                                                <li className="nav-item">
                                                    <Link to="/statistic" className="nav-link">
                                                        <i className="fas fa-minus nav-icon" />
                                                        <p>Thống kê</p>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                        <li className="nav-item">
                                            <Link to="/inventory" className="nav-link">
                                                <i className="fas fa-minus nav-icon" />
                                                <p>Kiểm kê</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            )
                        }
                        {
                            getAllPermissions().includes("Thêm kho", "Sửa kho", "Xóa kho", "Xem kho") && (
                                <li className="nav-item">
                                    <a className="nav-link">
                                        <i className="nav-icon fas fa-home" />
                                        <p>
                                            Quản lý kho
                                            <i className="right fas fa-angle-left" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/warehouse" className="nav-link">
                                                <i className="fas fa-minus nav-icon" />
                                                <p>Kho</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            )
                        }
                        {
                            getAllPermissions().includes("Sửa phiếu nhập", "Xóa phiếu nhập", "Xem phiếu nhập", "Duyệt phiếu nhập",
                                "Sửa phiếu xuất", "Xóa phiếu xuất", "Xem phiếu xuất", "Duyệt phiếu xuất",
                                "Sửa phiếu chuyển", "Xóa phiếu chuyển", "Xem phiếu chuyển", "Duyệt phiếu chuyển") && (
                                <li className="nav-item">
                                    <a className="nav-link">
                                        <i className="nav-icon fas fa-copy" />
                                        <p>
                                            Quản lý phiếu
                                            <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        {
                                            getAllPermissions().includes("Sửa phiếu nhập", "Xóa phiếu nhập", "Xem phiếu nhập", "Duyệt phiếu nhập") && (
                                                <li className="nav-item">
                                                    <Link to="/coupon_import" className="nav-link">
                                                        <i className="fas fa-minus nav-icon" />
                                                        <p>Phiếu nhập</p>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                        {
                                            getAllPermissions().includes("Sửa phiếu xuất", "Xóa phiếu xuất", "Xem phiếu xuất", "Duyệt phiếu xuất") && (
                                                <li className="nav-item">
                                                    <Link to="/coupon_export" className="nav-link">
                                                        <i className="fas fa-minus nav-icon" />
                                                        <p>Phiếu xuất</p>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                        {
                                            getAllPermissions().includes("Sửa phiếu chuyển", "Xóa phiếu chuyển", "Xem phiếu chuyển", "Duyệt phiếu chuyển") && (
                                                <li className="nav-item">
                                                    <Link to="/coupon_transfer" className="nav-link">
                                                        <i className="fas fa-minus nav-icon" />
                                                        <p>Phiếu luân chuyển</p>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                        {
                                            getAllPermissions().includes("Sửa phiếu kiểm kê", "Xóa phiếu kiểm kê", "Xem phiếu kiểm kê", "Duyệt phiếu kiểm kê") && (
                                                <li className="nav-item">
                                                    <Link to="/coupon_inventory" className="nav-link">
                                                        <i className="fas fa-minus nav-icon" />
                                                        <p>Phiếu kiểm kê</p>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </li>
                            )
                        }

                        {
                            getAllPermissions().includes("Thêm tài khoản", "Sửa tài khoản", "Xóa tài khoản", "Xem tài khoản") && (
                                <li className="nav-item">
                                    <a className="nav-link">
                                        <i className="nav-icon far fa-user" />
                                        <p>
                                            Admin
                                            <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/account" className="nav-link">
                                                <i className="fas fa-minus nav-icon" />
                                                <p>Người dùng</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/role" className="nav-link">
                                                <i className="fas fa-minus nav-icon" />
                                                <p>Chức vụ - Quyền hạn</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            )
                        }
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">
                                <i className="nav-icon fas fa-table" />
                                <p>
                                    Thông tin tài khoản
                                </p>
                            </Link>
                        </li>
                        {
                            getAllPermissions().includes("Thêm thông báo", "Sửa thông báo", "Xóa thông báo", "Xem thông báo") && (
                                <li className="nav-item">
                                    <Link to="/notification" className="nav-link">
                                        <i className="nav-icon fas fa-bell" />
                                        <p>
                                            Thông báo
                                        </p>
                                    </Link>
                                </li>
                            )
                        }
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default AppSideNav