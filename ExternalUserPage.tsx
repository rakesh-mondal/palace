import type React from "react"
import { Badge } from "flowbite-react"

const getStatusBadge = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return <Badge className="bg-green-100 text-green-800">Active</Badge>
    case "inactive":
      return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
    default:
      return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
  }
}

const ExternalUserPage: React.FC = () => {
  // Dummy data for demonstration
  const userData = {
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Active",
    role: "User",
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">External User Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="mb-2">
          <strong>Name:</strong> {userData.name}
        </div>
        <div className="mb-2">
          <strong>Email:</strong> {userData.email}
        </div>
        <div className="mb-2">
          <strong>Status:</strong> {getStatusBadge(userData.status)}
        </div>
        <div>
          <strong>Role:</strong> {userData.role}
        </div>
      </div>
    </div>
  )
}

export default ExternalUserPage

