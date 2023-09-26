/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import React, { Component } from "react";
import {
  Layout,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
} from "antd";
import signinbg from "../assets/images/img-signin.jpg";
const { Title } = Typography;
const {Footer, Content } = Layout;
export default class SignIn extends Component {
  render() {
    const onFinish = (values) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    return (
      <>
        <Layout className="layout-default layout-signin">
          
          <Content className="signin">
            <Row gutter={[24, 0]} justify="space-around">
              <Col
                xs={{ span: 24, offset: 0 }}
                lg={{ span: 6, offset: 2 }}
                md={{ span: 12 }}
              >
                <Title className="mb-15">Sign In</Title>
                <Title className="font-regular text-muted" level={5}>
                  Enter your NRP and password to sign in
                </Title>
                <Form
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="row-col"
                >
                  <Form.Item
                    className="username"
                    label="NRP"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please input your NRP!",
                      },
                    ]}
                  >
                <Input
                  name="nrp"
                  // prefix={<UserOutlined style={{ color: nrpColor }} />}
                  type="text"
                  placeholder="NRP"
                  // disabled={userLogin.loading}
                />
                  </Form.Item>

                  <Form.Item
                    className="username"
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                <Input.Password
                  name="password"
                  // prefix={<LockOutlined style={{ color: passwordColor }} />}
                  type="password"
                  placeholder="Password"
                  // disabled={userLogin.loading}
                />
                  </Form.Item>

                  {/* <Form.Item
                    name="remember"
                    className="aligin-center"
                    valuePropName="checked"
                  >
                    <Switch defaultChecked onChange={onChange} />
                    Remember me
                  </Form.Item> */}

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: "100%", marginTop:"20px" }}
                    >
                      SIGN IN
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
              <Col
                className="sign-img"
                style={{ padding: 12 }}
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
              >
                <img src={signinbg} alt="" />
              </Col>
            </Row>
          </Content>
          <Footer>
            <p className="copyright">
              {" "}
              Copyright © 2023 Acset Indonusa <a href="#pablo">Developer Tim</a>.{" "}
            </p>
          </Footer>
        </Layout>
      </>
    );
  }
}
