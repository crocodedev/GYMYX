"use client"

import PageHeading from "@/Sections/Account/PageHeading"
import NavigationTabs from "@/Sections/Account/NavigationTabs"
import GidList from "@/Sections/Account/Gid/GidList"
import { useState, useEffect } from "react"
import Loading from "@/Components/Loading"
import Container from "@/Components/Container"

export const getGids = async () => {
  const result = await fetch("/api/gids/get-gids", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })

  const response = await result.json()
  if (!response.error) {
    return response
  }
}

const Gid = () => {
  const [tags, setTags] = useState([])
  const [activeTag, setActiveTag] = useState(null)
  const [renderedItems, setRenderedItems] = useState([])
  const [gids, setGids] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getGids().then(({ data }) => {
      if (data) {
        setGids(data)
      }
      setLoading(false)
    })
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
      const resultItems =
        gids.filter((item) => item.tags.includes(tag?.title)) || []

      setRenderedItems(resultItems)
    }
  }, [activeTag])

  const handleChangeTag = (index) => {
    setActiveTag(index)
  }

  if (loading) return <Loading full_screen={true} />

  return (
    <div className="account-page-wrapper">
      <PageHeading title={"Гид по тренажёрам"} />
      {!!gids?.length ? (
        <>
          <NavigationTabs
            items={tags}
            selectedTab={activeTag}
            handleChangeTab={handleChangeTag}
            itemIcon={null}
          />
          <GidList items={!!renderedItems?.length ? renderedItems : gids} />
        </>
      ) : (
        <Container>
          <p style={{ color: "white" }}>{"Пока что здесь пусто :("}</p>
        </Container>
      )}
    </div>
  )
}

export default Gid
