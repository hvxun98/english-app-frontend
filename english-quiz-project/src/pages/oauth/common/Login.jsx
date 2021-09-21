import React, { useEffect } from "react";
import { Form, Input, Checkbox } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import HvxButton from "../../../components/button/HvxButton";
import { useHistory } from "react-router-dom";
import { ROUTER_CONST } from "../../../config/paramsConst/RouterConst";
import { checkDataInLocalStorage, isLogin } from "../../../utils/CheckData";
import { notificationErr } from "../../../utils/Notification";
import { loginRequest } from "../../../services/authService";

const Login = ({ setLoading }) => {
  const history = useHistory();

  useEffect(() => {
    if (isLogin()) {
      history.push(ROUTER_CONST.home);
    }
  }, [history]);

  const onFinish = async (values) => {
    setLoading(true);
    let params = {
      username: values.username,
      password: values.password,
    };
    loginRequest(params, getResponseLogin, getError);
  };

  const getResponseLogin = (res) => {
    setLoading(false);
    localStorage.setItem("_token", res.data.token);
    localStorage.setItem("_currentUser", JSON.stringify(res.data));
    let redirectUrl = localStorage.getItem("urlBeforeLogin");
    if (checkDataInLocalStorage(redirectUrl)) {
      history.push(redirectUrl);
    } else {
      history.push(ROUTER_CONST.game);
    }
  };

  const getError = (err) => {
    console.log(err.response);
    setLoading(false);
    notificationErr("Oops, something went wrong");
  };

  return (
    <div className="loginForm ">
      <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish}>
        <label htmlFor="username" className="ml-2">
          Username
        </label>
        <Form.Item
          className="hvx-input"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input className="hvx-input" />
        </Form.Item>
        <label htmlFor="username" className="ml-2">
          Password
        </label>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input type="password" className="hvx-input" />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item>
          <HvxButton
            type="primary"
            htmlType="submit"
            text="login"
            icon={<LoginOutlined className="login-button-icon" />}
            className="hvx-btn-login"
          >
            Login
          </HvxButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
