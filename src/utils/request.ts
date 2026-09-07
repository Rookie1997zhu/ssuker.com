export type ApiSuccess<T> = {
  code: 'OK'
  message: string
  data: T
  request_id: string
}

export type ApiError = {
  code: string
  message: string
  errors?: Record<string, string>
  request_id: string
}

function createRequestId() {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

export async function requestPost<TBody extends object, TData = unknown>(
  url: string,
  body: TBody,
): Promise<ApiSuccess<TData>> {
  const requestId = createRequestId()

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Request-Id': requestId,
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    let payload: ApiError | null = null
    try {
      payload = (await response.json()) as ApiError
    } catch {
      payload = null
    }

    const error: ApiError = {
      code: payload?.code ?? 'REQUEST_FAILED',
      message: payload?.message ?? '요청을 처리하지 못했습니다.',
      errors: payload?.errors,
      request_id: payload?.request_id ?? requestId,
    }
    throw error
  }

  try {
    const data = (await response.json()) as ApiSuccess<TData>
    return {
      code: 'OK',
      message: data.message ?? '성공',
      data: data.data,
      request_id: data.request_id ?? requestId,
    }
  } catch {
    return {
      code: 'OK',
      message: '성공',
      data: undefined as TData,
      request_id: requestId,
    }
  }
}
