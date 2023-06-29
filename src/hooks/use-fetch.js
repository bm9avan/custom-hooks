import { useState } from 'react'

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchTasks = async (obj = { method: "GET" }, dataHandler) => {
        setIsLoading(true);
        setError(null)
        try {
            const response = await fetch(
                'https://testbackend-dc297-default-rtdb.firebaseio.com/tasks.json', obj
            );
            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            dataHandler(data)
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
    };
    return [fetchTasks, isLoading, error]
}

export default useFetch
