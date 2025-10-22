import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Percent, 
  TrendingUp, 
  Shield,
  CheckCircle2,
  Info
} from 'lucide-react'
import { formatCurrency, formatPercentage } from '@/lib/utils'

export default function LoanQuote() {
  const navigate = useNavigate()
  const [loanAmount, setLoanAmount] = useState(480000)

  const fundData = {
    name: 'Tyr Capital Fund I',
    nav: 1200000,
    lastUpdated: '2025-10-15',
  }

  const loanTerms = {
    ltv: 40,
    apr: 8.5,
    duration: 180, // days
    collateralType: 'Fund Units',
    maxLoanAmount: 480000,
  }

  const calculateMonthlyPayment = () => {
    const monthlyRate = loanTerms.apr / 100 / 12
    const months = loanTerms.duration / 30
    const payment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                   (Math.pow(1 + monthlyRate, months) - 1)
    return payment
  }

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-12 animate-fade-in">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')}
        className="mb-2"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      {/* Page Header */}
      <div className="mb-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">Loan Quote</h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          Review your loan terms based on current NAV
        </p>
      </div>

      {/* NAV Summary */}
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{fundData.name}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Last NAV Update: {new Date(fundData.lastUpdated).toLocaleDateString()}
              </p>
            </div>
            <Badge variant="success" className="flex items-center space-x-1">
              <CheckCircle2 className="h-3 w-3" />
              <span>NAV Verified</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current NAV</p>
              <p className="text-2xl md:text-3xl font-bold">{formatCurrency(fundData.nav)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Available to Borrow</p>
              <p className="text-2xl md:text-3xl font-bold text-primary">
                {formatCurrency(loanTerms.maxLoanAmount)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loan Amount Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Amount</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <input
              type="range"
              min="50000"
              max={loanTerms.maxLoanAmount}
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {formatCurrency(50000)}
            </p>
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">
              {formatCurrency(loanAmount)}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatCurrency(loanTerms.maxLoanAmount)}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Loan Terms */}
      <Card className="border-2 border-primary/30 hover:shadow-xl hover:border-primary/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Auto-Calculated Loan Terms</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
            {/* LTV Ratio */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:border-primary/40 transition-all">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Percent className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Loan-to-Value Ratio</p>
                  <p className="text-3xl font-bold">{formatPercentage(loanTerms.ltv)}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Calculated as loan amount / NAV
              </p>
            </div>

            {/* APR */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-all">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Annual Percentage Rate</p>
                  <p className="text-3xl font-bold">{formatPercentage(loanTerms.apr)}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Fixed rate for loan duration
              </p>
            </div>

            {/* Duration */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-all">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Loan Duration</p>
                  <p className="text-3xl font-bold">{loanTerms.duration} days</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Approximately {Math.round(loanTerms.duration / 30)} months
              </p>
            </div>

            {/* Collateral */}
            <div className="p-8 rounded-xl bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 hover:border-green-500/40 transition-all">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Collateral Type</p>
                  <p className="text-2xl font-bold">{loanTerms.collateralType}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Secured against fund units
              </p>
            </div>
          </div>

          {/* Repayment Summary */}
          <div className="mt-8 p-8 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 hover:border-primary/50 transition-all">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-primary mt-0.5" />
              <div className="flex-1">
                <p className="font-medium mb-2">Estimated Monthly Payment</p>
                <p className="text-3xl font-bold text-primary mb-2">
                  {formatCurrency(calculateMonthlyPayment())}
                </p>
                <p className="text-sm text-muted-foreground">
                  Total repayment: {formatCurrency(calculateMonthlyPayment() * (loanTerms.duration / 30))}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms Agreement */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <p>Loan will be disbursed in USDC to your connected wallet</p>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <p>Fund units will be held as collateral in smart contract</p>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <p>All transactions are recorded on-chain for transparency</p>
            </div>
            <div className="flex items-start space-x-2">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <p>No prepayment penalties - repay early anytime</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4">
        <Button 
          variant="outline"
          onClick={() => navigate('/')}
          className="w-full sm:w-auto"
        >
          Cancel
        </Button>
        <Button 
          size="lg"
          onClick={() => navigate('/loan-confirmation')}
          className="w-full sm:w-auto"
        >
          <span className="hidden lg:inline">Accept Terms & Proceed to Smart Contract</span>
          <span className="lg:hidden">Accept Terms</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
