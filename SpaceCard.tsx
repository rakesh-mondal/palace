import type React from "react"

interface SpaceCardProps {
  name: string
  status: string
  description: string
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "text-green-800 bg-green-100"
    case "inactive":
      return "text-gray-800 bg-gray-100"
    default:
      return "text-yellow-500 bg-yellow-50"
  }
}

const SpaceCard: React.FC<SpaceCardProps> = ({ name, status, description }) => {
  const statusColor = getStatusColor(status)

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
        {status}
      </div>
      <p className="text-gray-600 mt-2">{description}</p>
    </div>
  )
}

export default SpaceCard

