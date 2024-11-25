export function hashGen(count:number){
    const phase = "qwertyuiopasdfghjklzxcvbnm123456789"
    const length = phase.length
    let hash= ""
    for(let i = 0; i < count; i++){
        hash += phase[Math.floor(Math.random() * length)]
    }
    return hash
}
