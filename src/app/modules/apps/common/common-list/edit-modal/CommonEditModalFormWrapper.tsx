import {useQuery} from 'react-query'
import {PartnerEditModalForm} from './CommonEditModalForm'
import {isNotEmpty, QUERIES} from '../../../../../../_metronic/helpers'



const PartnerEditModalFormWrapper = () => {
//   const {itemIdForUpdate, setItemIdForUpdate} = useListView()
//   const enabledQuery: boolean = isNotEmpty(itemIdForUpdate)
//   const {
//     isLoading,
//     data: user,
//     error,
//   } = useQuery(
//     `${QUERIES.PARTNER_LIST}-user-${itemIdForUpdate}`,
//     () => {
//       return getParnterById(itemIdForUpdate)
//     },
//     {
//       cacheTime: 0,
//       enabled: enabledQuery,
//       onError: (err) => {
//         setItemIdForUpdate(undefined)
//         console.error(err)
//       },
//     }
//   )

//   if (!itemIdForUpdate) {
//     return <PartnerEditModalForm isUserLoading={isLoading} user={{id: undefined}} />
//   }

//   if (!isLoading && !error && user) {
//     return <PartnerEditModalForm isUserLoading={isLoading} user={user} />
//   }

  return null
 }

export {PartnerEditModalFormWrapper}
