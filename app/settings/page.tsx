"use client"

import { useState } from "react"
import { Bell, Globe, Moon, Palette, Save, Sun, User } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    browser: true,
    mobile: false,
    deadlines: true,
    grades: true,
    events: true,
  })

  return (
    <div className="flex flex-col h-full">
      <header className="border-b p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
          <p className="text-muted-foreground">Personaliza tu experiencia en la plataforma</p>
        </div>
      </header>

      <div className="flex-1 p-6">
        <Tabs defaultValue="profile" className="h-full">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-64 flex-shrink-0">
              <TabsList className="flex flex-col items-start h-auto p-0 bg-transparent space-y-1">
                <TabsTrigger value="profile" className="w-full justify-start px-3 data-[state=active]:bg-accent">
                  <User className="mr-2 h-4 w-4" />
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="appearance" className="w-full justify-start px-3 data-[state=active]:bg-accent">
                  <Palette className="mr-2 h-4 w-4" />
                  Apariencia
                </TabsTrigger>
                <TabsTrigger value="notifications" className="w-full justify-start px-3 data-[state=active]:bg-accent">
                  <Bell className="mr-2 h-4 w-4" />
                  Notificaciones
                </TabsTrigger>
                <TabsTrigger value="language" className="w-full justify-start px-3 data-[state=active]:bg-accent">
                  <Globe className="mr-2 h-4 w-4" />
                  Idioma
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1">
              <TabsContent value="profile" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Perfil</CardTitle>
                    <CardDescription>Actualiza tu información personal y académica</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col items-center space-y-2">
                        <Avatar className="h-24 w-24">
                          <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Avatar" />
                          <AvatarFallback>US</AvatarFallback>
                        </Avatar>
                        <Button variant="outline" size="sm">
                          Cambiar foto
                        </Button>
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input id="name" defaultValue="Usuario" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastname">Apellido</Label>
                            <Input id="lastname" defaultValue="Ejemplo" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">Correo electrónico</Label>
                          <Input id="email" type="email" defaultValue="usuario@email.com" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Información Académica</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="university">Universidad</Label>
                          <Input id="university" defaultValue="Universidad Ejemplo" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="career">Carrera</Label>
                          <Input id="career" defaultValue="Ingeniería" />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="semester">Semestre actual</Label>
                          <Select defaultValue="6">
                            <SelectTrigger id="semester">
                              <SelectValue placeholder="Selecciona un semestre" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((semester) => (
                                <SelectItem key={semester} value={semester.toString()}>
                                  Semestre {semester}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="student-id">Número de estudiante</Label>
                          <Input id="student-id" defaultValue="12345678" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Biografía</Label>
                        <Textarea
                          id="bio"
                          placeholder="Cuéntanos sobre ti..."
                          defaultValue="Estudiante de ingeniería apasionado por la tecnología y el aprendizaje continuo."
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Apariencia</CardTitle>
                    <CardDescription>Personaliza la apariencia de la plataforma</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label>Tema</Label>
                      <RadioGroup
                        defaultValue={theme}
                        onValueChange={(value) => setTheme(value)}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2"
                      >
                        <div>
                          <RadioGroupItem value="light" id="theme-light" className="sr-only peer" />
                          <Label
                            htmlFor="theme-light"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Sun className="mb-3 h-6 w-6" />
                            <span className="text-sm font-medium">Claro</span>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem value="dark" id="theme-dark" className="sr-only peer" />
                          <Label
                            htmlFor="theme-dark"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Moon className="mb-3 h-6 w-6" />
                            <span className="text-sm font-medium">Oscuro</span>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem value="system" id="theme-system" className="sr-only peer" />
                          <Label
                            htmlFor="theme-system"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="mb-3 h-6 w-6 flex items-center justify-center">
                              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            </div>
                            <span className="text-sm font-medium">Sistema</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Personalización</h3>

                      <div className="space-y-2">
                        <Label htmlFor="accent-color">Color de acento</Label>
                        <Select defaultValue="blue">
                          <SelectTrigger id="accent-color">
                            <SelectValue placeholder="Selecciona un color" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="blue">Azul</SelectItem>
                            <SelectItem value="green">Verde</SelectItem>
                            <SelectItem value="purple">Morado</SelectItem>
                            <SelectItem value="red">Rojo</SelectItem>
                            <SelectItem value="orange">Naranja</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="font-size">Tamaño de fuente</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger id="font-size">
                            <SelectValue placeholder="Selecciona un tamaño" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Pequeño</SelectItem>
                            <SelectItem value="medium">Mediano</SelectItem>
                            <SelectItem value="large">Grande</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="animations">Animaciones</Label>
                          <p className="text-sm text-muted-foreground">Habilitar animaciones en la interfaz</p>
                        </div>
                        <Switch id="animations" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Notificaciones</CardTitle>
                    <CardDescription>Configura cómo y cuándo quieres recibir notificaciones</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Canales de notificación</h3>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Correo electrónico</Label>
                          <p className="text-sm text-muted-foreground">Recibir notificaciones por correo electrónico</p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="browser-notifications">Navegador</Label>
                          <p className="text-sm text-muted-foreground">Recibir notificaciones en el navegador</p>
                        </div>
                        <Switch
                          id="browser-notifications"
                          checked={notifications.browser}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, browser: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="mobile-notifications">Móvil</Label>
                          <p className="text-sm text-muted-foreground">Recibir notificaciones en la aplicación móvil</p>
                        </div>
                        <Switch
                          id="mobile-notifications"
                          checked={notifications.mobile}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, mobile: checked })}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Tipos de notificaciones</h3>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="deadline-notifications">Fechas límite</Label>
                          <p className="text-sm text-muted-foreground">
                            Notificaciones sobre fechas de entrega próximas
                          </p>
                        </div>
                        <Switch
                          id="deadline-notifications"
                          checked={notifications.deadlines}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, deadlines: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="grade-notifications">Calificaciones</Label>
                          <p className="text-sm text-muted-foreground">Notificaciones sobre nuevas calificaciones</p>
                        </div>
                        <Switch
                          id="grade-notifications"
                          checked={notifications.grades}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, grades: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="event-notifications">Eventos</Label>
                          <p className="text-sm text-muted-foreground">Notificaciones sobre eventos próximos</p>
                        </div>
                        <Switch
                          id="event-notifications"
                          checked={notifications.events}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, events: checked })}
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="language" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Idioma</CardTitle>
                    <CardDescription>Configura el idioma de la plataforma</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Idioma de la plataforma</Label>
                      <Select defaultValue="es">
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Selecciona un idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="de">Deutsch</SelectItem>
                          <SelectItem value="pt">Português</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date-format">Formato de fecha</Label>
                      <Select defaultValue="dd-mm-yyyy">
                        <SelectTrigger id="date-format">
                          <SelectValue placeholder="Selecciona un formato" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dd-mm-yyyy">DD-MM-YYYY</SelectItem>
                          <SelectItem value="mm-dd-yyyy">MM-DD-YYYY</SelectItem>
                          <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time-format">Formato de hora</Label>
                      <Select defaultValue="24h">
                        <SelectTrigger id="time-format">
                          <SelectValue placeholder="Selecciona un formato" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="24h">24 horas</SelectItem>
                          <SelectItem value="12h">12 horas (AM/PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Guardar cambios
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

