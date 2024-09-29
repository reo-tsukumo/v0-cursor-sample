'use client'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from "@/components/ui/button"
import { Upload, Loader2 } from "lucide-react"
import { setUploadedFileName, setExtractedText, setLoading, setError } from '../slice'
import { RootState } from '@/store'

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function UploadFileComponent() {
  const dispatch = useDispatch()
  const { isLoading, error, extractedText, uploadedFileName } = useSelector((state: RootState) => state.uploadFile)
  const [isDragging, setIsDragging] = useState(false)

  // ドラッグオーバー時の処理
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  // ドラッグリーブ時の処理
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  // ファイルドロップ時の処理
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  // ファイル選択時の処理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  // ファイルアップロード処理
  const handleFileUpload = async (file: File) => {
    console.log('File upload started:', file.name, 'Size:', file.size, 'Type:', file.type);
    
    if (file.size > MAX_FILE_SIZE) {
      console.warn('File size exceeds limit:', file.size);
      dispatch(setError('ファイルサイズが大きすぎます（最大10MB）'))
      return
    }
  
    if (file.type !== 'application/pdf') {
      console.warn('Invalid file type:', file.type);
      dispatch(setError('PDFファイルのみアップロード可能です'))
      return
    }
  
    dispatch(setLoading(true))
    dispatch(setUploadedFileName(file.name))
    try {
      const formData = new FormData()
      formData.append('file', file)
  
      console.log('Sending request to /api/extract-pdf');
      const response = await fetch('/api/extract-pdf', {
        method: 'POST',
        body: formData,
        cache: 'no-store',
      })
  
      console.log('Response received:', response.status, response.statusText);
      const contentType = response.headers.get("content-type");
      console.log('Content-Type:', contentType);

      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json()
        console.log('Response data:', data);
        if (!response.ok) {
          throw new Error(data.error || 'PDFの処理中にエラーが発生しました')
        }
        dispatch(setExtractedText(data.text))
        console.log('テキスト抽出完了:', file.name)
      } else {
        const text = await response.text();
        console.error('サーバーエラー:', text);
        throw new Error('サーバーエラーが発生しました。管理者に連絡してください。');
      }
    } catch (error) {
      console.error('PDFテキスト抽出エラー:', error)
      dispatch(setError(error instanceof Error ? error.message : 'PDFテキストの抽出中にエラーが発生しました。'))
    } finally {
      dispatch(setLoading(false))
    }
  }

  // ファイル選択ダイアログを開く処理
  const handleClick = () => {
    document.getElementById('file-upload')?.click();
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
            disabled={isLoading}
          />
          <div className="flex flex-col items-center">
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
          </div>
        </div>
        {error && (
          <p className="text-red-500 mt-2 text-center">{error}</p>
        )}
        
        {uploadedFileName && !isLoading && !error && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">アップロードされたファイル: {uploadedFileName}</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">抽出されたテキスト:</h3>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{extractedText}</p>
            </div>
          </div>
        )}
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