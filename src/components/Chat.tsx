'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SendIcon, FileTextIcon, UserIcon, BotIcon, ChevronLeftIcon, ChevronRightIcon, CopyIcon, DownloadIcon } from 'lucide-react'

type Message = {
  id: number
  content: string
  sender: 'user' | 'bot'
}

type GeneratedContent = {
  id: number
  title: string
  content: string
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [generatedContents, setGeneratedContents] = useState<GeneratedContent[]>([])
  const [currentVersionIndex, setCurrentVersionIndex] = useState(0)

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return

    const newMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      sender: 'user'
    }

    setMessages([...messages, newMessage])
    setInputMessage('')

    // Simulate bot response and content generation
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        content: "I've generated a new report based on your request.",
        sender: 'bot'
      }
      setMessages(prevMessages => [...prevMessages, botResponse])

      // Simulate generated content
      const newContent: GeneratedContent = {
        id: generatedContents.length + 1,
        title: `Generated Report ${generatedContents.length + 1}`,
        content: `This is the content of the generated report ${generatedContents.length + 1} based on the user's request. It includes detailed analysis and insights derived from the conversation. The report covers various aspects related to the topic and provides actionable recommendations.`
      }
      setGeneratedContents(prevContents => [...prevContents, newContent])
      setCurrentVersionIndex(generatedContents.length)
    }, 1000)
  }

  const handlePreviousVersion = () => {
    setCurrentVersionIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const handleNextVersion = () => {
    setCurrentVersionIndex((prev) => (prev < generatedContents.length - 1 ? prev + 1 : prev))
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex flex-col border-r">
        <ScrollArea className="flex-grow px-4 py-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`flex items-start max-w-[70%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar className="w-8 h-8">
                  {message.sender === 'user' ? (
                    <UserIcon className="w-5 h-5 text-gray-600" />
                  ) : (
                    <BotIcon className="w-5 h-5 text-blue-600" />
                  )}
                  <AvatarFallback>{message.sender === 'user' ? 'U' : 'B'}</AvatarFallback>
                </Avatar>
                <Card className={`mx-2 ${message.sender === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <CardContent className="p-3 text-sm">
                    <p>{message.content}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="flex items-center p-4 border-t">
          <Input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow mr-2"
          />
          <Button onClick={handleSendMessage} size="icon">
            <SendIcon className="w-4 h-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
      {generatedContents.length > 0 && (
        <div className="w-1/2 flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h1 className="text-xl font-semibold">{generatedContents[currentVersionIndex].title}</h1>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon">
                <CopyIcon className="h-4 w-4" />
                <span className="sr-only">Copy content</span>
              </Button>
              <Button variant="outline" size="icon">
                <DownloadIcon className="h-4 w-4" />
                <span className="sr-only">Download content</span>
              </Button>
            </div>
          </div>
          <ScrollArea className="flex-grow p-4">
            <div className="prose max-w-none">
              <p>{generatedContents[currentVersionIndex].content}</p>
            </div>
          </ScrollArea>
          <div className="flex items-center justify-between p-4 border-t">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePreviousVersion}
                disabled={currentVersionIndex === 0}
              >
                <ChevronLeftIcon className="h-4 w-4" />
                <span className="sr-only">Previous version</span>
              </Button>
              <span className="text-sm text-gray-500">
                Version {currentVersionIndex + 1} of {generatedContents.length}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextVersion}
                disabled={currentVersionIndex === generatedContents.length - 1}
              >
                <ChevronRightIcon className="h-4 w-4" />
                <span className="sr-only">Next version</span>
              </Button>
            </div>
            <Button variant="outline" size="sm">
              Publish
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}