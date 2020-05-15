## PROCESSO INSTALLAZIONE PROGETTO VSCOMMERCE 
### PASSAGGI DA SEGUIRE: 

## 1) 
Scaricare e installare XAMPP e far partire Apache e il server MySQL.

( link download: https://www.apachefriends.org/it/index.html ) 

## 2) 
 Entrare con PhpMyAdmin  e creare un database nuovo chiamato:

  "vscommerce" con codifica "utf8_general_ci".

## 3) 
Creato il database, cliccarci sul nome del database e cliccare in alto nella voce "Importa".

## 4) 
Importare il database inserendo il file SQL sul bottone "scegli file" e fare esegui.
Il database verrà importato.

## 5) 
Cliccare sul nome del database e aprire un tab per lanciare una Query SQL (in alto c'è il menu "SQL") e lanciare questa query: 

" SET GLOBAL time_zone = '+2:00' ".

## 6) 
Copiare in locale la cartella "vscommerce".

## 7) 
 Assicurarsi di avere nodejs installato, eventualmente installarlo tramite il seguente link:  
 ( https://nodejs.org/it/download/ ).

## 8) 
Aprire il terminale all'interno della cartella in locale (nel path della cartella), lanciare il comando " npm install ".

## 9) 
Quando termina il processo d'installazione, lanciare i comandi: 

" cd server " poi " node ./server.js " in questo verrà eseguito il server.

## 10) 
Aprire una seconda schermata di terminale CMD sempre nella cartella del progetto in locale vscommerce.

## 11)
 In questa seconda finestra del prompt dei comandi, lanciare: 
 " npm start ". 
 In questo modo si avvierà Node.JS e si aprirà la pagina web con il sito.

## 12) 
Registrarti come cliente, andando sulla pagina di "SIGNIN" ed inserire i dati di registrazione richiesti.

Successivamente effetuare la "LOGIN" con i dati appena creati.

# FINE 
