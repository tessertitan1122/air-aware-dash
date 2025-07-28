import { Wifi, WifiOff } from 'lucide-react'
import { format } from 'date-fns'
import { th } from 'date-fns/locale'

interface ConnectionStatusProps {
  isConnected: boolean
  lastUpdate: Date
}

export default function ConnectionStatus({ isConnected, lastUpdate }: ConnectionStatusProps) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-lg ${
      isConnected ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
    }`}>
      <div className="flex items-center space-x-3">
        {isConnected ? (
          <Wifi className="h-5 w-5 text-green-600" />
        ) : (
          <WifiOff className="h-5 w-5 text-red-600" />
        )}
        <div>
          <p className={`font-medium ${isConnected ? 'text-green-800' : 'text-red-800'}`}>
            {isConnected ? 'เชื่อมต่อแล้ว' : 'ไม่ได้เชื่อมต่อ'}
          </p>
          <p className={`text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
            อัปเดตล่าสุด: {format(lastUpdate, 'HH:mm:ss', { locale: th })}
          </p>
        </div>
      </div>
      
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
        isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}>
        {isConnected ? 'ONLINE' : 'OFFLINE'}
      </div>
    </div>
  )
}