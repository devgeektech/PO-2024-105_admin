import { useState } from 'react'
import {KTIcon} from '../../../../../../_metronic/helpers'

const UserEditModalHeader = () => {
  // const {itemIdForUpdate, setItemIdForUpdate} = useListView()
  const [itemIdForUpdate, setItemIdForUpdate] =useState()
  return (
    <div className='modal-header'>
      <h2 className='fw-bolder'> {
        itemIdForUpdate ? "Update Speciality" : "Add Speciality"
      }</h2>
      <div
        className='btn btn-icon btn-sm btn-active-icon-primary'
        data-kt-users-modal-action='close'
        onClick={() => setItemIdForUpdate(undefined)}
        style={{cursor: 'pointer'}}
      >
        <KTIcon iconName='cross' className='fs-1' />
      </div>
    </div>
  )
}

export {UserEditModalHeader}
