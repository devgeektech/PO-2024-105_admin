
import { FC } from 'react'


type Props = {
  width: any,
  height: any
}

const AreaCell: FC<Props> = ({ width, height }) => {
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        <span className='text-gray-800 mb-1'>
          <span className='fw-bold'>{width}</span> X <span className='fw-bold'>{height}</span>
        </span>
      </div>
    </div>
  )
}

export { AreaCell }
