import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Upload = () => {
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [file, setFile] = React.useState('');

    const HandleFile = (e) => {
        setFile(e.target.files[0]);
    }

    const HandleName = (e) => {
        setName(e.target.value);
    }

    const submitButton = async () => {
        try {
            console.log("hehehehe");
            if (name == '') {
                alert('Enter name');
                return;
            }
            if (file == '') {
                alert('Upload file');
                return;
            }
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', name);
            const res = await axios.post('http://localhost:5000/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/Graph', { state: { data: res.data, name: name } });
        }
        catch (e) {
            console.log(e);
        }
    }

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
                                    value={name}
                                    onChange={HandleName}
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Upload file</label>
                                <input
                                    type="file"
                                    className="form-control mt-1"
                                    placeholder="choose file"
                                    onChange={HandleFile}
                                    accept=".xlsx"
                                />
                            </div>
                            <div className="d-grid gap-2 mt-5">
                                <input type="submit" className="btn btn-primary" value="submit" onClick={() => submitButton()} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Upload