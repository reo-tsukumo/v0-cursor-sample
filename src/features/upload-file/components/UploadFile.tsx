'use client'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { Upload, Loader2 } from "lucide-react"
import { setUploadedFileNames, setUploadedFileIds, setLoading, setError } from '../slice'

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function UploadFileComponent() {
  const dispatch = useDispatch()
  const router = useRouter()
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  // ドラッグオーバー時にisDraggingをtrueにする
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  // ドラッグリーブ時にisDraggingをfalseにする
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  // ドロップ時にhandleFileUploadを呼び出す
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(Array.from(files))
    }
  }

  // クリック時にファイル選択ダイアログを表示する
  const handleClick = () => {
    document.getElementById('file-upload')?.click();
  }

  // ダイアログでファイル選択時にhandleFileUploadを呼び出す
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(Array.from(files))
    }
  }

  // ファイルアップロード処理
  const handleFileUpload = async (files: File[]) => {
    const validFiles = files.filter(file => file.type === 'application/pdf' && file.size <= MAX_FILE_SIZE)
    
    if (validFiles.length === 0) {
      dispatch(setError('有効なPDFファイル（10MB以下）を選択してください。'))
      return
    }
  
    setIsUploading(true)
    dispatch(setLoading(true))
    dispatch(setUploadedFileNames(validFiles.map(file => file.name)))
  
    try {
      // ファイルを順次アップロード
      const uploadPromises = validFiles.map(async (file) => {
        const fileFormData = new FormData()
        fileFormData.append('file', file)
  
        const response = await fetch('/api/upload-file-dify', {
          method: 'POST',
          body: fileFormData,
        })
  
        if (!response.ok) {
          throw new Error('ファイルのアップロードに失敗しました')
        }
  
        return await response.json()
      })
  
      const uploadResults = await Promise.all(uploadPromises)
      console.log('アップロード結果:', uploadResults) // 追加
      
      // ファイルIDを保存
      const fileIds = uploadResults.map(result => result.id)
      dispatch(setUploadedFileIds(fileIds))
  
      // チャットページに遷移
      router.push('/chat')
    } catch (error) {
      console.error('ファイルアップロードエラー:', error)
      dispatch(setError('ファイルのアップロードに失敗しました。もう一度お試しください。'))
    } finally {
      setIsUploading(false)
      dispatch(setLoading(false))
    }
  }

  return (
    <div className={`min-h-screen bg-white flex flex-col items-center justify-center p-4`}>
      <h1 className="text-4xl font-bold mb-2 text-center text-gray-800 tracking-tight">AIスマートプランナー</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">オリエン資料をアップロードすると、AIが提案書の作成を支援します。</p>
      
      <div className="w-full max-w-2xl">
        <div 
          className={`border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-in-out ${isDragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept=".pdf"
            multiple
            disabled={isUploading}
          />
          <div className="flex flex-col items-center">
            {isUploading ? (
              <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            ) : (
              <Upload className="h-10 w-10 text-gray-400 mb-4" />
            )}
            <p className="text-lg font-semibold text-gray-700 text-center mb-2">
              {isUploading ? 'アップロード中...' : 'PDFファイルをドラッグ＆ドロップ'}
            </p>
            {!isUploading && (
              <p className="text-sm text-gray-500 text-center">
                または、クリックしてファイルを選択（複数可）
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}