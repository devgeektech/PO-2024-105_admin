// @ts-nocheck
import { Column } from "react-table";
import { TitleCell } from "./TitleCell";
import { UserCustomHeader } from "./CustomHeader";
import { ActionCell } from "./ActionCell";
import moment from "moment";
import { EventStatuCell } from "./EventStatusCell";
import { AreaCell } from "./AreaCell";
import { KTIcon } from "../../../../../../../_metronic/helpers";
import { Link } from "react-router-dom";

const taskColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Task Name"
        className="min-w-50px"
      />
    ),
    id: "taskName",
    Cell: ({ ...props }) => (
      <TitleCell userObj={props.data[props.row.index].taskName} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Assign Date"
        className="min-w-50px"
      />
    ),
    id: "assignDate",
    Cell: ({ ...props }) => (
      <TitleCell
        userObj={moment(props.data[props.row.index]?.assignDate).format(
          "DD/MM/YYYY"
        )}
      />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Description"
        className="min-w-50px"
      />
    ),
    id: "description",
    Cell: ({ ...props }) => (
      <TitleCell userObj={props.data[props.row.index]?.description} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Status"
        className="min-w-50px"
      />
    ),
    id: "status",
    Cell: ({ ...props }) => (
      <TitleCell userObj={props.data[props.row.index]?.status} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Deadline"
        className="min-w-50px"
      />
    ),
    id: "deadLine",
    Cell: ({ ...props }) => (
      <TitleCell
        userObj={moment(props.data[props.row.index]?.deadLine).format(
          "DD/MM/YYYY"
        )}
      />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Completed On"
        className="min-w-50px"
      />
    ),
    id: "completedOn",
    Cell: ({ ...props }) => (
      <TitleCell
        userObj={
          props.data[props.row.index]?.completedOn
            ? moment(props.data[props.row.index]?.completedOn).format(
                "DD/MM/YYYY HH:MM A"
              )
            : "-"
        }
      />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Comment"
        className="min-w-50px"
      />
    ),
    id: "comment",
    Cell: ({ ...props }) => (
      <TitleCell userObj={props.data[props.row.index]?.comment} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader
        tableProps={props}
        title="Action"
        className="min-w-75px"
      />
    ),
    id: "action",
    Cell: ({ ...props }) => <ActionCell user={props.data[props.row.index]} />,
  },
];

export { taskColumns };
