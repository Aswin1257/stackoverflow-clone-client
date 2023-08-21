import React, { useState } from 'react'
import './ForgetPassword.css'
import { forgotPassword} from '../../api'
const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const handleChange = (e) => {
        setEmail(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            alert('Please enter an email')
        }
        forgotPassword({ email })
            .then(() => {
                alert('Email sent successfully')
            })
            .catch((err) => {
                alert('Error: ' + err.response.data.message)
                console.log(err.response.data)
            });
    }
    return (
        <section className='forget-password-page' >
            <div className='form-container' >
                <form onSubmit={handleSubmit}>
                    <p>Forgot your account's password? Enter your email address and we'll send you a recovery link.</p>
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={handleChange} type="email" name="email" id="email" required />
                    <button type='submit' >Send recovery Email</button>
                    <p style={{textAlign:'center',color:'red'}}>Please check email in Spam Folder</p>
                </form>
            </div>
        </section>
    )
}

export default ForgetPassword