import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const Login = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    return (
        <div className="loginForm ">
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <label htmlFor="username" className="ml-2">Username</label>
                <Form.Item
                    className="hvx-input"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input className="hvx-input" />
                </Form.Item>
                <label htmlFor="username" className="ml-2">Password</label>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input type="password" className="hvx-input" />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item >
                    <Button type="primary" htmlType="submit">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Login;
