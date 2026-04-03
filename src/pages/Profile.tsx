import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Profile() {
  const tabs = [
    { value: "details", label: "Profile Details" },
    { value: "billing", label: "Billing Information" },
    { value: "security", label: "Sign in and Security" },
    { value: "accounts", label: "Connected Accounts" },
    { value: "seller", label: "Seller Details" },
    { value: "accessibility", label: "Accessibility Requirements" },
    { value: "promos", label: "Gift Cards and Promo Codes" }
  ];

  return (
    <div className="container mx-auto px-4 py-12 flex-1">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Account Settings</h1>
        <p className="text-muted-foreground text-lg">Manage your profile, preferences, and security.</p>
      </div>

      <Tabs defaultValue="details" className="flex flex-col md:flex-row gap-8">
        <TabsList className="flex flex-col h-auto w-full md:w-64 bg-transparent shrink-0 space-y-1 p-0 items-stretch">
          {tabs.map((tab) => (
             <TabsTrigger 
                key={tab.value} 
                value={tab.value}
                className="justify-start px-4 py-3 h-auto text-left hover:bg-muted data-[state=active]:bg-muted data-[state=active]:shadow-none data-[state=active]:font-semibold"
             >
                {tab.label}
             </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex-1 max-w-3xl">
          <TabsContent value="details" className="mt-0 outline-none">
            <Card className="border-0 shadow-sm bg-card ring-1 ring-border">
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input defaultValue="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <Input type="email" defaultValue="john.doe@example.com" />
                </div>
                <div className="pt-4 border-t flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="mt-0 outline-none">
            <Card className="border-0 shadow-sm bg-card ring-1 ring-border">
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>Manage your payment methods and billing address.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">No payment methods added yet.</p>
                <Button variant="outline" className="mt-4">Add Payment Method</Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Other tabs can be stubs for now */}
          {tabs.slice(2).map(tab => (
             <TabsContent key={tab.value} value={tab.value} className="mt-0 outline-none">
                <Card className="border-0 shadow-sm bg-card ring-1 ring-border">
                  <CardHeader>
                    <CardTitle>{tab.label}</CardTitle>
                    <CardDescription>Manage settings regarding {tab.label.toLowerCase()}.</CardDescription>
                  </CardHeader>
                  <CardContent>
                     <p className="text-sm text-muted-foreground">This section is currently under construction.</p>
                  </CardContent>
                </Card>
             </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}
