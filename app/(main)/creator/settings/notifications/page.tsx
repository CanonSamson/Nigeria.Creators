'use client'
import { useEffect, useState } from 'react'
import { supabaseService } from '@/utils/supabase/services'
import { useContextSelector } from 'use-context-selector'
import { UserContext } from '@/context/user'
import { toast } from 'sonner'
import SettingsCard from '@/components/card/SettingsCard'

export default function NotificationSettingsPage () {
  const currentUser = useContextSelector(
    UserContext,
    state => state.currentUser
  )
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [brandCollaborations, setBrandCollaborations] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const persistSettings = async ({
    email = emailNotifications,
    brand = brandCollaborations,
    weekly = weeklyDigest
  }: {
    email?: boolean
    brand?: boolean
    weekly?: boolean
  }) => {
    try {
      setIsSaving(true)
      const userId = currentUser?.id || ''
      if (!userId) return
      const { data: existing, error: existingError } =
        await supabaseService.client
          .from('user_settings')
          .select('id')
          .eq('userId', userId)
          .maybeSingle()
      if (existingError) throw new Error(existingError.message)

      const payload = {
        userId,
        isNotificationEnabled: email,
        isBrandEmailEnabled: brand,
        isWeeklyEmailEnabled: weekly
      }

      if (existing?.id) {
        const { error } = await supabaseService.client
          .from('user_settings')
          .update(payload)
          .eq('id', existing.id)
        if (error) throw new Error(error.message)
      } else {
        const { error } = await supabaseService.client
          .from('user_settings')
          .insert(payload)
        if (error) throw new Error(error.message)
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e)
      toast.error(msg)
    } finally {
      setIsSaving(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      try {
        const userId = currentUser?.id || ''
        if (!userId) return
        const { data, error } = await supabaseService.client
          .from('user_settings')
          .select('*')
          .eq('userId', userId)
          .maybeSingle()
        if (error) return
        if (data) {
          setEmailNotifications(Boolean(data.isNotificationEnabled))
          setBrandCollaborations(Boolean(data.isBrandEmailEnabled))
          setWeeklyDigest(Boolean(data.isWeeklyEmailEnabled))
        }
      } catch {}
    })()
  }, [currentUser?.id])

  return (
    <div className=' font-sans max-w-[640px] space-y-6'>
      <div>
        <h2 className='text-[18px] md:text-[22px] font-bold text-black'>
          Notification Preferences
        </h2>
        <p className='text-text-color-200 text-[14px] md:text-[16px]'>
          Control how you receive updates
        </p>
      </div>

      <SettingsCard
        title='Email Notifications'
        subtitle='Receive updates via email'
        checked={emailNotifications}
        onChange={() => {
          const next = !emailNotifications
          setEmailNotifications(next)
          persistSettings({ email: next })
        }}
      />
      <SettingsCard
        title='Brand Collaborations'
        subtitle='Get notified about partnership opportunities'
        checked={brandCollaborations}
        onChange={() => {
          const next = !brandCollaborations
          setBrandCollaborations(next)
          persistSettings({ brand: next })
        }}
      />
      <SettingsCard
        title='Weekly Digest'
        subtitle='Summary of your performance metrics'
        checked={weeklyDigest}
        onChange={() => {
          const next = !weeklyDigest
          setWeeklyDigest(next)
          persistSettings({ weekly: next })
        }}
      />
    </div>
  )
}
