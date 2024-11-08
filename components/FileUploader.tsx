"use client"

import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import Image from 'next/image'
import convertFileToURL from 'react-dropzone'

type FileUploaderProps = {
    files: File[] | undefined,
    onChange: (files: File[]) => void
}

 const FileUploader = ({files, onChange}:FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles:File[]) => {
        onChange(acceptedFiles)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    // @ts-ignore
     // @ts-ignore
     // @ts-ignore
     return (
        <div {...getRootProps()} className="file-upload">
            <input {...getInputProps()} />
            {files && files?.length > 0 ? (
                <Image src={convertFileToURL(files[0])} height={1000} width={1000}
                alt="uploaded document" className="max-h-[400px] overflow-hidden object-cover"></Image>
            ) : <>
            <Image
            src="/assets/icons/upload.svg"
            alt = "upload"
            width={40}
            height={40}
            />
                <div className="file-upload_label">
                    <p className="text-14-regular">
                        <span className="text-green-500">Click to upload</span> or drag & drop
                    </p>
                    <p >SVG, PNG, JPG, GIF (max 800x600)</p>
                </div>

            </>}
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag `&apos;`n`&apos;` drop some files here, or click to select files</p>
            }
        </div>
    )
}
export default FileUploader