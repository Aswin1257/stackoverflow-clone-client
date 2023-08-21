import React, { useState } from 'react'
import './ForgetPassword.css'

import { useNavigate, useParams } from 'react-router-dom'
import { resetPassword } from '../../api'

const ResetPassword = () => {
    const {token} =useParams()
    const [newPassword, setNewPassword] = useState('')
    const navigate=useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();
        resetPassword({token,newPassword})
        .then(()=>{
            alert('Password reset successfully')
            navigate('/Auth')
        })
        .catch(err=>{
            alert('Error: ' + err.response.data)
            console.log(err.response.data)
        })
    }
    const handleChange=(e)=>{
        setNewPassword(e.target.value)
    }
  return (
    <section className='forget-password-page' >
        <div style={{width:'300px'}} className='form-container' >
            <form onSubmit={handleSubmit}>
                <p>Create a new password</p>
                <label htmlFor="password">Create New Password</label>
                <input value={newPassword} onChange={handleChange} type="password" name="password" id="password" required />
                <span style={{height:'12px'}}>{newPassword}</span>
                <button type='submit' >Reset Password</button>
            </form>
        </div>
    </section>
  )
}

export default ResetPassword