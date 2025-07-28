import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AirQualityData } from "@/hooks/useAirQualityData";
import { cn } from "@/lib/utils";

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
    return { text: "ทำงานปกติ", variant: "default" as const };
  };

  const deviceStatus = getDeviceStatus();

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-br from-card to-card/80 border-0 shadow-medium">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            สถานะอุปกรณ์
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">การเชื่อมต่อ:</span>
            <Badge variant={deviceStatus.variant} className={cn(
              "font-semibold shadow-sm",
              isConnected && "bg-air-good text-air-good-foreground"
            )}>
              {deviceStatus.text}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-card/80 border-0 shadow-medium">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            คำแนะนำสุขภาพ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed font-medium">
            {getHealthAdvice(data.status)}
          </p>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-card/80 border-0 shadow-medium">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ข้อมูลสรุป
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">ค่าปัจจุบัน:</span>
            <span className="font-bold text-primary">{data.pm25} μg/m³</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">มาตรฐาน WHO:</span>
            <span className="font-semibold text-foreground">15 μg/m³</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">มาตรฐานไทย:</span>
            <span className="font-semibold text-foreground">37.5 μg/m³</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};