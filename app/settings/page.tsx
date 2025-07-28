'use client'

import { useState } from 'react'
import { ArrowLeft, Save, Wifi, Bell, Palette, Database } from 'lucide-react'
import Link from 'next/link'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Connection Settings
    serialPort: 'COM3',
    baudRate: 9600,
    autoConnect: true,
    
    // Alert Settings
    enableAlerts: true,
    moderateThreshold: 35,
    unhealthyThreshold: 75,
    alertSound: true,
    
    // Display Settings
    theme: 'light',
    language: 'th',
    updateInterval: 2000,
    
    // Data Settings
    dataRetention: 30,
    exportFormat: 'csv',
    autoBackup: false
  })

  const handleSave = () => {
    // Save settings to localStorage or send to backend
    localStorage.setItem('pm25-settings', JSON.stringify(settings))
    alert('บันทึกการตั้งค่าเรียบร้อยแล้ว')
  }

  const handleReset = () => {
    if (confirm('คุณต้องการรีเซ็ตการตั้งค่าทั้งหมดหรือไม่?')) {
      // Reset to default values
      setSettings({
        serialPort: 'COM3',
        baudRate: 9600,
        autoConnect: true,
        enableAlerts: true,
        moderateThreshold: 35,
        unhealthyThreshold: 75,
        alertSound: true,
        theme: 'light',
        language: 'th',
        updateInterval: 2000,
        dataRetention: 30,
        exportFormat: 'csv',
        autoBackup: false
      })
    }
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
              <h1 className="text-2xl font-bold text-gray-900">ตั้งค่า</h1>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                รีเซ็ต
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Save className="h-4 w-4" />
                <span>บันทึก</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Connection Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Wifi className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">การเชื่อมต่อ</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Serial Port
                </label>
                <select 
                  value={settings.serialPort}
                  onChange={(e) => setSettings({...settings, serialPort: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="COM1">COM1</option>
                  <option value="COM2">COM2</option>
                  <option value="COM3">COM3</option>
                  <option value="COM4">COM4</option>
                  <option value="/dev/ttyUSB0">/dev/ttyUSB0</option>
                  <option value="/dev/ttyACM0">/dev/ttyACM0</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Baud Rate
                </label>
                <select 
                  value={settings.baudRate}
                  onChange={(e) => setSettings({...settings, baudRate: Number(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={9600}>9600</option>
                  <option value={19200}>19200</option>
                  <option value={38400}>38400</option>
                  <option value={57600}>57600</option>
                  <option value={115200}>115200</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.autoConnect}
                    onChange={(e) => setSettings({...settings, autoConnect: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">เชื่อมต่ออัตโนมัติเมื่อเปิดแอป</span>
                </label>
              </div>
            </div>
          </div>

          {/* Alert Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="h-6 w-6 text-yellow-600" />
              <h2 className="text-xl font-semibold text-gray-800">การแจ้งเตือน</h2>
            </div>
            
            <div className="space-y-6">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.enableAlerts}
                  onChange={(e) => setSettings({...settings, enableAlerts: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">เปิดใช้งานการแจ้งเตือน</span>
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เกณฑ์ระดับปานกลาง (μg/m³)
                  </label>
                  <input
                    type="number"
                    value={settings.moderateThreshold}
                    onChange={(e) => setSettings({...settings, moderateThreshold: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เกณฑ์ระดับแย่ (μg/m³)
                  </label>
                  <input
                    type="number"
                    value={settings.unhealthyThreshold}
                    onChange={(e) => setSettings({...settings, unhealthyThreshold: Number(e.target.value)})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="0"
                    max="200"
                  />
                </div>
              </div>

              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={settings.alertSound}
                  onChange={(e) => setSettings({...settings, alertSound: e.target.checked})}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">เปิดเสียงแจ้งเตือน</span>
              </label>
            </div>
          </div>

          {/* Display Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Palette className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">การแสดงผล</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ธีม
                </label>
                <select 
                  value={settings.theme}
                  onChange={(e) => setSettings({...settings, theme: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="light">สว่าง</option>
                  <option value="dark">มืด</option>
                  <option value="auto">อัตโนมัติ</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ภาษา
                </label>
                <select 
                  value={settings.language}
                  onChange={(e) => setSettings({...settings, language: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="th">ไทย</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ความถี่ในการอัปเดต (มิลลิวินาที)
                </label>
                <select 
                  value={settings.updateInterval}
                  onChange={(e) => setSettings({...settings, updateInterval: Number(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1000}>1 วินาที</option>
                  <option value={2000}>2 วินาที</option>
                  <option value={5000}>5 วินาที</option>
                  <option value={10000}>10 วินาที</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data Settings */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Database className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">ข้อมูล</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เก็บข้อมูล (วัน)
                </label>
                <select 
                  value={settings.dataRetention}
                  onChange={(e) => setSettings({...settings, dataRetention: Number(e.target.value)})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={7}>7 วัน</option>
                  <option value={30}>30 วัน</option>
                  <option value={90}>90 วัน</option>
                  <option value={365}>1 ปี</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  รูปแบบการส่งออก
                </label>
                <select 
                  value={settings.exportFormat}
                  onChange={(e) => setSettings({...settings, exportFormat: e.target.value})}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                  <option value="xlsx">Excel</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={settings.autoBackup}
                    onChange={(e) => setSettings({...settings, autoBackup: e.target.checked})}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">สำรองข้อมูลอัตโนมัติ</span>
                </label>
              </div>
            </div>
          </div>

          {/* Device Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">ข้อมูลอุปกรณ์</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <span className="font-medium text-gray-700">เวอร์ชันแอป:</span>
                <span className="ml-2 text-gray-600">1.0.0</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">สถานะการเชื่อมต่อ:</span>
                <span className="ml-2 text-green-600">เชื่อมต่อแล้ว</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Arduino Model:</span>
                <span className="ml-2 text-gray-600">Arduino Uno</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Sensor Type:</span>
                <span className="ml-2 text-gray-600">PM2.5 Dust Sensor</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}