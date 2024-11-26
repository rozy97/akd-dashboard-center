import type { Metadata } from "next";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FcGoogle } from "react-icons/fc"

import { JetBrains_Mono } from "next/font/google"

const jetBrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
    variable: "--font-jetbrainsMono"
})

export const metadata: Metadata = {
    title: "Login Page | AKD Dashboard Center",
    icons: "/favicon.png",
    description: "Welcome to AKD Dashboard Center. This Dashboard Optimized Reporting & Centralize Data for Mining Process",
    metadataBase: new URL('https://adisarana.id/login'),
    openGraph: {
        type: "website",
        url: "https://adisarana.id/login",
        title: "Login Page | AKD Dashboard Center",
        description: "Welcome to AKD Dashboard Center. This Dashboard Optimized Reporting & Centralize Data for Mining Process",
        siteName: "Dashboard Center",
        images: 'https://raw.githubusercontent.com/rozy97/akd-dashboard-center/refs/heads/main/public/capture-main.png'
    }
};

export default function LoginPage() {
    return (
        <div className={`${jetBrainsMono.variable} antialiased min-h-screen flex flex-col lg:flex-row`}>
            {/* Left Column */}
            <div className="bg-[#ebe4e4] p-8 flex flex-col h-[40vh] lg:h-auto lg:w-1/2">
                <div className="flex items-center gap-2">
                    <Image
                        src="/mountain.png"
                        alt="AKD Logo"
                        width={32}
                        height={32}
                        className="object-contain"
                    />
                    <span className="font-bold text-xl">AKD</span>
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <Image
                        src="/excavator.png"
                        alt="Excavator Icon"
                        width={200}
                        height={200}
                        className="object-contain max-h-full"
                    />
                </div>
            </div>

            {/* Right Column */}
            <div className="p-8 flex flex-col justify-center h-[60vh] lg:h-auto lg:w-1/2">
                <div className="bg-accent rounded-xl p-10 py-20 w-full max-w-md mx-auto space-y-6 lg:space-y-8">
                    <h1 className="text-2xl font-semibold text-center tracking-wider">
                        DASHBOARD CENTER
                    </h1>

                    <div className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Email"
                            className="h-12 bg-white border-gray-200"
                        />

                        <Input
                            type="password"
                            placeholder="Password"
                            className="h-12 bg-white border-gray-200"
                        />

                        <Button
                            className="w-full h-12 font-normal bg-blue-500 hover:bg-blue-600"
                        >
                            Login
                        </Button>

                        <div className="text-center text-gray-500">or</div>

                        <Button
                            variant="outline"
                            className="w-full h-12 font-normal border-gray-200"
                        >
                            <FcGoogle className="w-5 h-5 mr-2" />
                            Continue with Google
                        </Button>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="xl:bg-[#ebe4e4] p-4 text-center text-sm text-gray-600 lg:absolute lg:bottom-0 lg:left-0 lg:w-1/2">
                Copyright © 2024 PT. Adisarana Karya Delta
            </div>
        </div>
    )
}

