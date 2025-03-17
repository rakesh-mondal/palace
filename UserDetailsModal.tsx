"use client"

import type React from "react"

interface UserDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  userDetails: {
    id: number
    name: string
    email: string
    status: string
  } | null
}

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ isOpen, onClose, userDetails }) => {
  if (!isOpen || !userDetails) {
    return null
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      case "flagged":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  User Details
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    <strong>ID:</strong> {userDetails.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Name:</strong> {userDetails.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Email:</strong> {userDetails.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`px-2 py-1 font-semibold leading-tight rounded-full ${getStatusColor(userDetails.status)}`}
                    >
                      {userDetails.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetailsModal

