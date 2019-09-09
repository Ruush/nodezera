// Object property shortgand

const name = "Andrew"
const userAge = 13

const user = {
    name,
    userAge,
    location: "phili"
}

console.log(user)

const product = {
    label: "red notebook",
    price: 3,
    stock: 201,
    salePrice: undefined
}

// const label = product.label
// const stock = product.stock

// const { label, stock } = product

// console.log(label, stock)

const transaction = (type, { label, stock }) => {
    console.log(type, label, stock)
}

transaction('order', product)