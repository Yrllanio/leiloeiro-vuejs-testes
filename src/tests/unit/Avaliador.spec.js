import Avaliador from "@/views/Avaliador"
import { mount, RouterLinkStub } from "@vue/test-utils"
import { getLeiloes } from "@/http"

import flushPromises from "flush-promises"

jest.mock("@/http")

const leiloes = [
  {
    produto: "livro: casa do código",
    lanceInicial: 50,
    descricao: "livro sobre vuejs"
  },
  {
    produto: "livro: casa do código",
    lanceInicial: 50,
    descricao: "livro sobre teste unitário"
  }
]


describe("avaliador se conecta com a api", () => {
  test("mostra todos os leiloes retornados pela api", async () => {

    getLeiloes.mockResolvedValueOnce(leiloes)

    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub //Simula o componente de router-link
      }
    })

    await flushPromises()

    const totalLeiloesExibidos = wrapper.findAll(".leilao").length

    expect(totalLeiloesExibidos).toBe(leiloes.length)

  })

  test("não há leiloes retornados pela api", async () => {

    getLeiloes.mockResolvedValueOnce([])

    const wrapper = mount(Avaliador, {
      stubs: {
        RouterLink: RouterLinkStub //Simula o componente de router-link
      }
    })

    await flushPromises()

    const totalLeiloesExibidos = wrapper.findAll(".leilao").length

    expect(totalLeiloesExibidos).toBe(0)

  })
})
