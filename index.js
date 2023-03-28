(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(t){return function(t){if(Array.isArray(t))return n(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function r(e,n){for(var r=0;r<n.length;r++){var o=n[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(void 0,i=function(e,n){if("object"!==t(e)||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,"string");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(o.key),"symbol"===t(i)?i:String(i)),o)}var i}var o=function(){function t(n,r,o,i,u,c){var a=n.name,l=n.link,s=n.likes,f=void 0===s?[]:s,p=n._id,y=n.owner;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.hendleForLikeBtn=c,this._id=p,this._userId=u,this.owner=y,this._handleConfirmDel=i,this._name=a,this._link=l,this._likesData=f,this._likes=e(f).length,this._templateSelector=r,this._handleCardClick=o,this._cardElement=this._createCardElement(),this._cardImage=this._cardElement.querySelector(".card__image"),this._cardTitle=this._cardElement.querySelector(".card__title"),this._cardButtonDelete=this._cardElement.querySelector(".card__btn_type_delete"),this._cardButtonLike=this._cardElement.querySelector(".card__btn_type_like"),this._cardCounterContainer=this._cardElement.querySelector(".card__counter"),this._fillCardInfo(),this.removeBtnDeleteIfdontNeed(),this._setCardHandling(),this._checkIsLike(this._likesData)&&this.switchLikeActiveIfRequired()}var n,o;return n=t,(o=[{key:"removeBtnDeleteIfdontNeed",value:function(){this.owner._id!==this._userId&&this._cardButtonDelete.remove()}},{key:"_fillCardInfo",value:function(){this._cardImage.src=this._link,this._cardImage.alt=this._name,this._cardTitle.textContent=this._name,this._cardCounterContainer.textContent=this._likes}},{key:"getCardElement",value:function(){return this._cardElement}},{key:"getCardId",value:function(){return this._id}},{key:"_createCardElement",value:function(){return document.querySelector(this._templateSelector).content.querySelector(".card").cloneNode(!0)}},{key:"_checkIsLike",value:function(t){var n=this;return e(t).some((function(t){return t._id===n._userId}))}},{key:"_setCardHandling",value:function(){var t=this;this._cardButtonLike.addEventListener("click",(function(){t._checkIsLike(t._likesData)?t.hendleForLikeBtn("DELETE"):t.hendleForLikeBtn("PUT")})),this._cardButtonDelete&&this._cardButtonDelete.addEventListener("click",(function(){t._handleConfirmDel(t)})),this._cardImage.addEventListener("click",(function(){return t._handleCardClick({name:t._name,link:t._link,likes:t._likes})}))}},{key:"removeCard",value:function(){this._cardElement.remove(),this._cardElement=null}},{key:"switchLikeActiveIfRequired",value:function(){this._cardButtonLike.classList.toggle("card__btn_like_active")}}])&&r(n.prototype,o),Object.defineProperty(n,"prototype",{writable:!1}),t}(),i=document.querySelector(".profile"),u=i.querySelector(".profile__btn_type_edit"),c=i.querySelector(".profile__btn_type_add"),a=document.querySelector(".pop-up_data_cards").querySelector(".pop-up__form_data_cards"),l=document.querySelector(".pop-up_data_profile"),s=l.querySelector(".pop-up__form_data_profile"),f=l.querySelector(".pop-up__input_type_name"),p=l.querySelector(".pop-up__input_type_job"),y=document.querySelector(".pop-up__form_data_avatar"),h=document.querySelector(".profile__btn_type_avatar");function d(t){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},d(t)}function _(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==d(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==d(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===d(o)?o:String(o)),r)}var o}var b=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._config=e,this._elemForValid=n,this._inputList=this._makeListInputs(),this._buttonElement=this._elemForValid.querySelector(this._config.submitButtonSelector)}var e,n;return e=t,(n=[{key:"_makeListInputs",value:function(){return Array.from(this._elemForValid.querySelectorAll(this._config.inputSelector))}},{key:"_hasInvalidInput",value:function(){return this._inputList.some((function(t){return!t.validity.valid}))}},{key:"_showInputError",value:function(t,e){var n=this._elemForValid.querySelector(".".concat(t.id,"-error"));t.classList.add(this._config.inputErrorClass),n.textContent=e,n.classList.add(this._config.errorClass)}},{key:"_hideInputError",value:function(t){var e=this._elemForValid.querySelector(".".concat(t.id,"-error"));t.classList.remove(this._config.inputErrorClass),e.classList.remove(this._config.errorClass),e.textContent=""}},{key:"_checkInputValidity",value:function(t){t.validity.valid?this._hideInputError(t):this._showInputError(t,t.validationMessage)}},{key:"_toggleButtonState",value:function(){this._hasInvalidInput()?this.disableSubmitBtn():(this._buttonElement.classList.remove(this._config.inactiveButtonClass),this._buttonElement.disabled=!1)}},{key:"_setEventListeners",value:function(){var t=this;this._toggleButtonState(),this._inputList.forEach((function(e){return e.addEventListener("input",(function(){t._checkInputValidity(e),t._toggleButtonState()}))}))}},{key:"disableSubmitBtn",value:function(){this._buttonElement.classList.add(this._config.inactiveButtonClass),this._buttonElement.disabled=!0}},{key:"removeValidationErrors",value:function(){var t=this;this._inputList.forEach((function(e){t._hideInputError(e)}))}},{key:"enableValidation",value:function(){this._setEventListeners()}}])&&_(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function v(t){return v="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},v(t)}function m(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==v(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==v(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===v(o)?o:String(o)),r)}var o}var g=function(){function t(e,n){var r=e.renderer;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._container=document.querySelector(n),this._renderer=r}var e,n;return e=t,(n=[{key:"addItem",value:function(t){this._container.prepend(t)}},{key:"addItemReverse",value:function(t){this._container.append(t)}},{key:"renderItems",value:function(t){var e=this;t.forEach((function(t){e.addItemReverse(e._renderer(t))}))}}])&&m(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function S(t){return S="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},S(t)}function k(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==S(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==S(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===S(o)?o:String(o)),r)}var o}var w=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this._popup=document.querySelector(e),this._closeButton=this._popup.querySelector(".pop-up__btn_type_close"),this._handleEscClose=this._handleEscClose.bind(this),this.setEventListeners()}var e,n;return e=t,(n=[{key:"open",value:function(){this._popup.classList.add("pop-up_opened"),document.addEventListener("keydown",this._handleEscClose)}},{key:"close",value:function(){this._popup.classList.remove("pop-up_opened"),document.removeEventListener("keydown",this._handleEscClose)}},{key:"_handleEscClose",value:function(t){"Escape"===t.key&&this.close()}},{key:"_handleClickOutClose",value:function(t){t.target===t.currentTarget&&this.close()}},{key:"setEventListeners",value:function(){var t=this;this._popup.addEventListener("mousedown",this._handleClickOutClose.bind(this)),this._closeButton.addEventListener("click",(function(){return t.close()}))}}])&&k(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function E(t){return E="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},E(t)}function C(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==E(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==E(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===E(o)?o:String(o)),r)}var o}function j(){return j="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=P(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},j.apply(this,arguments)}function O(t,e){return O=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},O(t,e)}function P(t){return P=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},P(t)}var I=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&O(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=P(r);if(o){var n=P(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===E(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=i.call(this,t))._imageItem=e._popup.querySelector(".pop-up__image-card"),e._popUpDescription=e._popup.querySelector(".pop-up__subtitle"),e}return e=u,(n=[{key:"open",value:function(t){var e=t.name,n=t.link;this._imageItem.src=n,this._imageItem.alt=e,this._popUpDescription.textContent=e,j(P(u.prototype),"open",this).call(this)}}])&&C(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(w);function L(t){return L="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},L(t)}function B(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==L(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==L(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===L(o)?o:String(o)),r)}var o}function T(){return T="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=q(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},T.apply(this,arguments)}function R(t,e){return R=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},R(t,e)}function q(t){return q=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},q(t)}var D=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&R(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=q(r);if(o){var n=q(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===L(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,t))._funcSubmit=e,n._btnSubmit=n._popup.querySelector(".pop-up__btn_type_submit"),n}return e=u,(n=[{key:"setEventListeners",value:function(){var t=this;T(q(u.prototype),"setEventListeners",this).call(this),this._popupForm=this._popup.querySelector(".pop-up__form"),this._popupForm.addEventListener("submit",(function(e){e.preventDefault(),t.toggleBtnContent(),t._funcSubmit(t._getInputValues())}))}},{key:"toggleBtnContent",value:function(){var t=this._btnSubmit.innerText;"Сохранить"===t&&(this._btnSubmit.innerText="Сохранение..."),"Сохранение..."===t&&(this._btnSubmit.innerText="Сохранить"),"Создать"===t&&(this._btnSubmit.innerText="Создание..."),"Создание..."===t&&(this._btnSubmit.innerText="Создать")}},{key:"_getInputValues",value:function(){return Object.fromEntries(new FormData(this._popupForm))}},{key:"close",value:function(){T(q(u.prototype),"close",this).call(this),this._popupForm.reset()}}])&&B(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(w);function x(t){return x="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},x(t)}function U(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==x(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==x(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===x(o)?o:String(o)),r)}var o}var A=function(){function t(e){var n=e.selectorName,r=e.selectorJob,o=e.selectorAvatar;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.name=document.querySelector(n),this.job=document.querySelector(r),this.avatar=document.querySelector(o)}var e,n;return e=t,(n=[{key:"getUserId",value:function(){return this._id}},{key:"getUserInfo",value:function(){return{name:this.name.textContent,job:this.job.textContent,avatar:this.avatar.src}}},{key:"setUserInfo",value:function(t){var e=t.name,n=void 0===e?this.name.textContent:e,r=t.job,o=void 0===r?this.job.textContent:r,i=t.avatar,u=void 0===i?this.avatar.src:i,c=t._id;this._id=c,this.name.textContent=n,this.job.textContent=o,this.avatar.src=u}}])&&U(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}();function V(t){return V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},V(t)}function F(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==V(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==V(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===V(o)?o:String(o)),r)}var o}var N=new(function(){function t(e){var n=e.baseUrl,r=e.headers;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.baseUrl=n,this.headers=r}var e,n;return e=t,(n=[{key:"_checkResponse",value:function(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status))}},{key:"getUserInfoData",value:function(){return fetch("".concat(this.baseUrl,"/users/me"),{headers:this.headers}).then(this._checkResponse).catch((function(t){return console.log(t)}))}},{key:"getInitialCards",value:function(){return fetch("".concat(this.baseUrl,"/cards"),{headers:this.headers}).then(this._checkResponse).catch((function(t){return console.log(t)}))}},{key:"editProfile",value:function(t){var e=t.name,n=t.job;return fetch("".concat(this.baseUrl,"/users/me"),{method:"PATCH",headers:this.headers,body:JSON.stringify({name:e,about:n})}).then(this._checkResponse).catch((function(t){return console.log(t)}))}},{key:"addNewCard",value:function(t){var e=t.name,n=t.link;return fetch("".concat(this.baseUrl,"/cards"),{method:"POST",headers:this.headers,body:JSON.stringify({name:e,link:n})}).then(this._checkResponse).catch((function(t){return console.log(t)}))}},{key:"deleteCard",value:function(t){return fetch("".concat(this.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:this.headers}).then(this._checkResponse).catch((function(t){return console.log(t)}))}},{key:"switchStateLike",value:function(t,e){return fetch("".concat(this.baseUrl,"/cards/").concat(t,"/likes"),{method:e,headers:this.headers}).then(this._checkResponse).catch((function(t){return console.log(t)}))}},{key:"editProfileAvatar",value:function(t){var e=t.link;return fetch("".concat(this.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:this.headers,body:JSON.stringify({avatar:e})}).then(this._checkResponse).catch((function(t){return console.log(t)}))}}])&&F(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),t}())({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-63",headers:{authorization:"2f3491e1-4e2a-4578-a239-f8abfd519bd8","Content-Type":"application/json"}});function J(t){return J="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},J(t)}function H(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,(void 0,o=function(t,e){if("object"!==J(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var r=n.call(t,"string");if("object"!==J(r))return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(r.key),"symbol"===J(o)?o:String(o)),r)}var o}function M(){return M="undefined"!=typeof Reflect&&Reflect.get?Reflect.get.bind():function(t,e,n){var r=function(t,e){for(;!Object.prototype.hasOwnProperty.call(t,e)&&null!==(t=$(t)););return t}(t,e);if(r){var o=Object.getOwnPropertyDescriptor(r,e);return o.get?o.get.call(arguments.length<3?t:n):o.value}},M.apply(this,arguments)}function z(t,e){return z=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},z(t,e)}function $(t){return $=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},$(t)}var G=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&z(t,e)}(u,t);var e,n,r,o,i=(r=u,o=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}(),function(){var t,e=$(r);if(o){var n=$(this).constructor;t=Reflect.construct(e,arguments,n)}else t=e.apply(this,arguments);return function(t,e){if(e&&("object"===J(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,t)});function u(t,e){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(n=i.call(this,t))._funcSubmit=e,n._btnSubmit=n._popup.querySelector(".pop-up__btn_type_submit"),n._card=null,n}return e=u,(n=[{key:"open",value:function(t){M($(u.prototype),"open",this).call(this),this._card=t}},{key:"setEventListeners",value:function(){var t=this;M($(u.prototype),"setEventListeners",this).call(this),this._popupForm=this._popup.querySelector(".pop-up__form"),this._popupForm.addEventListener("submit",(function(e){e.preventDefault(),t.toggleBtnContent(),t._funcSubmit(t._card)}))}},{key:"toggleBtnContent",value:function(){var t=this._btnSubmit.innerText;"Да"===t&&(this._btnSubmit.innerText="Удаление..."),"Удаление..."===t&&(this._btnSubmit.innerText="Да")}}])&&H(e.prototype,n),Object.defineProperty(e,"prototype",{writable:!1}),u}(w),K=new A({selectorName:".profile__name",selectorJob:".profile__subtitle",selectorAvatar:".profile__avatar"}),Q=new g({renderer:function(t){return nt(t)}},".gallery");N.getUserInfoData().then((function(t){K.setUserInfo({name:t.name,job:t.about,avatar:t.avatar,_id:t._id})})).then(N.getInitialCards().catch((function(t){return console.log(t)})).then((function(t){return Q.renderItems(t)}))).catch((function(t){return console.log(t)}));var W=new I(".pop-up_data_image-card"),X=new D(".pop-up_data_avatar",(function(t){var e=this;N.editProfileAvatar(t).then((function(t){return K.setUserInfo(t)})).catch((function(t){return console.log(t)})).then((function(){return e.close()})).catch((function(t){return console.log(t)})).finally((function(){return e.toggleBtnContent()}))})),Y=new D(".pop-up_data_cards",(function(t){var e=this;return N.addNewCard(t).then((function(t){return nt(t)})).then((function(t){return Q.addItem(t)})).then(this.close()).catch((function(t){return console.log(t)})).finally((function(){return e.toggleBtnContent()}))})),Z=new D(".pop-up_data_profile",(function(t){var e=this;return N.editProfile(t).then(K.setUserInfo(t)).catch((function(t){return console.log(t)})).then(this.close()).catch((function(t){return console.log(t)})).finally((function(){return e.toggleBtnContent()}))})),tt=new G(".pop-up_confirm",(function(t){var e=this;return N.deleteCard(t.getCardId()).then(t.removeCard()).catch((function(t){return console.log(t)})).then((function(){return e.close()})).catch((function(t){return console.log(t)})).finally((function(){return e.toggleBtnContent()}))}));function et(t){tt.open(t)}function nt(t){return new o(t,"#card-template",ct,et,K.getUserId(),rt).getCardElement()}function rt(t){var e=this;return N.switchStateLike(this._id,t).then((function(t){return e._likesData=t.likes,e._cardCounterContainer.textContent=t.likes.length})).then((function(){return e.switchLikeActiveIfRequired()})).catch((function(t){return console.log(t)}))}var ot=new b({formSelector:".pop-up__form",inputSelector:".pop-up__input",submitButtonSelector:".pop-up__btn_type_submit",fiedSetSelector:".pop-up__set",inactiveButtonClass:"pop-up__btn_inActive",inputErrorClass:"pop-up__input_type_error",errorClass:"pop-up__input-error_visible"},s),it=new b({formSelector:".pop-up__form",inputSelector:".pop-up__input",submitButtonSelector:".pop-up__btn_type_submit",fiedSetSelector:".pop-up__set",inactiveButtonClass:"pop-up__btn_inActive",inputErrorClass:"pop-up__input_type_error",errorClass:"pop-up__input-error_visible"},a),ut=new b({formSelector:".pop-up__form",inputSelector:".pop-up__input",submitButtonSelector:".pop-up__btn_type_submit",fiedSetSelector:".pop-up__set",inactiveButtonClass:"pop-up__btn_inActive",inputErrorClass:"pop-up__input_type_error",errorClass:"pop-up__input-error_visible"},y);function ct(t){W.open(t)}ot.enableValidation(),it.enableValidation(),ut.enableValidation(),c.addEventListener("click",(function(){Y.open(),it.disableSubmitBtn(),it.removeValidationErrors()})),u.addEventListener("click",(function(){var t;t=K.getUserInfo(),f.value=t.name,p.value=t.job,ot.disableSubmitBtn(),ot.removeValidationErrors(),Z.open()})),h.addEventListener("click",(function(){X.open(),ut.disableSubmitBtn(),ut.removeValidationErrors()}))})();