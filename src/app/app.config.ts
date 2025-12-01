import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router'; 
import { routes } from './app.routes'; 
import { provideHttpClient } from '@angular/common/http';
// Importamos las funciones de inicialización
import { initializeApp, provideFirebaseApp } from '@angular/fire/app'; 
import { provideAuth, getAuth } from '@angular/fire/auth';
// Importamos la función para inyección manual
import { InjectionToken, inject } from '@angular/core';

const firebaseConfig = {
  // ATENCIÓN: Estos son los valores reales que obtuviste de la Consola de Firebase
  apiKey: "AIzaSyB3HYPdkT1k0Su_dx0eGuo7wyHSvzbcDCE", 
  authDomain: "cursofinder-auth.firebaseapp.com", 
  projectId: "cursofinder-auth", 
  storageBucket: "cursofinder-auth.appspot.com", 
  messagingSenderId: "757886309812", 
  appId: "1:757886309812:web:6e72764306ab61b06dcee1" 
};

// Definición para inicializar Firebase (utilizando la función que creamos)
const FIREBASE_APP = provideFirebaseApp(() => initializeApp(firebaseConfig));

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), 
    
    // 1. Inicializa la app de Firebase
    FIREBASE_APP,
    
    // 2. Inicializa el servicio de autenticación usando el módulo 'Auth'
    provideAuth(() => getAuth()),
  ]
};