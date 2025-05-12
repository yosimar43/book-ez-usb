"use client"

import { useState } from "react"
import { BookOpen, FileText, FolderOpen, MoreHorizontal, Plus, Search, Share2, Star, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const notes = [
    {
      id: 1,
      title: "Teoremas de Cálculo",
      subject: "Cálculo III",
      lastEdited: "Hace 2 días",
      starred: true,
      content: "Teorema fundamental del cálculo, teorema del valor medio...",
    },
    {
      id: 2,
      title: "Leyes de Newton",
      subject: "Física II",
      lastEdited: "Hace 3 días",
      starred: false,
      content: "Primera ley: Un objeto permanece en reposo o en movimiento uniforme...",
    },
    {
      id: 3,
      title: "Algoritmos de Ordenamiento",
      subject: "Programación Avanzada",
      lastEdited: "Hace 5 días",
      starred: true,
      content: "Bubble sort, quick sort, merge sort...",
    },
    {
      id: 4,
      title: "Ecuaciones Diferenciales",
      subject: "Cálculo III",
      lastEdited: "Hace 1 semana",
      starred: false,
      content: "Ecuaciones de primer orden, ecuaciones lineales...",
    },
    {
      id: 5,
      title: "Circuitos Eléctricos",
      subject: "Física II",
      lastEdited: "Hace 2 semanas",
      starred: false,
      content: "Ley de Ohm, leyes de Kirchhoff...",
    },
  ]

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full">
      <header className="border-b p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Editor de Apuntes</h1>
            <p className="text-muted-foreground">Organiza y edita tus apuntes de clase</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <FolderOpen className="mr-2 h-4 w-4" />
              Carpetas
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nueva Nota
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-6 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar notas..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filtrar por materia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las materias</SelectItem>
              <SelectItem value="calculo">Cálculo III</SelectItem>
              <SelectItem value="fisica">Física II</SelectItem>
              <SelectItem value="programacion">Programación Avanzada</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="flex-1 p-6">
        <Tabs defaultValue="all" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="recent">Recientes</TabsTrigger>
            <TabsTrigger value="starred">Destacadas</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="flex-1">
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredNotes.map((note) => (
                  <Card key={note.id} className="overflow-hidden">
                    <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                      <div>
                        <CardTitle className="text-lg">{note.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <BookOpen className="mr-1 h-3 w-3" />
                          {note.subject}
                        </CardDescription>
                      </div>
                      <div className="flex items-center">
                        {note.starred && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                          </Button>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Star className="mr-2 h-4 w-4" />
                              <span>{note.starred ? "Quitar de destacados" : "Destacar"}</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share2 className="mr-2 h-4 w-4" />
                              <span>Compartir</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Eliminar</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="line-clamp-3 text-sm text-muted-foreground">{note.content}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{note.lastEdited}</span>
                      <Badge variant="outline" className="text-xs">
                        <FileText className="mr-1 h-3 w-3" />
                        Nota
                      </Badge>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="recent" className="flex-1">
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredNotes
                  .sort((a, b) => {
                    // Ordenar por fecha de edición (simulado)
                    return a.lastEdited.localeCompare(b.lastEdited)
                  })
                  .map((note) => (
                    <Card key={note.id} className="overflow-hidden">
                      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                        <div>
                          <CardTitle className="text-lg">{note.title}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <BookOpen className="mr-1 h-3 w-3" />
                            {note.subject}
                          </CardDescription>
                        </div>
                        <div className="flex items-center">
                          {note.starred && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-yellow-500">
                              <Star className="h-4 w-4 fill-current" />
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Star className="mr-2 h-4 w-4" />
                                <span>{note.starred ? "Quitar de destacados" : "Destacar"}</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                <span>Compartir</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Eliminar</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="line-clamp-3 text-sm text-muted-foreground">{note.content}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{note.lastEdited}</span>
                        <Badge variant="outline" className="text-xs">
                          <FileText className="mr-1 h-3 w-3" />
                          Nota
                        </Badge>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="starred" className="flex-1">
            <ScrollArea className="h-[calc(100vh-280px)]">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredNotes
                  .filter((note) => note.starred)
                  .map((note) => (
                    <Card key={note.id} className="overflow-hidden">
                      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
                        <div>
                          <CardTitle className="text-lg">{note.title}</CardTitle>
                          <CardDescription className="flex items-center mt-1">
                            <BookOpen className="mr-1 h-3 w-3" />
                            {note.subject}
                          </CardDescription>
                        </div>
                        <div className="flex items-center">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Star className="mr-2 h-4 w-4" />
                                <span>Quitar de destacados</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Share2 className="mr-2 h-4 w-4" />
                                <span>Compartir</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Eliminar</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <p className="line-clamp-3 text-sm text-muted-foreground">{note.content}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{note.lastEdited}</span>
                        <Badge variant="outline" className="text-xs">
                          <FileText className="mr-1 h-3 w-3" />
                          Nota
                        </Badge>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

