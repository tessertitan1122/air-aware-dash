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
      case 'good': return 'bg-air-good shadow-lg';
      case 'moderate': return 'bg-air-moderate shadow-lg';
      case 'unhealthy': return 'bg-air-unhealthy shadow-lg';
      default: return 'bg-muted';
    }
  };

  return (
    <Card className="w-full relative overflow-hidden bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-sm border-0 shadow-large">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-bold">
            ค่า PM2.5 ปัจจุบัน
          </CardTitle>
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-3 h-3 rounded-full transition-all duration-300",
              isConnected ? "bg-air-good shadow-glow animate-pulse" : "bg-muted"
            )} />
            <span className="text-sm font-medium text-muted-foreground">
              {isConnected ? "เชื่อมต่อ" : "ไม่เชื่อมต่อ"}
            </span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 relative z-10">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="text-6xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              {data.pm25}
            </div>
            <span className="text-xl font-medium ml-2 text-muted-foreground">μg/m³</span>
          </div>
          
          <Badge className={cn(
            "text-sm px-4 py-2 font-semibold shadow-medium transition-all duration-300",
            getStatusColor(data.status)
          )}>
            {getStatusText(data.status)}
          </Badge>
        </div>
        
        {/* Enhanced LED Display */}
        <div className="flex justify-center gap-8">
          <div className="flex flex-col items-center gap-2 group">
            <div className={cn(
              "w-6 h-6 rounded-full border-2 transition-all duration-300 group-hover:scale-110", 
              data.status === 'good' 
                ? `${getLEDColor('good')} border-air-good animate-pulse` 
                : "bg-muted/30 border-muted"
            )} />
            <span className="text-xs font-medium text-muted-foreground">ดี</span>
          </div>
          <div className="flex flex-col items-center gap-2 group">
            <div className={cn(
              "w-6 h-6 rounded-full border-2 transition-all duration-300 group-hover:scale-110", 
              data.status === 'moderate' 
                ? `${getLEDColor('moderate')} border-air-moderate animate-pulse` 
                : "bg-muted/30 border-muted"
            )} />
            <span className="text-xs font-medium text-muted-foreground">ปานกลาง</span>
          </div>
          <div className="flex flex-col items-center gap-2 group">
            <div className={cn(
              "w-6 h-6 rounded-full border-2 transition-all duration-300 group-hover:scale-110", 
              data.status === 'unhealthy' 
                ? `${getLEDColor('unhealthy')} border-air-unhealthy animate-pulse` 
                : "bg-muted/30 border-muted"
            )} />
            <span className="text-xs font-medium text-muted-foreground">ไม่ดี</span>
          </div>
        </div>

        <div className="text-center">
          <div className="text-sm text-muted-foreground font-medium">
            อัพเดทล่าสุด
          </div>
          <div className="text-sm text-foreground font-semibold">
            {new Date(data.timestamp).toLocaleString('th-TH')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};