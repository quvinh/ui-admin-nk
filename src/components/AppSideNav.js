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
                                    B???n tin
                                    <span className="right badge badge-danger">New</span>
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">
                                <i className="nav-icon fas fa-list" />
                                <p>
                                    Danh m???c
                                    <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            {
                                getAllPermissions().includes("Xem lo???i v???t t??") && (
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/category" className="nav-link">
                                                <i className="fas fa-minus nav-icon" />
                                                <p>Lo???i v???t t??</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/supplier" className="nav-link">
                                                <i className="fas fa-minus nav-icon" />
                                                <p>Nh?? cung c???p</p>
                                            </Link>
                                        </li>
                                    </ul>
                                )
                            }
                        </li>
                        {
                            getAllPermissions().includes("Th??m phi???u nh???p", "Th??m phi???u xu???t", "Th??m phi???u chuy???n", "Th??m phi???u ki???m k??") && (
                                <li className="nav-item">
                                    <a className="nav-link">
                                        <i className="nav-icon fas fa-edit" />
                                        <p>
                                            Ch???c n??ng
                                            <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        {
                                            getAllPermissions().includes("Th??m phi???u nh???p") && (
                                                <li className="nav-item">
                                                    <Link to="/import" className="nav-link">
                                                        <i className="fas fa-minus nav-icon" />
                                                        <p>Nh???p kho</p>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                        {
                                            getAllPermissions().includes("Th??m phi???u xu???t") && (
                                                <li className="nav-item">
                                                    <Link to="/export" className="nav-link">
                                                        <i className="fas fa-minus nav-icon" />
                                                        <p>Xu???t kho</p>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                        {
                                            getAllPermissions().includes("Th??m phi???u chuy???n") && (
                                                <li className="nav-item">
                                                    <Link to="/transfer" className="nav-link">
                                                        <i className="fas fa-minus nav-icon" />
                                                        <p>Lu??n chuy???n</p>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                        {
                                            getAllPermissions().includes("Th???ng k??") && (
                                                <li className="nav-item">
                                                    <Link to="/statistic" className="nav-link">
                                                        <i className="fas fa-minus nav-icon" />
                                                        <p>Th???ng k??</p>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                        {
                                            getAllPermissions().includes("Th??m phi???u ki???m k??") && (
                                                <li className="nav-item">
                                                    <Link to="/inventory" className="nav-link">
                                                        <i className="fas fa-minus nav-icon" />
                                                        <p>Ki???m k??</p>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </li>
                            )
                        }
                        {
                            getAllPermissions().includes("Th??m kho", "S???a kho", "X??a kho", "Xem kho") && (
                                <li className="nav-item">
                                    <a className="nav-link">
                                        <i className="nav-icon fas fa-home" />
                                        <p>
                                            Qu???n l?? kho
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
                            getAllPermissions().includes("S???a phi???u nh???p", "X??a phi???u nh???p", "Xem phi???u nh???p", "Duy???t phi???u nh???p",
                                "S???a phi???u xu???t", "X??a phi???u xu???t", "Xem phi???u xu???t", "Duy???t phi???u xu???t",
                                "S???a phi???u chuy???n", "X??a phi???u chuy???n", "Xem phi???u chuy???n", "Duy???t phi???u chuy???n") && (
                                <li className="nav-item">
                                    <a className="nav-link">
                                        <i className="nav-icon fas fa-copy" />
                                        <p>
                                            Qu???n l?? phi???u
                                            <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        {
                                            getAllPermissions().includes("S???a phi???u nh???p", "X??a phi???u nh???p", "Xem phi???u nh???p", "Duy???t phi???u nh???p") && (
                                                <li className="nav-item">
                                                    <Link to="/coupon_import" className="nav-link">
                                                        <i className="fas fa-minus nav-icon" />
                                                        <p>Phi???u nh???p</p>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                        {
                                            getAllPermissions().includes("S???a phi???u xu???t", "X??a phi???u xu???t", "Xem phi???u xu???t", "Duy???t phi???u xu???t") && (
                                                <li className="nav-item">
                                                    <Link to="/coupon_export" className="nav-link">
                                                        <i className="fas fa-minus nav-icon" />
                                                        <p>Phi???u xu???t</p>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                        {
                                            getAllPermissions().includes("S???a phi???u chuy???n", "X??a phi???u chuy???n", "Xem phi???u chuy???n", "Duy???t phi???u chuy???n") && (
                                                <li className="nav-item">
                                                    <Link to="/coupon_transfer" className="nav-link">
                                                        <i className="fas fa-minus nav-icon" />
                                                        <p>Phi???u lu??n chuy???n</p>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                        {
                                            getAllPermissions().includes("S???a phi???u ki???m k??", "X??a phi???u ki???m k??", "Xem phi???u ki???m k??", "Duy???t phi???u ki???m k??") && (
                                                <li className="nav-item">
                                                    <Link to="/coupon_inventory" className="nav-link">
                                                        <i className="fas fa-minus nav-icon" />
                                                        <p>Phi???u ki???m k??</p>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                    </ul>
                                </li>
                            )
                        }

                        {
                            getAllPermissions().includes("Th??m t??i kho???n", "S???a t??i kho???n", "X??a t??i kho???n", "Xem t??i kho???n") && (
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
                                                <p>Ng?????i d??ng</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/role" className="nav-link">
                                                <i className="fas fa-minus nav-icon" />
                                                <p>Ch???c v??? - Quy???n h???n</p>
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
                                    Th??ng tin t??i kho???n
                                </p>
                            </Link>
                        </li>
                        {
                            getAllPermissions().includes("Th??m th??ng b??o", "S???a th??ng b??o", "X??a th??ng b??o", "Xem th??ng b??o") && (
                                <li className="nav-item">
                                    <Link to="/notification" className="nav-link">
                                        <i className="nav-icon fas fa-bell" />
                                        <p>
                                            Th??ng b??o
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