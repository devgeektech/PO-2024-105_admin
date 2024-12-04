/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {Link} from 'react-router-dom'
import {useAuth} from '../../../../app/modules/auth'
import {Languages} from './Languages'
import {toAbsoluteUrl} from '../../../helpers'
import logo from '../../../assets/logo/admin-logo.png'

const HeaderUserMenu: FC = () => {
  const {currentUser, logout} = useAuth()
  return (
    <div
      className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
      data-kt-menu='true'
      data-popper-placement='bottom-start'
    >
      <div className='menu-item px-3'>
        <div className='menu-content d-flex align-items-center px-3'>
          <div className='symbol symbol-50px me-5'>
            {/* <img alt='Logo' src={toAbsoluteUrl('/media/avatars')} /> */}
            <img alt='Logo' src={logo}/>
          </div>

          <div className='d-flex flex-column'>
            <div className='fw-bolder d-flex align-items-center fs-5'>
              {currentUser?.name||'Admin'}
            </div>
            <a className='fw-bold text-muted text-hover-primary fs-7'>
              {currentUser?.email}
            </a>
          </div>
        </div>
      </div>

      <div className='separator my-2'></div>
      {/* <div className='menu-item px-5'>
        <Link to={'/profile'} className='menu-link px-5'>
         Profile
        </Link>
      </div> */}
      <div className='menu-item px-5'>
        <Link to={'/users/change-password'} className='menu-link px-5'>
         Change Password
        </Link>
      </div>
      <div className='menu-item px-5'>
        <a onClick={logout} className='menu-link px-5'>
          Sign Out
        </a>
      </div>
    </div>
  )
}

export {HeaderUserMenu}
