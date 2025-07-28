interface StatusLEDProps {
  color: 'green' | 'yellow' | 'red'
}

export default function StatusLED({ color }: StatusLEDProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className={`led-indicator ${
        color === 'green' ? 'led-green' :
        color === 'yellow' ? 'led-yellow' : 'led-red'
      }`}></div>
      <span className="text-sm text-gray-600">
        {color === 'green' ? 'เขียว (ดี)' :
         color === 'yellow' ? 'เหลือง (ปานกลาง)' : 'แดง (แย่)'}
      </span>
    </div>
  )
}