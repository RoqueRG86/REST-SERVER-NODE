//=========================
//Puerto
//=========================

process.env.PORT = process.env.PORT || 3000;
//===========================
//ENTORNO DE DESARROLLO
//===========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
// ==================================
//  Config de Base Datos
// ==================================

//=========================
//VENCIMIENTO TOKEN
//=========================
process.env.CADUCIDAD_TOKEN = (60 * 60 * 24) * 30;
//=========================
//SEEN DE AUTENTIFICACION TOKEN
//=========================
process.env.SEED = process.env.SEED || 'este-es-la-seed-desarrollo';

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';

} else {

    urlDB = 'mongodb+srv://Roque-RRG86:rrg861220@cluster0-tzcyg.mongodb.net/CAFE';
}

process.env.URLDB = urlDB;

//=========================
//Google client ID
//=========================

process.env.CLIENT_ID = process.env.CLIENT_ID || '11493599166-g7v055dfet3v70ifpke9v0qsrrrvl8c3.apps.googleusercontent.com';