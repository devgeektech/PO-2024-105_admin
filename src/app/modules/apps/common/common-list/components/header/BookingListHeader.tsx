import { UsersListToolbar } from './ListToolbar'
import { CommonListSearchComponent } from './ListSearchComponent'
import { KTIcon } from '../../../../../../../_metronic/helpers'
import { Link } from 'react-router-dom'

const BookingListHeader = () => {

  return (
    <>
      <div className='card-header border-0 pt-6 justify-content-end'>
        <CommonListSearchComponent />
        <div className='card-toolbar'>
           <UsersListToolbar />
        </div>
        <div className='card-toolbar ms-2'>
          <Link to={'/bookings/availability'}>
          <button type='button' className='btn btn-primary'>
            <KTIcon iconName='timer' className='fs-2' />
             Availability
          </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export { BookingListHeader }
