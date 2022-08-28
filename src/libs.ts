type SuspenseData =
  | {
  type: 'loading'
  promise: Promise<void>
}
  | {
  type: 'resolved'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any
}

const PROMISE_MAP: Map<string, SuspenseData> = new Map<string, SuspenseData>()

export const resolver = <T>(key: string, fn: () => Promise<T>): T => {
  const data = PROMISE_MAP.get(key)
  if (data === undefined) {
    const promise = new Promise<void>((resolve) => {
      fn().then((result) => {
        PROMISE_MAP.set(key, { type: 'resolved', data: result })
        resolve()
      })
    })
    PROMISE_MAP.set(key, { type: 'loading', promise })
    throw promise
  }

  if (data && data.type === 'loading') {
    throw data.promise
  }

  return data.data as T
}

export const clear = (key: string) => {
  PROMISE_MAP.delete(key)
}

export const clearAll = () => {
  PROMISE_MAP.clear()
}
