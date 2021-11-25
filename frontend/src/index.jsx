import React from 'react';
import ReactDOM from 'react-dom';
import Pages from './Routes/Routes';
import { Provider } from 'react-redux'
import { store, Login, persistor } from './Store/Store'
import { PersistGate } from 'redux-persist/integration/react'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const translationsEn = {AllItems: 'All Items', AddToCart: 'Add to Cart', search: 'Search Products', Home: 'Home', Logout: 'Log Out', Dashboard: 'Dashboard', Cart: 'Cart', CartIsEmpty: 'Cart is empty', TotalPrice: 'Total Price', Checkout: 'Checkout', Refresh: 'Refresh key', Empty: 'Empty Cart', Order: 'Order ID', Quantity: 'Quantity', Login: 'Login Here', Username: 'Username', Password: 'Password', Log: 'Login', Register: 'Sign Up', Reg: 'Register Here' }
const translationsSrb = {AllItems: 'Svi artikli', AddToCart: 'Dodaj u korpu', search: 'Pretrazi proizvode', Home: 'Pocetna', Logout: 'Izloguj se', Dashboard: 'Komandna tabla', Cart: 'Korpa', CartIsEmpty: 'Korpa je prazna', TotalPrice: 'Ukupna cena', Checkout: 'Naruci', Refresh: 'Osvezi kljuc', Empty: 'Isprazni korpu', Order: 'ID porudzbine', Quantity: 'Kolicina', Login: 'Ulogujste se ovde', Username: 'Korisnicko ime', Password: 'Sifra', Log: 'Uloguj se', Register: 'Registruj se', Reg: 'Registruj se ovde'}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {translation: translationsEn},
      srb: {translation: translationsSrb},
    },
    fallbackLng: "en"
  });

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} Login={Login}>
      <PersistGate persistor={persistor}>
        <Pages />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
