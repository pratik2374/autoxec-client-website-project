/** GROQ fragments — keep in sync with `studio/schemaTypes`. */

export const articleFields = /* groq */ `
  _id,
  "slug": slug.current,
  cat,
  badge,
  badgeClass,
  title,
  excerpt,
  deck,
  bodyParagraphs,
  keyTakeaways,
  tags,
  upvotes,
  readTime,
  meta,
  thumbLabel,
  thumbGradient,
  imageUrl,
  mainImage,
  deepDive,
  published,
  updated,
  heroCategoryLabel,
  heroAuthorLine,
  heroUpvotesLabel
`

export const homePageQuery = /* groq */ `
  *[_type == "homePage"][0]{
    _id,
    ticker,
    "heroSlideArticles": heroSlideRefs[]->{ ${articleFields} },
    "heroSideArticles": heroSideRefs[]->{ ${articleFields} },
    stories,
    trending,
    topics,
    evMini,
    engMini,
    filterCounts
  }
`

export const allArticlesQuery = /* groq */ `
  *[_type == "article"] | order(coalesce(published, updated) desc) {
    ${articleFields}
  }
`
