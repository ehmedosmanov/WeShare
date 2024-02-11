import SettingsTabs from '@/components/SettingsComponents/SettingTabs'
import SettingsHeading from '@/components/SettingsComponents/SettingsHeading'
import React from 'react'
import { Helmet } from 'react-helmet-async'
import { LazyLoadComponent } from 'react-lazy-load-image-component'

const SettingsProfile = () => {
  return (
    <>
      <Helmet>
        <title>Settings</title>
      </Helmet>
      <LazyLoadComponent>
        <SettingsHeading />
      </LazyLoadComponent>
      <LazyLoadComponent>
        <SettingsTabs />
      </LazyLoadComponent>
    </>
  )
}

export default SettingsProfile
