type BaseResponse = {
    data: Operator[];
}

type Position = {
    id: string;
    name: string;
}

export type Operator = {
    id: string;
    name: string;
    position: Position;
}

export async function getListOperator(): Promise<BaseResponse> {
    const baseUrl = process.env.API_HOST || 'https://api.malili.adisarana.id'
    const url = baseUrl + '/v1/user/operator?page=1&size=1000'
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data: BaseResponse = await response.json(); // Ensure the response is an array of objects
        return data;
    } catch (error) {
        console.error("Fetch error:", error);
        return { data: [] }; // Return an empty array on failure
    }
}