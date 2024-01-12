export {}

interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
}

// Using the generic interface for a user response
function getUser(): ApiResponse<User> {
    // API call logic...
    return {
        status: 200,
        message: "Success",
        data: { id: 1, name: "John Doe" } // User type data
    };
}

// User type
interface User {
    id: number;
    name: string;
}
