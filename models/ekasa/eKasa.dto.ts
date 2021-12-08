export interface EKasaError {
  errorCode?: number
  message: string
  detail: string
}

export interface EKasaWarning {
  warningType?: string
  warningCode?: string
  message?: string
  detail?: string
  documentToFix?: any
  locationToFix?: any
}

export interface EKasaStatus {
  code: number
  error?: EKasaError
  warning?: EKasaWarning
  documentToFix?: any
  locationToFix?: any
}
