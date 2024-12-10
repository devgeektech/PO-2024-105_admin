
import { FC } from 'react'


type Props = {
  userObj: any
}

const RoleCell: FC<Props> = ({ userObj }) => {
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        {userObj && userObj.role && userObj.role.length && userObj?.role?.map((r:any,index:number)=>        
          <span key={index} className='text-gray-800 mb-1 rounded font-sm-12 text-capitalize px-2 bg-gray-300 me-1'>
             {r}
          </span>
        )}
      </div>
    </div>
  )
}

export { RoleCell }
