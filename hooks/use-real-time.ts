"use client"

import { useEffect, useState, useCallback } from "react"

export function useRealTime<T>(initialData: T, updateInterval = 3000) {
  const [data, setData] = useState<T>(initialData)
  const [isUpdating, setIsUpdating] = useState(false)

  const updateData = useCallback((newData: Partial<T>) => {
    setIsUpdating(true)
    setData((prev) => ({ ...prev, ...newData }))
    setTimeout(() => setIsUpdating(false), 300)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      updateData({})
    }, updateInterval)

    return () => clearInterval(interval)
  }, [updateInterval, updateData])

  return { data, updateData, isUpdating }
}
