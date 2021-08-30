import React, { useState } from 'react';
import { Form, Input } from 'antd';
import { apiCaller } from '../../../config/apiCaller/Caller';
import { ApiUrl } from '../../../config/api/apiConst';
import HvxButton from '../../../components/button/HvxButton';
import Swal from 'sweetalert2';
import { EyeOutlined, EyeInvisibleOutlined  } from '@ant-design/icons'

const Register = () => {

    const [showPass, setShowPass] = useState(false);

    const onFinish = async (values) => {
        let param = {
            "firstName": values.firstname,
            "lastName": values.lastname,
            "username": values.username,
            "password": values.password,          
        }
        console.log(param);

        let res = await apiCaller("post", param, ApiUrl.register);
        console.log(res);
        if (res.code === 200) {
         
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Register fail',
                text: 'Something went wrong!',
            })
        }

    };
    return (
        <div className="loginForm ">
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                 <label htmlFor="firstname" className="ml-2">First Name</label>
                <Form.Item
                    className="hvx-input"
                    name="firstname"
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                >
                    <Input className="hvx-input" />
                </Form.Item>

                <label htmlFor="lastname" className="ml-2">Last Name</label>
                <Form.Item
                    className="hvx-input"
                    name="lastname"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                >
                    <Input className="hvx-input" />
                </Form.Item>

                <label htmlFor="username" className="ml-2">Username</label>
                <Form.Item
                    className="hvx-input"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input className="hvx-input" />
                </Form.Item>

                <label htmlFor="password" className="ml-2">Password</label>
                <Form.Item
                    name="password"
                    className="password-input"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input type={showPass ? "text" : "password"} className="hvx-input" />               
                </Form.Item>
                    <div className="eye" onClick={() => setShowPass(!showPass)}>
                        {showPass ? <EyeOutlined className="eye-icon" /> : <EyeInvisibleOutlined className="eye-icon"/>}
                    </div>

                <Form.Item >
                    <HvxButton type="primary" htmlType="submit" text="Register" className="hvx-btn-login" />
                </Form.Item>
            </Form>
        </div>
    );
}

export default Register;
