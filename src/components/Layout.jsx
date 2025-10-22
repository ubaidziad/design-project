import { useTheme } from '@/context/ThemeContext'
import { Moon, Sun, Wallet } from 'lucide-react'
import { Button } from './ui/Button'

export default function Layout({ children }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
                  FundFi
                </h1>
                <p className="text-xs text-muted-foreground hidden sm:block">NAV Lending Protocol</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="outline" size="sm" onClick={toggleTheme}>
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button className="flex items-center space-x-2" size="sm">
                <Wallet className="h-4 w-4" />
                <span className="hidden sm:inline">Connect Wallet</span>
                <span className="sm:hidden">Connect</span>
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
      <footer className="border-t border-border mt-12 sm:mt-16 lg:mt-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2025 FundFi. All rights reserved.</p>
            <p>Powered by Ethereum</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
