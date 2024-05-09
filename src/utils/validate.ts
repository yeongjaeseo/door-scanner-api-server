import { Request, Response, NextFunction } from 'express';

// Function to parse the DOOR_SCANNER_API_KEYS environment variable
const getValidApiKeys = (): string[] => {
    try {
        // Assuming TEST_API_KEYS is always a valid JSON string
        const apiKeysJson = process.env.DOORSCANNER_API_KEYS || '{"keys": []}';
        const apiKeysObj = JSON.parse(apiKeysJson);

        // Extracting values from each object in the 'keys' array, regardless of key name
        const apiKeys: string[] = apiKeysObj.keys.reduce((acc: string[], keyObj: { [key: string]: string }) => {
            // Extracting all values from the keyObj and adding them to the accumulator
            Object.values(keyObj).forEach(value => acc.push(value));
            return acc;
        }, []);

        return apiKeys;
    } catch (error) {
        console.error('Error parsing TEST_API_KEYS:', error);
        return [];
    }
};

export const validateApiKey = (req: Request, res: Response, next: NextFunction): void => {
    const apiKey = req.headers['x-api-key'] as string | undefined;
    const validApiKeys = getValidApiKeys();

    if (!apiKey || !validApiKeys.includes(apiKey)) {
        res.status(401).json({ message: 'Invalid or missing API key' });
        return;
    }

    next();
};
