import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCxb35k3qDB9ypnuvFnUrbH2qDFtcEiiAE',
  authDomain: 'shootee-v2-66543.firebaseapp.com',
  projectId: 'shootee-v2-66543',
  storageBucket: 'shootee-v2-66543.appspot.com',
  messagingSenderId: '814382157497',
  appId: '1:814382157497:web:6d5e5f08b25121d4a01568',
  measurementId: 'G-87CHLBEEL1',
};

const firebaseApp = initializeApp(firebaseConfig);

export { firebaseApp };
