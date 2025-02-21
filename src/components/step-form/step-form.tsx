'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NameForm from "./name-form";
import { useState } from "react";
import AddressForm from "./address-form";
import TermsForms from "./terms-form";

const StepForm = () => {

  const [activeTab, setActiveTab] = useState("name");

  const goToNextTab = (tabName: string) => {
    setActiveTab(tabName);
  };


  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-3/4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="name">Name</TabsTrigger>
        <TabsTrigger value="address">Address</TabsTrigger>
        <TabsTrigger value="terms">Terms</TabsTrigger>
      </TabsList>

      <TabsContent value="name">
        <Card>
          <CardHeader>
            <CardTitle>Name</CardTitle>
            <CardDescription>Enter Personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <NameForm switchTab={goToNextTab} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="address">
        <Card>
          <CardHeader>
            <CardTitle>Address</CardTitle>
            <CardDescription>Enter Address details here</CardDescription>
          </CardHeader>
          <CardContent>
            <AddressForm switchTab={goToNextTab} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="terms">
        <Card>
          <CardHeader>
            <CardTitle>Terms</CardTitle>
            <CardDescription>Accept Terms and Conditions here</CardDescription>
          </CardHeader>
          <CardContent>
            <TermsForms switchTab={goToNextTab} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default StepForm;