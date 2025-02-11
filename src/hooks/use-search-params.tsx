import {parseAsString, useQueryState} from "nuqs"


//this hook is used to get the search param from the url
//it uses the nuqs library to get the search param
//it is similar to using a useState, but it is synced with the url
export function useSearchParam(key : string) {
    return useQueryState(key, 
        parseAsString.withDefault("").withOptions({
            clearOnDefault: true
        })
    )
}