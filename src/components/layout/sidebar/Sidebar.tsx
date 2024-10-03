'use client'

import { PlusIcon, HistoryIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useDispatch } from 'react-redux'
import { resetChat } from '@/features/chat/slice'
import { resetUploadFile } from '@/features/upload-file/slice'
import { useRouter } from 'next/navigation'

export function Sidebar() {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleNewChat = () => {
    dispatch(resetChat())
    dispatch(resetUploadFile())
    router.push('/upload-file')
  }

  return (
    <div className="flex flex-col items-center w-16 h-screen bg-gray-50 py-4 border-r border-gray-200">
      <button onClick={handleNewChat} className="mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8 text-gray-700"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      </button>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={handleNewChat} className="p-2 mb-4 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-100 transition-colors duration-200">
              <PlusIcon className="w-5 h-5 text-gray-600" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-gray-800 text-white px-2 py-1 text-xs rounded">
            <p>新規チャット</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="p-2 rounded-md hover:bg-gray-200 transition-colors duration-200">
              <HistoryIcon className="w-5 h-5 text-gray-600" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-gray-800 text-white px-2 py-1 text-xs rounded">
            <p>履歴</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}