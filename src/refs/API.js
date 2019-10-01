import {
    AppendURL,
    CreatePOST
} from '../helpers/Networking'

export const baseUrls = [
    "https://www.example.com"
]

export const usedBaseUrlIndex = 0

export function API() {
    return {
        GETExample: () => fetch(AppendURL("/getexample")),
        POSTExample: (parameters = {firstParam, secondParam}) => fetch("/postexample", CreatePOST(parameters))
    }
}