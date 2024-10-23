export const getAllTags = (data) => {
  let SetTag = new Set()
  data.forEach(item => item.tags.forEach(tag => SetTag.add(tag.name)))
  return Array.from(SetTag)
}

export const sortByFavorites = (arr) => {
  return arr.sort((a, b) => (b.isFavorited ? 1 : -1) - (a.isFavorited ? 1 : -1))
}