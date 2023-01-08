let btnsLikePath = Array.from(document.querySelectorAll('.card__btn'))

btnsLikePath.forEach(item => {
  item.addEventListener('click', () => {
    if (item.getAttribute('active') == null) {
      item.setAttribute('active', '')
      item.querySelector('.card__btn-like').setAttribute('src', "./images/icon-like_active.svg")
    } else {
      item.removeAttribute('active', '')
      item.querySelector('.card__btn-like').setAttribute('src', "./images/icon-like.svg")
    }
  })
});

let profile = document.querySelector('.profile')
let overlay = document.querySelector('.overlay')
let profileBtnEdit = profile.querySelector('.profile__btn_edit')
let overlayCloseBtn = document.querySelector('.pop-up__close-icon')

profileBtnEdit.addEventListener('click', () => {
  overlay.classList.add('overlay_opened')
  overlay.querySelector('.input-name').value = profile.querySelector('.profile__name').outerText
  overlay.querySelector('.input-job').value = profile.querySelector('.profile__subtitle').outerText
})

overlayCloseBtn.addEventListener('click', closeOverlay)

function closeOverlay() {
  overlay.classList.remove('overlay_opened')
}

overlay.querySelector('.pop-up').addEventListener('submit', (e) => {
  e.preventDefault()
  let valueName = overlay.querySelector('.input-name').value
  let valueJob = overlay.querySelector('.input-job').value
  if ((valueName == '') || (valueJob == '')) {
    alert('Заполните все поля ввода!')
  } else {
    profile.querySelector('.profile__name').innerHTML = valueName
    profile.querySelector('.profile__subtitle').innerHTML = valueJob
    closeOverlay()
  }
})


