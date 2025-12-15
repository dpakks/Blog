
import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, SetData] = useState(null);
    const [isPending, SetIsPending] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController();


        setTimeout(() => {
            fetch(url, {signal: abortCont.signal})
                .then(res => {
                    console.log("Response", res)
                    if (!res.ok) {
                        throw new Error("Could not fetch Data for this Resource");
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data);
                    SetData(data)
                    SetIsPending(false);
                    setError(null)
                })
                .catch((e) => {
                    console.log("Error Message:", e)
                    SetIsPending(false);
                    setError(e.message)
                })
        }, 0);

        return () => abortCont.abort();

    }, [url]);

    return { data, isPending, error }
}

export default useFetch;