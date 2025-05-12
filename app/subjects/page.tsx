"use client"

import { Calendar, FileText, FolderOpen, MoreHorizontal, Plus, Search, Trash2, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SubjectsPage() {
  const subjects = [
    {
      id: 1,
      name: "Cálculo III",
      professor: "Dr. Martínez",
      schedule: "Lun, Mié, Vie 8:00 - 10:00",
      progress: 75,
      tasks: 8,
      notes: 12,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Física II",
      professor: "Dra. Rodríguez",
      schedule: "Mar, Jue 10:00 - 12:00",
      progress: 60,
      tasks: 5,
      notes: 8,
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Programación Avanzada",
      professor: "Ing. López",
      schedule: "Lun, Mié 14:00 - 16:00",
      progress: 90,
      tasks: 10,
      notes: 15,
      color: "bg-purple-500",
    },
    {
      id: 4,
      name: "Ingeniería de Software",
      professor: "Dr. García",
      schedule: "Mar, Jue 16:00 - 18:00",
      progress: 45,
      tasks: 6,
      notes: 7,
      color: "bg-red-500",
    },
    {
      id: 5,
      name: "Estadística",
      professor: "Dra. Sánchez",
      schedule: "Vie 14:00 - 18:00",
      progress: 30,
      tasks: 4,
      notes: 5,
      color: "bg-amber-500",
    },
  ]

  return (
    <div className="flex flex-col h-full">
      <header className="border-b p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Materias</h1>
            <p className="text-muted-foreground">Gestiona tus materias y su contenido</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <FolderOpen className="mr-2 h-4 w-4" />
              Semestres
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Materia
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar materias..." className="pl-8" />
          </div>
        </div>
      </header>

      <div className="flex-1 p-6">
        <Tabs defaultValue="grid" className="h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Semestre Actual</h2>
            <TabsList>
              <TabsTrigger value="grid">Cuadrícula</TabsTrigger>
              <TabsTrigger value="list">Lista</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="grid" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {subjects.map((subject) => (
                <Card key={subject.id} className="overflow-hidden">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center justify-between">
                      <div
                        className={`h-8 w-8 rounded-full ${subject.color} flex items-center justify-center text-white font-bold`}
                      >
                        {subject.name.charAt(0)}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            <span>Ver Notas</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Ver Eventos</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Eliminar</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardTitle className="mt-2">{subject.name}</CardTitle>
                    <CardDescription>{subject.professor}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progreso</span>
                      <span className="text-sm font-medium">{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} className="h-2" />

                    <div className="flex items-center justify-between mt-4 text-sm">
                      <div className="flex items-center">
                        <FileText className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{subject.notes} notas</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{subject.tasks} tareas</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="mr-1 h-3 w-3" />
                      {subject.schedule}
                    </Badge>
                  </CardFooter>
                </Card>
              ))}

              <Card className="flex flex-col items-center justify-center p-6 border-dashed">
                <div className="rounded-full bg-primary/10 p-3 mb-3">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-1">Añadir Materia</h3>
                <p className="text-sm text-muted-foreground text-center mb-3">
                  Agrega una nueva materia a tu semestre actual
                </p>
                <Button>Añadir Materia</Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="rounded-md border">
              <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                <div className="col-span-2">Materia</div>
                <div className="col-span-1">Profesor</div>
                <div className="col-span-1">Horario</div>
                <div className="col-span-1">Progreso</div>
                <div className="col-span-1 text-right">Acciones</div>
              </div>

              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="grid grid-cols-6 gap-4 p-4 items-center border-b hover:bg-accent/50 transition-colors"
                >
                  <div className="col-span-2 flex items-center gap-3">
                    <div
                      className={`h-8 w-8 rounded-full ${subject.color} flex items-center justify-center text-white font-bold`}
                    >
                      {subject.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{subject.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {subject.notes} notas, {subject.tasks} tareas
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1">{subject.professor}</div>
                  <div className="col-span-1 text-sm">{subject.schedule}</div>
                  <div className="col-span-1">
                    <div className="flex items-center gap-2">
                      <Progress value={subject.progress} className="h-2" />
                      <span className="text-sm">{subject.progress}%</span>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          <span>Ver Notas</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          <span>Ver Eventos</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Eliminar</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-6">Estadísticas Académicas</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Promedio General</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">4.2/5.0</div>
                <p className="text-xs text-muted-foreground">+0.3 desde el último semestre</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Materias Aprobadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">18/24</div>
                <p className="text-xs text-muted-foreground">75% del plan de estudios</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Créditos Acumulados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">96/120</div>
                <p className="text-xs text-muted-foreground">80% de los créditos totales</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Semestres Restantes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Estimado para graduación</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

