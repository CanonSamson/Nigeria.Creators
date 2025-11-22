"use client"

import { useRef, useState } from "react"
import { CloudUpload } from "lucide-react"
import { toast } from "sonner"

const ProfileInfoSection = () => {
  const [resident, setResident] = useState("")
  const [fileName, setFileName] = useState("")
  const [isDragging, setIsDragging] = useState(false)
  const [description, setDescription] = useState("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFiles = (files: FileList | null) => {
    if (!files || !files[0]) return
    const file = files[0]
    if (file.size > 25 * 1024 * 1024) {
      toast.error("File exceeds 25MB limit")
      return
    }
    setFileName(file.name)
  }

  return (
    <>
      <div className="mt-4">
        <h2 className="text-[18px] md:text-[22px] font-bold text-black">Almost Done</h2>
        <p className="mt-2 text-text-color-200 text-[14px] md:text-[16px]">
          Upload your best content to showcase your talents and creativity.
        </p>
      </div>

      <div className="mt-6 max-w-[640px] space-y-6">
        <div>
          <label className="block text-[13px] md:text-[14px] text-black mb-2">
            Do you live in Nigeria
          </label>
          <select
            value={resident}
            onChange={e => setResident(e.target.value)}
            className="w-full h-[48px] md:h-[54px] px-4 rounded-[12px] md:rounded-[16px] bg-[#F8F8F8] border border-[#EFEFEF] text-[14px] md:text-[16px] text-black outline-none"
          >
            <option value="" disabled>
              Select
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label className="block text-[13px] md:text-[14px] text-black mb-2">
            Content Creators upload a Profile Picture
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={e => handleFiles(e.target.files)}
          />
          <div
            role="button"
            aria-label="Upload profile picture"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => {
              e.preventDefault()
              setIsDragging(true)
            }}
            onDragLeave={e => {
              e.preventDefault()
              setIsDragging(false)
            }}
            onDrop={e => {
              e.preventDefault()
              setIsDragging(false)
              handleFiles(e.dataTransfer.files)
            }}
            className={`min-h-[140px] md:min-h-[160px] flex items-center justify-center text-center rounded-[12px] md:rounded-[16px] border ${
              isDragging ? "border-primary bg-[#F5FFFD]" : "border-[#EFEFEF] bg-[#F8F8F8]"
            }`}
          >
            <div className="flex flex-col items-center gap-2 px-6 py-8">
              <CloudUpload className="h-6 w-6 text-text-color-200" />
              <span className="text-[14px] md:text-[16px] text-text-color-200">
                {fileName || "Click to upload file or drag-and-drop."}
              </span>
              <span className="text-[12px] text-text-color-200">Max 25 MB</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-[13px] md:text-[14px] text-black mb-2">
            Add a short Description for yourself
          </label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full min-h-[120px] md:min-h-[160px] px-4 py-3 rounded-[12px] md:rounded-[16px] bg-[#F8F8F8] border border-[#EFEFEF] text-[14px] md:text-[16px] text-black placeholder:text-text-color-200 outline-none"
          />
        </div>
      </div>
    </>
  )
}

export default ProfileInfoSection
