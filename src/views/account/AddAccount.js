import React from 'react'

const AddAccount = () => {
    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Thêm người dùng</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a>Trang chủ</a></li>
                                <li className="breadcrumb-item active">Thêm người dùng</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-secondary">
                        <div className="card-header">
                            <h3 className="card-title">Điền thông tin</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <form>
                                <div className="row">
                                    <div className="col-sm-6">
                                        {/* text input */}
                                        <div className="form-group">
                                            <label>Text</label>
                                            <input type="text" className="form-control" placeholder="Enter ..." />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Text Disabled</label>
                                            <input type="text" className="form-control" placeholder="Enter ..." disabled />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        {/* textarea */}
                                        <div className="form-group">
                                            <label>Textarea</label>
                                            <textarea className="form-control" rows={3} placeholder="Enter ..." defaultValue={""} />
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Textarea Disabled</label>
                                            <textarea className="form-control" rows={3} placeholder="Enter ..." disabled defaultValue={""} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* /.card-body */}
                    </div>
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Phân quyền</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <form>
                                <div className="row">
                                    <div className="col-sm-6">
                                        {/* checkbox */}
                                        <div className="form-group">
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" />
                                                <label className="form-check-label">Checkbox</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" defaultChecked />
                                                <label className="form-check-label">Checkbox checked</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" disabled />
                                                <label className="form-check-label">Checkbox disabled</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        {/* radio */}
                                        <div className="form-group">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="radio1" />
                                                <label className="form-check-label">Radio</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="radio1" defaultChecked />
                                                <label className="form-check-label">Radio checked</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" disabled />
                                                <label className="form-check-label">Radio disabled</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        {/* select */}
                                        <div className="form-group">
                                            <label>Select</label>
                                            <select className="form-control">
                                                <option>option 1</option>
                                                <option>option 2</option>
                                                <option>option 3</option>
                                                <option>option 4</option>
                                                <option>option 5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Select Disabled</label>
                                            <select className="form-control" disabled>
                                                <option>option 1</option>
                                                <option>option 2</option>
                                                <option>option 3</option>
                                                <option>option 4</option>
                                                <option>option 5</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        {/* Select multiple*/}
                                        <div className="form-group">
                                            <label>Select Multiple</label>
                                            <select multiple className="form-control">
                                                <option>option 1</option>
                                                <option>option 2</option>
                                                <option>option 3</option>
                                                <option>option 4</option>
                                                <option>option 5</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="form-group">
                                            <label>Select Multiple Disabled</label>
                                            <select multiple className="form-control" disabled>
                                                <option>option 1</option>
                                                <option>option 2</option>
                                                <option>option 3</option>
                                                <option>option 4</option>
                                                <option>option 5</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        {/* /.card-body */}
                    </div>

                </div>
            </section>
        </div>
    )
}

export default AddAccount