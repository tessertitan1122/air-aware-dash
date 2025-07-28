import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { AirQualityData, getStatusText } from "@/hooks/useAirQualityData";

interface AirQualityCardProps {
  data: AirQualityData;
  isConnected: boolean;
}

export const AirQualityCard = ({ data, isConnected }: AirQualityCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-air-good text-air-good-foreground';
      case 'moderate': return 'bg-air-moderate text-air-moderate-foreground';
      case 'unhealthy': return 'bg-air-unhealthy text-air-unhealthy-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getLEDColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-air-good';
      case 'moderate': return 'bg-air-moderate';
      case 'unhealthy': return 'bg-air-unhealthy';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">ค่า PM2.5 ปัจจุบัน</CardTitle>
          <div className="flex items-center gap-2">
            <div className={cn("w-3 h-3 rounded-full", isConnected ? "bg-air-good" : "bg-muted")} />
            <span className="text-sm text-muted-foreground">
              {isConnected ? "เชื่อมต่อ" : "ไม่เชื่อมต่อ"}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-foreground">
            {data.pm25}
            <span className="text-lg font-normal ml-1 text-muted-foreground">μg/m³</span>
          </div>
          <Badge className={cn("mt-2", getStatusColor(data.status))}>
            {getStatusText(data.status)}
          </Badge>
        </div>
        
        {/* จำลอง LED */}
        <div className="flex justify-center gap-4">
          <div className="flex flex-col items-center gap-1">
            <div className={cn(
              "w-4 h-4 rounded-full border-2", 
              data.status === 'good' ? getLEDColor('good') : "bg-muted border-muted"
            )} />
            <span className="text-xs text-muted-foreground">ดี</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className={cn(
              "w-4 h-4 rounded-full border-2", 
              data.status === 'moderate' ? getLEDColor('moderate') : "bg-muted border-muted"
            )} />
            <span className="text-xs text-muted-foreground">ปานกลาง</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className={cn(
              "w-4 h-4 rounded-full border-2", 
              data.status === 'unhealthy' ? getLEDColor('unhealthy') : "bg-muted border-muted"
            )} />
            <span className="text-xs text-muted-foreground">ไม่ดี</span>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          อัพเดทล่าสุด: {new Date(data.timestamp).toLocaleString('th-TH')}
        </div>
      </CardContent>
    </Card>
  );
};