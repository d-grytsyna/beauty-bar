class ProcedureModel{
    id?: number;
    type?: string;
    name?: string;
    description?: string;
    price?: number;
    time?: string;
    discount?: number;
    img?: any;
    constructor(id: number, type: string, name: string, description: string, 
        price: number, time: string, discount: number, img:any){
            this.id = id;
            this.type = type;
            this.name = name;
            this.description = description;
            this.price = price;
            this.time = time;
            this.discount = discount;
            this.img = img;
        }

}
export default ProcedureModel;