"use client"
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LayoutDashboard, MenuIcon, Shield, UserCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

function SideBar() {
    const MenuList = [
        {
            name: 'Dashboard',
            icon: LayoutDashboard,
            path: '/dashboard'
        },
        {
            name: 'Upgrade',
            icon: Shield,
            path: '/dashboard/ugrade'
        }
        ,
        {
            name: 'Profile',
            icon: UserCircle,
            path: '/dashboard/profile'
        }
    ]
    const path = usePathname();
    return (

        <div className='h-screen shadow-md p-5'>
            <div className='flex gap-2 items-center'>
                <Image src={'/logo.svg'} alt='logo' width={40} height={40} />
                <h2 className="font-bold text-lg">Easy Study</h2>
            </div>
            <div className='wt=10'>
                  
                  <Link href={'/create'} className="w-full">
                <Button className="w-full">+ create new</Button>
                </Link>
                <div className='mt-5'>
                    {MenuList.map((menu, index) => (
                        <div key={index}
                            className={`flex gap-5 items-center p-3
                        hover:bg-slate-200 rounded-lg cursor-pointer mt-3
                        ${path == menu.path && 'bg-slate-200'}`}>
                            <menu.icon />
                            <h2>{menu.name}</h2>
                        </div>
                    ))}
                </div>
            </div>

            <div  className='border p-3 bg-slate-100 rounded-lg
            absolute bottom-10 w-[85%]'>
                <h2 className='text-lg mb-2'> Available Credits:5 </h2>
                <Progress value={30} />
                <h2 className='text-sm'>1 out of 5 credits used</h2>
<Link href={'/dashboard/upgrade'} className='text-primary text-xs mt-3'>Upgrade to create more</Link>
            </div>
        </div>

    )
}

export default SideBar