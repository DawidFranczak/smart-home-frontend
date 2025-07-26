import { useAuth } from "../auth/AuthContext.tsx";

function getCsrfToken() {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, 10) === "csrftoken=") {
        cookieValue = decodeURIComponent(cookie.substring(10));
        break;
      }
    }
  }
  return cookieValue;
}
interface useFetchReturn {
  createData: (
    url: string,
    body: any
  ) => Promise<{ status: number; data: any }>;
  readData: (url: string) => Promise<{ status: number; data: any }>;
  updateData: (
    url: string,
    body: any
  ) => Promise<{ status: number; data: any }>;
  deleteData: (url: string) => Promise<{ status: number }>;
}

class CustomError extends Error {
  details: { [key: string]: string[] };
  constructor(message: string, details: { [key: string]: string[] }) {
    super(message);
    this.details = details;
  }
}

export default function useFetch(): useFetchReturn {
  const { access,logout } = useAuth();
  const options = {
    credentials: "include" as RequestCredentials,
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "1234",
      Authorization: `Bearer ${access}`,
      "X-CSRFToken": getCsrfToken() || "",
    },
  };
  async function createData(
    url: string,
    body = null
  ): Promise<{ status: number; data: unknown }> {
    const response = await fetch(url, {
      method: "POST",
      ...options,
      body: body ? JSON.stringify(body) : null,
    });
    const data = await response.json();
    if (response.status === 401) {logout()}
    if (!response.ok) {
      throw new CustomError("Błąd podczas wysyłania danych", data);
    }
    return { status: response.status, data: data };
  }

  async function readData(url: string): Promise<{ status: number; data: any }> {
    const response = await fetch(url, {
      method: "GET",
      ...options,
    });
    if (response.status === 401) {logout()}
    const data = await response.json();
    return { status: response.status, data: data };
  }
  async function updateData(
    url: string,
    body = null
  ): Promise<{ status: number; data: any }> {
    const response = await fetch(url, {
      method: "PUT",
      ...options,
      body: body ? JSON.stringify(body) : null,
    });
    if (response.status === 401) {logout()}
    const data = await response.json();
    if (!response.ok) {
      throw new CustomError("Błąd podczas wysyłania danych", {
        ...data,
        status: response.status,
      });
    }
    return { status: response.status, data: data };
  }

  async function deleteData(url: string): Promise<{ status: number }> {
    const response = await fetch(url, {
      method: "DELETE",
      ...options,
    });
    if (response.status === 401) {logout()}
    // constant data = await response.json();
    return { status: response.status };
  }

  return {
    createData,
    readData,
    updateData,
    deleteData,
  };
}
