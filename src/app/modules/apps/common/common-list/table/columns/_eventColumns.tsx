// @ts-nocheck
import { Column } from 'react-table'
import { TitleCell } from './TitleCell'
import { UserCustomHeader } from './CustomHeader'
import { ActionCell } from './ActionCell'
import moment from 'moment'
import { EventStatuCell } from './EventStatusCell'
import { ActiveCell } from './ActiveCell'

const eventsColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Date' className='min-w-50px' />
    ),
    id: 'date',
    Cell: ({ ...props }) => <TitleCell userObj={moment(props.data[props.row.index].date).format('DD/MM/YYYY')} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Time' className='min-w-50px' />
    ),
    id: 'time',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].time} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Room' className='min-w-50px' />
    ),
    id: 'room',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].room?.roomName} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Event Type' className='min-w-50px' />
    ),
    id: 'eventType',
    Cell: ({ ...props }) => <TitleCell userObj={props.data[props.row.index].eventType} />,
  },
  {
    Header: (props) => (  
      <UserCustomHeader tableProps={props} title='Status' className='min-w-75px' />
    ),
    id: 'isActive',
    Cell: ({ ...props }) => <ActiveCell user={props.data[props.row.index]} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Action' className='min-w-75px' />
    ),
    id: 'action',
    Cell: ({ ...props }) => <ActionCell user={props.data[props.row.index]} />,
  },
]

export { eventsColumns }
