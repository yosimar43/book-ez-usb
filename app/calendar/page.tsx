"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Clock, Filter, Plus } from "lucide-react"
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from "date-fns"
import { es } from "date-fns/locale"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState("week")

  // Eventos de ejemplo
  const events = [
    {
      id: 1,
      title: "Examen Parcial",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 2),
      time: "10:00 - 12:00",
      subject: "Cálculo III",
      type: "exam",
    },
    {
      id: 2,
      title: "Entrega Proyecto",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1),
      time: "23:59",
      subject: "Programación Avanzada",
      type: "deadline",
    },
    {
      id: 3,
      title: "Taller de Programación",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 3),
      time: "14:00 - 16:00",
      subject: "Programación Avanzada",
      type: "workshop",
    },
    {
      id: 4,
      title: "Clase de Laboratorio",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()),
      time: "08:00 - 10:00",
      subject: "Física II",
      type: "class",
    },
    {
      id: 5,
      title: "Reunión de Grupo",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 4),
      time: "16:00 - 17:30",
      subject: "Ingeniería de Software",
      type: "meeting",
    },
  ]

  // Obtener los días de la semana actual
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 })
  const endOfCurrentWeek = endOfWeek(currentDate, { weekStartsOn: 1 })
  const daysOfWeek = eachDayOfInterval({
    start: startOfCurrentWeek,
    end: endOfCurrentWeek,
  })

  // Función para navegar entre semanas
  const navigateWeek = (direction: number) => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + direction * 7)
    setCurrentDate(newDate)
  }

  // Función para obtener eventos de un día específico
  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(event.date, day))
  }

  // Función para obtener el color según el tipo de evento
  const getEventColor = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
      case "deadline":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
      case "workshop":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "class":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "meeting":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="flex flex-col h-full">
      <header className="border-b p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendario</h1>
            <p className="text-muted-foreground">Gestiona tus eventos académicos y plazos</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Evento
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigateWeek(-1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="font-medium">
              {format(startOfCurrentWeek, "d MMM", { locale: es })} -{" "}
              {format(endOfCurrentWeek, "d MMM yyyy", { locale: es })}
            </div>
            <Button variant="outline" size="icon" onClick={() => navigateWeek(1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" onClick={() => setCurrentDate(new Date())}>
              Hoy
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Select value={view} onValueChange={setView}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Vista" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Día</SelectItem>
                <SelectItem value="week">Semana</SelectItem>
                <SelectItem value="month">Mes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        <div className="grid grid-cols-7 gap-4 mb-4">
          {daysOfWeek.map((day, index) => (
            <div
              key={index}
              className={`text-center p-2 rounded-lg ${
                isSameDay(day, new Date()) ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              }`}
            >
              <div className="text-xs uppercase font-medium mb-1">{format(day, "EEE", { locale: es })}</div>
              <div className="text-2xl font-bold">{format(day, "d")}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4 h-[calc(100vh-320px)]">
          {daysOfWeek.map((day, index) => (
            <Card key={index} className="h-full overflow-hidden">
              <CardHeader className="p-3">
                <CardTitle className="text-sm font-medium">{format(day, "EEEE d", { locale: es })}</CardTitle>
                <CardDescription className="text-xs">{getEventsForDay(day).length} eventos</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100%-60px)]">
                  <div className="px-3 pb-3 space-y-2">
                    {getEventsForDay(day).map((event) => (
                      <div key={event.id} className={`p-2 rounded-md text-sm ${getEventColor(event.type)}`}>
                        <div className="font-medium">{event.title}</div>
                        <div className="flex items-center text-xs mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {event.time}
                        </div>
                        <div className="text-xs mt-1">{event.subject}</div>
                      </div>
                    ))}
                    {getEventsForDay(day).length === 0 && (
                      <div className="flex items-center justify-center h-20 text-sm text-muted-foreground">
                        Sin eventos
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
            Exámenes
          </Badge>
          <Badge variant="outline" className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300">
            Entregas
          </Badge>
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            Talleres
          </Badge>
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            Clases
          </Badge>
          <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
            Reuniones
          </Badge>
        </div>
      </div>
    </div>
  )
}

