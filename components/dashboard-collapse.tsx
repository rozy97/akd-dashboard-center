"use client"

import { useState } from "react"
import { MenuIcon, XIcon } from 'lucide-react'

interface SidebarProps {
    children: React.ReactNode
}

export function CollapsibleSidebar({ children }: SidebarProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="lg:w-64 bg-background border-r">
            <div className="flex justify-between items-center p-4 lg:hidden">
                <h2 className="text-lg font-semibold">Mining Dashboard</h2>
                <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                    {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </button>
            </div>
            <div className={`${isOpen ? 'block' : 'hidden'} lg:block p-4`}>
                {children}
            </div>
        </div>
    )
}

