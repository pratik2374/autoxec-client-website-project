/** GROQ fragments — keep in sync with `studio/schemaTypes`. */

export const articleFields = /* groq */ `
  _id,
  "slug": slug.current,
  "cat": cat->slug.current,
  "badge": cat->title,
  "badgeClass": cat->badgeClass,
  title,
  excerpt,
  content,
  seoTitle,
  seoDescription,
  tags,
  upvotes,
  imageUrl,
  mainImage,
  authorName,
  authorBio,
  relatedPostsStrategy,
  "relatedPostsManualSlugs": relatedPostsManual[]->slug.current,
  published,
  _updatedAt,
  _createdAt
`

export const siteConfigQuery = /* groq */ `
  *[_type == "siteConfig"][0]{
    navigation[]{
      title,
      linkType,
      path,
      "category": category->{
        "slug": slug.current,
        title
      },
      "dropdownItems": dropdownItems[]->{
        "slug": slug.current,
        title
      }
    },
    typographyConfig {
      fontFamily,
      lineHeight,
      letterSpacing
    },
    tickerItems,
    exploreTopics,
    latestStoriesLimit,
    categoryPageLimit,
    heroConfig {
      strategy,
      limit,
      "manualArticles": manualArticles[]->{ ${articleFields} }
    },
    heroSideConfig {
      strategy,
      limit,
      "manualArticles": manualArticles[]->{ ${articleFields} }
    },
    quickReadsConfig {
      strategy,
      limit,
      "manualArticles": manualArticles[]->{ ${articleFields} }
    },
    trendingConfig {
      strategy,
      limit,
      "manualArticles": manualArticles[]->{ ${articleFields} }
    },
    topCategoryRows[]{
      "category": category->{
        "slug": slug.current,
        title,
        description,
        badgeClass,
        accentColor,
        barColor
      },
      strategy,
      limit,
      "manualArticles": manualArticles[]->{ ${articleFields} }
    },
    bottomCategoryRows[]{
      "category": category->{
        "slug": slug.current,
        title,
        description,
        badgeClass,
        accentColor,
        barColor
      },
      strategy,
      limit,
      "manualArticles": manualArticles[]->{ ${articleFields} }
    }
  }
`

export const allArticlesQuery = /* groq */ `
  *[_type == "article"] | order(coalesce(published, _createdAt) desc) {
    ${articleFields}
  }
`

export const allQuickReadsQuery = /* groq */ `
  *[_type == "quickRead"] | order(coalesce(published, _createdAt) desc) {
    ${articleFields}
  }
`

export const allCategoriesQuery = /* groq */ `
  *[_type == "category"] | order(title asc) {
    "slug": slug.current,
    title,
    description,
    badgeClass,
    accentColor,
    barColor,
    "featuredArticleSlug": featuredArticle->slug.current
  }
`
