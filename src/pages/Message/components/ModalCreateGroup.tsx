import { IonIcon } from '@ionic/react'
import CustomFileInput from '~/components/InputFile/CustomFileInput'
import Friend from './Friend'
import { memo, useState } from 'react'
import useMutationCreateMessage from '../hooks/useMutationCreateGroup'
import { toast } from 'react-toastify'
import { useQueryConversation } from '../hooks/useQueryConversation'
import { getProfileFromLocalStorage } from '~/utils/auth'
import Modal from '~/components/Modal'

const ModalCreateGroup = ({ isOpen, onClose }: any) => {
  const [listUser, setListUser] = useState<string[]>([])
  const [groupName, setGroupName] = useState<string>('')
  const createMessageMutation = useMutationCreateMessage()
  const { refetch } = useQueryConversation()

  const data = {
    list_user: JSON.stringify(listUser),
    group_name: groupName,
    group_thumbnail: ''
  }

  const handleCreate = () => {
    createMessageMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Tạo nhóm ok ')
        refetch()
      },
      onError: () => {
        toast.error('Cần 3 người')
      }
    })
  }

  return (
    <Modal isVisible={isOpen} onClose={onClose}>
      <div className='p-6'>
        <h2 className='text-xl font-semibold'>Tạo </h2>
      </div>
      <div className='p-6 py-0'>
        <div className='mb-4 flex w-full gap-2'>
          <CustomFileInput iconName={'image-outline'} />
          <div className='group relative z-0 w-full border-0 border-b-2 !border-gray-600'>
            <input
              type='text'
              name='floating_title'
              id='floating_title'
              value={groupName}
              className='dark:focus:gray-blue-500 peer block h-full w-full appearance-none  !bg-transparent px-0 text-sm text-gray-900 focus:border-gray-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white'
              onChange={(event) => setGroupName(event.target.value)}
            />
            <label
              htmlFor='floating_title'
              className='absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-600 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-gray-500'
            >
              Nhập tên nhóm
            </label>
          </div>
        </div>
        <div className='relative '>
          <div className='absolute bottom-1/2 left-3 flex translate-y-1/2'>
            <IonIcon icon='search' className='md hydrated text-xl' role='img' aria-label='search' />
          </div>
          <input type='text' placeholder='Tìm bạn bè' className='w-full !rounded-lg !py-2 !pl-10' />
        </div>
        <Friend listUser={listUser} setListUser={setListUser} />
      </div>
      <div className='flex justify-end p-6 text-sm font-medium'>
        <button className='uk-modal-close rounded-md px-4 py-1.5' type='button'>
          Hủy
        </button>
        {listUser.length < 2 ? (
          <button className='cursor-not-allowed rounded-md bg-gray-400 px-5 py-1.5 text-white' type='button'>
            Tạo
          </button>
        ) : (
          <button
            onClick={handleCreate}
            className='uk-modal-close rounded-md bg-primary px-5 py-1.5 text-white'
            type='button'
          >
            Tạo
          </button>
        )}
      </div>
    </Modal>
  )
}

export default ModalCreateGroup
