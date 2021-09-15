import Lance from "@/components/Lance";

import { mount } from "@vue/test-utils"

test('não aceita lance com valor menor do que 0', () => {

  const wrapper = mount(Lance); //Monta o component dentro de wrapper

  const input = wrapper.find('input') //Pega o element 'input'
  input.setValue(-100); //Adicionar o valor -100 dentro do input

  const lancesEmitidos = wrapper.emitted('novo-lance'); //Captura o evento
  wrapper.trigger('submit'); //Ativar/disparar o evento de submit/enviar

  expect(lancesEmitidos).toBeUndefined(); //Espera que o wrapper = 'componente' exista

});

test('emite um lance quando o valor é maior do que zero', () => {
  const wrapper = mount(Lance);

  const input = wrapper.find('input');
  input.setValue(100);

  wrapper.trigger('submit');
  const lancesEmitidos = wrapper.emitted('novo-lance');

  expect(lancesEmitidos).toHaveLength(1);

})

test('emite o valor esperado de um lance valido', () => {
  const wrapper = mount(Lance);

  const input = wrapper.find('input');
  input.setValue(100);

  wrapper.trigger('submit');
  const lancesEmitidos = wrapper.emitted('novo-lance');
  // {
  //   { 100 }
  // }
  const lance = parseInt(lancesEmitidos[0][0]);
  expect(lance).toBe(100);
})
