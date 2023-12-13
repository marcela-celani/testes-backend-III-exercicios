import { ProductBusiness } from '../../../src/business/ProductBusiness'
import { CreateProductSchema } from '../../../src/dtos/product/createProduct.dto'
import { GetProductsInputDTO, GetProductsOutputDTO } from '../../../src/dtos/product/getProducts.dto'
import { BadRequestError } from '../../../src/errors/BadRequestError'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { ProductDatabaseMock } from '../../mocks/ProductDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'

describe("Testando getProducts", () => {
  const productBusiness = new ProductBusiness(
    new ProductDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("Ao fazer getPayload deve receber token valido", async () => {
    const input: GetProductsInputDTO = {token: "token-mock-astrodev", q: ''}
      
    const output: GetProductsOutputDTO = await productBusiness.getProducts(input)

    expect(output).toHaveLength(2)
    expect(output).toEqual([{
      id: 'p001',
      name: 'Mouse',
      price: 50,
      createdAt: expect.any(String)
    },
    {
      id: 'p002',
      name: 'Teclado',
      price: 80,
      createdAt: expect.any(String)
    }])
  })

  test("deve retornar erro se payload for nulo não estiver logado", async () => {
    expect.assertions(2)
    try {
      const input: GetProductsInputDTO = {token: "token-invalido", q: ''}
      
      await productBusiness.getProducts(input)
  
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError)
      if(error instanceof BadRequestError){
        expect(error.message).toBe("token inválido")
      }
    }
  })

  test("somente admins podem criar produtos", async () => {
    expect.assertions(2)
    try {
      const input = CreateProductSchema.parse({
        name: "bananinha",
        price: 20,
        token: "token-mock-fulano"
      })
      
      await productBusiness.createProduct(input)
  
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestError)
      if(error instanceof BadRequestError){
        expect(error.message).toBe("somente admins podem acessar")
      }
    }
  })
})
