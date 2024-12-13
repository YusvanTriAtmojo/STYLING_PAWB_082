const router = require('express').Router();
const homeController = require('../controllers').home;
const profileController = require('../controllers').profile;
const verifyUser = require('../configs/verify');
const controllerPokemon = require('../controllers/controller-pokemon');

router.get('/', verifyUser.isLogin, homeController.home);
router.get('/pokemon', verifyUser.isLogin, controllerPokemon.getPokemon);
router.get('/profile', verifyUser.isLogin, profileController.profile);


module.exports = router;