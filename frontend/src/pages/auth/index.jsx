import CommonForm from "@/components/common-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signInFormControls, signUpFormControls } from "@/config";
import { AuthContext } from "@/context/auth-context/index";
import { GraduationCap } from "lucide-react";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const AuthPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("signin");

  const {
    signInFormData,
    setSignInFormData,
    signUpFormData,
    setSignUpFormData,
    handleRegisterUser,
    handleloginUser,
  } = useContext(AuthContext);

  const handleNavigate = () => {
    navigate("/");
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  const checkIfSignInFormValid = () => {
    return (
      signInFormData &&
      signInFormData.userEmail !== "" &&
      signInFormData.userPassword !== ""
    );
  };

  const checkIfSignUpFormValid = () => {
    return (
      signUpFormData &&
      signUpFormData.userName !== "" &&
      signUpFormData.userEmail !== "" &&
      signUpFormData.userPassword !== ""
    );
  };

  return (
    // CHANGED: Base background is neutral gray to let blobs pop
    <div className="flex flex-col min-h-screen bg-gray-100 relative overflow-hidden font-sans">
      
      {/* --- FIXED BACKGROUND BLOBS --- */}
      {/* Stronger colors (purple-500, blue-500), Higher Opacity (opacity-70), Larger Blur */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-70 animate-blob animation-delay-4000" />
      
      {/* Header */}
      <header className="px-6 lg:px-8 h-20 flex items-center justify-between relative z-20 bg-white/10 backdrop-blur-sm">
        <div
          onClick={handleNavigate}
          className="flex items-center gap-2 cursor-pointer text-slate-800 hover:text-purple-700 transition-colors"
        >
          <div className="p-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white shadow-lg">
            <GraduationCap className="h-6 w-6" />
          </div>
          <span className="font-bold text-xl tracking-tight">
            LMS Learn
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center p-4 relative z-10">
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full max-w-md"
        >
          <TabsList className="grid w-full grid-cols-2 h-14 rounded-full bg-white/30 backdrop-blur-md p-1 mb-8 border border-white/40 shadow-sm">
            <TabsTrigger
              value="signin"
              className="rounded-full text-base font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md h-full"
            >
              Sign In
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="rounded-full text-base font-medium transition-all data-[state=active]:bg-white data-[state=active]:text-purple-700 data-[state=active]:shadow-md h-full"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signin" className="animate-in fade-in zoom-in-95 duration-500">
            {/* CHANGED: Card is more transparent (bg-white/50) to show blobs behind it */}
            <Card className="border border-white/50 shadow-xl bg-white/50 backdrop-blur-xl rounded-[2rem] p-6">
              <CardHeader className="pb-6 text-center">
                <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-slate-600 text-base mt-2">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommonForm
                  formControls={signInFormControls}
                  buttonText={"Sign In"}
                  formData={signInFormData}
                  setFormData={setSignInFormData}
                  isButtonDisabled={!checkIfSignInFormValid()}
                  handleSubmit={handleloginUser}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signup" className="animate-in fade-in zoom-in-95 duration-500">
            <Card className="border border-white/50 shadow-xl bg-white/50 backdrop-blur-xl rounded-[2rem] p-6">
              <CardHeader className="pb-6 text-center">
                <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
                  Create Account
                </CardTitle>
                <CardDescription className="text-slate-600 text-base mt-2">
                  Fill in the details to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CommonForm
                  formControls={signUpFormControls}
                  buttonText={"Sign Up"}
                  formData={signUpFormData}
                  setFormData={setSignUpFormData}
                  isButtonDisabled={!checkIfSignUpFormValid()}
                  handleSubmit={handleRegisterUser}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthPage;