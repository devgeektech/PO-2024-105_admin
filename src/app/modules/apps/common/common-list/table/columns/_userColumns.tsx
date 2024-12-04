// @ts-nocheck
import { Column } from 'react-table'
import { TitleCell } from './TitleCell'
import { ImageCell } from './ImageCell'
import { ActiveCell } from './ActiveCell'
import { UserCustomHeader } from './CustomHeader'
import { ActionCell } from './ActionCell'
import { RoleCell } from './RoleCell'
import {AssignMemberCell} from './AssignMemberCell'
const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Image' className='min-75px' />,
    id: 'image',
    Cell: ({ ...props }) => <ImageCell userObj={props.data[props.row.index]} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='First Name' className='min-w-50px' />,
    id: 'firstName',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].firstName} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Last Name' className='min-w-50px' />,
    id: 'lastName',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].lastName} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Phone' className='min-w-50px' />
    ),
    id: 'phone',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].phone} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='email' className='min-w-50px' />
    ),
    id: 'email',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].email} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Role' className='min-w-50px' />
    ),
    id: 'role',
    Cell: ({ ...props }) => <RoleCell userObj={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (  
      <UserCustomHeader tableProps={props} title='Active/INACTIVE' className='min-w-75px' />
    ),
    id: 'isActive',
    Cell: ({ ...props }) => <ActiveCell user={props.data[props.row.index]} />,
  },
  {

    id: 'assign',
    Cell: ({ ...props }) => (props.data[props.row.index].role.includes('trainer')&& <AssignMemberCell user={props.data[props.row.index]} />),
  },
  
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Action' className='min-w-75px' />
    ),
    id: 'action',
    Cell: ({ ...props }) => <ActionCell user={props.data[props.row.index]} />,
  },

]

export { usersColumns }
