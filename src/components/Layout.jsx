import { useTheme } from '@/context/ThemeContext'
import { Moon, Sun, Wallet } from 'lucide-react'
import { Button } from './ui/Button'

export default function Layout({ children }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/20 dark:border-border/10 bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
                  FundFi
                </h1>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="h-9 w-9 p-0">
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button variant="outline" className="h-9" size="sm">
                <span className="text-sm">Sign In</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 py-6 sm:py-8 lg:py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/10 mt-12 sm:mt-16 lg:mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p>© 2025 FundFi</p>
            <p>Powered by Ethereum</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
