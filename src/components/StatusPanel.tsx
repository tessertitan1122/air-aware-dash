import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AirQualityData } from "@/hooks/useAirQualityData";

interface StatusPanelProps {
  data: AirQualityData;
  isConnected: boolean;
}

export const StatusPanel = ({ data, isConnected }: StatusPanelProps) => {
  const getHealthAdvice = (status: string) => {
    switch (status) {
      case 'good':
        return "คุณภาพอากาศดี เหมาะสำหรับกิจกรรมกลางแจ้ง";
      case 'moderate':
        return "คุณภาพอากาศปานกลาง ผู้ที่มีปัญหาระบบหายใจควรระวัง";
      case 'unhealthy':
        return "คุณภาพอากาศไม่ดี ควรหลีกเลี่ยงกิจกรรมกลางแจ้ง";
      default:
        return "ไม่สามารถประเมินคุณภาพอากาศได้";
    }
  };

  const getDeviceStatus = () => {
    if (!isConnected) return { text: "ไม่เชื่อมต่อ", variant: "destructive" as const };
    return { text: "ทำงานปกติ", variant: "secondary" as const };
  };

  const deviceStatus = getDeviceStatus();

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">สถานะอุปกรณ์</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">การเชื่อมต่อ:</span>
            <Badge variant={deviceStatus.variant}>{deviceStatus.text}</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">คำแนะนำสุขภาพ</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {getHealthAdvice(data.status)}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">ข้อมูลสรุป</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">ค่าปัจจุบัน:</span>
            <span className="font-medium">{data.pm25} μg/m³</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">มาตรฐาน WHO:</span>
            <span className="font-medium">15 μg/m³</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">มาตรฐานไทย:</span>
            <span className="font-medium">37.5 μg/m³</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};