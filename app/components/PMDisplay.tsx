interface PMDisplayProps {
  value: number
  status: {
    status: string
    color: string
    description: string
  }
}

export default function PMDisplay({ value, status }: PMDisplayProps) {
  return (
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">PM2.5</h2>
      
      {/* Main Value Display */}
      <div className="relative">
        <div className={`text-6xl font-bold mb-2 ${
          status.color === 'green' ? 'text-green-600' :
          status.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
        }`}>
          {value.toFixed(1)}
        </div>
        <div className="text-lg text-gray-500 mb-4">μg/m³</div>
      </div>

      {/* Status Indicator */}
      <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
        status.color === 'green' ? 'bg-green-100 text-green-800' :
        status.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
      }`}>
        <div className={`w-2 h-2 rounded-full mr-2 ${
          status.color === 'green' ? 'bg-green-500' :
          status.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
        }`}></div>
        {status.status}
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              status.color === 'green' ? 'bg-green-500' :
              status.color === 'yellow' ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min((value / 150) * 100, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0</span>
          <span>35</span>
          <span>75</span>
          <span>150+</span>
        </div>
      </div>
    </div>
  )
}