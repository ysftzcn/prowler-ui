import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Cell, Pie, PieChart } from "recharts";
import { reader } from "./lib/utils";

const colors = [
  {
    color: "#0891b2",
    status: "INFO",
  },
  {
    color: "#dc2626",
    status: "FAIL",
  },
  {
    color: "#22c55e",
    status: "PASS",
  },
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.4;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function App() {
  const [search, setSearch] = useState("");
  const [uploadedFile, setUploadedFile] = useState<any>();
  const [fileKeys, setFileKeys] = useState<any>();
  const [selectedKey, setSelectedKey] = useState("");

  const handleOnChange = (event: any) => {
    setSearch(event.target.value);
  };
  const handleOnKeySelect = (value: string) => {
    setSelectedKey(value);
  };

  const handleFileOnChange = (event: any) => {
    reader(event.target.files[0], (err: any, res: any) => {
      const data = JSON.parse(res);
      // TODO: daha sonra nested object kontrolu gerekiyor.
      setFileKeys(Object.keys(data[0]));
      setUploadedFile(data);
    });
  };

  return (
    <>
      <div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <Input type="file" onChange={handleFileOnChange} />
              {uploadedFile && (
                <Select onValueChange={handleOnKeySelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a key" />
                  </SelectTrigger>

                  <SelectContent>
                    {fileKeys &&
                      fileKeys.map((item: any) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              )}

              {uploadedFile && selectedKey && (
                <Input
                  type="text"
                  onChange={handleOnChange}
                  placeholder="Search"
                />
              )}

              {/* <Button>Download</Button> */}
            </div>
          </div>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {uploadedFile?.length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Subscriptions
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {uploadedFile && (
                        <PieChart width={200} height={200}>
                          <Pie
                            data={Object.entries(
                              uploadedFile.reduce((current: any, next: any) => {
                                const val = current[next.Status];
                                if (typeof val === "number")
                                  current[next.Status]++;
                                else current[next.Status] = 1;
                                return current;
                              }, {})
                            ).map(([key, value]) => ({ name: key, value }))}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={95}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {Object.entries(
                              uploadedFile.reduce((current: any, next: any) => {
                                const val = current[next.Status];
                                if (typeof val === "number")
                                  current[next.Status]++;
                                else current[next.Status] = 1;
                                return current;
                              }, {})
                            )
                              .map(([key, value]) => ({ name: key, value }))
                              .map((item, idx) => (
                                <Cell
                                  className="text-2xl"
                                  key={`cell-${idx}`}
                                  fill={
                                    colors.find(
                                      (color) => color.status === item.name
                                    )?.color
                                  }
                                />
                              ))}
                          </Pie>
                        </PieChart>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +180.1% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Sales</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <rect width="20" height="14" x="2" y="5" rx="2" />
                      <path d="M2 10h20" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Now
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
                <Card className="col-span-7">
                  <CardHeader>
                    <CardTitle>Results</CardTitle>
                    <div>
                      {uploadedFile &&
                        selectedKey &&
                        uploadedFile
                          .filter((item: any) => {
                            return item[selectedKey]
                              .toLowerCase()
                              .includes(search.toLowerCase());
                          })
                          .map((item: any, index: any) => (
                            <div key={index}>{item[selectedKey]}</div>
                          ))}
                    </div>
                  </CardHeader>
                  <CardContent className="pl-2">
                    {/* <Overview /> */}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default App;
