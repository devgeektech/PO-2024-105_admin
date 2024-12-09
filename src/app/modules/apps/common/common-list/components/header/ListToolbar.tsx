import { useDispatch, useSelector } from 'react-redux';
import { KTIcon } from '../../../../../../../_metronic/helpers'
import { setEventModalStatus, setServiceModalStatus, setUserModalStatus } from '../../../../../../../redux/features/shared/sharedSlice';

const UsersListToolbar = () => {
  const sharedActions = useSelector((state: any) => state.sharedActions);
  const dispatch = useDispatch();
  const openAddUserModal = () => {

    switch (sharedActions.id) {
      case 'User':
        dispatch(setUserModalStatus(true))
        break;
      case 'Event':
        dispatch(setEventModalStatus(true))
        break;
      case 'Service':
        dispatch(setServiceModalStatus(true))
        break;
      default:
    }
  }

  return (
    <>
      {(sharedActions.id === "User" || sharedActions.id === "Event" || sharedActions.id === "Booking"
        || sharedActions.id === "Room" || sharedActions.id === "Task" || sharedActions.id === "Forum" || sharedActions.id === "Service"
      ) && <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
          <button type='button' className='btn btn-primary' onClick={openAddUserModal}>
            <KTIcon iconName='plus' className='fs-2' />
            Add {sharedActions.id}
          </button>
        </div>}
    </>
  )
}

export { UsersListToolbar }
