'use client'

import { useState, useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { useDropzone } from 'react-dropzone'
import imageCompression from 'browser-image-compression'
import { type BungalowConfig } from '@/types/bungalow'
import { Upload, FileText, X, Image as ImageIcon, AlertCircle } from 'lucide-react'

const MAX_FILES = 3
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_TYPES = {
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/webp': ['.webp'],
}

export function NoteUploadStep() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<BungalowConfig>()

  const note = watch('note')
  const allegati = watch('allegati') || []

  const [uploadErrors, setUploadErrors] = useState<string[]>([])
  const [isCompressing, setIsCompressing] = useState(false)

  // Comprime immagine
  const compressImage = async (file: File): Promise<File> => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      fileType: 'image/jpeg',
    }

    try {
      return await imageCompression(file, options)
    } catch (error) {
      console.error('Errore compressione:', error)
      return file // Ritorna originale se compressione fallisce
    }
  }

  // Handler dropzone
  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: any[]) => {
      setUploadErrors([])
      
      // Gestisci file rifiutati
      if (rejectedFiles.length > 0) {
        const errors = rejectedFiles.map((rejected) => {
          if (rejected.file.size > MAX_FILE_SIZE) {
            return `${rejected.file.name}: file troppo grande (max 5MB)`
          }
          return `${rejected.file.name}: formato non supportato`
        })
        setUploadErrors(errors)
      }

      // Verifica limite numero file
      const currentCount = allegati.length
      const newFilesCount = acceptedFiles.length
      const totalCount = currentCount + newFilesCount

      if (totalCount > MAX_FILES) {
        setUploadErrors([`Puoi caricare massimo ${MAX_FILES} file. Hai già ${currentCount} file.`])
        return
      }

      // Comprimi e aggiungi file
      if (acceptedFiles.length > 0) {
        setIsCompressing(true)
        try {
          const compressedFiles = await Promise.all(
            acceptedFiles.map(async (file) => {
              if (file.type.startsWith('image/')) {
                return await compressImage(file)
              }
              return file
            })
          )

          setValue('allegati', [...allegati, ...compressedFiles], { shouldValidate: true })
        } catch (error) {
          console.error('Errore upload:', error)
          setUploadErrors(['Errore durante il caricamento dei file'])
        } finally {
          setIsCompressing(false)
        }
      }
    },
    [allegati, setValue]
  )

  // Rimuovi file
  const removeFile = (index: number) => {
    const newAllegati = allegati.filter((_, i) => i !== index)
    setValue('allegati', newAllegati, { shouldValidate: true })
  }

  // Setup dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_FILE_SIZE,
    maxFiles: MAX_FILES - allegati.length,
    disabled: allegati.length >= MAX_FILES || isCompressing,
  })

  // Formatta dimensione file
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Textarea Note */}
      <div>
        <label className="block mb-2">
          <span className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Note aggiuntive (opzionale)
          </span>
          <textarea
            {...register('note')}
            rows={6}
            maxLength={2000}
            className={`w-full px-4 py-3 border-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
              errors.note ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Descrivi le tue esigenze specifiche, materiali preferiti, accessori desiderati, ecc."
          />
        </label>
        <div className="flex justify-between items-center text-sm text-gray-600 mt-1">
          <span>{errors.note ? <span className="text-red-600">⚠️ {errors.note.message}</span> : 'Usa questo spazio per dettagli importanti'}</span>
          <span>{note?.length || 0} / 2000</span>
        </div>
      </div>

      {/* Upload Area */}
      <div>
        <label className="block mb-2">
          <span className="flex items-center gap-2 font-semibold text-gray-700 mb-2">
            <ImageIcon className="w-5 h-5 text-green-600" />
            Immagini di riferimento (opzionale)
          </span>
          <span className="text-sm text-gray-600">
            Massimo {MAX_FILES} immagini • Formati: JPG, PNG, WebP • Max 5MB per file
          </span>
        </label>

        {/* Dropzone */}
        {allegati.length < MAX_FILES && (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
              isDragActive
                ? 'border-blue-600 bg-blue-50'
                : isCompressing
                ? 'border-gray-300 bg-gray-50 cursor-wait'
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}
          >
            <input {...getInputProps()} />
            
            {isCompressing ? (
              <>
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-gray-600 font-medium">Compressione immagini...</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                {isDragActive ? (
                  <p className="text-blue-600 font-medium">Rilascia i file qui</p>
                ) : (
                  <>
                    <p className="text-gray-700 font-medium mb-1">
                      Trascina le immagini qui o clicca per selezionare
                    </p>
                    <p className="text-sm text-gray-500">
                      Ancora {MAX_FILES - allegati.length} file disponibili
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        )}

        {/* Errori upload */}
        {uploadErrors.length > 0 && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            {uploadErrors.map((error, index) => (
              <p key={index} className="text-red-600 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            ))}
          </div>
        )}

        {/* Lista file caricati */}
        {allegati.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-gray-700">
              File caricati ({allegati.length}/{MAX_FILES})
            </p>
            {allegati.map((file: File, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                {/* Anteprima miniatura */}
                <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info file */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                {/* Bottone rimuovi */}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                  title="Rimuovi file"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Suggerimenti per le immagini</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Carica foto del luogo dove installerai il bungalow</li>
          <li>• Includi immagini di riferimento se hai uno stile preferito</li>
          <li>• Le immagini saranno compresse automaticamente per l'invio</li>
        </ul>
      </div>
    </div>
  )
}
