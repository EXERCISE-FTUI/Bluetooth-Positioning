# Bluetooth-Positioning

## Overview

Proyek ini bertujuan untuk melacak keberadaan sebuah device dalam gedung berdasarkan koneksi Bluetooth yang terhubung antara modul ESP32 dan perangkat yang diacak. Kemudian, aplikasi akan menampilkan posisi lantai device dan aproksimasi jarak device ke beacon bluetooth yang diletakkan di setiap lantai bangunan, beacon membantu untuk menentukan keberadaan lantai berdasarkan Received Signal Strength Indicator (RSSI). Dengan proyek ini, diharapkan bisa mempererat tali silaturahmi dan kerja sama yang baik antara Ocula Interactive dengan Exercise FTUI. 

## Description

### Hardware

Beacon yang menggunakan mikrokontroler ESP32 dan berperan sebagai pemancar sinyal bluetooth. Beacon mencakup mikrokontroler serta adaptor 5V sebagai sumber daya. Beacon juga akan terpasang pada circuit board untuk memastikan peletakkan komponen yang rapi. Adapun modul-modul beacon ini diletakkan di beberapa titik pada bangunan untuk memastikan kalkulasi posisi perangkat yang lebih akurat. 

### Software

Aplikasi yang berperan sebagai perantara antara perangkat pengguna dengan beacon-beacon di tiap lantai pada bangunan. Aplikasi akan menerima data kekuatan sinyal perangkat terhadap beacon tertentu atau RSSI (Received Signal Strength Indicator). Data ini digunakan untuk mengkalkulasi dan menampilkan posisi level/lantai dari perangkat dengan sesuai. Aplikasi ini juga berfungsi untuk menampilkan peta lantai gedung yang sesuai, serta menunjukkan titik posisi spesifik dari perangkat. Hal ini dilakukan dengan memanfaatkan fitur GPS pada perangkat pengguna.

## User Guide:
Link User Guide : https://docs.google.com/document/d/1xqWW9Mhz8GbiZplE9uc57TbJ_lottzag5fjhEP9edYE/edit?usp=sharing
