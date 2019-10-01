import {
    GetConvertedRealmValueToTypeData
} from '../helpers/Realm'

export function RealmRefs() {
    let refs = {
        NotificationID: {
            schemaName: "NotificationID_v1",
            schema: { value: 0 }
        }
    }

    return {
        NotificationID: {
            parameters: refs.NotificationID.schema,
            dataModel: {
                path: "notificationID.realm",
                schema: [{
                    name: refs.NotificationID.schemaName,
                    properties: GetConvertedRealmValueToTypeData(refs.NotificationID.schema)
                }],
            },
            InitValue: (params = refs.NotificationID.schema) => params
        } 
    }
}