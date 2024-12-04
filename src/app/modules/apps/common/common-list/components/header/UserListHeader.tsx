import { UsersListToolbar } from './ListToolbar'
import { CommonListSearchComponent } from './ListSearchComponent'
import ExportIcon from "../../../../../../icons/ExportIcon";
import VisibilityBox from '../../../visibility-box/VisibilityBox';

import { CSVLink } from "react-csv";

const UserListHeader = ({ exportObject }: any) => {
  return (
    <>
      <div className='card-header border-0 pt-6 justify-content-end'>
        <CommonListSearchComponent />
        <div className='card-toolbar'>
          <UsersListToolbar />
        </div>
        <VisibilityBox show={exportObject}>
          <div className='card-toolbar ms-2'>
            <CSVLink data={exportObject?.data} headers={exportObject?.headers} 
              filename={exportObject?.fileName}>
              <button type='button' className='btn btn-primary'>
                <span className='me-2'>
                  <ExportIcon />
                </span>
                Export
              </button>
            </CSVLink>
          </div>
        </VisibilityBox>
      </div>
    </>
  )
}

export { UserListHeader }
