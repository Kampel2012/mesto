(()=>{"use strict";function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(t,r){for(var n=0;n<r.length;n++){var o=r[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(void 0,i=function(t,r){if("object"!==e(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!==e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(o.key),"symbol"===e(i)?i:String(i)),o)}var i}var r=function(){function e(t,r){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._templateSelector=r,this._cardElement=this._createCardElement(),this._cardImage=this._cardElement.querySelector(".card__image"),this._cardImage.src=t.link,this._cardImage.alt=t.name,this._cardTitle=this._cardElement.querySelector(".card__title"),this._cardTitle.textContent=t.name,this._setCardHandling(),this._cardElement}var r,n;return r=e,(n=[{key:"_createCardElement",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(!0)}},{key:"_setCardHandling",value:function(){var e=this;this._cardElement.addEventListener("click",(function(t){e._removeCardIfRequired(t),e._switchLikeActiveIfRequired(t)}))}},{key:"_removeCardIfRequired",value:function(e){e.target.classList.contains("card__btn_type_delete")&&this._cardElement.remove()}},{key:"_switchLikeActiveIfRequired",value:function(e){var t=e.target;t.classList.contains("card__btn")&&t.classList.toggle("card__btn_like_active")}}])&&t(r.prototype,n),Object.defineProperty(r,"prototype",{writable:!1}),e}();function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}function o(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,t){if("object"!==n(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!==n(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===n(i)?i:String(i)),o)}var i}var i=function(){function e(t,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._config=t,this._elemForValid=r,this._inputList=this._makeListInputs(),this._buttonElement=this._elemForValid.querySelector(this._config.submitButtonSelector)}var t,r;return t=e,(r=[{key:"_makeListInputs",value:function(){return Array.from(this._elemForValid.querySelectorAll(this._config.inputSelector))}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(e){return!e.validity.valid}))}},{key:"_showInputError",value:function(e,t){var r=this._elemForValid.querySelector(".".concat(e.id,"-error"));e.classList.add(this._config.inputErrorClass),r.textContent=t,r.classList.add(this._config.errorClass)}},{key:"_hideInputError",value:function(e){var t=this._elemForValid.querySelector(".".concat(e.id,"-error"));e.classList.remove(this._config.inputErrorClass),t.classList.remove(this._config.errorClass),t.textContent=""}},{key:"_checkInputValidity",value:function(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this.disableSubmitBtn():(this._buttonElement.classList.remove(this._config.inactiveButtonClass),this._buttonElement.disabled=!1)}},{key:"_setEventListeners",value:function(){var e=this;this._toggleButtonState(),this._inputList.forEach((function(t){return t.addEventListener("input",(function(){e._checkInputValidity(t),e._toggleButtonState()}))}))}},{key:"disableSubmitBtn",value:function(){this._buttonElement.classList.add(this._config.inactiveButtonClass),this._buttonElement.disabled=!0}},{key:"removeValidationErrors",value:function(){var e=this;this._inputList.forEach((function(t){e._hideInputError(t)}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&o(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}();function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var u=[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}],l=document.querySelector(".profile"),c=l.querySelector(".profile__btn_type_edit"),s=l.querySelector(".profile__name"),p=l.querySelector(".profile__subtitle"),d=l.querySelector(".profile__btn_type_add"),_=document.querySelector(".pop-up_data_image-card"),f=document.querySelector(".pop-up_data_cards"),m=f.querySelector(".pop-up__form_data_cards"),y=document.querySelector(".pop-up_data_profile"),v=y.querySelector(".pop-up__form_data_profile"),h=document.querySelectorAll(".pop-up__btn_type_close"),b=y.querySelector(".pop-up__input_type_name"),S=y.querySelector(".pop-up__input_type_job"),g=document.querySelector(".pop-up__input_type_placeName"),E=document.querySelector(".pop-up__input_type_placeLink"),k=document.querySelector(".gallery"),L=Array.from(document.querySelectorAll(".pop-up")),q=document.querySelector(".pop-up__image-card"),C=document.querySelector(".pop-up__subtitle"),w=new i({formSelector:".pop-up__form",inputSelector:".pop-up__input",submitButtonSelector:".pop-up__btn_type_submit",fiedSetSelector:".pop-up__set",inactiveButtonClass:"pop-up__btn_inActive",inputErrorClass:"pop-up__input_type_error",errorClass:"pop-up__input-error_visible"},v),I=new i({formSelector:".pop-up__form",inputSelector:".pop-up__input",submitButtonSelector:".pop-up__btn_type_submit",fiedSetSelector:".pop-up__set",inactiveButtonClass:"pop-up__btn_inActive",inputErrorClass:"pop-up__input_type_error",errorClass:"pop-up__input-error_visible"},m);function j(e){k.prepend(e)}function x(e){e.classList.add("pop-up_opened"),document.addEventListener("keydown",B)}function A(e){e.classList.remove("pop-up_opened"),document.removeEventListener("keydown",B)}function B(e){"Escape"===e.key&&A(document.querySelector(".pop-up_opened"))}w.enableValidation(),I.enableValidation(),function(){var e,t=function(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return a(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?a(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,o=function(){};return{s:o,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,u=!0,l=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return u=e.done,e},e:function(e){l=!0,i=e},f:function(){try{u||null==r.return||r.return()}finally{if(l)throw i}}}}(u.reverse());try{for(t.s();!(e=t.n()).done;){var n=e.value;j(new r(n,"#card-template"))}}catch(e){t.e(e)}finally{t.f()}}(),k.addEventListener("click",(function(e){var t;e.target.classList.contains("card__image")&&(t=e.target,q.src=t.src,q.alt=t.alt,C.textContent=t.alt,x(_))})),m.addEventListener("submit",(function(e){e.preventDefault(),j(new r({name:g.value,link:E.value},"#card-template")),A(f)})),d.addEventListener("click",(function(e){x(f),I.disableSubmitBtn(),I.removeValidationErrors(),m.reset()})),c.addEventListener("click",(function(){b.value=s.textContent,S.value=p.textContent,w.disableSubmitBtn(),w.removeValidationErrors(),x(y)})),v.addEventListener("submit",(function(e){e.preventDefault(),s.textContent=b.value,p.textContent=S.value,A(y)})),h.forEach((function(e){e.addEventListener("click",(function(){A(e.closest(".pop-up"))}))})),L.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target===t.currentTarget&&A(e)}))}))})();