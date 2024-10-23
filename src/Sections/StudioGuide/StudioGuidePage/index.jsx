'use client'

import styles from './StudioGuidePage.module.scss'

import { useState } from 'react'

import NavigationBack from '@/Sections/Account/NavigationBack'
import StudioGuideSwitcher from '../StudioGuideSwitcher'
import StudioGuideSlider from '../StudioGuideSlider'
import Container from '@/Components/Container'

const StudioGuidePage = ({data}) => {
  const [switcherIdActive, setSwitcherIdActive] = useState(0)

  const SwitcherData = [
    {title: 'видео'},
    {title: 'гайд'},
  ]

  return (
    <>
      <NavigationBack buttonLabel={'назад'} link='/lk/profile'/>
      <StudioGuideSwitcher data={SwitcherData} handlerClick={setSwitcherIdActive} activeId={switcherIdActive}/>
      <Container>
        <StudioGuideSlider/>
      </Container>
    </>
  )
}

export default StudioGuidePage