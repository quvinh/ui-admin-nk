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
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="login-logo">
          <a><b>NAM</b>KHÁNH</a>
        </div>
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form id="quickForm">
              <div className="card-body">
                <div className="form-group">
                  <label>Tên đăng nhập</label>
                  <input type="text" name="username" value={username} className="form-control" placeholder="Tên đăng nhập" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Mật khẩu</label>
                  <input type="password" name="password" value={password} className="form-control" placeholder="Mật khẩu" onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <div className="social-auth-links text-center mb-3">
                <button type="button" className="btn btn-primary" onClick={() => handleLogin()}>Đăng nhập</button>
              </div>
              {/* <div className="card-footer">
                <button type="submit" className="btn btn-primary">Đăng nhập</button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login