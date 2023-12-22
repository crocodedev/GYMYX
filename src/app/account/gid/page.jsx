"use client"

import PageHeading from "@/Sections/Account/PageHeading"
import NavigationTabs from "@/Sections/Account/NavigationTabs"
import GidList from "@/Sections/Account/Gid/GidList"
import { useState, useEffect } from "react"
import Loading from "@/Components/Loading"

const Gid = () => {
  const [tags, setTags] = useState([])
  const [activeTag, setActiveTag] = useState(null)
  const [renderedItems, setRenderedItems] = useState([])
  const [gids, setGids] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setGids([
        {
          id: 1,
          title: "1",
          link: "",
          trainingTime: "7-8 минут",
          duration: "12:05",
          description: "Для разминки в самом начале тренировки",
          tags: ["Кардио", "Ноги"],
          isViewed: false,
          locked: true,
        },
        {
          id: 2,
          title: "2",
          link: "",
          trainingTime: "7-8 минут",
          duration: "05:42",
          description: "Для разминки в самом начале тренировки 2222",
          tags: ["Ноги"],
          isViewed: true,
          locked: false,
        },
        {
          id: 3,
          title: "3",
          link: "",
          trainingTime: "7-8 минут",
          duration: "05:42",
          description: "Для разминки в самом начале тренировки 2222",
          tags: ["Руки"],
          isViewed: true,
          locked: false,
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    const uniqueTags = []

    gids.forEach(({ tags }) => {
      tags.forEach((tag) => {
        uniqueTags[tag] = { title: tag }
      })
    })

    const uniqueTagsArray = Object.values(uniqueTags)
    setTags(uniqueTagsArray)
  }, [gids])

  useEffect(() => {
    if (activeTag) {
      const tag = tags[activeTag]
      console.log("ACTIVE TAG = > ", tag)
      const resultItems =
        gids.filter((item) => item.tags.includes(tag?.title)) || []

      setRenderedItems(resultItems)
    }
  }, [activeTag])

  const handleChangeTag = (index) => {
    setActiveTag(index)
  }

  if (!gids?.length) return <Loading full_screen={true} />

  return (
    <div className="account-page-wrapper">
      <PageHeading title={"Гид по тренажёрам"} />
      <NavigationTabs
        items={tags}
        selectedTab={activeTag}
        handleChangeTab={handleChangeTag}
        itemIcon={null}
      />
      <GidList items={!!renderedItems?.length ? renderedItems : gids} />
    </div>
  )
}

export default Gid
