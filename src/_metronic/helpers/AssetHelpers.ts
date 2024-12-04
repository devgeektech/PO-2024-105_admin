import { useLayout } from '../layout/core'
import { ThemeModeComponent } from '../assets/ts/layout'

export const toAbsoluteUrl = (pathname: string) => process.env.PUBLIC_URL + pathname

export const useIllustrationsPath = (illustrationName: string): string => {
  const { config } = useLayout()

  const extension = illustrationName.substring(
    illustrationName.lastIndexOf('.'),
    illustrationName.length
  )
  const illustration =
    ThemeModeComponent.getMode() === 'dark'
      ? `${illustrationName.substring(0, illustrationName.lastIndexOf('.'))}-dark`
      : illustrationName.substring(0, illustrationName.lastIndexOf('.'))
  return toAbsoluteUrl(
    `/media/illustrations/${config.illustrations?.set}/${illustration}${extension}`
  )
}


export const toImageUrl = (pathname: string) => {
  // if (!pathname && pathname === '') return
    return process.env.REACT_APP_S3_BUCKET_URL + `/${pathname}`
}