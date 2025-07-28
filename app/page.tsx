'use client'

import { useState, useEffect } from 'react'
import { Activity, Wifi, WifiOff, Settings, BarChart3, Home } from 'lucide-react'
import Link from 'next/link'
import PMDisplay from './components/PMDisplay'
import StatusLED from './components/StatusLED'
import ConnectionStatus from './components/ConnectionStatus'

export default function HomePage() {
  const [pm25Value, setPm25Value] = useState<number>(0)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  // Simulate data updates (replace with actual Arduino connection later)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate PM2.5 readings
      const simulatedValue = Math.random() * 100
      setPm25Value(simulatedValue)
      setLastUpdate(new Date())
      setIsConnected(Math.random() > 0.1) // 90% connection rate
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getAirQualityStatus = (value: number) => {
    if (value < 35) return { status: 'ดี', color: 'green', description: 'คุณภาพอากาศดี' }
    if (value < 75) return { status: 'ปานกลาง', color: 'yellow', description: 'คุณภาพอากาศปานกลาง' }
    return { status: 'แย่', color: 'red', description: 'คุณภาพอากาศแย่' }
  }

  const airQuality = getAirQualityStatus(pm25Value)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <Activity className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">PM2.5 Monitor</h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 px-3 py-2 rounded-md bg-blue-100 text-blue-700">
                <Home className="h-4 w-4" />
                <span>หน้าหลัก</span>
              </Link>
              <Link href="/dashboard" className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
                <BarChart3 className="h-4 w-4" />
                <span>แดชบอร์ด</span>
              </Link>
              <Link href="/settings" className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100">
                <Settings className="h-4 w-4" />
                <span>ตั้งค่า</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Connection Status */}
        <div className="mb-8">
          <ConnectionStatus isConnected={isConnected} lastUpdate={lastUpdate} />
        </div>

        {/* Main Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* PM2.5 Display */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <PMDisplay value={pm25Value} status={airQuality} />
          </div>

          {/* Status Panel */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">สถานะระบบ</h2>
            
            <div className="space-y-6">
              {/* LED Status */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600">สถานะ LED:</span>
                <StatusLED color={airQuality.color} />
              </div>

              {/* Air Quality Level */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600">ระดับคุณภาพอากาศ:</span>
                <span className={`font-semibold ${
                  airQuality.color === 'green' ? 'text-green-600' :
                  airQuality.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {airQuality.status}
                </span>
              </div>

              {/* Description */}
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700">{airQuality.description}</p>
              </div>

              {/* Recommendations */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">คำแนะนำ:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  {airQuality.color === 'green' && (
                    <>
                      <li>• สามารถทำกิจกรรมกลางแจ้งได้ตามปกติ</li>
                      <li>• เหมาะสำหรับการออกกำลังกาย</li>
                    </>
                  )}
                  {airQuality.color === 'yellow' && (
                    <>
                      <li>• ควรระมัดระวังสำหรับผู้ที่มีปัญหาระบบหายใจ</li>
                      <li>• ลดกิจกรรมกลางแจ้งที่หนักหน่วง</li>
                    </>
                  )}
                  {airQuality.color === 'red' && (
                    <>
                      <li>• หลีกเลี่ยงกิจกรรมกลางแจ้ง</li>
                      <li>• สวมหน้ากากป้องกัน PM2.5</li>
                      <li>• ปิดหน้าต่างและใช้เครื่องฟอกอากาศ</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">ค่าเฉลี่ย 24 ชม.</p>
                <p className="text-2xl font-semibold text-gray-900">{(pm25Value * 0.8).toFixed(1)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">ค่าสูงสุดวันนี้</p>
                <p className="text-2xl font-semibold text-gray-900">{(pm25Value * 1.3).toFixed(1)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">ค่าต่ำสุดวันนี้</p>
                <p className="text-2xl font-semibold text-gray-900">{(pm25Value * 0.5).toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}