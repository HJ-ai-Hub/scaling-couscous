"use client";

import {
  Users,
  Wallet,
  CalendarCheck,
  Clock,
  BarChart3,
  FileSpreadsheet,
  CheckCircle2,
  Clock3,
} from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatTile } from "./stat-tile";
import { MiniBarChart, Sparkline } from "./mini-charts";

const employees = [
  { name: "Nurul Ain binti Hassan", role: "Outlet Supervisor", pay: "RM 3,240", status: "Processed" },
  { name: "Marcus Tan Wei Jian", role: "Warehouse Lead", pay: "RM 3,980", status: "Processed" },
  { name: "Siti Balqis binti Rahman", role: "Line Operator", pay: "RM 2,610", status: "Processing" },
  { name: "Arjun A/L Kumaresan", role: "Security Supervisor", pay: "RM 2,890", status: "Processed" },
];

const attendance = [
  { name: "Nurul Ain binti Hassan", time: "8:58 AM", status: "On time" },
  { name: "Marcus Tan Wei Jian", time: "9:04 AM", status: "Late" },
  { name: "Siti Balqis binti Rahman", time: "8:47 AM", status: "On time" },
  { name: "Arjun A/L Kumaresan", time: "8:59 AM", status: "On time" },
];

export function PlatformDashboard() {
  return (
    <div id="dashboard-preview" className="scroll-mt-28 rounded-card border border-border bg-white p-4 shadow-lift sm:p-6">
      <div className="border-b border-border pb-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">GajiPay Dashboard</p>
        <p className="mt-1 font-brand text-xl font-semibold text-ink">Kedai Kopi Kayangan Sdn Bhd</p>
      </div>

      <div className="pt-5">
        <Tabs defaultValue="payroll">
          <TabsList className="flex-wrap justify-start">
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="leave">Leave</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="advance-pay">Advance Pay</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="payroll">
            <DashboardGrid>
              <StatTile label="Total payroll (June)" value="RM 214,600" trend="+2.1% vs May" trendDirection="up" icon={Wallet} />
              <StatTile label="EPF contribution" value="RM 27,910" icon={FileSpreadsheet} />
              <StatTile label="SOCSO + EIS" value="RM 6,238" icon={FileSpreadsheet} />
              <StatTile label="PCB / MTD" value="RM 11,402" icon={FileSpreadsheet} />
              <div className="col-span-full rounded-2xl border border-border bg-white shadow-soft">
                <ul className="divide-y divide-border">
                  {employees.map((employee) => (
                    <li key={employee.name} className="flex items-center justify-between gap-4 px-5 py-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-ink">{employee.name}</p>
                        <p className="text-xs text-ink-faint">{employee.role}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-ink">{employee.pay}</span>
                        <span
                          className={
                            employee.status === "Processed"
                              ? "rounded-pill bg-mint/30 px-3 py-1 text-xs font-semibold text-[#0f5c50]"
                              : "rounded-pill bg-blue/15 px-3 py-1 text-xs font-semibold text-blue-deep"
                          }
                        >
                          {employee.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </DashboardGrid>
          </TabsContent>

          <TabsContent value="employees">
            <DashboardGrid>
              <StatTile label="Active employees" value="248" trend="+4 this month" trendDirection="up" icon={Users} />
              <StatTile label="Departments" value="9" icon={Users} />
              <StatTile label="Avg. tenure" value="2.6 yrs" icon={Users} />
              <div className="col-span-full rounded-2xl border border-border bg-white p-5 shadow-soft">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">Headcount by department</p>
                <div className="mt-4">
                  <MiniBarChart values={[42, 38, 51, 29, 34, 22, 18]} />
                </div>
              </div>
            </DashboardGrid>
          </TabsContent>

          <TabsContent value="leave">
            <DashboardGrid>
              <StatTile label="Pending approvals" value="6" icon={CalendarCheck} />
              <StatTile label="On leave today" value="11" icon={CalendarCheck} />
              <StatTile label="Leave balance used" value="61%" icon={CalendarCheck} />
              <div className="col-span-full rounded-2xl border border-border bg-white shadow-soft">
                <ul className="divide-y divide-border">
                  {["Nurul Ain binti Hassan — Annual leave, 2 days", "Marcus Tan Wei Jian — Medical leave, 1 day", "Siti Balqis binti Rahman — Annual leave, 3 days"].map(
                    (item) => (
                      <li key={item} className="flex items-center justify-between px-5 py-4 text-sm text-ink">
                        <span>{item}</span>
                        <span className="rounded-pill bg-surface-alt px-3 py-1 text-xs font-semibold text-ink-soft">
                          Pending
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </DashboardGrid>
          </TabsContent>

          <TabsContent value="attendance">
            <DashboardGrid>
              <StatTile label="Checked in" value="231 / 248" icon={Clock} />
              <StatTile label="Late arrivals" value="7" icon={Clock3} />
              <StatTile label="Attendance rate" value="98.4%" trend="+0.6% vs last week" trendDirection="up" icon={CheckCircle2} />
              <div className="col-span-full rounded-2xl border border-border bg-white shadow-soft">
                <ul className="divide-y divide-border">
                  {attendance.map((entry) => (
                    <li key={entry.name} className="flex items-center justify-between px-5 py-4">
                      <span className="text-sm font-medium text-ink">{entry.name}</span>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-ink-faint">{entry.time}</span>
                        <span
                          className={
                            entry.status === "On time"
                              ? "rounded-pill bg-mint/30 px-3 py-1 text-xs font-semibold text-[#0f5c50]"
                              : "rounded-pill bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"
                          }
                        >
                          {entry.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </DashboardGrid>
          </TabsContent>

          <TabsContent value="advance-pay">
            <DashboardGrid>
              <StatTile label="Disbursed (June)" value="RM 18,420" trend="Capped to earned wages" trendDirection="neutral" icon={Wallet} />
              <StatTile label="Active users" value="86" trend="35% of eligible staff" trendDirection="up" icon={Users} />
              <StatTile label="Avg. per request" value="RM 214" icon={Wallet} />
              <div className="col-span-full rounded-2xl border border-border bg-white p-5 shadow-soft">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">Advance Pay utilisation</p>
                <Sparkline points={[4200, 6100, 5400, 8900, 11200, 14800, 18420]} color="#4361C9" />
              </div>
            </DashboardGrid>
          </TabsContent>

          <TabsContent value="analytics">
            <DashboardGrid>
              <StatTile label="Payroll cost / employee" value="RM 865" icon={BarChart3} />
              <StatTile label="Turnover (90 days)" value="4.2%" trend="-3.1pp with Advance Pay" trendDirection="up" icon={BarChart3} />
              <StatTile label="Statutory filings on time" value="100%" icon={BarChart3} />
              <div className="col-span-full rounded-2xl border border-border bg-white p-5 shadow-soft">
                <p className="text-xs font-medium uppercase tracking-wide text-ink-faint">Payroll cost, last 7 cycles</p>
                <div className="mt-4">
                  <MiniBarChart values={[58, 61, 60, 64, 66, 69, 71]} />
                </div>
              </div>
            </DashboardGrid>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function DashboardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">{children}</div>;
}
