/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getData, putData } from './utils/Api'
import { getDataWarehouseID, getRoleNames, getToken, getUserID, removeUserSession } from './utils/Common'

const AppHeader = (props) => {
    console.log(props)
    const [dataUserDetail, setUserDetail] = useState([])
    const [countNotification, setCountNotification] = useState(0)
    const history = useHistory()

    const handleLogout = () => {
        removeUserSession()
        history.push('/login')
    }

    const handleReload = (id) => {
        Promise.all([
            getData('/api/admin/notification/count/' + getUserID()),
        ])
            .then(function (res) {
                setCountNotification(res[0])
                history.push('/notification-read/' + id)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleClickNotify = (id) => {
        Promise.all([
            putData('/api/admin/notification/update/' + id),
        ])
            .then(function (res) {
                handleReload(id)
                history.push('/notification')
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleShowTime = (send, current) => {
        const start = new Date(send)
        const end = new Date(current)

        const diffInDays = parseInt(Math.abs(end - start) / (1000 * 60 * 60 * 24))
        const diffInHours = parseInt(Math.abs(end - start) / (1000 * 60 * 60))
        const diffInMinutes = parseInt(Math.abs(end - start) / (1000 * 60))
        const diffInSeconds = parseInt(Math.abs(end - start) / (1000))

        if (diffInDays > 0) {
            return diffInDays + " ngày trước"
        } else if (diffInHours > 0) {
            return diffInHours + " giờ trước"
        } else if (diffInMinutes > 0) {
            return diffInMinutes + " phút trước"
        } else {
            return "vài giây trước"
        }
    }
    useEffect(() => {
        Promise.all([
            getData('/api/auth/get-user/' + getUserID()),
            getData('/api/admin/notification/count/' + getUserID()),
        ])
            .then(function (res) {
                setUserDetail(res[0].data)
                setCountNotification(res[1])
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
    console.log(getDataWarehouseID())
    return (
        <div>
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="#" className="nav-link">Trang chủ</a>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <a href="#" className="nav-link">Liên hệ</a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" data-widget="navbar-search" href="#" role="button">
                            <i className="fas fa-search" />
                        </a>
                        <div className="navbar-search-block">
                            <form className="form-inline">
                                <div className="input-group input-group-sm">
                                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                                    <div className="input-group-append">
                                        <button className="btn btn-navbar" type="submit">
                                            <i className="fas fa-search" />
                                        </button>
                                        <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                                            <i className="fas fa-times" />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown">
                            <i className="far fa-bell" />
                            <span className="badge badge-danger navbar-badge">{countNotification && countNotification.count}</span>
                        </a>
                        <div className="dropdown-menu dropdown-menu-xs dropdown-menu-right">
                            <span className="dropdown-item dropdown-header">{countNotification && countNotification.count} Thông báo chưa đọc</span>
                            <div className="dropdown-divider" />
                            {
                                countNotification.data && countNotification.data.map((item, index) => (
                                    <Link to={"/notification-read/" + item.id} key={index}
                                        className="dropdown-item" onClick={() => handleClickNotify(item.id)}>
                                        <i className="fas fa-bell" /> {item.fullname} đã gửi thông báo cho bạn.  {item.status === 0 && <i style={{color: "blue"}} className="fas fa-circle" />}
                                        <p><b>{item.title}</b> {String(item.content).substring(0, 8) + "..."}<span className="float-right text-muted text-sm">{handleShowTime(new Date(), item.created_at)}</span></p>
                                    </Link>
                                ))
                            }
                            {/* <a href="#" className="dropdown-item">
                                <div className="media">
                                    <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                                    <div className="media-body">
                                        <h3 className="dropdown-item-title">
                                            John Pierce
                                            <span className="float-right text-sm text-muted"><i className="fas fa-star" /></span>
                                        </h3>
                                        <p className="text-sm">{props.props}</p>
                                        <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                                    </div>
                                </div>
                            </a> */}
                            <div className="dropdown-divider" />
                            <Link to={"/notification"} className="dropdown-item dropdown-footer">Xem tất cả</Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown user-menu">
                        <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">
                            <img src="../../dist/img/user.png" className="user-image img-circle elevation-2" alt="User Image" />
                            <span className="d-none d-md-inline">{dataUserDetail[0] && dataUserDetail[0].fullname}</span>
                        </a>
                        <ul className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                            {/* User image */}
                            <li className="user-header bg-primary">
                                <img src="../../dist/img/user.png" className="img-circle elevation-2" alt="User Image" />
                                <p>
                                    <small>Tên đăng nhập</small>
                                    {dataUserDetail[0] && dataUserDetail[0].username}
                                </p>
                            </li>
                            {/* Menu Body */}
                            <li className="user-body">
                                <div className="text-center">
                                    <a>Chức vụ: {getRoleNames()}</a>
                                </div>
                            </li>
                            {/* Menu Footer*/}
                            <li className="user-footer">
                                <Link to={'/profile'} className="btn btn-default btn-flat">Thông tin</Link>
                                <button className="btn btn-default btn-flat float-right" onClick={handleLogout}>Đăng xuất</button>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <a className="nav-link" data-widget="fullscreen" role="button">
                            <i className="fas fa-expand-arrows-alt" />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default AppHeader