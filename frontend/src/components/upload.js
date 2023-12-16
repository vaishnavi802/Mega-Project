import React from 'react'
import { useNavigate } from 'react-router-dom';

const Upload = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className='Header'>
                <h2>Performance Analysis</h2>
            </div>
            <div className='App'>
                <div className="Auth-form-container">
                    <div className="Auth-form mt-0 mb-5">
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Upload file</h3>
                            <div className="form-group mt-4">
                                <label>Name of student</label>
                                <input
                                    type="email"
                                    className="form-control mt-1"
                                    placeholder="Enter name"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Upload file</label>
                                <input
                                    type="file"
                                    className="form-control mt-1"
                                    placeholder="choose file"
                                />
                            </div>
                            <div className="d-grid gap-2 mt-5">
                                 <input type="submit" className="btn btn-primary"value="submit" onClick={() => navigate('/Graph')} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Upload