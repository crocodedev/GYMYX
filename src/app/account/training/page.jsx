"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

import PageHeading from "@/Sections/Account/PageHeading"
import TrainingTabs from "@/Sections/Account/Training/TrainingTabs"
import TrainingContent from "@/Sections/Account/Training/TrainingContent"
import TrainingCalendar from "@/Sections/Account/Training/TrainingCalendar"
import TrainingItems from "@/Sections/Account/Training/TrainingItems"
import Loading from "@/Components/Loading"
import { formatDate } from "@/Utils/helpers"

export const getTrainingData = async (token) => {
  const result = await fetch("/api/booking/get-bookings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  })

  const response = await result.json()
  if (!response.error) {
    return response
  }
}

const TABS = [
  { id: 0, title: "Предстоящие" },
  { id: 1, title: "Архив" },
]

const concateDateTime = (date, time) => {
  const fullDateTimeStr = `${date}T${time}`
  return new Date(fullDateTimeStr)
}

const Training = () => {
  const { data: sessionData } = useSession()
  const [allTrainingsDates, setAllTrainingsDates] = useState([])
  const [sortedTrainingsDates, setSortedTrainingsDates] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTab, setSelectedTab] = useState(0)

  useEffect(() => {
    if (!sessionData?.user?.accessToken) return

    getTrainingData(sessionData?.user?.accessToken).then(({ data = [] }) => {
      setAllTrainingsDates(data)
      setSelectedDate(data[0])
      setLoading(false)
    })

    setLoading(false)
  }, [])

  useEffect(() => {
    const dataTemp = getDataForPeriod(selectedTab, allTrainingsDates)
    setSelectedDate(dataTemp ? dataTemp[0] : null)
    setSortedTrainingsDates(dataTemp || [])
  }, [selectedTab, allTrainingsDates])

  const getDataForPeriod = (tab_id, data) => {
    let returnedData = []
    if (tab_id === 0) {
      //ПРЕДСТОЯЩИЕ
      returnedData = data.filter(
        ({ date, time }) => concateDateTime(date, time) >= new Date()
      )
    } else {
      //АРХИВ
      returnedData = data.filter(
        ({ date, time }) => concateDateTime(date, time) < new Date()
      )
    }

    return returnedData
  }

  const handleChangeSelectedDate = (value) => {
    const selectedDateTemp = allTrainingsDates.filter(
      ({ date }) => formatDate(date) === formatDate(value)
    )

    if (!selectedDateTemp?.length) return
    setSelectedDate(selectedDateTemp[0])
  }

  const handleChangeSelectedTab = (index) => {
    setSelectedTab(index)
  }

  if (loading) return <Loading />

  return (
    <div className="account-page-wrapper">
      <PageHeading title={"Мои тренировки"} />
      <TrainingTabs
        items={TABS}
        selectedTab={selectedTab}
        handleChangeTab={handleChangeSelectedTab}
      />
      <TrainingContent>
        <TrainingCalendar
          selectedDate={selectedDate}
          onHandleChange={handleChangeSelectedDate}
          availableDates={sortedTrainingsDates}
        />
        <TrainingItems
          selectedDate={selectedDate}
          archive={selectedTab === 1}
          items={sortedTrainingsDates}
        />
      </TrainingContent>
    </div>
  )
}

export default Training
