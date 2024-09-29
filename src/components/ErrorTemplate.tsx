import React from 'react'

interface ErrorTemplateProps {
  message: string
}

const ErrorTemplate: React.FC<ErrorTemplateProps> = ({ message }) => {
  return (
    <div className="container mx-auto max-w-7xl my-10 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
      <p>{message}</p>
    </div>
  )
}

export default ErrorTemplate