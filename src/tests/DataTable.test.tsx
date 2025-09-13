import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom'; 
import DataTable from "../components/DataTable";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockData = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "123456" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987654" },
];

describe("DataTable Component", () => {
  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockData });
  });

  test("renders table headers", async () => {
    render(<DataTable />);
    expect(screen.getByPlaceholderText("Filter Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Filter Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Filter Phone")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });

  test("filters data by name", async () => {
    render(<DataTable />);
    await waitFor(() => {
      const input = screen.getByPlaceholderText("Filter Name");
      fireEvent.change(input, { target: { value: "Jane" } });
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(screen.queryByText("John Doe")).toBeNull();
    });
  });

  test("pagination works", async () => {
    render(<DataTable />);
    await waitFor(() => {
      expect(screen.getByText("Page 1 / 1")).toBeInTheDocument();
    });
  });
});
