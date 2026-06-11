// meant for handling fetch requests to the backend for events

export const fetchEventsByTab = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // placeholder API for demo purposes
        const data = await response.json();

        const formattedData = data.map(item => ({
            id: item.id,
            title: item.title,
            description: item.body,
            image: `https://picsum.photos/seed/${item.id}/400/200`, // Placeholder image
            userId: item.userId
        }));

        console.log('Formatted events:', formattedData);

        return {
            official: formattedData.filter(event => event.userId === 1),
            student: formattedData.filter(event => event.userId !== 1)
        };
    } catch (error) {
        console.error("Fetch error:", error);
        return { official: [], student: [] };
    }
};