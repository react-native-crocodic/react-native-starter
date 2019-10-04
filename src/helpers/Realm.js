import React from 'react'

import Realm from 'realm'

import {
    RealmRefs
} from '../refs/Realm'

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

export class RealmsWrapper extends React.Component {
    constructor(props) {
        super(props)

        let startupLoadDone = true

        if(this.props.allRealmsSessName != undefined)  {
            if(this.props.allRealmsSessName.length > 0) {
                startupLoadDone = false

                this.allRealmsSessName = this.props.allRealmsSessName
    
                this.OpeningRealms()
            }
        }
        
        this.state = {startupLoadDone: startupLoadDone}
    }

    allRealmsSessName = []

    render() {
        return this.state.startupLoadDone ? this.props.children : null
    }

    OpeningRealms() {
        let totalOpeningRealmsFinish = 0

        const thisInstance = this

        async function OpeningRealm(realmSessName = "") {
            require("../refs/realmSess")[realmSessName] = await OpenRealmSess(RealmRefs()[realmSessName])
    
            totalOpeningRealmsFinish++
    
            if(totalOpeningRealmsFinish == thisInstance.allRealmsSessName.length) {
                thisInstance.setState({startupLoadDone: true})
            }
        }

        for(let realmSessName of this.allRealmsSessName) {
            OpeningRealm(realmSessName)
        }
    }
}