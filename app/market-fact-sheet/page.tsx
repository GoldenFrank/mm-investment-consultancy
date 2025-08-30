"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  BarChart3,
  Percent,
  Building2,
  Globe,
  DollarSign,
  PiggyBank,
  Landmark,
  Crown,
  Star,
  MessageCircle,
} from "lucide-react"
import Link from "next/link"

interface MarketData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
}

interface TBillData {
  period: string
  rate: number
}

interface InflationData {
  month: string
  rate: number
  reason: string
}

interface ForexReserveData {
  amount: number
  currency: string
  lastUpdated: string
}

interface EquityIndex {
  name: string
  value: number
  change: number
  changePercent: number
  keyInfluencers: string[]
}

interface CurrencyRate {
  currency: string
  rate: number
  change: number
  changePercent: number
}

interface InterestRate {
  name: string
  rate: number
  lastChanged: string
}

interface TopCompany {
  rank: number
  name: string
  symbol: string
  price: number
  marketCap: string
  change: number
  changePercent: number
}

export default function MarketFactSheetPage() {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const tBillRates: TBillData[] = [
    { period: "91-Day", rate: 8.0 },
    { period: "182-Day", rate: 8.07 },
    { period: "364-Day", rate: 9.57 },
  ]

  const inflationData: InflationData[] = [
    {
      month: "June 2025",
      rate: 3.8,
      reason: "Driven by increased food prices due to seasonal factors and higher fuel costs affecting transportation.",
    },
    {
      month: "July 2025",
      rate: 4.1,
      reason:
        "Rise attributed to housing costs, utility price adjustments, and continued pressure from food inflation.",
    },
  ]

  const forexReserves: ForexReserveData = {
    amount: 7.8,
    currency: "USD Billion",
    lastUpdated: "August 2025",
  }

  const kenyaEquityIndices: EquityIndex[] = [
    {
      name: "NSE 25",
      value: 3847.32,
      change: 45.67,
      changePercent: 1.2,
      keyInfluencers: ["Safaricom", "Equity Bank", "KCB Group"],
    },
    {
      name: "NASI",
      value: 156.78,
      change: -2.34,
      changePercent: -1.47,
      keyInfluencers: ["EABL", "BAT Kenya", "Bamburi Cement"],
    },
    {
      name: "NSE 10",
      value: 2156.45,
      change: 18.92,
      changePercent: 0.89,
      keyInfluencers: ["Co-operative Bank", "Diamond Trust Bank", "Standard Chartered"],
    },
    {
      name: "NSE 20",
      value: 1847.32,
      change: 8.45,
      changePercent: 0.46,
      keyInfluencers: ["Safaricom", "Equity Bank", "KCB Group"],
    },
  ]

  const currencyRates: CurrencyRate[] = [
    { currency: "USD/KES", rate: 157.25, change: -0.85, changePercent: -0.54 },
    { currency: "GBP/KES", rate: 198.45, change: 1.23, changePercent: 0.62 },
    { currency: "EUR/KES", rate: 171.89, change: -0.67, changePercent: -0.39 },
  ]

  const interestRates: InterestRate[] = [
    { name: "Central Bank Rate (CBR)", rate: 10.5, lastChanged: "July 2025" },
    { name: "Interbank Rate", rate: 11.2, lastChanged: "August 2025" },
  ]

  const topCompanies: TopCompany[] = [
    {
      rank: 1,
      name: "Safaricom PLC",
      symbol: "SCOM",
      price: 28.5,
      marketCap: "1.14T",
      change: 0.75,
      changePercent: 2.7,
    },
    {
      rank: 2,
      name: "Equity Group Holdings",
      symbol: "EQTY",
      price: 45.25,
      marketCap: "172.1B",
      change: -0.5,
      changePercent: -1.1,
    },
    {
      rank: 3,
      name: "KCB Group PLC",
      symbol: "KCB",
      price: 38.75,
      marketCap: "156.8B",
      change: 1.25,
      changePercent: 3.3,
    },
    {
      rank: 4,
      name: "Co-operative Bank",
      symbol: "COOP",
      price: 12.8,
      marketCap: "102.4B",
      change: 0.3,
      changePercent: 2.4,
    },
    {
      rank: 5,
      name: "ABSA Bank Kenya",
      symbol: "ABSA",
      price: 11.45,
      marketCap: "42.3B",
      change: -0.15,
      changePercent: -1.3,
    },
    { rank: 6, name: "EABL", symbol: "EABL", price: 145.0, marketCap: "108.7B", change: 2.5, changePercent: 1.8 },
    {
      rank: 7,
      name: "Standard Chartered",
      symbol: "SCBK",
      price: 158.5,
      marketCap: "59.2B",
      change: -1.75,
      changePercent: -1.1,
    },
    {
      rank: 8,
      name: "Diamond Trust Bank",
      symbol: "DTB",
      price: 67.25,
      marketCap: "26.8B",
      change: 0.85,
      changePercent: 1.3,
    },
    { rank: 9, name: "BAT Kenya", symbol: "BAT", price: 425.0, marketCap: "21.2B", change: -5.0, changePercent: -1.2 },
    {
      rank: 10,
      name: "Bamburi Cement",
      symbol: "BAMB",
      price: 18.75,
      marketCap: "18.9B",
      change: 0.45,
      changePercent: 2.5,
    },
  ]

  // Mock data for global indices
  const mockMarketData: MarketData[] = [
    {
      symbol: "^GSPC",
      name: "S&P 500",
      price: 4756.5,
      change: 23.45,
      changePercent: 0.49,
    },
    {
      symbol: "^IXIC",
      name: "NASDAQ",
      price: 14845.73,
      change: -45.67,
      changePercent: -0.31,
    },
    {
      symbol: "^DJI",
      name: "Dow Jones",
      price: 37689.54,
      change: 156.87,
      changePercent: 0.42,
    },
    {
      symbol: "^FTSE",
      name: "FTSE 100",
      price: 7456.32,
      change: 34.21,
      changePercent: 0.46,
    },
    {
      symbol: "^NSE20",
      name: "NSE 20 Index",
      price: 1847.32,
      change: 8.45,
      changePercent: 0.46,
    },
  ]

  const fetchMarketData = async () => {
    setLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setMarketData(mockMarketData)
      setLastUpdated(new Date())
    } catch (error) {
      console.error("Error fetching market data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMarketData()
  }, [])

  const formatPrice = (price: number, symbol: string) => {
    if (symbol.includes("KES")) {
      return `KES ${price.toFixed(2)}`
    }
    if (symbol.includes("GC=F")) {
      return `$${price.toFixed(2)}`
    }
    return price.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  const formatChange = (change: number, changePercent: number) => {
    const sign = change >= 0 ? "+" : ""
    return `${sign}${change.toFixed(2)} (${sign}${changePercent.toFixed(2)}%)`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-amber-50/20">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-amber-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Crown className="h-12 w-12 text-amber-300 mr-4" />
              <h1 className="font-bold text-4xl md:text-5xl">MM Investment Market Intelligence</h1>
            </div>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
              Actionable insights, tailored for investors.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Button
                onClick={fetchMarketData}
                disabled={loading}
                className="bg-white text-emerald-900 hover:bg-amber-50 font-semibold px-6 py-3"
              >
                {loading ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Data
                  </>
                )}
              </Button>
              <span className="text-emerald-200 text-sm">Last updated: {lastUpdated.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
        {/* Treasury Bills Section */}
        <section>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-emerald-600 mr-3" />
              <h2 className="text-3xl font-bold text-slate-800">Kenya Treasury Bills</h2>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Current T-Bill rates for short-term government securities
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {tBillRates.map((tbill, index) => (
              <Card
                key={tbill.period}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-lg hover:shadow-emerald-200/50"
              >
                <CardHeader className="text-center pb-3">
                  <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {tbill.period}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <Percent className="h-8 w-8 text-emerald-600" />
                  </div>
                  <p className="text-4xl font-bold text-emerald-600 mb-2">{tbill.rate}%</p>
                  <p className="text-sm text-slate-600">Annual Rate</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Enhanced Inflation Section */}
        <section>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="h-8 w-8 text-emerald-600 mr-3" />
              <h2 className="text-3xl font-bold text-slate-800">Kenya Inflation Analysis</h2>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto">Latest consumer price index trends with market insights</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {inflationData.map((inflation, index) => (
              <Card
                key={inflation.month}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-lg hover:shadow-amber-200/50"
              >
                <CardHeader className="text-center pb-3">
                  <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                    {inflation.month}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="bg-gradient-to-br from-amber-50 to-emerald-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Percent className="h-6 w-6 text-amber-600" />
                  </div>
                  <p className="text-3xl font-bold text-amber-600 mb-2">{inflation.rate}%</p>
                  <p className="text-sm text-slate-600 mb-4">Year-over-Year</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{inflation.reason}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Foreign Exchange Reserves */}
        <section>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <PiggyBank className="h-8 w-8 text-emerald-600 mr-3" />
              <h2 className="text-3xl font-bold text-slate-800">Foreign Exchange Reserves</h2>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto">Central Bank of Kenya reserves position</p>
          </div>
          <div className="max-w-md mx-auto">
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-lg hover:shadow-emerald-200/50">
              <CardHeader className="text-center pb-3">
                <CardTitle className="text-xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                  CBK Reserves
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-emerald-600" />
                </div>
                <p className="text-4xl font-bold text-emerald-600 mb-2">${forexReserves.amount}B</p>
                <p className="text-sm text-slate-600">As of {forexReserves.lastUpdated}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Kenyan Equity Indices */}
        <section>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <BarChart3 className="h-8 w-8 text-emerald-600 mr-3" />
              <h2 className="text-3xl font-bold text-slate-800">Kenyan Equity Indices</h2>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto">Performance of major Nairobi Securities Exchange indices</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kenyaEquityIndices.map((index, idx) => (
              <Card
                key={index.name}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-lg hover:shadow-amber-200/50"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                      {index.name}
                    </CardTitle>
                    <div
                      className={`p-2 rounded-full ${
                        index.change >= 0 ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {index.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Index Value</p>
                      <p className="text-2xl font-bold text-slate-900">{index.value.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Daily Change</p>
                      <p className={`text-lg font-semibold ${index.change >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {formatChange(index.change, index.changePercent)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-2">Key Influencers</p>
                      <div className="flex flex-wrap gap-1">
                        {index.keyInfluencers.map((stock, stockIdx) => (
                          <span key={stockIdx} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                            {stock}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Foreign Currency Exchange Rates */}
        <section>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Globe className="h-8 w-8 text-emerald-600 mr-3" />
              <h2 className="text-3xl font-bold text-slate-800">Foreign Currency Exchange Rates</h2>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto">Live exchange rates against the Kenyan Shilling</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {currencyRates.map((currency, index) => (
              <Card
                key={currency.currency}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-lg hover:shadow-emerald-200/50"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                      {currency.currency}
                    </CardTitle>
                    <div
                      className={`p-2 rounded-full ${
                        currency.change >= 0 ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {currency.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Exchange Rate</p>
                      <p className="text-2xl font-bold text-slate-900">{currency.rate.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Daily Change</p>
                      <p
                        className={`text-lg font-semibold ${currency.change >= 0 ? "text-emerald-600" : "text-red-600"}`}
                      >
                        {formatChange(currency.change, currency.changePercent)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Central Bank and Interbank Rates */}
        <section>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Landmark className="h-8 w-8 text-emerald-600 mr-3" />
              <h2 className="text-3xl font-bold text-slate-800">Key Interest Rates</h2>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto">Central Bank Rate and Interbank lending rates</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {interestRates.map((rate, index) => (
              <Card
                key={rate.name}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-lg hover:shadow-amber-200/50"
              >
                <CardHeader className="text-center pb-3">
                  <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-amber-700 transition-colors">
                    {rate.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="bg-gradient-to-br from-amber-50 to-emerald-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Percent className="h-6 w-6 text-amber-600" />
                  </div>
                  <p className="text-3xl font-bold text-amber-600 mb-2">{rate.rate}%</p>
                  <p className="text-sm text-slate-600">Last changed: {rate.lastChanged}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Global Indices Snapshot */}
        <section>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Globe className="h-8 w-8 text-emerald-600 mr-3" />
              <h2 className="text-3xl font-bold text-slate-800">Global Indices Snapshot</h2>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto">Real-time performance of major global markets</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketData.map((asset, index) => (
              <Card
                key={asset.symbol}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 bg-white border-0 shadow-lg hover:shadow-emerald-200/50"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                      {asset.name}
                    </CardTitle>
                    <div
                      className={`p-2 rounded-full ${
                        asset.change >= 0 ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {asset.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 font-medium">{asset.symbol}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Current Price</p>
                      <p className="text-2xl font-bold text-slate-900">{formatPrice(asset.price, asset.symbol)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">Daily Change</p>
                      <p className={`text-lg font-semibold ${asset.change >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {formatChange(asset.change, asset.changePercent)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Top 10 NSE Companies Table */}
        <section>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Star className="h-8 w-8 text-amber-600 mr-3" />
              <h2 className="text-3xl font-bold text-slate-800">Top 10 NSE 20 Share Index Companies</h2>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Leading companies by market capitalization on the Nairobi Securities Exchange
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-emerald-600 to-amber-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Company</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Symbol</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">Price (KES)</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">Market Cap</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold">Change (%)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {topCompanies.map((company, index) => (
                    <tr key={company.rank} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">#{company.rank}</td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{company.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-mono">{company.symbol}</td>
                      <td className="px-6 py-4 text-sm text-slate-900 text-right font-medium">
                        {company.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 text-right">{company.marketCap}</td>
                      <td
                        className={`px-6 py-4 text-sm text-right font-medium ${
                          company.changePercent >= 0 ? "text-emerald-600" : "text-red-600"
                        }`}
                      >
                        {company.changePercent >= 0 ? "+" : ""}
                        {company.changePercent.toFixed(1)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {loading && (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 animate-spin text-emerald-600 mx-auto mb-4" />
              <p className="text-slate-600">Loading market data...</p>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-16 bg-gradient-to-r from-slate-800 to-emerald-900 text-white rounded-2xl p-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Investment Disclaimer</h3>
            <p className="text-slate-300 leading-relaxed max-w-4xl mx-auto">
              The information provided is for educational and informational purposes only. Market data is subject to
              change and may be delayed. Past performance does not guarantee future results. Please consult with MM
              Investment Management for personalized investment advice tailored to your financial goals and risk
              tolerance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6">
              <Link href="/#book-consultation">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3">
                  Schedule a Consultation
                </Button>
              </Link>
              <Button
                onClick={() => {
                  const message = encodeURIComponent(
                    "Hello MM Investment Management, I'm interested in your investment consultancy services. I found your Market Intelligence dashboard very informative and would like to discuss investment opportunities.",
                  )
                  window.open(`https://wa.me/254721369509?text=${message}`, "_blank")
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
