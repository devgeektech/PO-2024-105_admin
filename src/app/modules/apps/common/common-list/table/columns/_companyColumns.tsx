// @ts-nocheck
import { Column } from 'react-table'
import { TitleCell } from './TitleCell'
import { UserCustomHeader } from './CustomHeader'
import { ActionCell } from './ActionCell'
import { StatusCell } from './StatusCell'

const companyColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Company Name' className='min-w-50px' />
    ),
    id: 'companyName',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].companyName} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Email' className='min-w-50px' />,
    id: 'email',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].email} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Phone' className='min-w-50px' />,
    id: 'phone',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].phone} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Tax' className='min-w-50px' />,
    id: 'tax',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].tax} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='No Of Employees' className='min-w-50px' />,
    id: 'numberOfEmployees',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].numberOfEmployees} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Description' className='min-w-50px' />,
    id: 'description',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].description} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Status' className='min-w-50px' />,
    id: 'status',
    Cell: ({ ...props }) => <StatusCell userObj={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Action' className='min-w-75px' />
    ),
    id: 'action',
    Cell: ({ ...props }) => <ActionCell user={props.data[props.row.index]} />,
  },
]

export { companyColumns }
