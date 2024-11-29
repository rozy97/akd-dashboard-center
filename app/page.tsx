"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CollapsibleSidebar } from "@/components/dashboard-collapse"

const productionData = [
  { month: "Jan", oreMining: 12, obRemoval: 15, quarry: 17 },
  { month: "Feb", oreMining: 15, obRemoval: 13, quarry: 22 },
  { month: "Mar", oreMining: 20, obRemoval: 12, quarry: 18 },
  { month: "Apr", oreMining: 15, obRemoval: 18, quarry: 12 },
  { month: "Mai", oreMining: 14, obRemoval: 22, quarry: 15 },
  { month: "Jun", oreMining: 18, obRemoval: 12, quarry: 20 },
]

const latestProduction = [
  { name: "Ore Mining", value: 80 },
  { name: "OB Removal", value: 82 },
  { name: "Quarry", value: 60 },
]

const fuelConsumption = [
  { name: "Excavator", value: 24.23 },
  { name: "Dump Truck", value: 40.79 },
  { name: "Breaker", value: 11.11 },
  { name: "Bulldozer", value: 16.5 },
  { name: "Light Vehicle", value: 6.37 },
]

const COLORS = ["#818cf8", "#e879f9", "#f472b6", "#4ade80", "#fbbf24"]

export default function Dashboard() {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-background">
      <CollapsibleSidebar>
        <nav className="space-y-6">
          <div>
            <h3 className="mb-2 text-sm font-medium">Production</h3>
            <div className="space-y-1">
              <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-muted">Ore Mining</button>
              <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-muted">OB Removal</button>
              <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-muted">Barging</button>
              <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-muted">Quarry</button>
            </div>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-medium">Vehicles</h3>
            <div className="space-y-1">
              <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-muted">Excavator</button>
              <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-muted">Dump Truck</button>
              <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-muted">Breaker</button>
              <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-muted">Light Vehicle</button>
              <button className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-muted">Bulldozer</button>
            </div>
          </div>
        </nav>
      </CollapsibleSidebar>

      <main className="flex-1 p-4 lg:p-8 overflow-auto" role="main">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Production Graphic</h1>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle id="production-trends">Production Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={productionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="oreMining" stroke="#8884d8" />
                    <Line type="monotone" dataKey="obRemoval" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="quarry" stroke="#ffc658" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle id="latest-production">Latest Production Report</CardTitle>
                <p className="text-sm text-muted-foreground">27 November 2024</p>
                <p className="text-xs text-muted-foreground">Shift II (18:00 - 06:00 WITA)</p>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={latestProduction}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle id="fuel-consumption">Latest Fuel Consumption Report</CardTitle>
                <p className="text-sm text-muted-foreground">28 November 2024</p>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={fuelConsumption}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name} (${value}L)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {fuelConsumption.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

