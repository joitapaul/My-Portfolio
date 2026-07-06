import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, AreaChart, CartesianGrid, XAxis, YAxis, Area } from "recharts";
import { dataScienceDashboard, githubAnalytics } from "../data";

const PIE_COLORS = ["#8b5cf6", "#a78bfa", "#64748b", "#10b981"];

export function DomainDistributionChart() {
  return (
    <div className="w-full h-64 bg-zinc-950/40 p-4 border border-zinc-900 rounded-xl">
      <h4 className="text-zinc-400 text-xs font-mono mb-4 text-left uppercase tracking-wider">Domain Allocation Matrix</h4>
      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dataScienceDashboard.categoryDistribution}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={3}
              dataKey="value"
            >
              {dataScienceDashboard.categoryDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: "#09090b", borderColor: "#18181b", borderRadius: "8px", fontSize: "11px" }}
              itemStyle={{ color: "#e4e4e7" }}
            />
            <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "10px", color: "#a1a1aa" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function SkillsRadarChart() {
  return (
    <div className="w-full h-64 bg-zinc-950/40 p-4 border border-zinc-900 rounded-xl">
      <h4 className="text-zinc-400 text-xs font-mono mb-4 text-left uppercase tracking-wider">ML Skills Vector Mapping</h4>
      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={dataScienceDashboard.skillsGrowth}>
            <PolarGrid stroke="#27272a" />
            <PolarAngleAxis dataKey="subject" stroke="#71717a" fontSize={10} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} stroke="#27272a" />
            <Radar
              name="Joita Paul"
              dataKey="A"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.25}
            />
            <Radar
              name="Standard Senior BS"
              dataKey="B"
              stroke="#64748b"
              fill="#94a3b8"
              fillOpacity={0.1}
            />
            <Legend iconSize={8} wrapperStyle={{ fontSize: "10px" }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#09090b", borderColor: "#18181b", borderRadius: "8px", fontSize: "11px" }}
              itemStyle={{ color: "#e4e4e7" }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function CommitActivityChart() {
  return (
    <div className="w-full h-64 bg-zinc-950/40 p-4 border border-zinc-900 rounded-xl md:col-span-2">
      <h4 className="text-zinc-400 text-xs font-mono mb-4 text-left uppercase tracking-wider">Commit Stream Analytics (Past 2 Quarters)</h4>
      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={githubAnalytics.commitActivity}>
            <defs>
              <linearGradient id="colorCommits" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#18181b" />
            <XAxis dataKey="month" stroke="#71717a" fontSize={10} tickLine={false} />
            <YAxis stroke="#71717a" fontSize={10} tickLine={false} />
            <Tooltip
              contentStyle={{ backgroundColor: "#09090b", borderColor: "#18181b", borderRadius: "8px", fontSize: "11px" }}
              itemStyle={{ color: "#e4e4e7" }}
            />
            <Area
              type="monotone"
              dataKey="commits"
              stroke="#8b5cf6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorCommits)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
