import { useState, useEffect } from 'react';

export interface AirQualityData {
  pm25: number;
  timestamp: string;
  status: 'good' | 'moderate' | 'unhealthy';
}

export const getAirQualityStatus = (pm25: number): 'good' | 'moderate' | 'unhealthy' => {
  if (pm25 < 35) return 'good';
  if (pm25 < 75) return 'moderate';
  return 'unhealthy';
};

export const getStatusText = (status: string): string => {
  switch (status) {
    case 'good': return 'ดี';
    case 'moderate': return 'ปานกลาง';
    case 'unhealthy': return 'ไม่ดี';
    default: return 'ไม่ทราบ';
  }
};

export const useAirQualityData = () => {
  const [currentData, setCurrentData] = useState<AirQualityData>({
    pm25: 0,
    timestamp: new Date().toISOString(),
    status: 'good'
  });

  const [historicalData, setHistoricalData] = useState<AirQualityData[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // จำลองข้อมูลจากเซ็นเซอร์
  useEffect(() => {
    const generateMockData = () => {
      const basePM25 = 25 + Math.random() * 50; // 25-75 ug/m3
      const pm25 = Math.max(0, basePM25 + (Math.random() - 0.5) * 10);
      
      const newData: AirQualityData = {
        pm25: Math.round(pm25 * 10) / 10,
        timestamp: new Date().toISOString(),
        status: getAirQualityStatus(pm25)
      };

      setCurrentData(newData);
      setHistoricalData(prev => {
        const updated = [...prev, newData];
        // เก็บข้อมูล 24 ชั่วโมงล่าสุด (1440 จุดข้อมูล ถ้าอัพเดททุกนาที)
        return updated.slice(-144); // เก็บ 144 จุด (2.4 ชั่วโมง)
      });
      
      setIsConnected(Math.random() > 0.1); // 90% เชื่อมต่อ
    };

    generateMockData();
    const interval = setInterval(generateMockData, 10000); // อัพเดททุก 10 วินาที

    return () => clearInterval(interval);
  }, []);

  return {
    currentData,
    historicalData,
    isConnected
  };
};