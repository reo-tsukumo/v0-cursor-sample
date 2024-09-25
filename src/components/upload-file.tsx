'use client'

import { useState } from 'react'
import { Upload, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export function UploadFileComponent() {
  const [isLoading, setIsLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      await handleFileUpload(event.target.files[0])
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      await handleFileUpload(event.dataTransfer.files[0])
    }
  }

  const handleFileUpload = async (file: File) => {
    setIsLoading(true)
    // Simulate file upload process
    await new Promise(resolve => setTimeout(resolve, 3000))
    // Here you would typically handle the actual file upload
    console.log('File uploaded:', file.name)
    setIsLoading(false)
  }

  return (
    <div className={`min-h-screen bg-white flex flex-col items-center justify-center p-4 ${inter.className}`}>
      <h1 className="text-3xl font-bold mb-2 text-center text-gray-800 tracking-tight">AIスマートプランナー</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">PDFをアップロードして、AIがあなたの計画を最適化します。</p>
      
      <div className="w-full max-w-2xl">
        <div 
          className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-in-out ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf"
            disabled={isLoading}
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
            {isLoading ? (
              <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            ) : (
              <Upload className="h-10 w-10 text-gray-400 mb-4" />
            )}
            <p className="text-lg font-semibold text-gray-700 text-center mb-2">
              {isLoading ? 'アップロード中...' : 'PDFファイルをドラッグ＆ドロップ'}
            </p>
            {!isLoading && (
              <p className="text-sm text-gray-500 text-center">
                または、クリックしてファイルを選択
              </p>
            )}
          </label>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button variant="outline" className="text-gray-700 hover:bg-gray-100">
          サンプルPDFを見る
        </Button>
        <Button variant="outline" className="text-gray-700 hover:bg-gray-100">
          使い方を学ぶ
        </Button>
        <Button variant="outline" className="text-gray-700 hover:bg-gray-100">
          プランの例を見る
        </Button>
      </div>
    </div>
  )
}