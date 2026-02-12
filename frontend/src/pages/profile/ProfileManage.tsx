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

// const profilesMock: IProfileSummary[] = [
//   {
//     _id: "emp-001",
//     name: { firstName: "John", lastName: "Doe", preferredName: "Johnny" },
//     SSN: "111-11-1001",
//     workAuthorization: {
//       type: "Citizen",
//       title: undefined,
//       startDate: undefined,
//       endDate: undefined,
//       url: undefined,
//     },
//     cellPhone: "555-301-1001",
//     email: "john.doe@example.com",
//   },
//   {
//     _id: "emp-002",
//     name: { firstName: "Jane", lastName: "Smith", middleName: "A" },
//     SSN: "111-11-1002",
//     workAuthorization: {
//       type: "GreenCard",
//       title: undefined,
//       startDate: new Date("2018-05-12"),
//       endDate: undefined,
//       url: undefined,
//     },
//     cellPhone: "555-301-1002",
//     email: "jane.smith@example.com",
//   },
//   {
//     _id: "emp-003",
//     name: { firstName: "Michael", lastName: "Brown" },
//     SSN: "111-11-1003",
//     workAuthorization: {
//       type: "H1-B",
//       title: undefined,
//       startDate: new Date("2023-10-01"),
//       endDate: new Date("2026-09-30"),
//       url: "https://example.com/docs/michael-h1b.pdf",
//     },
//     cellPhone: "555-301-1003",
//     email: "michael.brown@example.com",
//   },
//   {
//     _id: "emp-004",
//     name: { firstName: "Emily", lastName: "Johnson", preferredName: "Em" },
//     SSN: "111-11-1004",
//     workAuthorization: {
//       type: "F1",
//       title: undefined,
//       startDate: new Date("2024-01-10"),
//       endDate: new Date("2025-01-09"),
//       url: "https://example.com/docs/emily-f1.pdf",
//     },
//     cellPhone: "555-301-1004",
//     email: "emily.johnson@example.com",
//   },
//   {
//     _id: "emp-005",
//     name: { firstName: "David", lastName: "Wilson" },
//     SSN: "111-11-1005",
//     workAuthorization: {
//       type: "Other",
//       title: "Pending Asylum Authorization",
//       startDate: new Date("2022-06-01"),
//       endDate: undefined,
//       url: "https://example.com/docs/david-other.pdf",
//     },
//     cellPhone: "555-301-1005",
//     email: "david.wilson@example.com",
//   },
//   {
//     _id: "emp-006",
//     name: { firstName: "Sarah", lastName: "Taylor" },
//     SSN: "111-11-1006",
//     workAuthorization: {
//       type: "L2",
//       title: undefined,
//       startDate: new Date("2023-02-15"),
//       endDate: new Date("2025-02-14"),
//       url: "https://example.com/docs/sarah-l2.pdf",
//     },
//     cellPhone: "555-301-1006",
//     email: "sarah.taylor@example.com",
//   },
//   {
//     _id: "emp-007",
//     name: { firstName: "Chris", lastName: "Anderson" },
//     SSN: "111-11-1007",
//     workAuthorization: {
//       type: "H4",
//       title: undefined,
//       startDate: new Date("2023-11-01"),
//       endDate: new Date("2026-10-31"),
//       url: "https://example.com/docs/chris-h4.pdf",
//     },
//     cellPhone: "555-301-1007",
//     email: "chris.anderson@example.com",
//   },
//   {
//     _id: "emp-008",
//     name: { firstName: "Olivia", lastName: "Martinez" },
//     SSN: "111-11-1008",
//     workAuthorization: {
//       type: "H1-B",
//       title: undefined,
//       startDate: new Date("2022-09-01"),
//       endDate: new Date("2025-08-31"),
//       url: "https://example.com/docs/olivia-h1b.pdf",
//     },
//     cellPhone: "555-301-1008",
//     email: "olivia.martinez@example.com",
//   },
//   {
//     _id: "emp-009",
//     name: { firstName: "Daniel", lastName: "Lee" },
//     SSN: "111-11-1009",
//     workAuthorization: {
//       type: "GreenCard",
//       title: undefined,
//       startDate: new Date("2020-04-20"),
//       endDate: undefined,
//       url: undefined,
//     },
//     cellPhone: "555-301-1009",
//     email: "daniel.lee@example.com",
//   },
//   {
//     _id: "emp-010",
//     name: { firstName: "Sophia", lastName: "Clark", preferredName: "Sophie" },
//     SSN: "111-11-1010",
//     workAuthorization: {
//       type: "Other",
//       title: "Temporary Protected Status (TPS)",
//       startDate: new Date("2021-03-01"),
//       endDate: new Date("2024-09-30"),
//       url: "https://example.com/docs/sophia-tps.pdf",
//     },
//     cellPhone: "555-301-1010",
//     email: "sophia.clark@example.com",
//   },
//   {
//     _id: "emp-011",
//     name: { firstName: "Ethan", lastName: "Hall" },
//     SSN: "111-11-1011",
//     workAuthorization: {
//       type: "Citizen",
//       title: undefined,
//       startDate: undefined,
//       endDate: undefined,
//       url: undefined,
//     },
//     cellPhone: "555-301-1011",
//     email: "ethan.hall@example.com",
//   },
//   {
//     _id: "emp-012",
//     name: { firstName: "Isabella", lastName: "Young" },
//     SSN: "111-11-1012",
//     workAuthorization: {
//       type: "F1",
//       title: undefined,
//       startDate: new Date("2023-08-20"),
//       endDate: new Date("2024-08-19"),
//       url: "https://example.com/docs/isabella-f1.pdf",
//     },
//     cellPhone: "555-301-1012",
//     email: "isabella.young@example.com",
//   },
//   {
//     _id: "emp-013",
//     name: { firstName: "Matthew", lastName: "King" },
//     SSN: "111-11-1013",
//     workAuthorization: {
//       type: "H1-B",
//       title: undefined,
//       startDate: new Date("2024-10-01"),
//       endDate: new Date("2027-09-30"),
//       url: "https://example.com/docs/matthew-h1b.pdf",
//     },
//     cellPhone: "555-301-1013",
//     email: "matthew.king@example.com",
//   },
//   {
//     _id: "emp-014",
//     name: { firstName: "Ava", lastName: "Wright" },
//     SSN: "111-11-1014",
//     workAuthorization: {
//       type: "L2",
//       title: undefined,
//       startDate: new Date("2022-12-01"),
//       endDate: new Date("2024-11-30"),
//       url: "https://example.com/docs/ava-l2.pdf",
//     },
//     cellPhone: "555-301-1014",
//     email: "ava.wright@example.com",
//   },
//   {
//     _id: "emp-015",
//     name: { firstName: "Noah", lastName: "Lopez" },
//     SSN: "111-11-1015",
//     workAuthorization: {
//       type: "Other",
//       title: "Employment Authorization – Pending Adjustment",
//       startDate: new Date("2023-05-10"),
//       endDate: new Date("2025-05-09"),
//       url: "https://example.com/docs/noah-other.pdf",
//     },
//     cellPhone: "555-301-1015",
//     email: "noah.lopez@example.com",
//   },
//   {
//     _id: "emp-016",
//     name: { firstName: "Mia", lastName: "Hill" },
//     SSN: "111-11-1016",
//     workAuthorization: {
//       type: "GreenCard",
//       title: undefined,
//       startDate: new Date("2017-07-18"),
//       endDate: undefined,
//       url: undefined,
//     },
//     cellPhone: "555-301-1016",
//     email: "mia.hill@example.com",
//   },
//   {
//     _id: "emp-017",
//     name: { firstName: "Lucas", lastName: "Scott" },
//     SSN: "111-11-1017",
//     workAuthorization: {
//       type: "H4",
//       title: undefined,
//       startDate: new Date("2022-10-10"),
//       endDate: new Date("2025-10-09"),
//       url: "https://example.com/docs/lucas-h4.pdf",
//     },
//     cellPhone: "555-301-1017",
//     email: "lucas.scott@example.com",
//   },
//   {
//     _id: "emp-018",
//     name: { firstName: "Amelia", lastName: "Adams" },
//     SSN: "111-11-1018",
//     workAuthorization: {
//       type: "Citizen",
//       title: undefined,
//       startDate: undefined,
//       endDate: undefined,
//       url: undefined,
//     },
//     cellPhone: "555-301-1018",
//     email: "amelia.adams@example.com",
//   },
//   {
//     _id: "emp-019",
//     name: { firstName: "Henry", lastName: "Baker" },
//     SSN: "111-11-1019",
//     workAuthorization: {
//       type: "F1",
//       title: undefined,
//       startDate: new Date("2024-01-15"),
//       endDate: new Date("2025-01-14"),
//       url: "https://example.com/docs/henry-f1.pdf",
//     },
//     cellPhone: "555-301-1019",
//     email: "henry.baker@example.com",
//   },
//   {
//     _id: "emp-020",
//     name: { firstName: "Lily", lastName: "Perez", preferredName: "Lil" },
//     SSN: "111-11-1020",
//     workAuthorization: {
//       type: "H1-B",
//       title: undefined,
//       startDate: new Date("2021-10-01"),
//       endDate: new Date("2024-09-30"),
//       url: "https://example.com/docs/lily-h1b.pdf",
//     },
//     cellPhone: "555-301-1020",
//     email: "lily.perez@example.com",
//   },
// ];

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
      // TODO make this fancier with tag
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
    // // TODO remove test file
    // dispatch(setProfiles(profilesMock));
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
