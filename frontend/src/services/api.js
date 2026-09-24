const API_URL = "http://localhost:5000/api";


const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};


export const getProperties = async () => {
  const response = await fetch(`${API_URL}/properties`);

  if (!response.ok) {
    throw new Error("Failed to fetch properties");
  }

  return response.json();
};


export const getMyProperties = async () => {
  const response = await fetch(`${API_URL}/properties/my`, {
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch your properties");
  }

  return response.json();
};

export const getProperty = async (id) => {
  const response = await fetch(`${API_URL}/properties/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch property");
  }

  return response.json();
};


export const createProperty = async (propertyData) => {
  const response = await fetch(`${API_URL}/properties`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(propertyData),
  });

  if (!response.ok) {
    throw new Error("Failed to create property");
  }

  return response.json();
};

export const updateProperty = async (id, propertyData) => {
  const response = await fetch(`${API_URL}/properties/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(propertyData),
  });

  if (!response.ok) {
    throw new Error("Failed to update property");
  }

  return response.json();
};


export const deleteProperty = async (id) => {
  const response = await fetch(`${API_URL}/properties/${id}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete property");
  }

  return response.json();
};