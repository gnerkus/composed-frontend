// data
const product = {
  name: 'Tractor',
  variants: [
    {
      sku: 't_porsche',
      color: 'red',
      name: 'Porsche-Diesel Master 419',
      image: '/catalog/images/tractor-red.jpg',
      thumb: '/catalog/images/tractor-red-thumb.jpg',
      price: '66,00 €',
    },
    {
      sku: 't_fendt',
      color: 'green',
      name: 'Fendt F20 Dieselroß',
      image: '/catalog/images/tractor-green.jpg',
      thumb: '/catalog/images/tractor-green-thumb.jpg',
      price: '54,00 €',
    },
    {
      sku: 't_eicher',
      color: 'blue',
      name: 'Eicher Diesel 215/16',
      image: '/catalog/images/tractor-blue.jpg',
      thumb: '/catalog/images/tractor-blue-thumb.jpg',
      price: '58,00 €',
    }
  ]
}

function renderOption(variant, sku) {
  const active = sku === variant.sku ? 'active' : ''
  return `
    <a href="/${variant.sku}" class="${active}" type="button" data-sku="${variant.sku}">
      <img src="${variant.thumb}" alt="${variant.name}" />
    </a>
  `
}

// The catalog service renders the content from the other services
// (basket, recommendations).
export default function renderPage(sku = 't_porsche') {
  const variant = product.variants.find(v => sku === v.sku)
  if (!variant) { return '<pre>no product not found</pre>' }
  return `
    <h1 id="catalog">Catalog</h1>
    <cf-basket-basket id="basket"><!--#include virtual="/cf-basket-basket" --></cf-basket-basket>
    <div id="image"><div><img src="${variant.image}" alt="${variant.name}" /></div></div>
    <h2 id="name">${product.name} <small>${variant.name}</small></h2>
    <div id="options">${product.variants.map(v => renderOption(v, sku)).join('')}</div>
    <cf-basket-buy id="buy" sku="${variant.sku}"><!--#include virtual="/cf-basket-buy?sku=${encodeURIComponent(variant.sku)}" --></cf-basket-buy>
    <cf-recos-recos id="reco" sku="${variant.sku}"><!--#include virtual="/cf-recos-recos?sku=${encodeURIComponent(variant.sku)}" --></cf-recos-recos>
  `
}