interface UploadResult {
  isSuccess: boolean
  result?: string
}

type HandleUpload = (e: HTMLInputElement) => UploadResult

export class EasyEditor {}
