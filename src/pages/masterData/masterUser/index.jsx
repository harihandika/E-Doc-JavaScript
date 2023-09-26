import React, { useEffect } from "react";
import { Button } from "antd";
import { useAppTitle, useAdminLayout } from "@/contexts";
import { Paper } from "@/components";
import { useAxios } from "@/hooks";
import { userService } from "@/services";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import Table from "./Table";
import { useNavigate } from "react-router-dom";
import { ButtonActionContainer, PageContainer, buttonStyle } from "./style";

const MasterUserPage = () => {
  const { setAppTitle } = useAppTitle();
  const { setLayoutTitle } = useAdminLayout();
  const userData = useAxios();
  const navigate = useNavigate();

  const getUserData = () => {
    const queryParams = { offset: 0, limit: 0 };
    userData.axiosFetch(userService.getData(queryParams));
  };

  const handleCreate = () => {
    navigate("/masterData/user/create");
  };

  useEffect(() => {
    setAppTitle("Master User");
    setLayoutTitle("Master User");
    getUserData();
  }, []);

  return (
    <>
      <PageContainer>
        <Paper title="Table of User">
          <ButtonActionContainer>
            <Button
              type="default"
              icon={<UploadOutlined />}
              style={buttonStyle}
            >
              Upload
            </Button>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={buttonStyle}
              onClick={handleCreate}
            >
              Create
            </Button>
          </ButtonActionContainer>

          <Table
            sourceData={userData.response?.payload}
            isLoading={userData.loading}
          />
        </Paper>
      </PageContainer>
    </>
  );
};

export default MasterUserPage;
