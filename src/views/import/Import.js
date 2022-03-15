/* eslint-disable no-undef */
import React, { useEffect } from 'react'

const Import = () => {
    const script = () => {
        const compile = document.createElement("script")
        compile.src = `js/AdvancedElements.js`
        compile.async = true
        document.body.appendChild(compile)
    }

    useEffect(() => {
        script()
    }, [])

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Advanced Form</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Advanced Form</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
                <div className="container-fluid">
                    <div className="card card-default">
                        <div className="card-header">
                            <h3 className="card-title">Select2 (Bootstrap4 Theme)</h3>
                            <div className="card-tools">
                                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                    <i className="fas fa-minus" />
                                </button>
                                <button type="button" className="btn btn-tool" data-card-widget="remove">
                                    <i className="fas fa-times" />
                                </button>
                            </div>
                        </div>
                        {/* /.card-header */}
                        <div className="card-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Minimal</label>
                                        <select className="form-control select2bs4" style={{ width: '100%' }}>
                                            <option selected="selected">Alabama</option>
                                            <option>Alaska</option>
                                            <option>California</option>
                                            <option>Delaware</option>
                                            <option>Tennessee</option>
                                            <option>Texas</option>
                                            <option>Washington</option>
                                        </select>
                                    </div>
                                    {/* /.form-group */}
                                    <div className="form-group">
                                        <label>Disabled</label>
                                        <select className="form-control select2bs4" disabled="disabled" style={{ width: '100%' }}>
                                            <option selected="selected">Alabama</option>
                                            <option>Alaska</option>
                                            <option>California</option>
                                            <option>Delaware</option>
                                            <option>Tennessee</option>
                                            <option>Texas</option>
                                            <option>Washington</option>
                                        </select>
                                    </div>
                                    {/* /.form-group */}
                                </div>
                                {/* /.col */}
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label>Multiple</label>
                                        <select className="select2bs4" multiple="multiple" data-placeholder="Select a State" style={{ width: '100%' }}>
                                            <option>Alabama</option>
                                            <option>Alaska</option>
                                            <option>California</option>
                                            <option>Delaware</option>
                                            <option>Tennessee</option>
                                            <option>Texas</option>
                                            <option>Washington</option>
                                        </select>
                                    </div>
                                    {/* /.form-group */}
                                    <div className="form-group">
                                        <label>Disabled Result</label>
                                        <select className="form-control select2bs4" style={{ width: '100%' }}>
                                            <option selected="selected">Alabama</option>
                                            <option>Alaska</option>
                                            <option disabled="disabled">California (disabled)</option>
                                            <option>Delaware</option>
                                            <option>Tennessee</option>
                                            <option>Texas</option>
                                            <option>Washington</option>
                                        </select>
                                    </div>
                                    {/* /.form-group */}
                                </div>
                                {/* /.col */}
                            </div>
                            {/* /.row */}
                        </div>
                        {/* /.card-body */}
                        <div className="card-footer">
                            Visit <a href="https://select2.github.io/">Select2 documentation</a> for more examples and information about
                            the plugin.
                        </div>
                    </div>
                </div>
            </section>
            {/* /.content */}
        </div>
    )
}

export default Import