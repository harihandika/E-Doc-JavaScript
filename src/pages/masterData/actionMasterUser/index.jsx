import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio, Select } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useAdminLayout, useAppTitle } from "@/contexts";
import { Paper } from "@/components";
import { useAxios } from "@/hooks";
import { getBaseUrl } from "@/utils";
import {
  genderService,
  organizationService,
  positionService,
  roleService,
  userService,
  workLocationService,
} from "@/services";
import {
  ButtonContainer,
  FormFooter,
  PageContainer,
  buttonStyle,
  fieldStyle,
} from "./style";

const ActionMasterUserPage = () => {
  const { setAppTitle } = useAppTitle();
  const { setLayoutTitle } = useAdminLayout();
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const checkNrp = useAxios();
  const getGender = useAxios();
  const checkEmail = useAxios();
  const getWorkLocation = useAxios();
  const getPosition = useAxios();
  const getOrganization = useAxios();
  const getSuperior = useAxios();
  const getRole = useAxios();
  const createUser = useAxios(true);

  const [_, trigger] = useState("");
  const [nrpLoading, setNrpLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);

  const checkNrpExist = (nrp) => {
    const queryParams = { nrp };
    checkNrp.axiosFetch(userService.checkNrpExist(queryParams));
  };

  const getGenderData = () => {
    getGender.axiosFetch(genderService.getData());
  };

  const checkEmailExist = (email) => {
    const queryParams = { email };
    checkEmail.axiosFetch(userService.checkEmailExist(queryParams));
  };

  const getWorkLocationData = () => {
    getWorkLocation.axiosFetch(workLocationService.getData());
  };

  const getPositionData = (workLocationId) => {
    const queryParams = { workLocationId };
    getPosition.axiosFetch(positionService.byWorkLocationId(queryParams));
  };

  const getOrganizationData = (workLocationId) => {
    const queryParams = { workLocationId };
    getOrganization.axiosFetch(
      organizationService.byWorkLocationId(queryParams)
    );
  };

  const getSuperiorData = () => {
    const queryParams = { offset: 0, limit: 0 };
    getSuperior.axiosFetch(userService.getData(queryParams));
  };

  const getRoleData = () => {
    getRole.axiosFetch(roleService.getData());
  };

  const handleFormChange = (changedValues) => {
    removeEmptySpace("nrp", changedValues.nrp);
    removeEmptySpace("email", changedValues.email);
    handleNrpInput(changedValues.nrp);
    handleEmailInput(changedValues.email);
  };

  const removeEmptySpace = (name, value) => {
    if (value === undefined) return;
    const valueSplit = value.split("");
    const finalValue = valueSplit[0] === " " ? "" : value;
    form.setFieldValue(name, finalValue);
  };

  const generateNrpStatus = () => {
    if (nrpLoading) return "validating";
    if (checkNrp.response.payload > 0) {
      return "error";
    } else {
      if (form.getFieldError("nrp")) return undefined;
      return "success";
    }
  };

  const handleNrpInput = (value) => {
    if (value === undefined) return;
    const valueSplit = value.split(" ");
    const removedWhitespace = valueSplit
      .filter((value) => value !== "")
      .join("");
    form.setFieldValue("nrp", removedWhitespace);
    trigger(value);
  };

  const generateEmailStatus = () => {
    if (emailLoading) return "validating";
    if (checkEmail.response.payload > 0) {
      return "error";
    } else {
      if (form.getFieldError("email")) return undefined;
      return "success";
    }
  };

  const handleEmailInput = (value) => {
    if (value === undefined) return;
    form.setFieldValue("email", value);
    trigger(value);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = (value) => {
    const organizationId =
      Object.keys(value).indexOf("organizationId") < 0
        ? null
        : value.organizationId;
    const tempSuperiorIds =
      value.superiorIds === undefined ? [] : value.superiorIds;
    const superiorIds =
      tempSuperiorIds.length > 0
        ? tempSuperiorIds.map((item) => item.title)
        : [];

    const payload = {
      ...value,
      organizationId,
      superiorIds,
      loginUrl: `${getBaseUrl()}/auth/login`,
    };

    createUser.axiosFetch(userService.createData(payload));
  };

  useEffect(() => {
    getGenderData();
    getWorkLocationData();
    getSuperiorData();
    getRoleData();
  }, []);

  useEffect(() => {
    const pathName = location.pathname.split("/").at(-1);
    if (pathName === "create") {
      setAppTitle("Create User");
      setLayoutTitle("Create User");
    } else {
      setAppTitle("User Detail");
      setLayoutTitle("User Detail");
    }
  }, [location.pathname]);

  useEffect(() => {
    const nrpValue = form.getFieldValue("nrp");
    if (nrpValue === undefined) return;
    if (nrpValue.length === 0) return;
    setNrpLoading(true);

    const typingDelay = setTimeout(() => {
      checkNrpExist(nrpValue);
      setNrpLoading(checkNrp.loading);
    }, 500);

    return () => clearTimeout(typingDelay);
  }, [form.getFieldValue("nrp")]);

  useEffect(() => {
    const nrpValue = form.getFieldValue("nrp");
    if (checkNrp.response.payload === undefined) return;
    if (nrpValue.length === 0 || nrpValue === undefined) return;
    form.validateFields(["nrp"]);
  }, [checkNrp.response]);

  useEffect(() => {
    const emailValue = form.getFieldValue("email");
    if (emailValue === undefined) return;
    if (emailValue.length === 0) return;
    setEmailLoading(true);

    const typingDelay = setTimeout(() => {
      checkEmailExist(emailValue);
      setEmailLoading(checkEmail.loading);
    }, 500);

    return () => clearTimeout(typingDelay);
  }, [form.getFieldValue("email")]);

  useEffect(() => {
    const emailValue = form.getFieldValue("email");
    if (checkEmail.response.payload === undefined) return;
    if (emailValue.length === 0 || emailValue === undefined) return;
    form.validateFields(["email"]);
  }, [checkEmail.response]);

  useEffect(() => {
    if (createUser.isSuccess) return navigate(-1);
  }, [createUser.isSuccess]);

  return (
    <>
      <PageContainer>
        <Paper title="Create User Form">
          <Form
            form={form}
            name="userForm"
            onFinish={handleSubmit}
            layout="vertical"
            onValuesChange={handleFormChange}
            disabled={createUser.loading}
          >
            <Form.Item
              label="NRP"
              name="nrp"
              required
              hasFeedback
              validateStatus={
                form.getFieldValue("nrp") === undefined
                  ? undefined
                  : form.getFieldValue("nrp").length === 0
                  ? undefined
                  : generateNrpStatus()
              }
              rules={[
                { required: true, message: "NRP tidak boleh kosong!" },
                { whitespace: true, message: "NRP tidak boleh kosong!" },
                {
                  validator: (_, value) => {
                    if (
                      checkNrp.response.payload === 0 ||
                      checkNrp.response.payload === undefined ||
                      value.length === 0
                    ) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        new Error("NRP sudah terdaftar, gunakan yang lain!")
                      );
                    }
                  },
                },
              ]}
            >
              <Input name="nrp" type="text" style={fieldStyle} />
            </Form.Item>

            <Form.Item
              label="Nama Lengkap"
              name="fullName"
              required
              rules={[
                { required: true, message: "Nama Lengkap tidak boleh kosong!" },
              ]}
            >
              <Input name="fullName" type="text" style={fieldStyle} />
            </Form.Item>

            <Form.Item
              label="Jenis Kelamin"
              name="genderId"
              required
              rules={[
                {
                  required: true,
                  message: "Jenis Kelamin tidak boleh kosong!",
                },
              ]}
            >
              <Select style={fieldStyle}>
                {getGender.isSuccess &&
                  getGender.response.payload.map((item, index) => (
                    <Select.Option key={index} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              required
              hasFeedback
              validateStatus={
                form.getFieldValue("email") === undefined
                  ? undefined
                  : form.getFieldValue("email").length === 0
                  ? undefined
                  : generateEmailStatus()
              }
              rules={[
                { required: true, message: "Email tidak boleh kosong!" },
                { type: "email", message: "Format email tidak valid!" },
                {
                  validator: (_, value) => {
                    if (
                      checkEmail.response.payload === 0 ||
                      checkEmail.response.payload === undefined ||
                      value.length === 0
                    ) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(
                        new Error("Email sudah terdaftar, gunakan yang lain!")
                      );
                    }
                  },
                },
              ]}
            >
              <Input name="email" type="email" style={fieldStyle} />
            </Form.Item>

            <Form.Item
              label="Lokasi Kerja"
              name="workLocationId"
              required
              rules={[
                {
                  required: true,
                  message: "Lokasi Kerja tidak boleh kosong!",
                },
              ]}
            >
              <Select
                style={fieldStyle}
                onChange={(value) => {
                  getPositionData(value);
                  getOrganizationData(value);
                  form.setFieldValue("positionId", undefined);
                  form.setFieldValue("organizationId", undefined);
                }}
              >
                {getWorkLocation.isSuccess &&
                  getWorkLocation.response.payload.map((item, index) => (
                    <Select.Option key={index} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            {getPosition.isSuccess && (
              <Form.Item
                label="Jabatan"
                name="positionId"
                required
                rules={[
                  {
                    required: true,
                    message: "Jabatan tidak boleh kosong!",
                  },
                ]}
              >
                <Select style={fieldStyle}>
                  {getPosition.isSuccess &&
                    getPosition.response.payload.map((item, index) => (
                      <Select.Option key={index} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            )}

            {getOrganization.isSuccess && (
              <Form.Item
                label="Organisasi"
                name="organizationId"
                required
                rules={[
                  {
                    required: true,
                    message: "Organisasi tidak boleh kosong!",
                  },
                ]}
              >
                <Select style={fieldStyle}>
                  {getOrganization.isSuccess &&
                    getOrganization.response.payload.map((item, index) => (
                      <Select.Option key={index} value={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            )}

            <Form.Item label="Atasan Langsung" name="superiorIds">
              <Select
                style={fieldStyle}
                mode="multiple"
                allowClear
                labelInValue
                options={
                  getSuperior.isSuccess
                    ? getSuperior.response.payload.map((item) => ({
                        label: `${item.nrp} - ${item.fullName}`,
                        value: `${item.nrp} - ${item.fullName}`,
                        title: item.id,
                      }))
                    : []
                }
              />
            </Form.Item>

            <Form.Item
              label="Role"
              name="roleId"
              required
              rules={[
                {
                  required: true,
                  message: "Role tidak boleh kosong!",
                },
              ]}
            >
              <Select style={fieldStyle}>
                {getRole.isSuccess &&
                  getRole.response.payload.map((item, index) => (
                    <Select.Option key={index} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>

            <FormFooter>
              <Form.Item label="Status" name="isActive" initialValue={true}>
                <Radio.Group buttonStyle="solid">
                  <Radio value={true}> Active </Radio>
                  <Radio value={false}> Inactive </Radio>
                </Radio.Group>
              </Form.Item>

              <ButtonContainer>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={buttonStyle}
                  disabled={false}
                  loading={createUser.loading}
                >
                  Submit
                </Button>

                <Button
                  type="default"
                  danger
                  style={buttonStyle}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </ButtonContainer>
            </FormFooter>
          </Form>
        </Paper>
      </PageContainer>
    </>
  );
};

export default ActionMasterUserPage;
