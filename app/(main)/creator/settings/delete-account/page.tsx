'use client'
import Button from '@/components/custom/Button'
import { useState } from 'react'
import { toast } from 'sonner'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import { supabaseService } from '@/utils/supabase/services'
import { useRouter } from 'next/navigation'

export default function DeleteAccountPage () {
  const [confirmText, setConfirmText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const currentUser = useContextSelector(
    UserContext,
    state => state.currentUser
  )
  const router = useRouter()

  const canDelete = confirmText.trim().toLowerCase() === 'delete my account'

  const handleDelete = async () => {
    try {
      setIsSubmitting(true)
      const userId = currentUser?.id || ''
      if (!userId) throw new Error('Not authenticated')
      await supabaseService.client
        .from('user_profile')
        .delete()
        .eq('userId', userId)
      await supabaseService.client.from('users').delete().eq('userId', userId)
      await supabaseService.client.auth.signOut()
      toast.success('Account deleted')
      router.replace('/')
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      toast.error(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='max-w-[640px] font-sans space-y-6'>
      <div>
        <h2 className='text-[18px] md:text-[22px] font-bold text-black'>
          Delete Account
        </h2>
        <p className='text-text-color-200 text-[14px] md:text-[16px]'>
          This will remove your profile data from Nigeria Creators. Type
          &rdquo;Delete my account&rdquo; to confirm.
        </p>
      </div>

      <input
        type='text'
        value={confirmText}
        onChange={e => setConfirmText(e.target.value)}
        placeholder='Delete my account'
        className='w-full h-[48px] md:h-[54px] px-4 rounded-[12px] md:rounded-[16px] bg-[#F8F8F8] border border-[#EFEFEF] text-[14px] md:text-[16px] text-black outline-none'
      />

      <div className='pt-2'>
        <Button
          text='Delete Account'
          aria-label='Delete account'
          className={`w-auto px-5 py-[12px] text-[16px] font-medium rounded-[12px] ${
            canDelete ? 'bg-red-500 hover:bg-red-600' : 'bg-red-300'
          } text-white`}
          buttonType='button'
          isSubmit={isSubmitting}
          onClick={() => {
            if (!canDelete) return
            handleDelete()
          }}
        />
      </div>
    </div>
  )
}
