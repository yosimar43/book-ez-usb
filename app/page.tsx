"use client"

import { useState } from "react"
import {
  ArrowUpRight,
  Bell,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  Plus,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Dashboard() {
  const [progress, setProgress] = useState(68)

  return (
    <div className="flex flex-col p-6 space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bienvenido de vuelta, aquí tienes un resumen de tu actividad académica.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="mr-2 h-4 w-4" />
            Notificaciones
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Tarea
          </Button>
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tareas Pendientes</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 desde ayer</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Materias Activas</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Semestre en curso</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Próximos Eventos</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">En los próximos 7 días</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Progreso Semestral</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{progress}%</div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4">
          <CardHeader>
            <CardTitle>Tareas Próximas</CardTitle>
            <CardDescription>Gestiona tus tareas pendientes y fechas de entrega</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[320px] pr-4">
              <div className="space-y-4">
                {[
                  { title: "Informe de Laboratorio", subject: "Física II", dueDate: "Hoy", priority: "alta" },
                  { title: "Ejercicios de Derivadas", subject: "Cálculo III", dueDate: "Mañana", priority: "media" },
                  { title: "Proyecto Final", subject: "Programación Avanzada", dueDate: "3 días", priority: "alta" },
                  { title: "Resumen Capítulo 5", subject: "Física II", dueDate: "5 días", priority: "baja" },
                  {
                    title: "Presentación Grupal",
                    subject: "Ingeniería de Software",
                    dueDate: "1 semana",
                    priority: "media",
                  },
                ].map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">{task.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          task.priority === "alta" ? "destructive" : task.priority === "media" ? "default" : "outline"
                        }
                      >
                        {task.dueDate}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Añadir Nueva Tarea
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-full lg:col-span-3">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>Tu actividad en la plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="today">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="today">Hoy</TabsTrigger>
                <TabsTrigger value="week">Semana</TabsTrigger>
                <TabsTrigger value="month">Mes</TabsTrigger>
              </TabsList>
              <TabsContent value="today" className="space-y-4">
                <div className="flex flex-col space-y-4">
                  {[
                    { time: "09:15", action: "Completaste tarea", description: "Ejercicios de Álgebra" },
                    { time: "11:30", action: "Creaste nota", description: "Apuntes de Física II" },
                    { time: "13:45", action: "Añadiste evento", description: "Examen Parcial de Cálculo" },
                    { time: "16:20", action: "Actualizaste tarea", description: "Proyecto de Programación" },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 rounded-lg p-3 hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-full border">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="week" className="h-[320px] flex items-center justify-center text-muted-foreground">
                Resumen de actividad semanal
              </TabsContent>
              <TabsContent value="month" className="h-[320px] flex items-center justify-center text-muted-foreground">
                Resumen de actividad mensual
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Materias Destacadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Cálculo III", progress: 75, color: "bg-blue-500" },
                { name: "Física II", progress: 60, color: "bg-green-500" },
                { name: "Programación Avanzada", progress: 90, color: "bg-purple-500" },
              ].map((subject, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div
                    className={`h-8 w-8 rounded-full ${subject.color} flex items-center justify-center text-white font-bold`}
                  >
                    {subject.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{subject.name}</p>
                      <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2 mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" asChild>
              <a href="/subjects">
                Ver todas las materias
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Examen Parcial", date: "15 Mayo, 2024", time: "10:00 AM", type: "exam" },
                { title: "Entrega Proyecto", date: "20 Mayo, 2024", time: "23:59 PM", type: "deadline" },
                { title: "Taller de Programación", date: "22 Mayo, 2024", time: "14:00 PM", type: "workshop" },
              ].map((event, index) => (
                <div key={index} className="flex items-start gap-4 rounded-lg p-3 hover:bg-accent/50 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{event.title}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{event.date}</span>
                      <span className="mx-1">•</span>
                      <span>{event.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" asChild>
              <a href="/calendar">
                Ver calendario completo
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Notas Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Teoremas de Cálculo", subject: "Cálculo III", date: "Hace 2 días" },
                { title: "Leyes de Newton", subject: "Física II", date: "Hace 3 días" },
                { title: "Algoritmos de Ordenamiento", subject: "Programación Avanzada", date: "Hace 5 días" },
              ].map((note, index) => (
                <div key={index} className="flex items-start gap-4 rounded-lg p-3 hover:bg-accent/50 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{note.title}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{note.subject}</span>
                      <span className="mx-1">•</span>
                      <span>{note.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full" asChild>
              <a href="/notes">
                Ver todas las notas
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

