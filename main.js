const update = document.querySelector('#update-button')

// Evento update
update.addEventListener('click', _ => {
    fetch('/frases', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: 'Herman Ayala',
            frase: 'Quien más va a revisar?'
          })
      })      
})

const deleteButton = document.querySelector('#delete-button')
// Evento eliminar
deleteButton.addEventListener('click', _ => {
  fetch('/frases', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: 'Herman Ayala'
    })
  })
    .then(res => {
      if (res.ok) return res.json()
      
    })
    .then(data => {
        location. reload()
    })
  })