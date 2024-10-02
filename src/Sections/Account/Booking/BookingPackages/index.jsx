'use client'

import styles from './BookingPackages.module.scss'
import PackagesHeader from '@/Components/Packages/PackagesHeader'
import PackagesCard from '@/Components/Packages/PackagesCard'
import PackagesSummary from '@/Components/Packages/PackagesSummary'
import Container from '@/Components/Container'
import { getPackages, buyPackage } from './helper'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const BookingPackages = ({setLoadIsShow}) => {
  const [packages, setPackages] = useState(null)
  const [packageIdActive, setPackageIdActive] = useState(0)
  const { data: sessionData } = useSession();
  const router = useRouter()

  const submit = () => {
    if(sessionData?.user?.accessToken && packages[packageIdActive]?.id) {
      buyPackage(sessionData.user.accessToken, packages[packageIdActive].id)
      .then(({data}) => {
        if(data?.payment_link) {
          router.push(data.payment_link)
        }
      })
    } else {
      console.log('error')
    }
  }
 
  useEffect(() => {
    setLoadIsShow(true)
    getPackages().then(res => {
      if(res?.data) {
        setPackages(res.data)
        setLoadIsShow(false)
      }
      console.log(res.data)
    })
  }, [sessionData])

  return (
    <>
    {packages && (
      <>
        <PackagesHeader packagesData={packages} packageIdActive={packageIdActive} setPackageIdActive={setPackageIdActive} />
        <Container>
          <div className={styles["booking-packages__content"]}>
            <PackagesCard packageData={packages?.[packageIdActive]}/>
            <PackagesSummary packageData={packages?.[packageIdActive]} handlerSubmit={submit}/>
          </div>
        </Container>
      </>
    )}
    </>
  )
}

export default BookingPackages