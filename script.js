// ── Hamburger menu ──
const hamburguer = document.getElementById('hamburguer')
const navLinks = document.getElementById('navLinks')

hamburguer.addEventListener('click', () => {
    hamburguer.classList.toggle('aberto')
    navLinks.classList.toggle('aberto')
})

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburguer.classList.remove('aberto')
        navLinks.classList.remove('aberto')
    })
})

// ── Quartos ──
const quartos = [
    { "tipo": "Suite", "preco": 150, "disponivel": true, "img": "img/quarto01.jpg" },
    { "tipo": "Standard", "preco": 80, "disponivel": true, "img": "img/quarto02.jpg" },
    { "tipo": "Familiar", "preco": 120, "disponivel": false, "img": "img/quarto03.jpg" }
]

const lista = document.getElementById('listaQuartos')

for (const quarto of quartos) {
    const card = document.createElement('div')

    card.innerHTML = `
        <img src="${quarto.img}" alt="${quarto.tipo}">
        <h3>${quarto.tipo}</h3>
        <p>${quarto.preco}€ / noite</p>
        <p>${quarto.disponivel ? 'Disponível' : 'Indisponível'}</p>
    `

    card.style.cursor = 'pointer'
    card.addEventListener('click', () => {
        alert(`Reservar: ${quarto.tipo} — ${quarto.preco}€ / noite`)
    })

    lista.appendChild(card)
}

const btn = document.getElementById('btnVerificar')

btn.addEventListener('click', () => {
    const checkin = new Date(document.getElementById('checkin').value)
    const checkout = new Date(document.getElementById('checkout').value)

    if (!document.getElementById('checkin').value || !document.getElementById('checkout').value) {
        alert('Por favor preenche as datas!')
        return
    }

    if (checkout <= checkin) {
        alert('A data de check-out tem de ser depois do check-in!')
        return
    }

    const noites = (checkout - checkin) / (1000 * 60 * 60 * 24)
    const disponiveis = quartos.filter(quarto => quarto.disponivel === true)

    lista.innerHTML = ''

    if (disponiveis.length === 0) {
        lista.innerHTML = '<p>Nenhum quarto disponível.</p>'
        return
    }

    for (const quarto of disponiveis) {
        const card = document.createElement('div')
        const total = quarto.preco * noites

        card.innerHTML = `
            <img src="${quarto.img}" alt="${quarto.tipo}">
            <h3>${quarto.tipo}</h3>
            <p>${quarto.preco}€ / noite</p>
            <p>${noites} noite(s) — Total: ${total}€</p>
            <p>Disponível</p>
        `

        card.style.cursor = 'pointer'
        card.addEventListener('click', () => {
            alert(`Reservar: ${quarto.tipo} — ${noites} noite(s) — Total: ${total}€`)
        })

        lista.appendChild(card)
    }
})
document.getElementById('ano').textContent = new Date().getFullYear()
