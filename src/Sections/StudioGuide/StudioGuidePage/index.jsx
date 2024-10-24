'use client'

import styles from './StudioGuidePage.module.scss'

import { useState, useEffect } from 'react'

import NavigationBack from '@/Sections/Account/NavigationBack'
import StudioGuideSwitcher from '../StudioGuideSwitcher'
import StudioGuideSlider from '../StudioGuideSlider'
import StuduiGuideGuide from '../StuduiGuideGuide'
import Container from '@/Components/Container'

const StudioGuidePage = ({data}) => {
  const [switcherIdActive, setSwitcherIdActive] = useState(1)
  // const [sectionVideo, setSectionVideo] = useState({title: '', elements: []})

  // console.log('data', data)

  const studioGuideVideo = data?.find(module => module.alias === 'studioGuideVideo')?.fields
  const studioGuideElements = studioGuideVideo?.find(el => el.type === 'object')?.childrens

  const studioGuideHelper = data?.find(module => module.alias === 'studioGuideHelper')?.fields
  // const studioGuideHelperElements = studioGuideHelper?.find(el => el.type === 'object')?.childrens

  // console.log(studioGuideHelper)

  useEffect(() => {
    // console.log(studioGuideVideo.fields.find(el => el.name == 'title'))
  }, [data])

  const SwitcherData = [
    {title: studioGuideVideo.find(el => el.name == 'title').value},
    {title: 'гайд'},
  ]

  return (
    <section className={styles['stubio-guide']}>
      <NavigationBack buttonLabel={'назад'} link='/lk/profile'/>
      <StudioGuideSwitcher data={SwitcherData} handlerClick={setSwitcherIdActive} activeId={switcherIdActive}/>
      {switcherIdActive == 0 ? (
        <Container>
          <StudioGuideSlider isShowVideo={true} items={studioGuideElements}/>
        </Container>
      ) : (
        <StuduiGuideGuide helperData={studioGuideHelper}/>
      )
    }
    </section>
  )
}

export default StudioGuidePage