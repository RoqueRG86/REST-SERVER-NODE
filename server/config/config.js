//+++++++++++++++++++++
//Puerto
//+++++++++++++++++++++

process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// ==================================
//  Config de Base Datos
// ==================================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';

} else {

    urlDB = 'mongodb+srv://Roque-RRG86:rrg861220@cluster0-tzcyg.mongodb.net/CAFE';
}

process.env.URLDB = urlDB;