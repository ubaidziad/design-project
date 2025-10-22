import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Progress } from '@/components/ui/Progress'
import { 
  ArrowLeft,
  TrendingUp,
  Calendar,
  DollarSign,
  Shield,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Clock
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency, formatPercentage } from '@/lib/utils'

const repaymentSchedule = [
  { month: 'Month 1', principal: 75000, interest: 3400, total: 78400, status: 'upcoming' },
  { month: 'Month 2', principal: 75000, interest: 3400, total: 78400, status: 'upcoming' },
  { month: 'Month 3', principal: 75000, interest: 3400, total: 78400, status: 'upcoming' },
  { month: 'Month 4', principal: 75000, interest: 3400, total: 78400, status: 'upcoming' },
  { month: 'Month 5', principal: 75000, interest: 3400, total: 78400, status: 'upcoming' },
  { month: 'Month 6', principal: 105000, interest: 3400, total: 108400, status: 'upcoming' },
]

export default function LoanManagement() {
  const navigate = useNavigate()

  const loanData = {
    amount: 480000,
    outstanding: 480000,
    paid: 0,
    apr: 8.5,
    duration: 180,
    startDate: '2025-10-22',
    maturityDate: '2026-04-20',
    nextPayment: 78400,
    nextPaymentDate: '2025-11-22',
    collateral: 'Tyr Capital Fund I Units',
    collateralValue: 1200000,
    ltvRatio: 40,
    healthFactor: 2.5,
  }

  const totalToPay = repaymentSchedule.reduce((sum, item) => sum + item.total, 0)
  const repaymentProgress = (loanData.paid / totalToPay) * 100

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">Active Loan</h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Monitor your loan status and repayment schedule
          </p>
        </div>
        <Badge variant="success" className="text-base px-4 py-2 self-start sm:self-center">
          <CheckCircle2 className="h-4 w-4 mr-2" />
          Healthy
        </Badge>
      </div>

      {/* Loan Overview - Tile Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 lg:gap-6">
        <Card className="lg:col-span-2 xl:col-span-2 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Outstanding</p>
                <p className="text-xl lg:text-2xl font-bold mt-1">{formatCurrency(loanData.outstanding)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 xl:col-span-2 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-500/10 rounded-xl">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Paid</p>
                <p className="text-xl lg:text-2xl font-bold mt-1">{formatCurrency(loanData.paid)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 xl:col-span-2 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Next Payment</p>
                <p className="text-xl lg:text-2xl font-bold mt-1">{formatCurrency(loanData.nextPayment)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 xl:col-span-2 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <Shield className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Health Factor</p>
                <p className="text-xl lg:text-2xl font-bold mt-1">{loanData.healthFactor}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Repayment Progress */}
      <Card className="border-2 hover:shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Repayment Progress</CardTitle>
            <span className="text-sm text-muted-foreground">
              {formatPercentage(repaymentProgress)} Complete
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Progress value={loanData.paid} max={totalToPay} className="h-3" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Paid: {formatCurrency(loanData.paid)}
              </span>
              <span className="text-muted-foreground">
                Total: {formatCurrency(totalToPay)}
              </span>
            </div>
          </div>

          {/* Loan Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground mb-1">Start Date</p>
              <p className="font-semibold">{new Date(loanData.startDate).toLocaleDateString()}</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">Next Payment Due</p>
              <p className="font-semibold text-primary">
                {new Date(loanData.nextPaymentDate).toLocaleDateString()}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground mb-1">Maturity Date</p>
              <p className="font-semibold">{new Date(loanData.maturityDate).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Collateral Health */}
      <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent hover:shadow-xl hover:border-green-500/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-green-500" />
            <span>Collateral Health</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Collateral Type</p>
              <p className="text-lg font-semibold">{loanData.collateral}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current Value</p>
              <p className="text-2xl font-bold">{formatCurrency(loanData.collateralValue)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Current LTV</p>
              <p className="text-2xl font-bold text-green-500">{formatPercentage(loanData.ltvRatio)}</p>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-background border">
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Healthy Collateral Ratio</p>
                <p className="text-sm text-muted-foreground">
                  Your collateral value is {((loanData.collateralValue / loanData.outstanding) * 100).toFixed(0)}% of loan amount. 
                  No action required.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Repayment Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Repayment Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Chart */}
          <div className="mb-6">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={repaymentSchedule}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="month" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value) => formatCurrency(value)}
                />
                <Bar dataKey="principal" stackId="a" fill="hsl(var(--primary))" name="Principal" />
                <Bar dataKey="interest" stackId="a" fill="hsl(262 83% 75%)" name="Interest" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Schedule Table */}
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Period</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Principal</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Interest</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Total</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {repaymentSchedule.map((payment, index) => (
                  <tr key={index} className="border-b border-border hover:bg-secondary/50">
                    <td className="py-3 px-4 font-medium">{payment.month}</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(payment.principal)}</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(payment.interest)}</td>
                    <td className="py-3 px-4 text-right font-semibold">{formatCurrency(payment.total)}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {payment.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-border font-bold">
                  <td className="py-3 px-4">Total</td>
                  <td className="py-3 px-4 text-right">
                    {formatCurrency(repaymentSchedule.reduce((sum, p) => sum + p.principal, 0))}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {formatCurrency(repaymentSchedule.reduce((sum, p) => sum + p.interest, 0))}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {formatCurrency(totalToPay)}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Loan Details & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Loan Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Original Loan Amount</span>
              <span className="font-semibold">{formatCurrency(loanData.amount)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Annual Percentage Rate</span>
              <span className="font-semibold">{formatPercentage(loanData.apr)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Loan Duration</span>
              <span className="font-semibold">{loanData.duration} days</span>
            </div>
            <div className="flex items-center justify-between pt-2 border-t">
              <span className="text-muted-foreground">Smart Contract</span>
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              disabled
            >
              <DollarSign className="h-4 w-4 mr-2" />
              <span className="flex-1 text-left">Make Repayment</span>
              <Badge variant="secondary" className="ml-2">Soon</Badge>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ExternalLink className="h-4 w-4 mr-2" />
              <span>View on Etherscan</span>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Calendar className="h-4 w-4 mr-2" />
              <span>Download Schedule</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Info Banner */}
      <Card className="border-blue-500/20 bg-blue-500/5">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="font-medium mb-1">Payment Reminder</p>
              <p className="text-sm text-muted-foreground">
                Your next payment of {formatCurrency(loanData.nextPayment)} is due on{' '}
                {new Date(loanData.nextPaymentDate).toLocaleDateString()}. 
                Make sure to have sufficient USDC in your wallet.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
