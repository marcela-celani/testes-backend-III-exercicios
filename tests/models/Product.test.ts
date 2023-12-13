import { Product } from "../../src/models/Product"

describe("testando a model product", () => {
    
    let product

    beforeEach(()=> {
        product = new Product(
            "p001",
            "tela gamer",
            9.90,
            new Date().toISOString()
        )
    })
    
    test("deve instanciar corretamente", () => {
        expect(product).toBeInstanceOf(Product)
    })

    test("deve encapsular id", () => {  
        product.setId("p002") 
        expect(product.getId()).toEqual("p002")
    })

    test("deve encapsular name", () => {
        product.setName("cadeira gamer")  
        expect(product.getName()).toEqual("cadeira gamer")
    })

    test("deve encapsular preço", () => {
        product.setPrice(12.90)    
        expect(product.getPrice()).toEqual(12.90)
    })
    
})