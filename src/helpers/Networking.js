import {
    baseUrls,
    usedBaseUrlIndex
} from "../refs/API"

export function AppendURL(additionalUrl = "") {
    return baseUrls[usedBaseUrlIndex] + additionalUrl
}

export function CreatePOST(params = {}) {
    return {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(params),
    }
}

export function CreatePATCH(params = {}) {
    return {
        method : "PATCH",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(params),
    }
}