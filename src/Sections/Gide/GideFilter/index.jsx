'use client'

import styles from './GideFilter.module.scss'

import Container from '@/Components/Container'
import GideTags from '../GideTags'
import { ChevronIcon, CrossIcon } from '../../../../public/svg'
import { useState, useEffect, useRef } from 'react'

const GideFilter = ({tags, activeTags, setActiveTags}) => {
  const [filterIsOpen, setFilterIsOpen] = useState(false)
  const filterRef = useRef(null)

  const filterToggle = () => {
    setFilterIsOpen(prev => !prev)
  }

  const closeFilterList = (e) => {
    if (filterRef.current && !filterRef.current.contains(e.target)) {
      setFilterIsOpen(false)
    }
  }

  const addTags = () => {
    setActiveTags(prev => [...prev])
  }

  useEffect(() => {
    window.addEventListener('click', closeFilterList)

    return () => {
      window.removeEventListener('click', closeFilterList)
    }
  }, [])

  return (
    <section className={styles['gide-filter']}>
      <Container>
        <div className={styles['gide-filter__wrapper']}>

          <div ref={filterRef} className={styles['gide-filter__filter']}>
            <div className={styles['gide-filter__filter-inner']}>
              <button type='button' className={styles['gide-filter__filter-header']} onClick={filterToggle}>
                <span className={styles['gide-filter__filter-header-text']}>всe</span>
                <span className={styles['gide-filter__filter-header-icon']}><ChevronIcon/></span>
              </button>
              {filterIsOpen && (
                <ul className={styles['gide-filter__filter-list']}>
                  <li className={`${styles['gide-filter__filter-item']} ${true ? styles['gide-filter__filter-item--active'] : ''}`} onClick={addTags}>1 item</li>
                  <li className={styles['gide-filter__filter-item']}>2 item</li>
                  <li className={styles['gide-filter__filter-item']}>3 item</li>
                  <li className={styles['gide-filter__filter-item']}>4 item</li>
                </ul>
              )}
            </div>
          </div>

          <GideTags/>
        </div>
      </Container>
    </section>
  )
}

export default GideFilter