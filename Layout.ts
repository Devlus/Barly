interface Layout {
    barheight: number,
    rows: number,
    columns: number,
    extensions:ExtensionDescriptor[]
}
interface ExtensionDescriptor {
    name: string,
    row: number,
    column: number,
    colSpan: number,
    rowSpan: number
}

interface ExtensionLoader{
    width:number,
    height:number,
    x:number,
    y:number,
    name:string
}