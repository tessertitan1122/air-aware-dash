'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { ArrowLeft, Download, Calendar, TrendingUp, TrendingDown } from 'lucide-react'
import Link from 'next/link'

interface DataPoint {
  time: string
  pm25: number
  timestamp: number
}

export default function DashboardPage() {
  const [data, setData] = useState<DataPoint[]>([])
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h' | '7d'>('6h')

  // Generate sample data
  useEffect(() => {
    const generateData = () => {
      const now = new Date()
      const points: DataPoint[] = []
      const intervals = {
        '1h': { count: 60, step: 1 * 60 * 1000 },
        '6h': { count: 72, step: 5 * 60 * 1000 },
        '24h': { count: 96, step: 15 * 60 * 1000 },
        '7d': { count: 168, step: 60 * 60 * 1000 }
      }

      const { count, step } = intervals[timeRange]

      for (let i = count; i >= 0; i--) {
        const timestamp = now.getTime() - (i * step)
        const date = new Date(timestamp)
        const baseValue = 30 + Math.sin(timestamp / (1000 * 60 * 60 * 6)) * 20
        const noise = (Math.random() - 0.5) * 10
        const pm25 = Math.max(0, baseValue + noise)

        points.push({
          time: timeRange === '7d' 
            ? date.toLocaleDateString('th-TH', { month: 'short', day: 'numeric' })
            : date.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
          pm25: Number(pm25.toFixed(1)),
          timestamp
        })
      }

      setData(points)
    }

    generateData()
    const interval = setInterval(generateData, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [timeRange])

  const currentValue = data[data.length - 1]?.pm25 || 0
  const previousValue = data[data.length - 2]?.pm25 || 0
  const trend = currentValue - previousValue
  const avgValue = data.length > 0 ? data.reduce((sum, point) => sum + point.pm25, 0) / data.length : 0
  const maxValue = data.length > 0 ? Math.max(...data.map(point => point.pm25)) : 0
  const minValue = data.length > 0 ? Math.min(...data.map(point => point.pm25)) : 0

  const getAirQualityColor = (value: number) => {
    if (value < 35) return '#22c55e'
    if (value < 75) return '#f59e0b'
    return '#ef4444'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
                <span>กลับหน้าหลัก</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">แดshboard</h1>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Download className="h-4 w-4" />
              <span>ดาวน์โหลดข้อมูล</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">ค่าปัจจุบัน</p>
                <p className="text-2xl font-bold" style={{ color: getAirQualityColor(currentValue) }}>
                  {currentValue.toFixed(1)}
                </p>
              </div>
              <div className={`flex items-center ${trend >= 0 ? 'text-red-500' : 'text-green-500'}`}>
                {trend >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span className="text-sm ml-1">{Math.abs(trend).toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">ค่าเฉลี่ย</p>
                <p className="text-2xl font-bold text-gray-900">{avgValue.toFixed(1)}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">ค่าสูงสุด</p>
                <p className="text-2xl font-bold text-red-600">{maxValue.toFixed(1)}</p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">ค่าต่ำสุด</p>
                <p className="text-2xl font-bold text-green-600">{minValue.toFixed(1)}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">กราฟแสดงค่า PM2.5</h2>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="1h">1 ชั่วโมง</option>
                <option value="6h">6 ชั่วโมง</option>
                <option value="24h">24 ชั่วโมง</option>
                <option value="7d">7 วัน</option>
              </select>
            </div>
          </div>

          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorPM25" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="time" 
                  stroke="#6b7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6b7280"
                  fontSize={12}
                  domain={[0, 'dataMax + 10']}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value: number) => [`${value.toFixed(1)} μg/m³`, 'PM2.5']}
                />
                <Area
                  type="monotone"
                  dataKey="pm25"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#colorPM25)"
                />
                {/* Reference lines */}
                <Line 
                  type="monotone" 
                  dataKey={() => 35} 
                  stroke="#22c55e" 
                  strokeDasharray="5 5" 
                  strokeWidth={1}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey={() => 75} 
                  stroke="#f59e0b" 
                  strokeDasharray="5 5" 
                  strokeWidth={1}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">ดี (&lt; 35)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-gray-600">ปานกลาง (35-75)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">แย่ (&gt; 75)</span>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">ข้อมูลล่าสุด</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    เวลา
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    PM2.5 (μg/m³)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    สถานะ
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.slice(-10).reverse().map((point, index) => {
                  const status = point.pm25 < 35 ? 'ดี' : point.pm25 < 75 ? 'ปานกลาง' : 'แย่'
                  const statusColor = point.pm25 < 35 ? 'text-green-600 bg-green-100' : 
                                    point.pm25 < 75 ? 'text-yellow-600 bg-yellow-100' : 'text-red-600 bg-red-100'
                  
                  return (
                    <tr key={index} className={index === 0 ? 'bg-blue-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {point.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {point.pm25}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
                          {status}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}