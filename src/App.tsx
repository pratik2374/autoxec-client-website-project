import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useIsDataLoading, useSiteData } from './context/SiteDataContext'
import { LoadingScreen } from './components/LoadingScreen'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { ArticlePage } from './pages/ArticlePage'
import { AuthorPage } from './pages/AuthorPage'
import { CategoryPage } from './pages/CategoryPage'
import { CommunityPage } from './pages/CommunityPage'
import { ContactPage } from './pages/ContactPage'
import { CorrectionsPolicyPage, EditorialPolicyPage, PrivacyPage, TermsPage } from './pages/LegalPages'
import { HomePage } from './pages/HomePage'
import { MediaKitPage } from './pages/MediaKitPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { GetAdvicePage } from './pages/GetAdvicePage'
import { QuickReadsPage } from './pages/QuickReadsPage'
import { SearchPage } from './pages/SearchPage'
import { SubscribePage } from './pages/SubscribePage'

export default function App() {
  const isDataLoading = useIsDataLoading()
  const [exiting, setExiting] = useState(false)
  const [showLoader, setShowLoader] = useState(true)

  // When sanity data finishes loading, immediately trigger exit sequence
  useEffect(() => {
    if (!isDataLoading) {
      setExiting(true)
      // Wait for exit animations to finish (0.4s drop + 0.4s fade = 0.8s) before unmounting
      const timer = setTimeout(() => {
        setShowLoader(false)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [isDataLoading])

  const { typographyConfig } = useSiteData()

  return (
    <>
      {showLoader && (
        <LoadingScreen exiting={exiting} />
      )}
      <div 
        className={!isDataLoading ? 'app-slide-in' : 'visually-hidden'}
        style={{
          fontFamily: typographyConfig.fontFamily,
          lineHeight: typographyConfig.lineHeight,
          letterSpacing: `${typographyConfig.letterSpacing}px`
        }}
      >
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="category/:slug" element={<CategoryPage />} />
            <Route path="article/:slug" element={<ArticlePage />} />
            <Route path="quick-read/:slug" element={<ArticlePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="quick-reads" element={<QuickReadsPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="media" element={<MediaKitPage />} />
            <Route path="community" element={<CommunityPage />} />
            <Route path="subscribe" element={<SubscribePage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="get-advice" element={<GetAdvicePage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="editorial-policy" element={<EditorialPolicyPage />} />
            <Route path="corrections" element={<CorrectionsPolicyPage />} />
            <Route path="author/preetam" element={<AuthorPage />} />
            <Route path="404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}
