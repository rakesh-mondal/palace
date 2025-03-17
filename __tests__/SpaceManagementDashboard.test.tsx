import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import SpaceManagementDashboard from "../SpaceManagementDashboard"
import "@testing-library/jest-dom"

// Mock the next/link component
jest.mock("next/link", () => {
  return ({ children }) => {
    return children
  }
})

describe("SpaceManagementDashboard", () => {
  beforeEach(() => {
    // Mock localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    }
    global.localStorage = localStorageMock
    localStorage.getItem.mockReturnValue(
      JSON.stringify([
        {
          id: 1,
          name: "Yoga Studio A",
          type: "Studio",
          capacity: 20,
          status: "Active",
        },
        {
          id: 2,
          name: "Gym Space B",
          type: "Gym",
          capacity: 50,
          status: "Maintenance",
        },
      ]),
    )
  })

  it("renders without crashing", () => {
    render(<SpaceManagementDashboard />)
    expect(screen.getByText("Space Management")).toBeInTheDocument()
  })

  it("displays the correct number of spaces", () => {
    render(<SpaceManagementDashboard />)
    const spaceElements = screen.getAllByRole("link")
    expect(spaceElements).toHaveLength(2)
  })

  it("filters spaces correctly", async () => {
    render(<SpaceManagementDashboard />)

    // Test search functionality
    const searchInput = screen.getByPlaceholderText("Search spaces...")
    fireEvent.change(searchInput, { target: { value: "Yoga" } })
    await waitFor(() => {
      expect(screen.getByText("Yoga Studio A")).toBeInTheDocument()
      expect(screen.queryByText("Gym Space B")).not.toBeInTheDocument()
    })

    // Test filter functionality
    const filterButton = screen.getByText("Filters")
    fireEvent.click(filterButton)
    const studioCheckbox = screen.getByLabelText("Studio")
    fireEvent.click(studioCheckbox)
    await waitFor(() => {
      expect(screen.getByText("Yoga Studio A")).toBeInTheDocument()
      expect(screen.queryByText("Gym Space B")).not.toBeInTheDocument()
    })
  })

  it("navigates to add space page", () => {
    render(<SpaceManagementDashboard />)
    const addSpaceButton = screen.getByText("Add Space")
    expect(addSpaceButton).toHaveAttribute("href", "/space/new")
  })

  it("displays space details correctly", () => {
    render(<SpaceManagementDashboard />)
    expect(screen.getByText("Yoga Studio A")).toBeInTheDocument()
    expect(screen.getByText("20 capacity")).toBeInTheDocument()
    expect(screen.getByText("Active")).toBeInTheDocument()
  })

  it("handles localStorage errors", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {})
    localStorage.getItem.mockImplementation(() => {
      throw new Error("localStorage error")
    })

    render(<SpaceManagementDashboard />)

    await waitFor(() => {
      expect(screen.getByText("Failed to load spaces. Please try again later.")).toBeInTheDocument()
    })

    expect(consoleErrorSpy).toHaveBeenCalledWith("Error loading spaces:", expect.any(Error))
    consoleErrorSpy.mockRestore()
  })

  it("has proper accessibility attributes", () => {
    render(<SpaceManagementDashboard />)

    expect(screen.getByLabelText("Search spaces")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Filters" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Add Space" })).toBeInTheDocument()
  })

  it("is responsive", () => {
    render(<SpaceManagementDashboard />)

    const header = screen.getByRole("heading", { name: "Space Management" })
    const addSpaceButton = screen.getByRole("link", { name: "Add Space" })

    expect(header).toHaveClass("text-2xl")
    expect(addSpaceButton).toHaveClass("w-full", "sm:w-auto")
  })
})

