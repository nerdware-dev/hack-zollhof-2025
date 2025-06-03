import axios from "axios";

export async function callTestApi() {
    const result = await axios.post("https://crl7n22bp5.execute-api.eu-central-1.amazonaws.com/dev/api/test", undefined, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return result;
}