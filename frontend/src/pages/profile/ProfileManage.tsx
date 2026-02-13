import { Button, Card, Divider, Space, Table } from "antd";
import type { IProfileSummary, NamePacked, WorkAuth } from "../../app/types";
import Title from "antd/es/typography/Title";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { useEffect } from "react";
import {
  fetchProfileList,
  setSearchKey,
} from "../../features/empProfiles/empProfilesSlice";
import SearchInput from "../../components/forms/SearchInput";

const ProfileManage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { profilesFiltered } = useSelector(
    (state: RootState) => state.employeeProfiles,
  );
  const columns: ColumnsType<IProfileSummary> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: NamePacked, record) => {
        const fullName = `${name.firstName} ${name.middleName ?? ""} ${name.lastName}`;
        return (
          <Button
            type="link"
            onClick={() => {
              navigate(`/profile/${record.employeeId}`);
            }}
          >
            {fullName}
          </Button>
        );
      },
    },
    {
      title: "SSN",
      dataIndex: "SSN",
      key: "ssn",
    },
    {
      title: "Work Authorization Title",
      dataIndex: "workAuthorization",
      key: "workAuth",
      // TODO? make this fancier with tag
      render: (workAuth: WorkAuth) => {
        return `${workAuth.type}`;
      },
    },
    {
      title: "Cell Phone #",
      dataIndex: "cellPhone",
      key: "phoneNum",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  useEffect(() => {
    dispatch(fetchProfileList())
      .unwrap()
      .catch((err) => console.log(err));
  }, [dispatch]);

  return (
    <Card>
      <Title level={3} style={{ marginBottom: "40px" }}>
        Employee Profiles
      </Title>
      <SearchInput
        placeholder="Search by employee name"
        onChange={(e) => {
          dispatch(setSearchKey(e.target.value));
        }}
      />
      <Divider style={{ margin: "40px 0" }}></Divider>
      <Space orientation="vertical">
        <Title level={5} type="secondary">
          Total Employees {profilesFiltered?.length ?? 0}
        </Title>
        <Table columns={columns} dataSource={profilesFiltered ?? []}></Table>
      </Space>
    </Card>
  );
};

export default ProfileManage;
