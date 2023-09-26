import React, { useEffect, useState } from "react";
import { useAppTitle } from "@/contexts";
import { loginBg, acsetLogo } from "@/assets";
import { Form, Input, Button } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAxios } from "@/hooks";
import { userService } from "@/services";
import { hashPassword, setAccessToken } from "@/utils";
import { config } from "@/configs";
import { useNavigate } from "react-router-dom";
import {
  PageContainer,
  PageBackground,
  LoginCard,
  CompanyLogo,
  CardTitle,
  CardSubtitle,
  FormContainer,
  SubmitContainer,
  ForgotPassword,
} from "./style";

const LoginPage = () => {
  const { setAppTitle } = useAppTitle();
  const userLogin = useAxios(true);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [nrpColor, setNrpColor] = useState("rgba(0, 0, 0, 0.25)");
  const [passwordColor, setPasswordColor] = useState("rgba(0, 0, 0, 0.25)");

  const handleFormChange = () => {
    if (form.getFieldValue("nrp") && form.getFieldValue("nrp") !== "") {
      setNrpColor("rgba(0, 0, 0, 0.88)");
    } else {
      setNrpColor("rgba(0, 0, 0, 0.25)");
    }

    if (
      form.getFieldValue("password") &&
      form.getFieldValue("password") !== ""
    ) {
      setPasswordColor("rgba(0, 0, 0, 0.88)");
    } else {
      setPasswordColor("rgba(0, 0, 0, 0.25)");
    }
  };

  const handleSubmit = async () => {
    const payload = {
      nrp: form.getFieldValue("nrp"),
      password: hashPassword(form.getFieldValue("password")),
      encrypted: true,
      platform: config.appPlatform,
    };
    await userLogin.axiosFetch(userService.login(payload));
  };

  useEffect(() => {
    if (userLogin.isSuccess) {
      setAccessToken(userLogin.response.payload.token);
      navigate("/")
    }
  }, [userLogin.isSuccess]);

  useEffect(() => {
    setAppTitle("Login");
  }, []);

  return (
    <>
      <PageContainer>
        <LoginCard>
          <CompanyLogo src={acsetLogo} alt="acset-logo" />
          <CardTitle>Selamat Datang di SHE Mobile</CardTitle>
          <CardSubtitle>Silahkan masukkan NRP dan password Anda</CardSubtitle>

          <FormContainer>
            <Form
              form={form}
              name="loginForm"
              onValuesChange={handleFormChange}
              onFinish={handleSubmit}
            >
              <Form.Item
                name="nrp"
                rules={[{ required: true, message: "NRP is required!" }]}
              >
                <Input
                  name="nrp"
                  prefix={<UserOutlined style={{ color: nrpColor }} />}
                  type="text"
                  placeholder="NRP"
                  disabled={userLogin.loading}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input.Password
                  name="password"
                  prefix={<LockOutlined style={{ color: passwordColor }} />}
                  type="password"
                  placeholder="Password"
                  disabled={userLogin.loading}
                />
              </Form.Item>

              <SubmitContainer>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                  loading={userLogin.loading}
                >
                  Log in
                </Button>

                <ForgotPassword to="/forgotPassword">
                  Forgot password
                </ForgotPassword>
              </SubmitContainer>
            </Form>
          </FormContainer>
        </LoginCard>

        <PageBackground src={loginBg} alt="login-bg" />
      </PageContainer>
    </>
  );
};

export default LoginPage;
