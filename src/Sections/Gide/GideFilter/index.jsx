'use client'

import styles from './GideFilter.module.scss'

import Container from '@/Components/Container'
import { ChevronIcon } from '../../../../public/svg'
import { useState } from 'react'

const GideFilter = () => {
  const [filterIsOpen, setFilterIsOpen] = useState(false)

  const filterToggle = () => {
    setFilterIsOpen(prev => !prev)
  }

  return (
    <section className={styles['gide-filter']}>
      <Container>
        <div className={styles['gide-filter__filter']}>
          <div className={styles['gide-filter__filter-inner']}>
            <button type='button' className={styles['gide-filter__filter-header']} onClick={filterToggle}>
              <span className={styles['gide-filter__filter-header-text']}>всe</span>
              <span className={styles['gide-filter__filter-header-icon']}><ChevronIcon/></span>
            </button>
            {filterIsOpen && (
              <ul className={styles['gide-filter__filter-list']}>
                <li className={styles['gide-filter__filter-item']}>1 item</li>
                <li className={styles['gide-filter__filter-item']}>2 item</li>
                <li className={styles['gide-filter__filter-item']}>3 item</li>
                <li className={styles['gide-filter__filter-item']}>4 item</li>
              </ul>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default GideFilter