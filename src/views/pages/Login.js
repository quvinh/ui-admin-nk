import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { postData } from '../../components/utils/Api'
import { setUserSession } from '../../components/utils/Common'

const Login = () => {
  const script = () => {
    const compile = document.createElement("script")
    compile.src = `js/ValidationLogin.js`
    compile.async = true
    document.body.appendChild(compile)
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleLogin = () => {
    const data = {
      username: username,
      password: password
    }
    console.log(data)
    Promise.all([postData("/api/auth/login", data)])
      .then(function (res) {
        console.log(res[0].data.warehouse_id)
        setUserSession(res[0].data.access_token, res[0].data.user.id, res[0].data.user.roles[0].name, res[0].data.role, res[0].data.warehouse_id)
        console.log("login")
        history.push("/dashboard")
      })
      .catch(error => {
        console.log(error)
      })

  }

  useEffect(() => {
    script()
  }, [])

  return (
    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div className="container">
        <div className="card login-card" >
          <div className="row no-gutters">
            <div className="col-md-7">
              <img src="../../../dist/img/login.jpeg" alt="login" className="login-card-img" style={{opacity:1}} />
            </div>
            <div className="col-md-5">
              <div className="card-body" style={{height:"500px"}}>
                <div className="brand-wrapper">
                  {/* <img src="assets/images/logo.svg" alt="logo" className="logo" /> */}
                </div>
                <p className="login-card-description" style={{textAlign:"center"}}>Đăng nhập</p>
                <form id="quickForm">
                  <div className="form-group" >
                    <label htmlFor="username" className="sr-only">Username</label>
                    <input type="text" name="username" value={username} className="form-control" placeholder="Tên đăng nhập" onChange={(e) => setUsername(e.target.value)} />
                    
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="sr-only">Password</label>
                    <input type="password" name="password" value={password} className="form-control" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
                    
                  </div>
                  <div className="social-auth-links text-center mb-3">
                    <button type="button" className="btn btn-block login-btn mb-4" onClick={() => handleLogin()}>Đăng nhập</button>
                  </div>
                </form>
                <nav className="login-card-footer-nav">
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

  )
}

export default Login