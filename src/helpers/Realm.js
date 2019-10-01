import Realm from 'realm'

export async function OpenRealmSess(realmRef) {
    let realm = await Realm.open(realmRef.dataModel)

    return {
        schemaName: String(realmRef.dataModel.schema[0].name),
        realm: realm
    }
}

export function GetRealmObjs(realmSess = {schemaName: "", realm: new Realm()}) {
    return realmSess.realm.objects(realmSess.schemaName)
}

export function GetConvertedRealmValueToTypeData(objWithValue = {}) {
    let objWithTypeData = objWithValue

    Object.keys(objWithTypeData).forEach((key) => {
        if(objWithTypeData[key] === 0.0) {
            objWithTypeData[key] = "double"
        } else if(objWithTypeData[key] === 0) {
            objWithTypeData[key] = "int"
        } else if(objWithTypeData[key] === true || objWithTypeData[key] === false) {
            objWithTypeData[key] = "bool"
        } else if(objWithTypeData[key] === "") {
            objWithTypeData[key] = "string"
        }
    })

    return objWithTypeData
}