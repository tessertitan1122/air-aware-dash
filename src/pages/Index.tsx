import { useAirQualityData } from "@/hooks/useAirQualityData";
import { AirQualityCard } from "@/components/AirQualityCard";
import { StatusPanel } from "@/components/StatusPanel";

const Index = () => {
  const { currentData, isConnected } = useAirQualityData();

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ระบบติดตาม PM2.5
          </h1>
          <p className="text-muted-foreground">
            ติดตามคุณภาพอากาศแบบเรียลไทม์
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* PM2.5 Display - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <AirQualityCard data={currentData} isConnected={isConnected} />
          </div>

          {/* Status Panel - Takes 1 column */}
          <div>
            <StatusPanel data={currentData} isConnected={isConnected} />
          </div>
        </div>

        {/* Future Chart Area */}
        <div className="bg-card rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">กราฟแนวโน้ม PM2.5</h2>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            กราฟจะแสดงที่นี่ (ยังไม่ได้ใส่)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
