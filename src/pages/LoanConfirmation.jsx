import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Copy,
  Shield,
  Wallet,
  ArrowRight
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function LoanConfirmation() {
  const navigate = useNavigate()
  const [status, setStatus] = useState('processing') // processing, confirmed, disbursed
  const [copied, setCopied] = useState(false)

  const contractHash = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb1'
  const transactionHash = '0xa7d9ddbe1f17865597fdd3e74c4e97fc12f7f8c9'

  const loanDetails = {
    amount: 480000,
    apr: 8.5,
    duration: 180,
    collateral: 'Tyr Capital Fund I Units',
    disbursementTime: '24 hours',
  }

  useEffect(() => {
    // Simulate contract confirmation
    const timer1 = setTimeout(() => {
      setStatus('confirmed')
    }, 2000)

    const timer2 = setTimeout(() => {
      setStatus('disbursed')
    }, 4000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8 lg:space-y-12 animate-fade-in">
      {/* Page Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/10 mb-6">
          {status === 'processing' && (
            <Clock className="h-12 w-12 text-yellow-500 animate-pulse" />
          )}
          {status === 'confirmed' && (
            <Shield className="h-12 w-12 text-blue-500" />
          )}
          {status === 'disbursed' && (
            <CheckCircle2 className="h-12 w-12 text-green-500" />
          )}
        </div>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
          {status === 'processing' && 'Processing Loan...'}
          {status === 'confirmed' && 'Loan Confirmed!'}
          {status === 'disbursed' && 'Loan Approved!'}
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
          {status === 'processing' && 'Submitting your loan request to the blockchain'}
          {status === 'confirmed' && 'Your loan has been confirmed on-chain'}
          {status === 'disbursed' && 'Funds will be disbursed to your wallet shortly'}
        </p>
      </div>

      {/* Status Timeline */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-secondary">
              <div 
                className="h-full bg-primary transition-all duration-1000"
                style={{ 
                  width: status === 'processing' ? '0%' : status === 'confirmed' ? '50%' : '100%' 
                }}
              />
            </div>

            {/* Step 1 */}
            <div className="flex flex-col items-center space-y-2 relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                status !== 'processing' ? 'bg-primary' : 'bg-secondary'
              }`}>
                <CheckCircle2 className={`h-5 w-5 ${
                  status !== 'processing' ? 'text-white' : 'text-muted-foreground'
                }`} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Terms Accepted</p>
                <p className="text-xs text-muted-foreground">Complete</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center space-y-2 relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                status === 'confirmed' || status === 'disbursed' ? 'bg-primary' : 'bg-secondary'
              }`}>
                <Shield className={`h-5 w-5 ${
                  status === 'confirmed' || status === 'disbursed' ? 'text-white' : 'text-muted-foreground'
                }`} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Smart Contract</p>
                <p className="text-xs text-muted-foreground">
                  {status === 'processing' ? 'Pending' : 'Confirmed'}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center space-y-2 relative z-10">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                status === 'disbursed' ? 'bg-primary' : 'bg-secondary'
              }`}>
                <Wallet className={`h-5 w-5 ${
                  status === 'disbursed' ? 'text-white' : 'text-muted-foreground'
                }`} />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">Disbursement</p>
                <p className="text-xs text-muted-foreground">
                  {status === 'disbursed' ? 'Approved' : 'Pending'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Smart Contract Details */}
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>On-Chain Record</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Contract Address */}
          <div className="p-4 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground mb-2">Smart Contract Address</p>
            <div className="flex items-center justify-between">
              <code className="text-sm font-mono bg-background px-3 py-2 rounded border">
                {contractHash}
              </code>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(contractHash)}
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Transaction Hash */}
          {status !== 'processing' && (
            <div className="p-4 rounded-lg bg-secondary/50 animate-fade-in">
              <p className="text-sm text-muted-foreground mb-2">Transaction Hash</p>
              <div className="flex items-center justify-between">
                <code className="text-sm font-mono bg-background px-3 py-2 rounded border">
                  {transactionHash}
                </code>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(transactionHash)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Blockchain Badge */}
          <div className="flex items-center justify-center pt-2">
            <Badge variant="outline" className="flex items-center space-x-2 px-4 py-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Verified on Ethereum Mainnet</span>
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Loan Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Loan Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Loan Amount</p>
              <p className="text-2xl font-bold">{formatCurrency(loanDetails.amount)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Annual Rate</p>
              <p className="text-2xl font-bold">{loanDetails.apr}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Duration</p>
              <p className="text-2xl font-bold">{loanDetails.duration} days</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Collateral</p>
              <p className="text-lg font-bold">{loanDetails.collateral}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disbursement Info */}
      <Card className="border-2 border-green-500/20 bg-green-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Wallet className="h-6 w-6 text-green-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-2">Funds Disbursement</h3>
              <p className="text-muted-foreground mb-3">
                {formatCurrency(loanDetails.amount)} USDC will be sent to your connected wallet within{' '}
                <span className="font-semibold text-foreground">{loanDetails.disbursementTime}</span>
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Estimated arrival: {new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <div className="flex justify-center pt-4">
        <Button 
          size="lg"
          onClick={() => navigate('/loan-management')}
          disabled={status === 'processing'}
        >
          Track Loan
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
