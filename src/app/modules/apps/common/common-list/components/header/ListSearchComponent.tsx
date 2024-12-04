/* eslint-disable react-hooks/exhaustive-deps */
import { KTIcon } from '../../../../../../../_metronic/helpers'
import { useDispatch, useSelector } from 'react-redux';
import { commonSwtichCases } from '../../../../../../../utils/shared';

const CommonListSearchComponent = () => {
  let timeout;
  const sharedActions = useSelector((state: any) => state.sharedActions);
  const dispatch = useDispatch();
  const searchQuery = (searchValue: string) => {
    debounceTime(searchValue);
  }
  
  const debounceTime= (searchText:any)=>{
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          commonSwtichCases(sharedActions.id, searchText,dispatch)
        }, 300);
  }


  return (
    <div className='card-title'>
      <div className='d-flex align-items-center position-relative my-1'>
        <KTIcon iconName='magnifier' className='fs-1 position-absolute ms-6' />
        <input
          type='text'
          data-kt-user-table-filter='search'
          className='form-control form-control-solid w-200px ps-14'
          placeholder='Search...'
          // value={searchTerm}
          onChange={(e) => searchQuery(e.target.value)}
        />
      </div>
      {/* end::Search */}
    </div>
  )
}

export { CommonListSearchComponent }
