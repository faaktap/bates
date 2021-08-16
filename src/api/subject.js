import { getters } from "@/api/store";
import { zData } from "@/api/zGetBackgroundData.js"


function testIfLoaded() {
    if (!getters.getState({ object: "gZml" }).subjects.length) {
        zData.initialData('Load Subject Data')
        return false
    }
    return true
}

function getIdx(sid) {
    return getters.getState({ object: "gZml" }).subjects.findIndex(
        ele => ele.subjectid == sid)
}
export const subject = {
    shortName: (subjectid) => {  
        const idx = getIdx(subjectid)
        if (idx == -1) return {error:true, errormessage:"subject id not found" + !testIfLoaded()}
        return getters.getState({ object: "gZml" }).subjects[idx].shortname
    },
    color: (subjectid) => {  
        const idx = getIdx(subjectid)
        if (idx == -1) return {error:true, errormessage:"subject id not found"}
        return getters.getState({ object: "gZml" }).subjects[idx].color
    },
    otherfunctionData: (whatever) => {  
      console.log(whatever)
        return "something"
    },
}
