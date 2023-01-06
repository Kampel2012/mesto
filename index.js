window.addEventListener('load', () => {
  let btnsLikePath = Array.from(document.querySelectorAll('.card__btn'))

  btnsLikePath.forEach(item => {
    item.addEventListener('click', () => {
      if (item.getAttribute('active') == null) {
        item.setAttribute('active', '');
        item.querySelector('.card__btn-path').setAttribute('d', "M20.2991 1.68186C22.567 3.90213 22.567 7.54338 20.2991 9.78586L10.9804 19L1.6841 9.80806C0.606277 8.72013 0 7.27695 0 5.74496C0 4.21297 0.583823 2.76979 1.6841 1.68186C3.92957 -0.560619 7.61215 -0.560619 9.88007 1.70406L10.9804 2.792L12.0806 1.68186C14.3486 -0.560619 18.0311 -0.560619 20.2991 1.68186Z")
      } else {
        item.removeAttribute('active', '');
        item.querySelector('.card__btn-path').setAttribute('d', "M19.175 2.79339C17.5296 1.16647 14.8575 1.16474 13.2099 2.78822L10.9918 5.02623L8.75049 2.81011C7.10057 1.16255 4.43311 1.17062 2.81372 2.78784L2.80816 2.7934C2.01559 3.57707 1.58967 4.61629 1.58967 5.74496C1.58967 6.85716 2.02669 7.90492 2.81438 8.7027L10.9804 16.777L19.175 8.67433C20.8252 7.04265 20.8171 4.40102 19.1806 2.7989L19.175 2.79339ZM10.9804 19L1.6841 9.80806C0.606277 8.72013 0 7.27695 0 5.74496C0 4.21297 0.583822 2.76979 1.6841 1.68186C3.92173 -0.552786 7.58644 -0.560592 9.85625 1.68041C9.86421 1.68827 9.87215 1.69615 9.88007 1.70406L10.9804 2.792L12.0806 1.68186C12.0848 1.67771 12.089 1.67357 12.0932 1.66944C14.3622 -0.560612 18.0353 -0.556471 20.2991 1.68186C22.567 3.90213 22.567 7.54338 20.2991 9.78586L10.9804 19Z")
      }
    })
  });

  let profile = document.querySelector('.profile')
  let overlay = document.querySelector('.overlay')
  let profileBtnEdit = profile.querySelector('.profile__btn_edit')
  let overlayCloseBtn = document.querySelector('.form__close-icon')

  profileBtnEdit.addEventListener ('click', () => {
    overlay.classList.add('overlay_active')
  })

  overlayCloseBtn.addEventListener('click', closeOverlay)

  function closeOverlay() {
    overlay.classList.remove('overlay_active')
  }

  overlay.querySelector('.form__btn').addEventListener('click', () => {
    let valueName = overlay.querySelector('.input-name').value
    let valueJob = overlay.querySelector('.input-job').value
    if ((valueName == '') || (valueJob == '')) {
      alert('Заполните поля')
    } else {
      profile.querySelector('.profile__title').innerHTML = valueName
      overlay.querySelector('.input-name').value = ''
      profile.querySelector('.profile__subtitle').innerHTML = valueJob
      overlay.querySelector('.input-job').value = ''
      closeOverlay()
    }
  })

})



