import React, { useState, useEffect, createRef, useRef } from 'react'
import { Box, Radio, FormControl, RadioGroup, FormLabel, FormControlLabel, Select, TextField, Stack } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/lab';
import { getData, postData } from '../../components/utils/Api'
import { useHistory, Link } from 'react-router-dom'
import { getToken, getUserID } from '../../components/utils/Common'

const Profile = () => {
  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [fullName, setFullName] = useState()
  const [phone, setPhone] = useState()
  const [address, setAddress] = useState()
  const [birthday, setBirthday] = useState()
  const [gender, setGender] = useState()

  const history = useHistory()

  const onSave = (e) => {
    const data = {
      username: username,
      email: email,
      phone: phone,
      fullname: fullName,
      address: address,
      birthday: birthday,
      gender: gender
    }
    console.log(data)
    Promise.all([postData('/api/auth/update-user/' + getUserID(), data)])
      .then(function (res) {
        console.log('UPDATED')
      })
      .catch(error => {
        console.log(error)
        if (error.response.status === 403) {
          history.push('/404')
        } else if (error.response.status === 401) {
          history.push('/login')
        }
      })
  }
  useEffect(() => {
    Promise.all([
      getData('/api/auth/get-user/' + getUserID())
    ])
      .then(function (res) {
        setUsername(res[0].data[0].username)
        setFullName(res[0].data[0].fullname)
        setEmail(res[0].data[0].email)
        setPhone(res[0].data[0].phone)
        setAddress(res[0].data[0].address === null ? "" : res[0].data[0].address)
        setGender(res[0].data[0].gender)
        console.log('gt', res[0].data[0].gender)
        setBirthday(res[0].data[0].birthday === null ? new Date('1990/01/01') : res[0].data[0].birthday)
      })
      .catch(error => {

      })
  }, [])
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1>Th??ng tin t??i kho???n</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><Link to={"/"}>Trang ch???</Link></li>
                <li className="breadcrumb-item"><Link to={"/account"}>Ng?????i d??ng</Link></li>
                <li className="breadcrumb-item active">C???p nh???t ng?????i d??ng</li>
              </ol>
            </div>
          </div>
        </div>{/* /.container-fluid */}
      </section>
      {/* Main content */}
      <section className="content">
        <div className="card card-secondary">
          <div className="card-header">
            <h3 className="card-title">Th??ng tin ng?????i d??ng</h3>
            <div className="card-tools">
              <div style={{ textAlign: "end" }}>
                <button type="button" className="btn btn-sm btn-success" onClick={(e) => onSave(e)}>
                  <i className="fas fa-save " /> L??u
                </button>
              </div>
            </div>
          </div>
          <div className='card-body'>
            <Box>
              <Stack spacing={2}>
                <TextField size="small" label="(*) T??n ????ng nh???p" variant="outlined"
                  value={String(username)} aria-readonly
                />
                <TextField fullWidth size="small" label="(*) Email" variant="outlined"
                  value={String(email)} aria-readonly
                />
                <TextField fullWidth size="small" label="(*) H??? v?? t??n" variant="outlined"
                  value={String(fullName)}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <TextField fullWidth size="small" label="(*) S??? ??i???n tho???i" variant="outlined"
                  value={String(phone)}
                  inputProps={{ type: 'number' }}
                  onChange={(e) => setPhone(e.target.value.length > 10 ? phone : e.target.value)}
                />
                <TextField fullWidth size="small" label="?????a ch???" variant="outlined"
                  value={String(address)}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <LocalizationProvider fullWidth dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Ng??y sinh"
                    value={birthday}
                    onChange={(newValue) => {
                      // setIsBirthdaySelected(true)
                      setBirthday(newValue.getFullYear() + "/" + (newValue.getMonth() + 1) + "/" + newValue.getDate())
                      console.log(birthday)
                    }}
                    inputFormat={"dd/MM/yyyy"}
                    renderInput={(params) => <TextField size="small" {...params} />}
                  />
                </LocalizationProvider>
                <Box gridColumn="span 4">
                  <FormControl>
                    <FormLabel>Gi???i t??nh</FormLabel>
                    <RadioGroup
                      value={gender === null ? null : (gender === 0 ? "N???" : "Nam")}
                    
                      row
                      name="controlled-radio-buttons-group"
                    >
                      <FormControlLabel value="N???" control={<Radio onClick={(e) => setGender(0)} />} label="N???" />
                      <FormControlLabel value="Nam" control={<Radio onClick={(e) => setGender(1)} />} label="Nam" />
                    </RadioGroup>
                  </FormControl>
                </Box>
              </Stack>
            </Box>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Profile