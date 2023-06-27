import { useState } from 'react'

const useFetch = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchTasks = async (taskText, obj = { method: "GET" }) => {
        setIsLoading(true);
        setError(null)
        // try {
            const response = await fetch(
                'https://testbackend-dc297-default-rtdb.firebaseio.com/tasks.json', obj
            );
            console.log(response)
            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            console.log(data)
        // } catch (err) {
        //     setError(err.message || 'Something went wrong!');
        // }
        setIsLoading(false);
        return data
    };
    return [fetchTasks, isLoading, error]
}

export default useFetch
