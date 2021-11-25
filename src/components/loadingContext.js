import { useState, createContext } from 'react'

export const LoadingContext = createContext()

const LoadingProvider = props => {
  const [isLoading, setLoading] = useState(false)

  return <LoadingContext.Provider value={[isLoading, setLoading]}>{props.children}</LoadingContext.Provider>
}

export default LoadingProvider