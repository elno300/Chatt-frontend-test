import { useState } from "react"
import { format } from "date-fns"
import { MessageSquare, Send, Settings, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "./ui/sidebar"

type Message = {
  id: number
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  name: string
}

// User data
const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "/placeholder.svg?height=32&width=32",
}

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hej! Hur kan jag hjälpa dig idag?",
      sender: "assistant",
      timestamp: new Date(),
      name: "AI-assistent"
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return

    const newUserMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
      name: user.name,
    }

    setMessages((prevMessages) => [...prevMessages, newUserMessage])
    setInputMessage("")

    // Simulate assistant response
    setTimeout(() => {
      const assistantResponse: Message = {
        id: messages.length + 2,
        content: "Tack för ditt meddelande. Hur kan jag hjälpa dig vidare?",
        sender: "assistant",
        timestamp: new Date(),
        name: "AI-assistent",
      }
      setMessages((prevMessages) => [...prevMessages, assistantResponse])
    }, 1000)
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="flex items-center gap-3 px-3 py-2">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Chattar
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Settings className="mr-2 h-4 w-4" />
                    Inställningar
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Chattsupport</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Ny konversation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex h-[calc(100vh-4rem)] flex-col">
          <ScrollArea className="flex-1 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex max-w-[80%] items-start gap-3 rounded-lg p-4 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <Avatar className="h-8 w-8">
                    {message.sender === "user" ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : (
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Assistant" />
                    )}
                    <AvatarFallback>{message.sender === "user" ? "JD" : "AI"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="text-sm font-semibold">{message.name}</p>
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs text-muted-foreground mt-1">
                      {format(message.timestamp, 'HH:mm')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <div className="border-t p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex items-center gap-2"
            >
              <Input
                placeholder="Skriv ditt meddelande..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
                <span className="sr-only">Skicka meddelande</span>
              </Button>
            </form>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
