/* eslint-disable react-hooks/exhaustive-deps */
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { KTIcon, toAbsoluteUrl } from '../../../helpers'
import { useLayout } from '../../core'
import { HeaderToolbar } from './HeaderToolbar'
import { Topbar } from './Topbar'
import logo from '../../../../_metronic/assets/logo/logo.svg'
import './style.scss'

export function HeaderWrapper() {
  const { config, classes, attributes } = useLayout()
  const { aside } = config

  return (
    <div
      id='kt_header'
      className={clsx('header', classes.header.join(' '), 'align-items-stretch', 'justify-content-between')}
      {...attributes.headerMenu}
    >
      <div className='header-brand'>
        <Link to='/'>
          <img
            alt='Logo'
            src={logo}
            className='mr-5 d-block logo_img'
          />
        </Link>
        {/* end::Logo */}

        {aside.minimize && (
          <div
            id='kt_aside_toggle'
            className='btn btn-icon w-auto px-0 btn-active-color-primary aside-minimize'
            data-kt-toggle='true'
            data-kt-toggle-state='active'
            data-kt-toggle-target='body'
            data-kt-toggle-name='aside-minimize'
          >
            <KTIcon iconName='exit-left' className='fs-1 me-n1 minimize-default' />
            <KTIcon iconName='entrance-left' className='fs-1 minimize-active' />
          </div>
        )}

        {/* begin::Aside toggle */}
        <div className='d-flex align-items-center d-lg-none ms-n3 me-1' title='Show aside menu'>
          <div
            className='btn btn-icon btn-active-color-primary w-30px h-30px'
            id='kt_aside_mobile_toggle'
          >
            <KTIcon iconName='abstract-14' className='fs-1' />
          </div>
        </div>
        {/* end::Aside toggle */}
      </div>
      {/* end::Brand */}
      {/* <HeaderToolbar /> */}
      <Topbar />
    </div>
  )
}
