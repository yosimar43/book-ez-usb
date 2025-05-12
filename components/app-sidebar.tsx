"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Calendar,
  ChevronDown,
  FileText,
  Home,
  Layers,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react"
import { useTheme } from "next-themes"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function AppSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { toggleSidebar } = useSidebar()

  const mainMenuItems = [
    { title: "Inicio", icon: Home, path: "/" },
    { title: "Editor de Apuntes", icon: FileText, path: "/notes" },
    { title: "Calendario", icon: Calendar, path: "/calendar" },
    { title: "Materias", icon: BookOpen, path: "/subjects" },
    { title: "Configuración", icon: Settings, path: "/settings" },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <Layers className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">Book-Ez</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
          <ChevronDown className="h-4 w-4" />
        </Button>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={pathname === item.path} tooltip={item.title}>
                    <Link href={item.path}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2" />

        <SidebarGroup>
          <SidebarGroupLabel>Materias Recientes</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {["Cálculo III", "Física II", "Programación Avanzada"].map((subject) => (
                <SidebarMenuItem key={subject}>
                  <SidebarMenuButton asChild>
                    <Link href={`/subjects/${subject.toLowerCase().replace(/\s+/g, "-")}`}>
                      <BookOpen className="h-5 w-5" />
                      <span>{subject}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Usuario" />
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Usuario</span>
              <span className="text-xs text-muted-foreground">usuario@email.com</span>
            </div>
          </div>

          <div className="flex gap-1">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

