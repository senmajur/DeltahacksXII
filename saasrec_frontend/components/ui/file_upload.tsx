"use client"

import React, { useRef, useState } from "react"

type FileUploadProps = {
  accept?: string
  maxSizeMB?: number
  onFileSelected?: (file: File | null) => void
  label?: string
}

export default function FileUpload({ accept = "image/*", maxSizeMB = 2, onFileSelected, label = "Choose file" }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedName, setSelectedName] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null)
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null
    if (!file) {
      setSelectedName(null)
      onFileSelected?.(null)
      return
    }

    const maxBytes = maxSizeMB * 1024 * 1024
    if (file.size > maxBytes) {
      setError(`File is too large. Maximum ${maxSizeMB} MB allowed.`)
      setSelectedName(null)
      onFileSelected?.(null)
      return
    }

    setSelectedName(file.name)
    onFileSelected?.(file)
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          id="file-upload"
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 rounded bg-primary text-white hover:bg-primary"
          onClick={() => inputRef.current?.click()}
        >
          {label}
        </button>
        {selectedName && <span className="text-sm text-gray-700">{selectedName}</span>}
      </div>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      <p className="text-xs text-gray-500 mt-1">Max size: {maxSizeMB} MB</p>
    </div>
  )
}
