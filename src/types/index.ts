export type ArticleCategory = string;
export type NavCategory = string;

/** Category path segment for `/category/:slug` links from the hero badge. */
export type HeroCategoryPath = 'ev' | 'launches' | 'engineering' | 'motorsport' | 'two-wheelers' | 'industry';

export type HeroSlide = {
  slug: string;
  category: string;
  categoryClass: 'ev' | 'launch' | 'engineering' | 'motorsport' | 'twowheeler' | 'industry';
  categoryPath: HeroCategoryPath;
  title: string;
  author: string;
  readTime: string;
  upvotes: string;
  imageUrl: string;
  imageAlt: string;
};

export type StoryCard = { 
  slug: string; 
  icon: string; 
  title: string; 
  meta: string; 
  gradient: string; 
  imageUrl: string; 
};

export type HeroSideItem = { 
  slug: string; 
  cat: string; 
  catClass: string; 
  title: string; 
  meta: string; 
  imageUrl: string; 
};

export type TrendingRow = { 
  num: string; 
  slug: string; 
  title: string; 
  meta: string; 
};

export type EvMiniCard = { 
  slug: string; 
  title: string; 
  meta: string; 
  imageUrl: string; 
};

export type EngMiniCard = { 
  slug: string; 
  title: string; 
  meta: string; 
  imageUrl: string; 
};

export type Article = {
  id: string;
  slug: string;
  cat: string;
  badge: string;
  badgeClass: 'ev' | 'launch' | 'engineering' | 'motorsport' | 'twowheeler' | 'industry';
  title: string;
  excerpt: string;
  deck?: string;
  bodyParagraphs?: string[];
  content?: any;
  seoTitle?: string;
  seoDescription?: string;
  keyTakeaways?: string[];
  tags?: string[];
  upvotes: number;
  readTime: string;
  meta: string;
  thumbLabel: string;
  thumbGradient: string;
  deepDive?: boolean;
  published?: string;
  updated?: string;
  authorName?: string;
  authorBio?: string;
  relatedPostsStrategy?: 'auto' | 'manual' | 'none';
  relatedPostsManualSlugs?: string[];
  /** Prefer over gradient+label thumbnails when set. */
  imageUrl?: string;
};
