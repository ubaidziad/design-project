import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { TrendingUp, CheckCircle2, DollarSign, PieChart, ArrowRight } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '@/lib/utils'

const navData = [
  { month: 'Jan', value: 950000 },
  { month: 'Feb', value: 980000 },
  { month: 'Mar', value: 1050000 },
  { month: 'Apr', value: 1100000 },
  { month: 'May', value: 1150000 },
  { month: 'Jun', value: 1200000 },
]

export default function Dashboard() {
  const navigate = useNavigate()

  const fundData = {
    name: 'Tyr Capital Fund I',
    nav: 1200000,
    eligibleToBorrow: 480000,
    ltvRatio: 40,
    loanHealth: 'Healthy',
    verified: true,
  }

  return (
    <div className="space-y-6 sm:space-y-8 lg:space-y-12 animate-fade-in">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 leading-none tracking-tight">LP Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
          View your fund holdings and borrowing capacity
        </p>
      </div>

      {/* Fund Overview Card */}
      <Card className="border-2 dark:border-border/40 hover:shadow-xl dark:hover:shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="text-2xl md:text-3xl lg:text-4xl mb-2 font-semibold">{fundData.name}</CardTitle>
              <div className="flex items-center space-x-2">
                {fundData.verified && (
                  <Badge variant="success" className="flex items-center space-x-1">
                    <CheckCircle2 className="h-3 w-3" />
                    <span>Verified by GP</span>
                  </Badge>
                )}
                <Badge variant="outline">Limited Partner</Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-2">Current NAV</p>
              <p className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                {formatCurrency(fundData.nav)}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* NAV Chart */}
            <div className="lg:col-span-2">
              <p className="text-sm font-medium mb-4">NAV Performance (6 Months)</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={navData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    style={{ fontSize: '12px' }}
                    tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => [formatCurrency(value), 'NAV']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-secondary/50 dark:bg-secondary/30 border border-border dark:border-border/50 hover:border-border/80 dark:hover:border-border/70 transition-all">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">6M Growth</p>
                </div>
                <p className="text-4xl font-semibold">+26.3%</p>
              </div>
              <div className="p-6 rounded-xl bg-secondary/50 dark:bg-secondary/30 border border-border dark:border-border/50 hover:border-border/80 dark:hover:border-border/70 transition-all">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <PieChart className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Max LTV</p>
                </div>
                <p className="text-4xl font-semibold">{fundData.ltvRatio}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Borrowing Capacity Card */}
      <Card className="border-2 border-primary/30 dark:border-primary/20 hover:shadow-xl dark:hover:shadow-lg hover:border-primary/50 dark:hover:border-primary/30">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Eligible to Borrow</p>
                  <p className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                    {formatCurrency(fundData.eligibleToBorrow)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground sm:ml-14">
                Based on {fundData.ltvRatio}% LTV ratio against your NAV of {formatCurrency(fundData.nav)}
              </p>
            </div>
            <Button 
              size="lg" 
              className="w-full sm:w-auto sm:ml-6"
              onClick={() => navigate('/loan-quote')}
            >
              Borrow Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loan Health Indicator - Tile Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6">
        <Card className="md:col-span-1 lg:col-span-2 xl:col-span-2 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Loan Health</p>
                <Badge variant="success" className="text-sm px-3 py-1">
                  {fundData.loanHealth}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">No active loans</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-1 lg:col-span-2 xl:col-span-2 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Available Collateral</p>
              <p className="text-2xl font-bold">{formatCurrency(fundData.nav)}</p>
              <p className="text-sm text-muted-foreground">Fund Units</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-4 xl:col-span-2 hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Next NAV Update</p>
              <p className="text-2xl font-bold">7 days</p>
              <p className="text-sm text-muted-foreground">Monthly reporting cycle</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
