// @ts-nocheck
import { Column } from 'react-table'
import { TitleCell } from './TitleCell'
import { ImageCell } from './ImageCell'
import { UserCustomHeader } from './CustomHeader'
import { ActionCell } from './ActionCell'

const partnersColumns: ReadonlyArray<Column<Partner>> = [
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Image' className='min-75px' />,
    id: 'image',
    Cell: ({ ...props }) => <ImageCell userObj={props.data[props.row.index].image} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Name' className='min-w-50px' />,
    id: 'name',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].name} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Business Name' className='min-w-50px' />,
    id: 'businessName',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].businessName} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Business Type' className='min-w-50px' />
    ),
    id: 'businessType',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].businessType.name} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Business Listed Date' className='min-w-50px' />
    ),
    id: 'businessListedDate',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].businessListedDate} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Status' className='min-w-50px' />
    ),
    id: 'status',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].status} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Action' className='min-w-75px' />
    ),
    id: 'action',
    Cell: ({ ...props }) => <ActionCell user={props.data[props.row.index]} />,
  },

]

export { partnersColumns }
