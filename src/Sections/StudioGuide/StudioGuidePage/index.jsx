'use client'

import styles from './StudioGuidePage.module.scss'

import { useState, useEffect } from 'react'

import NavigationBack from '@/Sections/Account/NavigationBack'
import StudioGuideSwitcher from '../StudioGuideSwitcher'
import StudioGuideVideoSlider from '../StudioGuideVideoSlider'
import StuduiGuideGuide from '../StuduiGuideGuide'

const StudioGuidePage = ({data}) => {
  const [switcherIdActive, setSwitcherIdActive] = useState(1)
  // console.log('data', data)

  const studioGuideVideo = data?.find(module => module.alias === 'studioGuideVideo')?.fields
  const studioGuideElements = studioGuideVideo?.find(el => el.type === 'object')?.childrens

  const studioGuideHelper = data?.find(module => module.alias === 'studioGuideHelper')?.fields
  const studioGuideRules = data?.find(module => module.alias === 'studioGuideRules')?.fields

  const SwitcherData = [
    {title: 'видео'},
    {title: 'гайд'},
  ]

  return (
    <section className={styles['stubio-guide']}>
      <NavigationBack buttonLabel={'назад'} link='/lk/profile'/>
      <StudioGuideSwitcher data={SwitcherData} handlerClick={setSwitcherIdActive} activeId={switcherIdActive}/>
      {switcherIdActive == 0 
      ? (<StudioGuideVideoSlider items={studioGuideElements}/>) 
      : (<StuduiGuideGuide helperData={studioGuideHelper} rulesData={studioGuideRules}/>)
      }
    </section>
  )
}

export default StudioGuidePage