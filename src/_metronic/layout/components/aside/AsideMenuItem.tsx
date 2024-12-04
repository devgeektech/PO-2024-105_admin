import {FC} from 'react'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useLocation} from 'react-router'
import {checkIsActive, KTIcon, WithChildren} from '../../../helpers'
import { useDispatch } from 'react-redux'
import { setId } from '../../../../redux/features/shared/sharedSlice'
import DashboardIcon from '../../../../app/icons/DashboardIcon'

type Props = {
  to: string
  title: string
  icon?: any
  fontIcon?: string
  hasBullet?: boolean
}

const AsideMenuItem: FC<Props & WithChildren> = ({

  children,
  to,
  title,
  icon,
  fontIcon,
  hasBullet = false,
}) => {
  const dispatch = useDispatch();
  const {pathname} = useLocation()
  const isActive = checkIsActive(pathname, to)


   const setTitle = ()=>{
    dispatch(setId(title))
   }

  return (
    <div className='menu-item'>
      <Link className={clsx('menu-link without-sub', {active: isActive})} to={to} onClick={()=>setTitle()}>
        {hasBullet && (
          <span className='menu-bullet'>
            <span className='bullet bullet-dot'></span>
          </span>
        )}
        {icon && (
          <span className='menu-icon'>
           {icon}
          </span>
        )}
        {fontIcon && <i className={clsx('bi fs-3', fontIcon)}></i>}
        <span className='menu-title'>{title}</span>
      </Link>
      {children}
    </div>
  )
}

export {AsideMenuItem}
