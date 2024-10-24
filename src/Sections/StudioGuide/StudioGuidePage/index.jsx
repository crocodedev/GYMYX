'use client'

import styles from './StudioGuidePage.module.scss'

import { useState, useEffect } from 'react'

import NavigationBack from '@/Sections/Account/NavigationBack'
import StudioGuideSwitcher from '../StudioGuideSwitcher'
import StudioGuideSlider from '../StudioGuideSlider'
import Container from '@/Components/Container'

const StudioGuidePage = ({data}) => {
  const [switcherIdActive, setSwitcherIdActive] = useState(0)
  // const [sectionVideo, setSectionVideo] = useState({title: '', elements: []})

  // console.log('data', data)

  const studioGuideVideo = data?.find(module => module.alias === 'studioGuideVideo')
  const studioGuideElements = studioGuideVideo.fields?.find(el => el.type === 'object')?.childrens

  useEffect(() => {
    // console.log(studioGuideVideo.fields.find(el => el.name == 'title'))
  }, [data])

  const SwitcherData = [
    {title: studioGuideVideo.fields.find(el => el.name == 'title').value},
    {title: 'гайд'},
  ]

  return (
    <>
      <NavigationBack buttonLabel={'назад'} link='/lk/profile'/>
      <StudioGuideSwitcher data={SwitcherData} handlerClick={setSwitcherIdActive} activeId={switcherIdActive}/>
      {switcherIdActive == 0 ? (
        <Container>
          <StudioGuideSlider isShowVideo={true} items={studioGuideElements}/>
        </Container>
      ) : (
        <Container>
          гайд
        </Container>
      )
    }
      
    </>
  )
}

export default StudioGuidePage