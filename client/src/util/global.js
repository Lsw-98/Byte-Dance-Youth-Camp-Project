import ajax from './ajax'
import {localUrl, globalUrl} from './url'
import {verification} from './tools'
import msg from './message'

let options = {
    http: ajax,
    url: localUrl,
    gUrl: globalUrl,
    verify: verification,
    msg: msg,
}

export {options}