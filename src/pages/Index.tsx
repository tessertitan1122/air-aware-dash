import { useAirQualityData } from "@/hooks/useAirQualityData";
import { AirQualityCard } from "@/components/AirQualityCard";
import { StatusPanel } from "@/components/StatusPanel";

const Index = () => {
  const { currentData, isConnected } = useAirQualityData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Hero Header */}
        <div className="text-center py-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-3xl blur-3xl -z-10" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
            ระบบติดตาม PM2.5
          </h1>
          <p className="text-xl text-muted-foreground font-medium">
            ติดตามคุณภาพอากาศแบบเรียลไทม์ด้วยเทคโนโลยี IoT
          </p>
          <div className="mt-6 flex justify-center">
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent rounded-full" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
        <div className="bg-gradient-to-br from-card via-card to-card/50 rounded-2xl border-0 shadow-large p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="relative z-10">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-6">
              กราฟแนวโน้ม PM2.5
            </h2>
            <div className="h-64 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-4xl">📊</div>
                <p className="text-muted-foreground font-medium">
                  กราฟแสดงแนวโน้มจะปรากฏที่นี่
                </p>
                <div className="flex justify-center">
                  <div className="h-0.5 w-16 bg-gradient-to-r from-primary to-accent rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
